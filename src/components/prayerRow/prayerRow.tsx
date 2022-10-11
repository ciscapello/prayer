import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Prayer } from '../../types';
import CheckBox from '@react-native-community/checkbox';
import { User, Prayer as PrayerIcon } from '../../shared/assets/svgs';
import { useAppDispatch } from '../../hooks';
import {
  deletePrayer,
  setActivePrayerId,
  toggleCheckedPrayer,
} from '../../store/prayers/prayersSlice';
import { useNavigation } from '@react-navigation/native';
import { PrayersScreenNavigationProps } from '../../navigation';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Color } from '../../utils';

interface PrayerRowProps {
  prayer: Prayer;
}

type ContextType = {
  translateX: number;
};

function PrayerRow({ prayer }: PrayerRowProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<PrayersScreenNavigationProps>();

  let viewedTitle = prayer.title;

  if (prayer.title.length > 15) {
    viewedTitle = viewedTitle.slice(0, 15).concat('...');
  }

  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
    },
    onActive: (event, context) => {
      if (translateX.value > -150 && translateX.value <= 0) {
        translateX.value = event.translationX + context.translateX;
      }
    },
    onEnd: event => {
      if (translateX.value < -70) {
        translateX.value = withTiming(-60);
      } else {
        translateX.value = withSpring(0);
        console.log(event.translationX);
      }
    },
    onFinish: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const rDeleteButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, -60],
      [0, 1],
      Extrapolate.EXTEND,
    );

    return { opacity };
  });

  const onPress = () => {
    dispatch(setActivePrayerId(prayer.id));
    navigation.navigate('OnePrayer', { prayer: prayer });
  };

  const onChange = () => {
    dispatch(toggleCheckedPrayer(prayer));
  };

  const onDelete = () => {
    dispatch(deletePrayer(prayer.id));
  };

  return (
    <PanGestureHandler
      activeOffsetX={[-10, 10]}
      onGestureEvent={panGestureEvent}>
      <Animated.View style={[rStyle]}>
        <View style={styles.container}>
          <View>
            <View style={styles.wrapper}>
              <View style={styles.checkboxContainer}>
                <View style={styles.statusBar} />
                <CheckBox
                  style={styles.checkbox}
                  value={prayer.checked}
                  boxType="square"
                  onAnimationType="fade"
                  offAnimationType="fade"
                  animationDuration={0.1}
                  tintColors={{ true: 'black', false: 'black' }}
                  onCheckColor={'black'}
                  onChange={onChange}
                />
              </View>
              <TouchableOpacity style={styles.touchable} onPress={onPress}>
                <Text
                  style={
                    (styles.title,
                    {
                      textDecorationLine: prayer.checked
                        ? 'line-through'
                        : 'none',
                    })
                  }>
                  {viewedTitle}
                </Text>
              </TouchableOpacity>
              <View style={styles.iconBox}>
                <User height={24} width={24} />
                <PrayerIcon width={40} height={40} fill={'#72A8BC'} />
              </View>
            </View>
          </View>
          <Animated.View style={[styles.deleteButton, rDeleteButtonStyle]}>
            <TouchableOpacity onPress={onDelete}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default gestureHandlerRootHOC(PrayerRow);

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 4,
    marginLeft: 15,
  },
  container: {
    height: 68,
    width: '100%',
    borderBottomColor: `${Color.PLATINUM}`,
    borderBottomWidth: 1,
    borderLeftStyle: 'solid',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    borderLeftColor: 'red',
    borderLeftColorWidth: 3,
    borderLeftStyle: 'solid',
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
  },
  statusBar: {
    borderLeftWidth: 3,
    borderLeftColor: 'red',
    borderLeftStyle: 'solid',
    height: 24,
  },
  iconBox: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: '#AC5253',
    justifyContent: 'center',
    alignItems: 'center',
    height: 68,
    width: 70,
  },
  deleteText: {
    color: 'white',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
