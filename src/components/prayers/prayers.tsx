import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveColumnId } from '../../store/columns';
import {
  selectAnsweredPrayersByColumnId,
  selectNotAnsweredPrayersByColumnId,
  // selectPrayersByColumnId,
} from '../../store/prayers/selectors';
import { PrayerRow } from '../prayerRow';

interface PrayersProps {
  id: number;
}

export default function Prayers({ id }: PrayersProps) {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(setActiveColumnId(id));
  }, [dispatch, id]);
  // const prayers = useAppSelector(selectPrayersByColumnId);
  const notAnsweredPrayers = useAppSelector(selectNotAnsweredPrayersByColumnId);
  const answeredPrayers = useAppSelector(selectAnsweredPrayersByColumnId);
  const [answeredPrayersIsShow, setAnsweredPrayersIsShow] = useState(false);

  return (
    <>
      <View style={styles.addView}>
        <Text style={styles.plus}>+</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a prayer..."
          placeholderTextColor={'#9C9C9C'}
        />
      </View>
      <View style={styles.prayersContainer}>
        <FlatList
          data={notAnsweredPrayers}
          renderItem={item => <PrayerRow prayer={item.item} />}
        />
      </View>
      <TouchableOpacity
        style={styles.showButton}
        onPress={() => setAnsweredPrayersIsShow(!answeredPrayersIsShow)}>
        <Text style={styles.buttonText}>
          {answeredPrayersIsShow ? 'HIDE' : 'SHOW'} ANSWERED PRAYERS
        </Text>
      </TouchableOpacity>
      {answeredPrayersIsShow ? (
        <View style={styles.prayersContainer}>
          <FlatList
            data={answeredPrayers}
            renderItem={item => <PrayerRow prayer={item.item} />}
          />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 10,
    borderColor: '#c8c8c8',
    borderWidth: 1,
    borderStyle: 'solid',
    alignSelf: 'center',
    paddingLeft: 50,
    flex: 1,
  },
  plus: {
    color: '#72A8BC',
    fontSize: 44,
    position: 'absolute',
    left: 10,
    fontWeight: '200',
  },
  addView: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  prayersContainer: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  showButton: {
    marginTop: 15,
    backgroundColor: '#BFB393',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});
