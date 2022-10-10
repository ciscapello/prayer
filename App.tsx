import * as React from 'react';
import RootNavigation from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { ActivityIndicator } from 'react-native';

export default function Home() {
  return (
    <Provider store={store}>
      <ActivityIndicator size="small" color="#0000ff" />
      <RootNavigation />
    </Provider>
  );
}
