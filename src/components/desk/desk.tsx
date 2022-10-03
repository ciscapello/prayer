import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchColumns} from '../../store/columns';

export default function Desk() {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.columns.columns);

  useEffect(() => {
    dispatch(fetchColumns());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <FlatList
        style={styles.list}
        data={columns}
        renderItem={item => (
          <TouchableOpacity style={styles.column}>
            <Text style={styles.title}>{item.item.title}</Text>
          </TouchableOpacity>
        )}
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
});
