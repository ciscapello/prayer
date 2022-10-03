import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DeskStackParams } from '../../navigation/deskNavigation';
import { fetchColumns } from '../../store/columns';
import { CreateColumnModal } from '../createColumnModal';

export default function Desk() {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.columns.columns);
  const navigation =
    useNavigation<NativeStackNavigationProp<DeskStackParams>>();

  const [modalIsShow, setModalIsShow] = React.useState(true);

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
  }, [dispatch]);

  return (
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
    color: '#514D47',
  },

  plus: {
    color: '#72A8BC',
    fontSize: 36,
    lineHeight: 34,
  },
});
