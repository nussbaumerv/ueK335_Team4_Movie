import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TextInput, Button, Chip } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { RegisterAPIRequest } from '../service/Auth';
import { useNavigation, useRoute, Link } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface FormValues {
  email: string;
  password: string;
  surname: string;
  lastname: string;
  age: string;
  address: string;
}

const Register2Form: React.FC = () => {
  const route = useRoute();
  const { email, password } = route.params as { email: string; password: string };
  const navigation = useNavigation();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const validate = (values: FormValues) => {
    const errors: { email?: string; password?: string; surname?: string; lastname?: string; age?: string; address?: string } = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

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

    if (!values.address) {
      errors.address = 'Address is required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', surname: '', lastname: '', age: '', address: '' }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setRegisterError(null);
        RegisterAPIRequest()
          .getAuthToken(email, password, values.surname, values.lastname, values.age, values.address)
          .then(() => {
            console.log('Successful');
            navigation.navigate('Navbar');
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Register</Text>
            <Chip style={styles.chip}>
              <Text style={styles.chipText}>2/2</Text>
            </Chip>
          </View>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              label="Surname"
              mode="outlined"
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
              error={touched.surname && !!errors.surname}
              textColor='white'
              theme={{
                colors: {
                  text: '#e6e0e9',
                  primary: '#e6e0e9',
                  background: '#1d1b20',
                  placeholder: '#e6e0e9',
                }
              }}
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
              textColor='white'
              theme={{
                colors: {
                  text: '#e6e0e9',
                  primary: '#e6e0e9',
                  background: '#1d1b20',
                  placeholder: '#e6e0e9',
                }
              }}
            />
            {touched.lastname && errors.lastname && (
              <Text style={styles.errorText}>{errors.lastname}</Text>
            )}

            <TextInput
              style={styles.input}
              label="Age"
              mode="outlined"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              keyboardType="numeric"
              error={touched.age && !!errors.age}
              textColor='white'
              theme={{
                colors: {
                  text: '#e6e0e9',
                  primary: '#e6e0e9',
                  background: '#1d1b20',
                  placeholder: '#e6e0e9',
                }
              }}
            />
            {touched.age && errors.age && (
              <Text style={styles.errorText}>{errors.age}</Text>
            )}

            <TextInput
              style={styles.input}
              label="Address"
              mode="outlined"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              error={touched.address && !!errors.address}
              textColor='white'
              theme={{
                colors: {
                  text: '#e6e0e9',
                  primary: '#e6e0e9',
                  background: '#1d1b20',
                  placeholder: '#e6e0e9',
                }
              }}
            />
            {touched.address && errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}

            {registerError && <Text style={styles.errorText}>{registerError}</Text>}

            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit}
              disabled={isSubmitting}
              contentStyle={styles.buttonContent}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>

            <Text style={styles.linkText}>
              Already have an Account?{' '}
              <Link style={styles.link} to={{ screen: 'LoginForm' }}>
                Login here
              </Link>
            </Text>
          </View>
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
    padding: width * 0.04,
    backgroundColor: '#1d1b20',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.06,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto',
    color: '#ffffff',
  },
  chipText: {
    color: '#4f378b',
    fontSize: 12,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  chip: {
    backgroundColor: '#d0bcff',
    marginLeft: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    marginBottom: height * 0.015,
    color: '#ffffff',
  },
  button: {
    width: width * 0.4,
    height: height * 0.07,
    borderRadius: 100,
    marginVertical: height * 0.08,
    backgroundColor: '#6750a4',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContent: {
    height: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: height * 0.015,
  },
  linkText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: height * 0.02,
  },
  link: {
    color: '#d0bcff',
  },
});

export default Register2Form;
