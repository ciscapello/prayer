import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from '../../hooks';
import { createColumn } from '../../store/columns';
import { Color } from '../../utils';

interface CreateColumnModalProps {
  modalIsShow: boolean;
  setModalIsShow: (arg: boolean) => void;
}

export interface CreateColumnModalFormValues {
  title: string;
}

export default function CreateColumnModal({
  modalIsShow,
  setModalIsShow,
}: CreateColumnModalProps) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<CreateColumnModalFormValues>(
    {
      defaultValues: {
        title: '',
      },
    },
  );

  const onSubmit: SubmitHandler<CreateColumnModalFormValues> = data => {
    if (data.title.trim()) {
      console.log(data);
      reset();
      dispatch(createColumn(data));
      setModalIsShow(false);
    }
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
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={val => onChange(val)}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="title"
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalIsShow(!modalIsShow)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.textStyle}>Send</Text>
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
    alignItems: 'center',
    shadowColor: '',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    margin: 15,
    backgroundColor: `${Color.KHAKI}`,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 40,
  },
  buttonOpen: {
    backgroundColor: `${Color.RICH_BRILLIANT_LAVENDER}`,
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
});
