import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { OnePrayerProps } from '../../navigation/deskNavigation';
import { Message } from '../../shared/assets/svgs';
import { Comment } from '../comment';
import { PrayerCounter } from '../prayerCounter';
import { PrayerHeader } from '../prayerHeader';

export default function PrayerPage({ route, navigation }: OnePrayerProps) {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <PrayerHeader title={route.params.prayer.title} />,
    });
  }, [navigation, route.params.prayer.title]);
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
        <Comment />
        <Comment />
        <View style={styles.inputContainer}>
          <Message style={styles.image} width={24} height={24} />
          <TextInput style={styles.input} placeholder="Add a comment..." />
        </View>
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
    // paddingLeft: 50,
  },
});
