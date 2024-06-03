import React, {Fragment, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

type RetroTimerProps = {
  duration?: number;
  onEndTimer: () => void;
}

const RetroTimer = ({duration, onEndTimer}: RetroTimerProps) => {
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (duration) {
      setTimerActive(true);
      setTimeRemaining(duration);
    }
  }, [duration]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleOpenDialog();
            setTimerActive(false);
            onEndTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeRemaining, onEndTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Fragment>
      {timerActive && (
        <Chip label={`Timer: ${formatTime(timeRemaining)}`} variant="outlined" />
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          style: { borderColor: '#f50057', borderWidth: 5, borderStyle: 'solid' }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="div">
            Times Up!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', padding: '20px' }}>
          <Typography variant="body1">
            The time to add cards has ended. It's time to start the discussions!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default RetroTimer;