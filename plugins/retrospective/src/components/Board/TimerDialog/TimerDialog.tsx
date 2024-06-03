import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, {useState} from 'react';

type TimerDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (duration: number) => void;
}

const TimerDialog = ({ open, onClose, onSubmit }: TimerDialogProps) => {
  const [timerDuration, setTimerDuration] = useState<number>(0);

  const handleTimerSubmit = () => {
    onSubmit(timerDuration);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start Timer</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Timer Duration (minutes)"
          type="number"
          value={timerDuration}
          onChange={(e) => setTimerDuration(Number(e.target.value))}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTimerSubmit} color="primary">
          Start
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimerDialog;