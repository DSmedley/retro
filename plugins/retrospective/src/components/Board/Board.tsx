import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Column from './Column/Column';
import TimerDialog from './TimerDialog/TimerDialog';
import {RetroContainer} from '../RetroContainer/RetroContainer';
import {ContentHeader} from '@backstage/core-components';
import {useAsync} from 'react-use';
import {useApi, useRouteRefParams} from '@backstage/core-plugin-api';
import {retroApiRef} from '../../api';
import {selectedBoardRouteRef} from '../../routes';
import {BoardData, ColumnData} from '@scrumedley/backstage-plugin-retrospective-common';
import RetroTimer from './Timer/RetroTimer';
import OptionsButton from './OptionsButton/OptionsButton';

const Board = () => {
  const retroApi = useApi(retroApiRef);
  const {id} = useRouteRefParams(selectedBoardRouteRef);
  const [board, setBoard] = useState<BoardData>();
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [timerDialogOpen, setTimerDialogOpen] = useState(false);
  const [timerDuration, setTimerDuration] = useState<number>();

  const fetchBoard = async () => {
    setBoard(await retroApi.getBoard(Number(id)));
    setColumns(await retroApi.getColumns(Number(id)));
  };

  useAsync(async () => {
    await fetchBoard();
  }, [retroApi]);

  const handleStartTimer = () => {
    setTimerDialogOpen(true);
  };

  const handleTimerSubmit = (duration: number) => {
    setTimerDialogOpen(false);
    if (duration > 0) {
      setTimerDuration(duration * 60);
    }
  };

  const handleEndTimer = () => {
    setTimerDuration(undefined);
  };

  return (
    <RetroContainer>
      <ContentHeader title={board?.title}>
        <RetroTimer duration={timerDuration} onEndTimer={handleEndTimer}/>
        <OptionsButton board={board} handleStartTimer={handleStartTimer}/>
      </ContentHeader>
      <Grid container spacing={2}>
        {columns.map(column => (
          <Grid item xs={3} key={column.id}>
            <Column column={column}/>
          </Grid>
        ))}
      </Grid>
      <TimerDialog open={timerDialogOpen} onClose={() => setTimerDialogOpen(false)} onSubmit={handleTimerSubmit}/>
    </RetroContainer>
  );
};

export default Board;
