import React, { useLayoutEffect } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { OnePrayerProps } from '../../navigation/deskNavigation';
import { Message } from '../../shared/assets/svgs';
import { createComment } from '../../store';
import { Comment } from '../comment';
import { PrayerCounter } from '../prayerCounter';
import { PrayerHeader } from '../prayerHeader';

interface CommentFieldValue {
  body: string;
}

export default function PrayerPage({ route, navigation }: OnePrayerProps) {
  const dispatch = useAppDispatch();
  // let comments = useAppSelector(selectCommentsOfPrayer);
  let comments = useAppSelector(state => state.comments.comments);
  comments = comments.filter(
    comment => comment.prayerId === route.params.prayer.id,
  );
  console.log(comments);
  const { title, id } = route.params.prayer;
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <PrayerHeader title={title} />,
    });
  }, [navigation, title, id, dispatch]);
  const { control, handleSubmit, reset } = useForm<CommentFieldValue>({
    mode: 'onChange',
    defaultValues: {
      body: '',
    },
  });

  const comment = useWatch({
    control,
    name: 'body',
  });

  const onSubmit: SubmitHandler<CommentFieldValue> = data => {
    const { body } = data;
    dispatch(createComment({ id, body }));
    reset();
  };

  return (
    <View>
      <PrayerCounter />
      <View style={styles.membersContainer}>
        <Text style={styles.membersTitle}>MEMBERS</Text>
        <View style={styles.images}>
          <Image
            style={styles.avatar}
            source={require('../../shared/assets/pngs/people1.png')}
          />
          <Image
            style={styles.avatar}
            source={require('../../shared/assets/pngs/people2.png')}
          />
          <View style={styles.plusContainer}>
            <Text style={styles.plus}>+</Text>
          </View>
        </View>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>COMMENTS</Text>
        <FlatList data={comments} renderItem={Comment} />
        <View style={styles.inputContainer}>
          <Message style={styles.image} width={24} height={24} />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                onChangeText={val => onChange(val)}
                value={value}
                placeholderTextColor={'#9C9C9C'}
              />
            )}
            name="body"
          />
        </View>
        {comment && (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.sendButton}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  membersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  membersTitle: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '600',
    color: '#72A8BC',
    marginBottom: 15,
  },
  commentsTitle: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '600',
    color: '#72A8BC',
    marginBottom: 15,
    paddingLeft: 20,
  },
  plusContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#BFB393',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 20,
    color: 'white',
    lineHeight: 21,
  },
  images: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  commentsContainer: {
    marginTop: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
  },
  input: {
    fontSize: 17,
  },
  sendButton: {
    backgroundColor: '#BFB393',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    marginLeft: 'auto',
    marginRight: '5%',
    height: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});
