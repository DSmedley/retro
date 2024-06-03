import React, {PropsWithChildren} from 'react';
import {
  Header,
  Page,
  Content
} from '@backstage/core-components';

export const RetroContainer = ({children}: PropsWithChildren) => (
  <Page themeId="tool">
    <Header title="Retrospective"/>
    <Content>
      {children}
    </Content>
  </Page>
);
