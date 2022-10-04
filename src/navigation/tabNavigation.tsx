import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { Prayers, Subscribed } from '../components';
import { PrayersMainProps } from './deskNavigation';

const Tab = createMaterialTopTabNavigator();

export type TabNavigationParams = {
  Prayers: undefined;
  Subscribed: undefined;
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
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
        tabBarPressOpacity: 0.5,
        tabBarActiveTintColor: '#72A8BC',
      }}>
      <Tab.Screen
        options={{ title: 'MY PRAYERS' }}
        name="Prayers"
        children={() => <Prayers id={route.params.id} />}
      />
      <Tab.Screen
        options={{ title: 'SUBSCRIBED' }}
        name="Subscribed"
        children={() => <Subscribed id={route.params.id} />}
      />
    </Tab.Navigator>
  );
}
