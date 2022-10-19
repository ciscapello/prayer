import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { DeskScreen } from './deskScreen';
import { Prayer } from '../../types';
import { PrayerPageScreen } from './prayerPageScreen';
import PrayersMainTabNavigator from '../prayersMainTabNavigator/prayersMainTabNavigator';

export type DeskStackParams = {
  DeskScreen: undefined;
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

export default function DeskNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DeskScreen"
        component={DeskScreen}
        options={{
          title: 'My Desk',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PrayersMain"
        component={PrayersMainTabNavigator}
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="OnePrayer" component={PrayerPageScreen} />
    </Stack.Navigator>
  );
}
