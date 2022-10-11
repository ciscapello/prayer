import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from '../../hooks';
import { LoginStackParams } from '../../navigation/loginNavigation';
import { signUpFetch } from '../../store';
import { Loading } from '../loading';

export interface SignUpFieldValues {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParams>>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onPress: SubmitHandler<SignUpFieldValues> = data => {
    console.log(data);
    dispatch(signUpFetch(data));
    reset();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Sign up</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={val => onChange(val)}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="name"
            rules={{ required: true }}
          />
          {errors.name && <Text style={styles.error}>Name is required</Text>}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={val => onChange(val)}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="email"
            rules={{
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            }}
          />
          {errors.email && (
            <Text style={styles.error}>Enter existing email</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChange={onChange}
                onChangeText={val => onChange(val)}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="password"
            rules={{ minLength: 6 }}
          />
          {errors.password && (
            <Text style={styles.error}>Password must be minimum 6 symbols</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onPress)}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signIn}>
          <Text style={styles.signInText}>If you already have an account</Text>
          {Platform.OS === 'ios' ? (
            <Button
              onPress={() => navigation.navigate('SignIn')}
              title="Sign in"
            />
          ) : (
            <Pressable
              style={styles.androidButton}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.androidButtonText}>Sign in</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
      <Loading />
    </>
  );
}

const styles = StyleSheet.create({
  androidButtonText: {
    color: '#007AFF',
  },
  androidButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: 300,
    marginTop: 200,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    paddingLeft: 20,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginTop: 15,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#BFB393',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  signIn: {
    marginTop: 30,
  },
  signInText: {
    color: 'gray',
    fontWeight: '700',
  },
  error: {
    color: 'red',
    fontSize: 10,
  },
});
