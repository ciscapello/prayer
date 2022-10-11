import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from '../../hooks';
import { selectNotAnsweredPrayersByColumnId } from '../../store';

import { PrayerRow } from '../prayerRow';
interface SubscribedProps {
  id: number;
}

export default function Subscribed({ id }: SubscribedProps) {
  const prayers = useAppSelector(selectNotAnsweredPrayersByColumnId);
  console.log(prayers);
  console.log(id);
  return (
    <ScrollView style={styles.prayersContainer}>
      <>
        {prayers.map(item => (
          <PrayerRow prayer={item} />
        ))}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  prayersContainer: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
