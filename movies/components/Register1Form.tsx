import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { Link, useNavigation } from '@react-navigation/native';

interface FormValues {
  email: string;
  password: string;
}

const Register1Form: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigation = useNavigation();

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
        setSubmitting(false);
        // Navigate to register2 and pass all values
        navigation.navigate('Register2Form', values);
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
          <Text style={styles.title}>Register</Text>
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
            {isSubmitting ? 'Registering...' : 'Next'}
          </Button>
          <Text>Already have an Account? <Link style={styles.link} to={{screen: 'LoginForm'}}>Login here</Link></Text>
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

export default Register1Form;
