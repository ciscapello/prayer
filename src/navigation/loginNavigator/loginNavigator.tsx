import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from './signInScreen';
import { SignUpScreen } from './signUpScreen';

export type LoginStackParams = {
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<LoginStackParams>();

export default function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Welcome', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}
