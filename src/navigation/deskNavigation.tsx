import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Desk } from '../components';
import { Text } from 'react-native';
import PrayersMain from './tabNavigation';

export type DeskStackParams = {
  Desk: undefined;
  PrayersMain: { id: number; title: string };
};

export type PrayersMainProps = NativeStackScreenProps<
  DeskStackParams,
  'PrayersMain'
>;

const Stack = createNativeStackNavigator<DeskStackParams>();

export default function DeskNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Desk"
        component={Desk}
        options={{
          title: 'My Desk',
        }}
      />
      <Stack.Screen
        name="PrayersMain"
        component={PrayersMain}
        options={{
          title: 'To do',
          headerLeft: () => <Text />,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
