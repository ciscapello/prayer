import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Desk, Prayers} from '../components';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

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
          headerRight: () => (
            <TouchableOpacity>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          ),
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

const styles = StyleSheet.create({
  plus: {
    color: '#72A8BC',
    fontSize: 36,
    lineHeight: 34,
  },
});
