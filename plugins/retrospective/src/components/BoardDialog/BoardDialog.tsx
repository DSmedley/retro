import React, {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {BoardData, ColumnData} from '@scrumedley/backstage-plugin-retrospective-common';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

type BoardDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (board: BoardData) => void;
  existingBoard: BoardData | null;
  existingColumns: ColumnData[] | null;
}

const defaultColumns: ColumnData[] = [
  {id: 1, retro_id: 0, title: 'What went well?', color: '#C8E6C9', icon: 'SentimentSatisfiedAlt', is_actions: false},
  {id: 2, retro_id: 0, title: 'What puzzles us?', color: '#BBDEFB', icon: 'HelpOutline', is_actions: false},
  {
    id: 3,
    retro_id: 0,
    title: 'What went less well?',
    color: '#FFCDD2',
    icon: 'SentimentDissatisfied',
    is_actions: false
  },
  {id: 4, retro_id: 0, title: 'What do we want to do next?', color: '#FFF9C4', icon: 'DirectionsRun', is_actions: true}
];

const BoardDialog = ({open, onClose, onSave, existingBoard, existingColumns}: BoardDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columns, setColumns] = useState<ColumnData[]>(defaultColumns);

  useEffect(() => {
    if (existingBoard) {
      setTitle(existingBoard.title);
      setDescription(existingBoard.description ?? '');
    }
    if (existingColumns) {
      setColumns(existingColumns);
    }
  }, [existingBoard, existingColumns]);

  const handleSave = () => {
    onSave({id: existingBoard ? existingBoard.id : 0, title, description, columns});
  };

  const handleColumnChange = (columnId: number, key: keyof ColumnData, value: any) => {
    setColumns(columns.map(column => column.id === columnId ? { ...column, [key]: value } : column));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{existingBoard ? 'Edit Board' : 'Create New Board'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Divider textAlign="center">Columns</Divider>
        {columns.filter(column => !column.is_actions).map(column => (
          <Box key={column.id} mb={2}>
            <TextField
              fullWidth
              label="Column Title"
              value={column.title}
              onChange={(e) => handleColumnChange(column.id!, 'title', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Column Color"
              value={column.color}
              onChange={(e) => handleColumnChange(column.id!, 'color', e.target.value)}
              margin="normal"
              type="color"
            />
          </Box>
        ))}
        <Divider textAlign="center">Action Items Column</Divider>
        {columns.filter(column => column.is_actions).map(column => (
          <Box key={column.id} mb={2}>
            <TextField
              fullWidth
              label="Column Title"
              value={column.title}
              onChange={(e) => handleColumnChange(column.id!, 'title', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Column Color"
              value={column.color}
              onChange={(e) => handleColumnChange(column.id!, 'color', e.target.value)}
              margin="normal"
              type="color"
            />
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">{existingBoard ? 'Update' : 'Create'}</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardDialog;
