import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Desk, Prayers} from '../components';

export type DeskStackParams = {
  Desk: undefined;
  Prayers: undefined;
};

const Stack = createNativeStackNavigator<DeskStackParams>();

export default function DeskNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Desk"
        component={Desk}
        options={{
          title: 'My desk',
        }}
      />
      <Stack.Screen
        name="Prayers"
        component={Prayers}
        options={{title: 'sads'}}
      />
    </Stack.Navigator>
  );
}
