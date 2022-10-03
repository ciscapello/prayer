import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Desk } from '../components';
import { Text } from 'react-native';
import PrayersMain from './tabNavigation';

export enum DeskScreens {
  DeskScreen = 'Desk',
  PrayersMainScreen = 'PrayersMain',
}

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
          title: 'My desk',
        }}
      />
      <Stack.Screen
        name="PrayersMain"
        component={PrayersMain}
        options={{ title: 'To do', headerLeft: () => <Text /> }}
      />
    </Stack.Navigator>
  );
}
