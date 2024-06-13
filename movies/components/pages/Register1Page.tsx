import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { Link, useNavigation } from '@react-navigation/native';

/**
 * Interface representing form values for registration.
 */
interface FormValues {
  email: string;
  password: string;
}

/**
 * Register1Page component handles user registration step 1 using Formik for form management.
 */
const Register1Page: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigation = useNavigation();
  const theme = useTheme();

  /**
   * Validation function for the registration form.
   * Ensures email and password fields are filled correctly.
   * @param values - Form values containing email and password.
   * @returns Errors object indicating validation issues.
   */
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

  /**
   * Styles for components in the Register1Page.
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 32,
      fontFamily: 'Roboto',
      margin: 20,
      color: 'white',
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
    },
    normalText: {
      color: 'white',
    }
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        navigation.navigate('Register2', values);
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
          <Text style={styles.normalText}>Already have an Account? <Link style={styles.link} to={{ screen: 'Login' }}>Login here</Link></Text>
        </View>
      )}
    </Formik>
  );
};

export default Register1Page;
