import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import { useAppSelector } from '../../hooks';

export default function Loading() {
  const prayersIsLoading = useAppSelector(state => state.prayers.isLoading);
  const columnsIsLoading = useAppSelector(state => state.columns.isLoading);
  const userIsLoading = useAppSelector(state => state.user.isLoading);
  const commentsIsLoading = useAppSelector(state => state.comments.isLoading);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
    };
  }, []);

  useEffect(() => {
    rotate.value = withRepeat(withSpring(360), 10);
    scale.value = withRepeat(withSpring(1.5), 10);
  }, [rotate, scale]);

  const isLoading =
    prayersIsLoading || columnsIsLoading || userIsLoading || commentsIsLoading;
  if (isLoading) {
    return <Animated.View style={[styles.container, rStyle]} />;
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: '10%',
    top: '10%',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 25,
  },
});
