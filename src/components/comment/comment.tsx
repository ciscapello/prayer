import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Comment() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require('../../shared/assets/pngs/people1.png')}
      />
      <View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>Anna Barber</Text>
          <Text style={styles.date}>2 days ago</Text>
        </View>
        <View>
          <Text style={styles.commentBody}>Hey hey!</Text>
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
