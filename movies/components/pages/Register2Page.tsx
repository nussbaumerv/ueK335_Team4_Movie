import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { RegisterAPIRequest } from '../../service/Auth';
import { useNavigation, useRoute, Link } from '@react-navigation/native';

/**
 * Interface representing form values for registration step 2.
 */
interface FormValues {
  firstname: string;
  lastname: string;
  age: number;
}

/**
 * Register2Page component handles user registration step 2 using Formik for form management.
 */
const Register2Page: React.FC = () => {
  const route = useRoute();
  const { email, password } = route.params as { email: string; password: string };
  const navigation = useNavigation();
  const theme = useTheme();
  const [registerError, setRegisterError] = useState<string | null>(null);

  /**
   * Validation function for the registration form step 2.
   * Ensures firstname, lastname, and age fields are filled correctly.
   * @param values - Form values containing firstname, lastname, and age.
   * @returns Errors object indicating validation issues.
   */
  const validate = (values: FormValues) => {
    const errors: { firstname?: string; lastname?: string; age?: string } = {};

    if (!values.firstname) {
      errors.firstname = 'Firstname is required';
    }

    if (!values.lastname) {
      errors.lastname = 'Lastname is required';
    }

    if (!values.age) {
      errors.age = 'Age is required';
    } else if (!/^\d+$/.test(values.age.toString())) {
      errors.age = 'Age must be a number';
    }

    return errors;
  };

  /**
   * Styles for components in the Register2Page.
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
      initialValues={{ firstname: '', lastname: '', age: 0 }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setRegisterError(null);
        RegisterAPIRequest()
          .getAuthToken(email, password, values.firstname, values.lastname, values.age)
          .then(() => {
            navigation.navigate('TabNavigation');
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setRegisterError('Email is already used.');
            } else {
              setRegisterError('An unexpected error occurred. Please try again.');
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
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            label="Age"
            mode="outlined"
            onChangeText={handleChange('age')}
            onBlur={handleBlur('age')}
            value={values.age.toString()}
            keyboardType="numeric"
            error={touched.age && !!errors.age}
          />
          {touched.age && errors.age && (
            <Text style={styles.errorText}>{errors.age}</Text>
          )}
          
          <TextInput
            style={styles.input}
            label="Firstname"
            mode="outlined"
            onChangeText={handleChange('firstname')}
            onBlur={handleBlur('firstname')}
            value={values.firstname}
            error={touched.firstname && !!errors.firstname}
          />
          {touched.firstname && errors.firstname && (
            <Text style={styles.errorText}>{errors.firstname}</Text>
          )}

          <TextInput
            style={styles.input}
            label="Lastname"
            mode="outlined"
            onChangeText={handleChange('lastname')}
            onBlur={handleBlur('lastname')}
            value={values.lastname}
            error={touched.lastname && !!errors.lastname}
          />
          {touched.lastname && errors.lastname && (
            <Text style={styles.errorText}>{errors.lastname}</Text>
          )}

          {registerError && <Text style={styles.errorText}>{registerError}</Text>}

          <Button
            style={styles.button}
            mode="contained"
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
          <Text style={styles.normalText}>Already have an Account? <Link style={styles.link} to={{screen: 'Login'}}>Login here</Link></Text>
        </View>
      )}
    </Formik>
  );
};

export default Register2Page;
