import * as React from 'react';
import RootNavigation from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import store from './src/store';

export default function Home() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
