import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CreateColumnModal } from '../../../components/createColumnModal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAllPrayers, getAllComments, fetchColumns } from '../../../store';
import { Color } from '../../../utils';
import { Loading } from '../../../components/loading';
import { DeskStackParams } from '../deskNavigator';

export default function DeskScreen() {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.columns.columns);
  const navigation =
    useNavigation<NativeStackNavigationProp<DeskStackParams>>();

  const [modalIsShow, setModalIsShow] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalIsShow(true)}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(fetchColumns());
    dispatch(getAllPrayers());
    dispatch(getAllComments());
  }, [dispatch]);

  return (
    <>
      <SafeAreaView>
        <FlatList
          style={styles.list}
          data={columns}
          renderItem={item => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PrayersMain', {
                  id: item.item.id,
                  title: item.item.title,
                })
              }
              style={styles.column}>
              <Text style={styles.title}>{item.item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <CreateColumnModal
          modalIsShow={modalIsShow}
          setModalIsShow={setModalIsShow}
        />
      </SafeAreaView>
      <Loading />
    </>
  );
}

const styles = StyleSheet.create({
  column: {
    height: 60,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingLeft: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 15,
  },
  list: {
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: `${Color.DARK_LIVER}`,
  },

  plus: {
    color: `${Color.MOONSTONE_BLUE}`,
    fontSize: 36,
    lineHeight: 34,
  },
});
