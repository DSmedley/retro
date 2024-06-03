import {
  createApiFactory,
  createPlugin,
  createRoutableExtension, discoveryApiRef, fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import {RetroApiClient, retroApiRef} from './api';

export const retrospectivePlugin = createPlugin({
  id: 'retrospective',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: retroApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new RetroApiClient(discoveryApi, fetchApi),
    }),
  ],
});

export const RetrospectivePage = retrospectivePlugin.provide(
  createRoutableExtension({
    name: 'RetrospectivePage',
    component: () =>
      import('./components/RetroRouter').then(m => m.RetroRouter),
    mountPoint: rootRouteRef,
  }),
);
