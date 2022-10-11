import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { deleteColumn } from '../../store/columns';

interface CreateColumnModalProps {
  modalIsShow: boolean;
  setModalIsShow: (arg: boolean) => void;
}

export default function CreateColumnModal({
  modalIsShow,
  setModalIsShow,
}: CreateColumnModalProps) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(deleteColumn());
    navigation.goBack();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalIsShow}
      onRequestClose={() => {
        setModalIsShow(!modalIsShow);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.textStyle}>Delete column</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalIsShow(!modalIsShow)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#BFB393',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 30,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 40,
    paddingLeft: 20,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginTop: 15,
  },
  error: {
    color: 'red',
    fontSize: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    margin: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 30,
  },
});
