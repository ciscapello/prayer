import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PrayerRow, Loading } from '../../components';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import {
  createPrayer,
  setActiveColumnId,
  selectNotAnsweredPrayersByColumnId,
  selectAnsweredPrayersByColumnId,
} from '../../store';
import { Color } from '../../utils';

interface PrayersProps {
  id: number;
}

interface PrayerFieldValue {
  title: string;
}

export default function Prayers({ id }: PrayersProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveColumnId(id));
  }, [dispatch, id]);
  const notAnsweredPrayers = useAppSelector(selectNotAnsweredPrayersByColumnId);
  const answeredPrayers = useAppSelector(selectAnsweredPrayersByColumnId);
  const [answeredPrayersIsShow, setAnsweredPrayersIsShow] = useState(false);

  const { control, handleSubmit, reset } = useForm<PrayerFieldValue>({
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<PrayerFieldValue> = data => {
    console.log(data);
    const { title } = data;
    dispatch(createPrayer({ title, id }));
    reset();
  };

  const title = useWatch({
    control,
    name: 'title',
  });

  return (
    <>
      <ScrollView>
        <View style={styles.addView}>
          <Text style={styles.plus}>+</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Add a prayer..."
                onChangeText={val => onChange(val)}
                value={value}
                placeholderTextColor={`${Color.SPANISH_GRAY}`}
              />
            )}
            name="title"
          />
        </View>
        {title && (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableOpacity>
        )}

        <View style={styles.prayersContainer}>
          {notAnsweredPrayers.map(item => (
            <PrayerRow prayer={item} key={item.id} />
          ))}
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
            {answeredPrayers.map(item => (
              <PrayerRow prayer={item} key={item.id} />
            ))}
          </View>
        ) : null}
      </ScrollView>
      <Loading />
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
    borderColor: `${Color.PLATINUM}`,
    borderWidth: 1,
    borderStyle: 'solid',
    alignSelf: 'center',
    paddingLeft: 50,
    flex: 1,
  },
  plus: {
    color: `${Color.MOONSTONE_BLUE}`,
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
    backgroundColor: `${Color.KHAKI}`,
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
  sendButton: {
    marginTop: 5,
    backgroundColor: `${Color.KHAKI}`,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    marginLeft: 'auto',
    marginRight: '5%',
    height: 30,
  },
});
