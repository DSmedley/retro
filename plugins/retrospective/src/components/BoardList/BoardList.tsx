import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import BoardItem from './BoardItem/BoardItem';
import BoardDialog from '../BoardDialog/BoardDialog';
import {useAsync} from 'react-use';
import {useApi} from '@backstage/core-plugin-api';
import {retroApiRef} from '../../api';
import {ContentHeader} from '@backstage/core-components';
import {BoardData} from '@scrumedley/backstage-plugin-retrospective-common';
import {RetroContainer} from '../RetroContainer/RetroContainer';

const BoardList = () => {
  const retroApi = useApi(retroApiRef);
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editBoard, setEditBoard] = useState<BoardData | null>(null);

  const fetchBoard = async () => {
    setBoards(await retroApi.getBoards());
  };

  useAsync(async () => {
    await fetchBoard();
  }, [retroApi]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditBoard(null);
  };

  const handleBoardSave = async (board: BoardData) => {
    if (editBoard) {
      await retroApi.updateBoard(board);
    } else {
      board.columns?.map(column => delete column.id);
      await retroApi.createBoard(board);
    }
    await fetchBoard();
    handleDialogClose();
  };

  const handleBoardEdit = (board: BoardData) => {
    setEditBoard(board);
    setIsDialogOpen(true);
  };

  const handleBoardDelete = async (id: number) => {
    await retroApi.deleteBoard(id);
    await fetchBoard();
  };

  return (
    <RetroContainer>
      <ContentHeader title="Boards">
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
        >Create New Board</Button>
      </ContentHeader>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {boards.map((board) => (
          <Grid item xs={12} md={6} lg={4} key={board.id}>
            <BoardItem board={board} onEdit={handleBoardEdit} onDelete={handleBoardDelete} />
          </Grid>
        ))}
      </Grid>
      <BoardDialog open={isDialogOpen} onClose={handleDialogClose} onSave={handleBoardSave} existingBoard={editBoard} existingColumns={editBoard?.columns!} />
    </RetroContainer>
  );
};

export default BoardList;
