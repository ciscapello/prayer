import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginNavigation from './loginNavigator/loginNavigator';
// import DeskNavigation from './deskNavigator/deskNavigator';
import { useAppSelector } from '../hooks';
import DeskNavigator from './deskNavigator/deskNavigator';
import GuestNavigator from './guestNavigator/guestNavigator';

export type RootStackParams = {
  LoginNavigation: undefined;
  DeskNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootNavigator() {
  const { isLogin } = useAppSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <Stack.Screen
            name="DeskNavigation"
            component={DeskNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="LoginNavigation"
            component={GuestNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
