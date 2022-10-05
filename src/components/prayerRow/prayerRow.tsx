import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Prayer } from '../../types';
import CheckBox from '@react-native-community/checkbox';
import { User, Prayer as PrayerIcon } from '../../shared/assets/svgs';
import { useAppDispatch } from '../../hooks';
import { toggleCheckedPrayer } from '../../store/prayers/prayersSlice';

interface PrayerRowProps {
  prayer: Prayer;
}

export default function PrayerRow({ prayer }: PrayerRowProps) {
  const dispatch = useAppDispatch();
  const onChange = () => {
    dispatch(toggleCheckedPrayer(prayer));
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.checkboxContainer}>
          <View style={styles.statusBar} />
          <CheckBox
            style={styles.checkbox}
            value={prayer.checked}
            boxType="square"
            onAnimationType="fade"
            offAnimationType="fade"
            animationDuration={0.1}
            tintColors={{ true: '#000', false: '#000' }}
            onCheckColor={'#000'}
            onChange={onChange}
          />
        </View>
        <Text
          style={
            (styles.title,
            { textDecorationLine: prayer.checked ? 'line-through' : 'none' })
          }>
          {prayer.title}
        </Text>
      </View>
      <View style={styles.iconBox}>
        <User width={40} height={40} />
        <PrayerIcon width={40} height={40} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 4,
    marginLeft: 15,
  },
  container: {
    height: 68,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    borderLeftStyle: 'solid',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    borderLeftColor: 'red',
    borderLeftColorWidth: 3,
    borderLeftStyle: 'solid',
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
  },
  statusBar: {
    borderLeftWidth: 3,
    borderLeftColor: 'red',
    borderLeftStyle: 'solid',
    height: 24,
  },
  iconBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  wrapper: {
    flexDirection: 'row',
  },
});
