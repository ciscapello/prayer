import React, { useState } from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { UpdateColumnModal } from '../../components';
import { PrayersMainProps } from '../deskNavigator/deskNavigator';
import { TouchableOpacity } from 'react-native';
import { Settings } from '../../shared/assets/svgs';
import { Color } from '../../utils';
import PrayersScreen from './prayersScreen/prayers';
import { SubscribedScreen } from './subscribedScreen';

export type TabNavigationParams = {
  Prayers: undefined;
  Subscribed: undefined;
};

const Tab = createMaterialTopTabNavigator<TabNavigationParams>();

export type PrayerTabScreenProps = MaterialTopTabScreenProps<
  TabNavigationParams,
  'Prayers'
>;

export type SubscribedTabScreenProps = MaterialTopTabScreenProps<
  TabNavigationParams,
  'Subscribed'
>;

export default function PrayersMainTabNavigator({
  route,
  navigation,
}: PrayersMainProps) {
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
          tabBarActiveTintColor: `${Color.MOONSTONE_BLUE}`,
          tabBarIndicatorStyle: { backgroundColor: `${Color.MOONSTONE_BLUE}` },
        }}>
        <Tab.Screen
          options={{ title: 'MY PRAYERS' }}
          name="Prayers"
          children={() => <PrayersScreen id={route.params.id} />}
        />
        <Tab.Screen
          options={{ title: 'SUBSCRIBED' }}
          name="Subscribed"
          children={() => <SubscribedScreen id={route.params.id} />}
        />
      </Tab.Navigator>
    </>
  );
}
