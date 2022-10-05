import React, { useState } from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { Prayers, Subscribed, UpdateColumnModal } from '../components';
import { PrayersMainProps } from './deskNavigation';
import { TouchableOpacity } from 'react-native';
import { Settings } from '../shared/assets/svgs';

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
  const [modalIsShow, setModalIsShow] = useState(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalIsShow(!modalIsShow)}>
          <Settings width={24} height={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route.params.title, modalIsShow]);

  return (
    <>
      <UpdateColumnModal
        modalIsShow={modalIsShow}
        setModalIsShow={setModalIsShow}
      />
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
    </>
  );
}
