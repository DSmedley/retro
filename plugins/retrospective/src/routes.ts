import {createRouteRef, createSubRouteRef} from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'retrospective',
});

export const boardsRouteRef = createSubRouteRef({
  id: 'retrospective/boards',
  parent: rootRouteRef,
  path:'/boards'
});

export const selectedBoardRouteRef = createSubRouteRef({
  id: 'retrospective/boards/retro',
  parent: rootRouteRef,
  path:'/boards/:id'
});

export const selectedArchivesRouteRef = createSubRouteRef({
  id: 'retrospective/boards/archives',
  parent: rootRouteRef,
  path:'/boards/:id/archives'
});
