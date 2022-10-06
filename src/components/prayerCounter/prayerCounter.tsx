import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PrayerCounter() {
  return (
    <View style={styles.container}>
      <View style={styles.flexItem}>
        <Text style={styles.dateTitle}>July 25 2017</Text>
        <Text style={styles.subTitle}>Date Added</Text>
        <Text style={styles.small}>Opened for 4 days</Text>
      </View>
      <View style={styles.flexItem}>
        <Text style={styles.title}>123</Text>
        <Text style={styles.subTitle}>Times Prayed Total</Text>
      </View>
      <View style={styles.flexItem}>
        <Text style={styles.title}>63</Text>
        <Text style={styles.subTitle}>Times Prayed For Me</Text>
      </View>
      <View style={styles.flexItem}>
        <Text style={styles.title}>60</Text>
        <Text style={styles.subTitle}>Times Prayed For Others</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexItem: {
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#E5E5E5',
    borderWidth: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 26,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    color: '#BFB393',
  },
  subTitle: {
    fontSize: 13,
    lineHeight: 15,
    paddingLeft: 3,
  },
  dateTitle: {
    color: '#BFB393',
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 6,
  },
  small: {
    fontSize: 13,
    lineHeight: 15,
    color: '#72A8BC',
  },
});
