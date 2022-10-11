import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import React from 'react';
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
import { LoginStackParams } from '../../navigation/loginNavigation';
import { useAppDispatch } from '../../hooks';
import { signInFetch } from '../../store';
import { Loading } from '../loading';
import { Color } from '../../utils';

export interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParams>>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormValues> = data => {
    dispatch(signInFetch(data));
    reset();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Sign in</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                textContentType="emailAddress"
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
                onChangeText={val => onChange(val)}
                value={value}
                textContentType="password"
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
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signIn}>
          <Text style={styles.signInText}>Have no account?</Text>
          {Platform.OS === 'ios' ? (
            <Button onPress={() => navigation.goBack()} title="Sign up" />
          ) : (
            <Pressable
              style={styles.androidButton}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.androidButtonText}>Sign up</Text>
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
    backgroundColor: `${Color.KHAKI}`,
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
