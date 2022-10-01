import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNavigation from './loginNavigation';
import DeskNavigation from './deskNavigation';
import {useAppSelector} from '../hooks';

export type RootStackParams = {
  LoginNavigation: undefined;
  DeskNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootNavigation() {
  const {isLogin} = useAppSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <Stack.Screen
            name="DeskNavigation"
            component={DeskNavigation}
            options={{title: 'My desk'}}
          />
        ) : (
          <Stack.Screen
            name="LoginNavigation"
            component={LoginNavigation}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
