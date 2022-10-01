import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Desk} from '../components';

export type DeskStackParams = {
  Desk: undefined;
};

const Stack = createNativeStackNavigator<DeskStackParams>();

export default function DeskNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Desk"
        component={Desk}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
