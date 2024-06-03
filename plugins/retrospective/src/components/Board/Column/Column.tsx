import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import CardItem from '../CardItem/CardItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Sort from '@mui/icons-material/Sort';
import {CardData, ColumnData, retroChannel, RetroSignal} from '@scrumedley/backstage-plugin-retrospective-common';
import {useApi} from '@backstage/core-plugin-api';
import {retroApiRef} from '../../../api';
import {useAsync} from 'react-use';
import TextField from '@mui/material/TextField';
import {useSignal} from '@backstage/plugin-signals-react';
import {DirectionsRun, HelpOutline, SentimentDissatisfied, SentimentSatisfiedAlt} from '@mui/icons-material';

const ColumnIcons = {
  SentimentSatisfiedAlt: <SentimentSatisfiedAlt/>,
  HelpOutline: <HelpOutline/>,
  DirectionsRun: <DirectionsRun/>,
  SentimentDissatisfied: <SentimentDissatisfied/>
};

type ColumnProps = {
  column: ColumnData;
}

const Column = ({column}: ColumnProps) => {
  const retroApi = useApi(retroApiRef);
  const [sortByUpvotes, setSortByUpvotes] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [newCardValue, setNewCardValue] = useState('');
  const {lastSignal} = useSignal<RetroSignal>(retroChannel);

  const getCards = async () => {
    setCards(await retroApi.getCards(Number(column.id)));
  };

  useAsync(async () => {
    await getCards();
  }, [retroApi, lastSignal]);

  const handleCreateCard = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newCardValue !== '') {
      await retroApi.createCard({title: newCardValue, column_id: column.id!, upvotes: 0, done: false});
      setNewCardValue('');
    }
  };

  const sortedCards = [...cards].sort((a, b) => {
    if (a.done !== b.done) {
      return a.done ? 1 : -1;
    }
    if (sortByUpvotes) {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  const getIcon = () => {
    if (column.icon === 'SentimentSatisfiedAlt') {
      return ColumnIcons.SentimentSatisfiedAlt;
    } else if (column.icon === 'HelpOutline') {
      return ColumnIcons.HelpOutline;
    } else if (column.icon === 'SentimentDissatisfied') {
      return ColumnIcons.SentimentDissatisfied;
    }
    return ColumnIcons.DirectionsRun;
  };

  const handleSortToggle = () => {
    setSortByUpvotes(!sortByUpvotes);
  };

  return (
    <Paper style={{padding: 10}}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center">
          {getIcon()}
          <Typography variant="h6" align="center" ml={1}>
            {column.title}
          </Typography>
        </Box>
        <IconButton onClick={handleSortToggle}>
          <Sort/>
        </IconButton>
      </Box>
      <TextField
        fullWidth
        label="Add Card"
        value={newCardValue}
        onChange={(e) => setNewCardValue(e.target.value)}
        onKeyDown={handleCreateCard}
        margin="normal"
      />
      {sortedCards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          color={column.color}
          isActions={column.is_actions}
        />
      ))}
    </Paper>
  );
};

export default Column;
