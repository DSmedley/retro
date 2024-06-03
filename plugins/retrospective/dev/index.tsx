import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { retrospectivePlugin, RetrospectivePage } from '../src/plugin';

createDevApp()
  .registerPlugin(retrospectivePlugin)
  .addPage({
    element: <RetrospectivePage />,
    title: 'Root Page',
    path: '/retrospective',
  })
  .render();
