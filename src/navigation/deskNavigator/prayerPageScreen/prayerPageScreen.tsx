import React, { useLayoutEffect } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Message } from '../../../shared/assets/svgs';
import { createComment, selectCommentsOfPrayer } from '../../../store';
import { useHeaderHeight } from '@react-navigation/elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../../../utils';
import {
  PrayerHeader,
  PrayerCounter,
  Comment,
  Loading,
} from '../../../components';
import { OnePrayerProps } from '../deskNavigator';
import People from '../../../shared/assets/pngs/people1.png';
import People2 from '../../../shared/assets/pngs/people2.png';

interface CommentFieldValue {
  body: string;
}

export default function PrayerPageScreen({
  route,
  navigation,
}: OnePrayerProps) {
  const dispatch = useAppDispatch();
  let comments = useAppSelector(selectCommentsOfPrayer);

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

  const headerHeight = useHeaderHeight();

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
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({
          ios: headerHeight,
          android: 0,
        })}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <PrayerCounter />
        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>MEMBERS</Text>
          <View style={styles.images}>
            <Image style={styles.avatar} source={People} />
            <Image style={styles.avatar} source={People2} />
            <View style={styles.plusContainer}>
              <Text style={styles.plus}>+</Text>
            </View>
          </View>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>COMMENTS</Text>
          {comments.map(element => (
            <Comment item={element} key={element.id} />
          ))}
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
                  placeholderTextColor={`${Color.SPANISH_GRAY}`}
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
        <Loading />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  membersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  membersTitle: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '600',
    color: `${Color.MOONSTONE_BLUE}`,
    marginBottom: 15,
  },
  commentsTitle: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '600',
    color: `${Color.MOONSTONE_BLUE}`,
    marginBottom: 15,
    paddingLeft: 20,
  },
  plusContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Color.KHAKI}`,
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
    backgroundColor: `${Color.KHAKI}`,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    marginLeft: 'auto',
    marginRight: '5%',
    height: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});
