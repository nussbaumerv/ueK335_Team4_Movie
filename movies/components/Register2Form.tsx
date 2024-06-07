import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { RegisterAPIRequest } from '../service/Auth';
import { useNavigation, useRoute, Link } from '@react-navigation/native';

interface FormValues {
  surname: string;
  lastname: string;
  age: number;
}

const Register2Form: React.FC = () => {
  const route = useRoute();
  console.log(route.params);
  const { email, password } = route.params as { email: string; password: string };
  const navigation = useNavigation();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const validate = (values: FormValues) => {
    const errors: { surname?: string; lastname?: string; age?: string } = {};

    if (!values.surname) {
      errors.surname = 'Surname is required';
    }

    if (!values.lastname) {
      errors.lastname = 'Lastname is required';
    }

    if (!values.age) {
      errors.age = 'Age is required';
    } else if (!/^\d+$/.test(values.age)) {
      errors.age = 'Age must be a number';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ surname: '', lastname: '', age: 0 }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setRegisterError(null);
        RegisterAPIRequest()
          .getAuthToken(email, password, values.surname, values.lastname, values.age)
          .then(() => {
            console.log('Successful');
            navigation.navigate('TabNavigation');
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setRegisterError('Email is already used.');
            } else {
              setRegisterError('An unexpected error occurred. Please try again.');
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
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            label="Age"
            mode="outlined"
            onChangeText={handleChange('age')}
            onBlur={handleBlur('age')}
            value={values.age}
            keyboardType="numeric"
            error={touched.age && !!errors.age}
          />
          {touched.age && errors.age && (
            <Text style={styles.errorText}>{errors.age}</Text>
          )}
          
          <TextInput
            style={styles.input}
            label="Surname"
            mode="outlined"
            onChangeText={handleChange('surname')}
            onBlur={handleBlur('surname')}
            value={values.surname}
            error={touched.surname && !!errors.surname}
          />
          {touched.surname && errors.surname && (
            <Text style={styles.errorText}>{errors.surname}</Text>
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

export default Register2Form;
