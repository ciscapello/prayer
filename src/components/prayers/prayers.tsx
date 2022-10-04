import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveColumnId } from '../../store/columns';
import { selectPrayersByColumnId } from '../../store/prayers/selectors';

interface PrayersProps {
  id: number;
}

export default function Prayers({ id }: PrayersProps) {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(setActiveColumnId(id));
  }, [dispatch, id]);
  const prayers = useAppSelector(selectPrayersByColumnId);

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Add a prayer..."
        placeholderTextColor={'#9C9C9C'}
      />
      <FlatList
        data={prayers}
        renderItem={item => <Text>{item.item.title}</Text>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 50,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderStyle: 'solid',
    alignSelf: 'center',
    paddingLeft: 40,
  },
});
