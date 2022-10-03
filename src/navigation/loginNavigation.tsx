import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUp, SignIn} from '../components';

export type LoginStackParams = {
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<LoginStackParams>();

export default function LoginNavigation() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen name="SignIn" component={SignIn} options={{title: ''}} />
    </Stack.Navigator>
  );
}
