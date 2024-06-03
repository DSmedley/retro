import {RetroActions} from './enumerations';

export type CardData = {
  id?: number;
  column_id: number;
  title: string;
  upvotes: number;
  done: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type ColumnData = {
  id?: number;
  retro_id: number;
  title: string;
  color: string;
  icon: string;
  is_actions: boolean;
  created_at?: Date;
  updated_at?: Date;
  cards?: CardData[];
}

export type RetroData = {
  id?: number;
  board_id: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
  columns?: ColumnData[];
}

export type BoardData = {
  id?: number;
  title: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  retros?: RetroData[];
  columns?: ColumnData[];
}

export type RetroSignal = {
  action: RetroActions;
};