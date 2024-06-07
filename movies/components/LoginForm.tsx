import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { LoginAPIRequest } from '../service/Auth';
import { Link, useNavigation } from '@react-navigation/native';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigation = useNavigation();
  const [loginError, setLoginError] = useState<string | null>(null);

  const validate = (values: FormValues) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setLoginError(null);
        LoginAPIRequest()
          .getAuthToken(values.email, values.password)
          .then(() => {
            console.log('Successful');
            navigation.navigate('TabNavigation');
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setLoginError('Wrong email and or password.');
            } else {
              setLoginError('An unexpected error occurred. Please try again.');
              console.error('An error occurred:', error);
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }: FormikProps<FormValues>) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            label="Email"
            mode="outlined"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
            error={touched.email && !!errors.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            label="Password"
            mode="outlined"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            error={touched.password && !!errors.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {loginError && <Text style={styles.errorText}>{loginError}</Text>}

          <Button
            style={styles.button}
            mode="contained"
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
          <Text>Don't have an account yet? <Link style={styles.link} to={{screen: 'Register1Form'}}>Register here</Link></Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto',
    margin: 20,
  },
  input: {
    width: 320,
    marginBottom: 12,
  },
  button: {
    width: 148,
    margin: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  link: {
    color: '#D0BCFF',
  }
});

export default LoginForm;
