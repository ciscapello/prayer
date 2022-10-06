import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Desk, PrayerPage } from '../components';
import { Text } from 'react-native';
import PrayersMain from './tabNavigation';
import { Prayer } from '../types';

export type DeskStackParams = {
  Desk: undefined;
  PrayersMain: { id: number; title: string };
  OnePrayer: { prayer: Prayer };
};

export type PrayersMainProps = NativeStackScreenProps<
  DeskStackParams,
  'PrayersMain'
>;

export type OnePrayerProps = NativeStackScreenProps<
  DeskStackParams,
  'OnePrayer'
>;

export type PrayersScreenNavigationProps = NativeStackNavigationProp<
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
      <Stack.Screen
        name="OnePrayer"
        component={PrayerPage}
        options={{
          headerLeft: () => <Text>adsas</Text>,
        }}
      />
    </Stack.Navigator>
  );
}
