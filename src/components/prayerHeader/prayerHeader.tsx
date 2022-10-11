import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Prayer } from '../../shared/assets/svgs';
import { Back } from '../../shared/assets/svgs';

interface PrayerHeaderProps {
  title: string;
}

export default function PrayerHeader({ title }: PrayerHeaderProps) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.icons}>
          <Back width={30} height={30} fill={'#fff'} />
          <Prayer width={30} height={30} fill={'#fff'} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.status} />
        <Text style={styles.footerText}>Last prayed 8 min ago</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BFB393',
    width: '100%',
    height: 170,
    paddingTop: 40,
  },
  title: {
    color: 'white',
    fontSize: 17,
    lineHeight: 27,
    paddingHorizontal: 15,
    paddingVertical: 23,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 40,
    flexDirection: 'row',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 17,
    lineHeight: 20,
    color: '#514D47',
    paddingLeft: 10,
  },
  status: {
    borderLeftWidth: 3,
    borderLeftColor: 'red',
    borderLeftStyle: 'solid',
    height: 24,
  },
});
