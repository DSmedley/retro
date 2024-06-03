import {createApiRef} from '@backstage/core-plugin-api';
import {BoardData, CardData, ColumnData} from '@scrumedley/backstage-plugin-retrospective-common';

export const retroApiRef = createApiRef<RetroApi>({
  id: 'plugin.retrospective.service',
});

export interface RetroApi {
  getBoards(): Promise<BoardData[]>
  getBoard(id: number): Promise<BoardData>
  createBoard(board: BoardData): Promise<{ id: number }>
  updateBoard(board: BoardData): Promise<void>
  deleteBoard(id: number): Promise<void>

  archiveRetro(id: number): Promise<{ id: number }>

  getColumns(id: number): Promise<ColumnData[]>
  createColumn(column: ColumnData): Promise<{ id: number }>
  updateColumn(column: ColumnData): Promise<void>
  deleteColumn(id: number): Promise<void>

  getCards(id: number): Promise<CardData[]>
  createCard(card: CardData): Promise<{ id: number }>
  updateCard(card: CardData): Promise<void>
  deleteCard(id: number): Promise<void>
}
