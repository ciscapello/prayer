import * as React from 'react';
import RootNavigation from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { injectStore } from './src/api';
injectStore(store);

export default function Home() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
