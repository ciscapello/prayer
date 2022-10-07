import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../hooks';
import { IComment } from '../../types';

interface CommentProps {
  item: IComment;
}

export default function Comment({ item }: CommentProps) {
  // const username = useAppSelector(state => state.user.username);
  const username = useAppSelector(state => state.user.username);
  console.log(username ? username : '3424243');
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require('../../shared/assets/pngs/people1.png')}
      />
      <View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>ALALLA</Text>
          <Text style={styles.date}>{item.created}</Text>
        </View>
        <View>
          <Text style={styles.commentBody}>{item.body}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E5E5E5',
    padding: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 10,
    color: '#9C9C9C',
    fontSize: 13,
    lineHeight: 16,
  },
  username: {
    fontSize: 17,
    lineHeight: 20,
  },
  commentBody: {
    marginTop: 5,
  },
});
