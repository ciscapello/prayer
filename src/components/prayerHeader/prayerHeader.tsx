import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Back, Prayer } from '../../shared/assets/svgs';
import { Color } from '../../utils';

interface PrayerHeaderProps {
  title: string;
}

export default function PrayerHeader({ title }: PrayerHeaderProps) {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.icons}>
          <Back width={40} height={40} fill={'#fff'} onPress={onPress} />
          <Prayer width={40} height={40} fill={'#fff'} />
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
    backgroundColor: `${Color.KHAKI}`,
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
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 40,
    flexDirection: 'row',
    borderBottomColor: `${Color.PLATINUM}`,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 17,
    lineHeight: 20,
    color: `${Color.DARK_LIVER}`,
    paddingLeft: 10,
  },
  status: {
    borderLeftWidth: 3,
    borderLeftColor: 'red',
    borderLeftStyle: 'solid',
    height: 24,
  },
});
