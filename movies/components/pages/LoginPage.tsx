import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { LoginAPIRequest } from '../../service/Auth';
import { Link, useNavigation } from '@react-navigation/native';
import { UserAPI } from '../../service/User';

interface FormValues {
  email: string;
  password: string;
}

/**
 * LoginPage component handles user login using Formik for form management.
 * Upon successful login, it navigates the user to the main app screen.
 */
const LoginPage: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Checks if the user is already logged in.
     * If logged in, navigates to the main app screen.
     * If not logged in and an error occurs, logs the error.
     */
    const checkLoggedIn = async () => {
      try {
        await UserAPI().isLoggedIn();
        navigation.navigate('TabNavigation');
      } catch (error: any) {
      }
    };

    checkLoggedIn();
  }, [navigation]);

  /**
   * Validation function for the login form.
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
   * Styles for components in the LoginPage.
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
        setLoginError(null);
        LoginAPIRequest()
          .getAuthToken(values.email, values.password)
          .then(() => {
            navigation.navigate('TabNavigation');
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setLoginError('Wrong email and/or password.');
            } else {
              setLoginError('An unexpected error occurred. Please try again.');
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
          <Text style={styles.normalText}>
            Don't have an account yet? <Link style={styles.link} to={{ screen: 'Register1' }}>Register here</Link>
          </Text>
        </View>
      )}
    </Formik>
  );
};

export default LoginPage;
