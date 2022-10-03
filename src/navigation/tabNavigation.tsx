import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { Prayers, Subscribed } from '../components';
import { PrayersMainProps } from './deskNavigation';

const Tab = createMaterialTopTabNavigator();

export type TabNavigationParams = {
  Prayers: { title: string; id: string };
  Subscribed: { title: string; id: string };
};

export type PrayerTabScreenProps = MaterialTopTabScreenProps<
  TabNavigationParams,
  'Prayers'
>;

export type SubscribedTabScreenProps = MaterialTopTabScreenProps<
  TabNavigationParams,
  'Subscribed'
>;

export default function PrayersMain({ route, navigation }: PrayersMainProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation, route.params.title]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ title: 'TO DO' }}
        name="Prayers"
        component={Prayers}
        initialParams={{ id: route.params.id }}
      />
      <Tab.Screen
        options={{ title: 'SUBSCRIBED' }}
        name="Subscribed"
        component={Subscribed}
        initialParams={{ id: route.params.id }}
      />
    </Tab.Navigator>
  );
}
