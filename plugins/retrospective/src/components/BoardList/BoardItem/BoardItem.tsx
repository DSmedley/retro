import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {BoardData} from '@scrumedley/backstage-plugin-retrospective-common';
import {selectedBoardRouteRef} from '../../../routes';
import {useRouteRef} from '@backstage/core-plugin-api';
import {useNavigate} from 'react-router-dom';

type BoardItemProps = {
  board: BoardData;
  onEdit: (board: BoardData) => void;
  onDelete: (id: number) => void;
}

const BoardItem = ({board, onEdit, onDelete}: BoardItemProps) => {
  const navigate = useNavigate();
  const retroRouteRef = useRouteRef(selectedBoardRouteRef);

  const handleSelectBoard = () => {
    navigate({
      pathname: retroRouteRef({
        id: board.id!.toString()
      })
    });
  };

  return (
    <Card onClick={handleSelectBoard}>
      <CardContent>
        <Typography variant="h5">{board.title}</Typography>
        <Typography variant="body2">{board.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton color="success" onClick={(e) => {
          e.stopPropagation();
          onEdit(board);
        }}>
          <EditIcon/>
        </IconButton>
        <IconButton color="error" onClick={(e) => {
          e.stopPropagation();
          onDelete(board.id!);
        }}>
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BoardItem;
