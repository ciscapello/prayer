import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppSelector } from '../../../hooks';
import { selectNotAnsweredPrayersByColumnId } from '../../../store';
import { PrayerRow } from '../../../components';

export default function SubscribedScreen() {
  const prayers = useAppSelector(selectNotAnsweredPrayersByColumnId);
  return (
    <ScrollView style={styles.prayersContainer}>
      <>
        {prayers.map(item => (
          <PrayerRow prayer={item} key={item.id} />
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
