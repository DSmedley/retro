import {Route, Routes} from 'react-router-dom';
import BoardList from '../BoardList/BoardList';
import React from 'react';
import {selectedArchivesRouteRef, boardsRouteRef, selectedBoardRouteRef} from '../../routes';
import Board from '../Board/Board';

export const RetroRouter = () => (
  <Routes>
    <Route
      path="/"
      element={<BoardList/>}
     />
    <Route
      path={boardsRouteRef.path}
      element={<BoardList/>}
     />
    <Route
      path={selectedBoardRouteRef.path}
      element={<Board/>}
     />
    <Route
      path={selectedArchivesRouteRef.path}
      element={<BoardList/>}
     />
  </Routes>
);