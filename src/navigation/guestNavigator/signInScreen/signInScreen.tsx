import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoginStackParams } from '../guestNavigator';
import { useAppDispatch } from '../../../hooks';
import { signInFetch } from '../../../store';
import { Loading } from '../../../components';
import { Color, emailValidation } from '../../../utils';

export interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInScreen() {
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
        <KeyboardAvoidingView behavior="padding">
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
                pattern: emailValidation,
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
              <Text style={styles.error}>
                Password must be minimum 6 symbols
              </Text>
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
        </KeyboardAvoidingView>
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
    flex: 1,
  },
  wrapper: {
    width: 300,
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
    alignItems: 'center',
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
