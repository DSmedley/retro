import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import {CardData} from '@scrumedley/backstage-plugin-retrospective-common';
import Badge from '@mui/material/Badge';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useApi} from '@backstage/core-plugin-api';
import {retroApiRef} from '../../../api';

type CardItemProps = {
  card: CardData;
  color: string;
  isActions: boolean
}

const CardItem = ({card, color, isActions}: CardItemProps) => {
  const retroApi = useApi(retroApiRef);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editCardValue, setEditCardValue] = useState('');

  const handleEdit = () => {
    setEditCardValue(card.title);
    setEditing(prevState => !prevState);
  };

  const handleFocus = () => {
    if (!editing) {
      setOpen(prevState => !prevState);
    }
  };

  const handleUpdateCard = async (updatedCard: CardData) => {
    await retroApi.updateCard(updatedCard);
  };

  const RetroCard = () => (
    <Card
      onClick={handleFocus}
      style={{borderColor: card.done ? 'gray' : color, borderWidth: 5, borderStyle: 'solid', margin: '10px 0'}}
    >
      <CardContent>
        {!editing && <Typography variant="h6">{card.title}</Typography>}
        {editing && <TextField
          fullWidth
          label="Edit Card"
          value={editCardValue}
          onChange={(e) => setEditCardValue(e.target.value)}
          margin="normal"
        />}
      </CardContent>
      <CardActions>
        {!isActions && <Badge color="secondary" badgeContent={card.upvotes}>
          <IconButton onClick={async (e) => {
            e.stopPropagation();
            await handleUpdateCard({...card, upvotes: card.upvotes + 1});
          }}>
            <ThumbUpIcon/>
          </IconButton>
        </Badge>}
        <IconButton onClick={async (e) => {
          e.stopPropagation();
          if (editing) {
            await handleUpdateCard({...card, title: editCardValue});
          }
          handleEdit();
        }}>
          {!editing && <EditIcon/>}
          {editing && <SaveIcon/>}
        </IconButton>
        <IconButton onClick={async (e) => {
          e.stopPropagation();
          await handleUpdateCard({...card, done: !card.done});
        }}>
          <DoneIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );

  return (
    <div>
      <RetroCard/>
      <Modal open={open} onClose={handleFocus}>
        <Box sx={{width: '25%', margin: 'auto', marginTop: '10%'}}>
          <RetroCard/>
        </Box>
      </Modal>
    </div>
  );
};

export default CardItem;
