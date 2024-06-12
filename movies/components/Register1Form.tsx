import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TextInput, Button, Chip } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { Link, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Register</Text>
            <Chip style={styles.chip}>
              <Text style={styles.chipText}>1/2</Text>
            </Chip>
          </View>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              label="Email"
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              textColor='white'
              keyboardType="email-address"
              error={touched.email && !!errors.email}
              theme={{
                colors: {
                  text: '#e6e0e9',
                  primary: '#e6e0e9',
                  background: '#1d1b20',
                  placeholder: '#e6e0e9'
                }
              }}
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
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {loginError && <Text style={styles.errorText}>{loginError}</Text>}

            <Button
              style={styles.button}
              mode="contained"
              onPress={handleSubmit}
              disabled={isSubmitting}
              contentStyle={styles.buttonContent}
            >
              {isSubmitting ? 'Registering...' : 'Next'}
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
    marginBottom: height * 0.03,
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
    marginTop: height * 0.12,
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

export default Register1Form;
