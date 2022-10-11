import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteComment, setActiveMenuId } from '../../store';
import { IComment } from '../../types';
import { Color } from '../../utils';

interface CommentProps {
  item: IComment;
}

export default function Comment({ item }: CommentProps) {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.user.username);
  const activeCommentId = useAppSelector(
    state => state.comments.activeCommentId,
  );

  const dDate = Math.floor(
    (+new Date() - Date.parse(item.created)) / 1000 / 60 / 60 / 24,
  );

  const dateMessage = () => {
    switch (dDate) {
      case 0:
        return 'Today';
      case 1:
        return 'One day ago';
      default:
        return `${dDate} days ago`;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => dispatch(setActiveMenuId(null))}
      onLongPress={() => dispatch(setActiveMenuId(item.id))}
      style={styles.container}>
      <Image
        style={styles.avatar}
        source={require('../../shared/assets/pngs/people1.png')}
      />
      <View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.date}>{dateMessage()}</Text>
        </View>
        <View>
          <Text style={styles.commentBody}>{item.body}</Text>
        </View>
      </View>
      {activeCommentId === item.id && (
        <TouchableOpacity
          style={styles.commentMenu}
          onPress={() => dispatch(deleteComment(item.id))}>
          <Text>Delete</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: `${Color.PLATINUM}`,
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
    color: `${Color.SPANISH_GRAY}`,
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
  commentMenu: {
    width: 50,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    position: 'absolute',
    right: 20,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
