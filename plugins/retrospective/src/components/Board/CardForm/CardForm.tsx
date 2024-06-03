import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {CardData} from '@scrumedley/backstage-plugin-retrospective-common';

type CardFormProps = {
  card: CardData;
  updateCard: (card: CardData) => void;
  handleClose: () => void;
}

const CardForm = ({ card, updateCard, handleClose }: CardFormProps) => {
  const [title, setTitle] = useState(card.title);

  const handleSave = () => {
    updateCard({ ...card, title });
    handleClose();
  };

  return (
    <Modal open onClose={handleClose}>
      <Box sx={{ width: 400, padding: 2, margin: 'auto', marginTop: '10%', backgroundColor: 'white' }}>
        <TextField
          fullWidth
          label="Edit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CardForm;
