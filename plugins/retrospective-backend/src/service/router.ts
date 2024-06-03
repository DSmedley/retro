import {errorHandler, PluginDatabaseManager} from '@backstage/backend-common';
import {LoggerService, resolvePackagePath} from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import {SignalsService} from '@backstage/plugin-signals-node';
import {
  BoardData,
  CardData,
  ColumnData,
  RetroData,
  RetroActions,
  retroChannel,
  RetroSignal
} from '@scrumedley/backstage-plugin-retrospective-common';

export interface RouterOptions {
  logger: LoggerService;
  database: PluginDatabaseManager;
  signals?: SignalsService;
}

const migrationsDir = resolvePackagePath(
  '@scrumedley/backstage-plugin-retrospective-backend',
  'migrations',
);

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const {logger, database, signals} = options;

  logger.info('Initializing Retrospective backend');

  const client = await database.getClient();

  if (!database.migrations?.skip) {
    await client.migrate.latest({
      directory: migrationsDir,
    });
  }

  const router = Router();
  router.use(express.json());


  // Get all boards
  router.get('/boards', async (_, res) => {
    const boards: BoardData[] = await client('boards').select();
    res.json(boards);
  });

  // Get a board and its active retro
  router.get('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const board: BoardData = await client('boards').where({id}).first();

    if (board) {
      const retros: RetroData[] = await client('retros').where({board_id: id});
      for (const retro of retros) {
        const columns: ColumnData[] = await client('columns').where({retro_id: retro.id});
        for (const column of columns) {
          column.cards = await client('cards').where({column_id: column.id});
        }
        retro.columns = columns;
      }

      board.retros = retros;
      res.json(board);
    } else {
      res.status(404).json({error: 'Board not found'});
    }
  });

  // Get a boards archived retros
  router.get('/boards/:id/archives', async (req, res) => {
    const {id} = req.params;
    const board: BoardData = await client('boards').where({id}).first();

    if (board) {
      const archivedRetros: RetroData[] = await client('archived_retros').where({ board_id: id });
      for (const archivedRetro of archivedRetros) {
        const columns: ColumnData[] = await client('archived_columns').where({ retro_id: archivedRetro.id });
        for (const column of columns) {
          column.cards = await client('archived_cards').where({ column_id: column.id });
        }
        archivedRetro.columns = columns;
      }

      board.retros = archivedRetros;
      res.json(board);
    } else {
      res.status(404).json({error: 'Board not found'});
    }
  });

  // Create a new board and its first active retro
  router.post('/boards', async (req, res) => {
    const {title, description, columns}: BoardData = req.body;
    const [boardId] = await client('boards').insert({title, description});
    const [retroId] = await client('retros').insert({board_id: boardId, is_active: true});

    if (columns && columns.length) {
      const columnsToInsert = columns.map((column) => ({...column, retro_id: retroId}));
      await client('columns').insert(columnsToInsert);
    }

    res.status(201).json({boardId, retroId});
  });

  // Update a board
  router.put('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description}: BoardData = req.body;
    await client('boards').where({id}).update({title, description});
    res.sendStatus(204);
  });

  // Delete a board
  router.delete('/boards/:id', async (req, res) => {
    const {id} = req.params;
    await client('boards').where({id}).del();
    res.sendStatus(204);
  });

  // Archive the current active retro of a board and create a new active retro
  // router.post('/boards/:id/archive', async (req, res) => {
  //   const { id } = req.params;
  //
  //   const activeRetro: RetroData = await client('retros').where({ board_id: id, is_active: true }).first();
  //   if (!activeRetro) {
  //     return res.status(404).json({ error: 'Active retro not found' });
  //   }
  //
  //   // Fetch the columns and cards
  //   const columns: ColumnData[] = await client('columns').where({ retro_id: activeRetro.id });
  //   const columnIds = columns.map((c): number => c.id as number);
  //   const cards: CardData[] = await client('cards').whereIn('column_id', columnIds);
  //
  //   // Archive the retro
  //   const [archivedRetroId] = await client('archived_retros').insert({
  //     board_id: activeRetro.board_id,
  //   });
  //
  //   // Archive the columns and cards
  //   for (const column of columns) {
  //     const [archivedColumnId] = await client('archived_columns').insert({
  //       retro_id: archivedRetroId,
  //       title: column.title,
  //       color: column.color,
  //       icon: column.icon,
  //       is_actions: column.is_actions,
  //     });
  //
  //     const columnCards = cards.filter(card => card.column_id === column.id);
  //     const archivedCards = columnCards.map(card => ({
  //       column_id: archivedColumnId,
  //       title: card.title,
  //       upvotes: card.upvotes,
  //       done: card.done,
  //     }));
  //
  //     if (archivedCards.length) {
  //       await client('archived_cards').insert(archivedCards);
  //     }
  //   }
  //
  //   // Create a new retro with the same columns but only keep non-done action cards
  //   const newColumns = columns.map(column => ({
  //     retro_id: activeRetro.id,
  //     title: column.title,
  //     color: column.color,
  //     icon: column.icon,
  //     is_actions: column.is_actions,
  //   }));
  //
  //   await client('retros').insert({ board_id: id, is_active: true });
  //
  //   // Insert new columns for the new retro
  //   const newColumnIds = await client('columns').insert(newColumns).returning('id');
  //
  //   // Copy non-done cards from actions column to the new retro
  //   const actionsColumn = columns.find(column => column.is_actions);
  //   if (actionsColumn) {
  //     const nonDoneActionsCards = cards.filter(card => card.column_id === actionsColumn.id && !card.done);
  //     const newActionsColumnId = newColumnIds.find((_, index) => newColumns[index].is_actions);
  //     const newCards = nonDoneActionsCards.map(card => ({
  //       column_id: newActionsColumnId,
  //       title: card.title,
  //       upvotes: card.upvotes,
  //       done: card.done,
  //     }));
  //
  //     if (newCards.length) {
  //       await client('cards').insert(newCards);
  //     }
  //   }
  //
  //   // Archive the current active retro
  //   await client('retros').where({ id: activeRetro.id }).update({ is_active: false });
  //
  //   res.status(201).json({ archivedRetroId });
  // });

  router.get('/columns/:id', async (req, res) => {
    const {id} = req.params;
    const board: BoardData = await client('boards').where({id}).first();

    if (board) {
      const retro: RetroData = await client('retros').where({board_id: id}).first();
      if (retro) {
        const columns: ColumnData[] = await client('columns').where({retro_id: retro.id});
        res.json(columns);
      } else {
        res.status(500).json({error: 'No active Retro'});
      }
    } else {
      res.status(404).json({error: 'Board not found'});
    }
  });

  router.get('/cards/:id', async (req, res) => {
    const {id} = req.params;

    const card: CardData[] = await client('cards').where({column_id: id});

    res.json(card);
  });

  router.post('/cards', async (req, res) => {
    const cardData: CardData = req.body;
    const [cardId] = await client('cards').insert(cardData);

    if (signals) {
      logger.debug('Sending create card signal');
      await signals.publish<RetroSignal>({
        recipients: {type: 'broadcast'},
        message: {action: RetroActions.CARD},
        channel: retroChannel,
      });
    }

    res.status(201).json({cardId});
  });

  router.put('/cards/:id', async (req, res) => {
    const {id} = req.params;
    const cardData: CardData = req.body;
    await client('cards').where({id}).update(cardData);

    if (signals) {
      logger.debug('Sending update card signal');
      await signals.publish<RetroSignal>({
        recipients: {type: 'broadcast'},
        message: {action: RetroActions.CARD},
        channel: retroChannel,
      });
    }

    res.sendStatus(204);
  });

  router.delete('/cards/:id', async (req, res) => {
    const {id} = req.params;
    await client('cards').where({id}).del();

    if (signals) {
      logger.debug('Sending delete card signal');
      await signals.publish<RetroSignal>({
        recipients: {type: 'broadcast'},
        message: {action: RetroActions.CARD},
        channel: retroChannel,
      });
    }

    res.sendStatus(204);
  });

  router.use(errorHandler());
  return router;
}
