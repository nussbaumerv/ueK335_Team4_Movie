import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik, FormikProps } from 'formik';
import { LoginAPIRequest } from '../../service/Auth';
import { Link, useNavigation } from '@react-navigation/native';
import { MovieAPI } from '../../service/Movie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MovieType } from '../../types/Movie';



interface FormValues {
  title: string;
  year: string;
  cast: string;
  genres: string;
  href: string;
  extract: string;
  thumbnail: string;
  thumbnail_width: string;
  thumbnail_height: string;
}

const MovieAdd: React.FC = () => {
  const navigation = useNavigation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.title) {
      errors.title = 'Title is required';
    }

    if (!values.year) {
      errors.year = 'Year is required';
    } else if (!/^\d{4}$/.test(values.year)) {
      errors.year = 'Invalid year';
    }

    if (!values.href) {
      errors.href = 'Href is required';
    }

    if (!values.extract) {
      errors.extract = 'Extract is required';
    }

    if (!values.thumbnail) {
      errors.thumbnail = 'Thumbnail is required';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.thumbnail)) {
      errors.thumbnail = 'Invalid URL format';
    }

    if (!values.thumbnail_width) {
      errors.thumbnail_width = 'Thumbnail width is required';
    } else if (isNaN(Number(values.thumbnail_width))) {
      errors.thumbnail_width = 'Invalid thumbnail width';
    }

    if (!values.thumbnail_height) {
      errors.thumbnail_height = 'Thumbnail height is required';
    } else if (isNaN(Number(values.thumbnail_height))) {
      errors.thumbnail_height = 'Invalid thumbnail height';
    }

    if (values.cast) {
      const castArray = values.cast.split(',').map((item) => item.trim());
      if (castArray.some((item) => item === '')) {
        errors.cast = 'Cast contains empty values';
      }
    }

    if (values.genres) {
      const genresArray = values.genres.split(',').map((item) => item.trim());
      if (genresArray.some((item) => item === '')) {
        errors.genres = 'Genres contains empty values';
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        title: '',
        year: '',
        cast: '',
        genres: '',
        href: '',
        extract: '',
        thumbnail: '',
        thumbnail_width: '',
        thumbnail_height: ''
      }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitError(null);

        const movieData = {
          ...values,
          year: Number(values.year),
          cast: values.cast.split(',').map((item) => item.trim()).filter(Boolean),
          genres: values.genres.split(',').map((item) => item.trim()).filter(Boolean),
          thumbnail_width: Number(values.thumbnail_width),
          thumbnail_height: Number(values.thumbnail_height),
        };

        MovieAPI()
          .addMovie(movieData)
          .then(() => {
            navigation.goBack()
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setSubmitError('Error submitting the form.');
            } else {
              setSubmitError('An unexpected error occurred. Please try again.');
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
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Icon style={styles.backButton} size={40} name="arrow-left" onPress={() => navigation.goBack()} />

              <Text style={styles.title}>Add Movie</Text>
              <TextInput
                style={styles.input}
                label="Title"
                mode="outlined"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                error={touched.title && !!errors.title}
              />
              {touched.title && errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}

              <TextInput
                style={styles.input}
                label="Year"
                mode="outlined"
                onChangeText={handleChange('year')}
                onBlur={handleBlur('year')}
                value={values.year}
                keyboardType="numeric"
                error={touched.year && !!errors.year}
              />
              {touched.year && errors.year && (
                <Text style={styles.errorText}>{errors.year}</Text>
              )}

              <Text style={styles.infoText}>Image configuration</Text>

              <TextInput
                style={styles.input}
                label="Thumbnail"
                mode="outlined"
                onChangeText={handleChange('thumbnail')}
                onBlur={handleBlur('thumbnail')}
                value={values.thumbnail}
                error={touched.thumbnail && !!errors.thumbnail}
              />
              {touched.thumbnail && errors.thumbnail && (
                <Text style={styles.errorText}>{errors.thumbnail}</Text>
              )}

              <TextInput
                style={styles.input}
                label="Thumbnail Width"
                mode="outlined"
                onChangeText={handleChange('thumbnail_width')}
                onBlur={handleBlur('thumbnail_width')}
                value={values.thumbnail_width}
                keyboardType="numeric"
                error={touched.thumbnail_width && !!errors.thumbnail_width}
              />
              {touched.thumbnail_width && errors.thumbnail_width && (
                <Text style={styles.errorText}>{errors.thumbnail_width}</Text>
              )}

              <TextInput
                style={styles.input}
                label="Thumbnail Height"
                mode="outlined"
                onChangeText={handleChange('thumbnail_height')}
                onBlur={handleBlur('thumbnail_height')}
                value={values.thumbnail_height}
                keyboardType="numeric"
                error={touched.thumbnail_height && !!errors.thumbnail_height}
              />
              {touched.thumbnail_height && errors.thumbnail_height && (
                <Text style={styles.errorText}>{errors.thumbnail_height}</Text>
              )}

              <Text style={styles.infoText}>Additional infos</Text>

              <TextInput
                style={styles.input}
                label="Cast (comma-separated)"
                mode="outlined"
                onChangeText={handleChange('cast')}
                onBlur={handleBlur('cast')}
                multiline={true}
                value={values.cast}
                error={touched.cast && !!errors.cast}
              />
              {touched.cast && errors.cast && (
                <Text style={styles.errorText}>{errors.cast}</Text>
              )}

              <TextInput
                style={styles.input}
                label="Genres (comma-separated)"
                mode="outlined"
                onChangeText={handleChange('genres')}
                onBlur={handleBlur('genres')}
                multiline={true}
                value={values.genres}
                error={touched.genres && !!errors.genres}
              />
              {touched.genres && errors.genres && (
                <Text style={styles.errorText}>{errors.genres}</Text>
              )}

              <TextInput
                style={styles.input}
                label="Href"
                mode="outlined"
                onChangeText={handleChange('href')}
                onBlur={handleBlur('href')}
                multiline={true}
                value={values.href}
                error={touched.href && !!errors.href}
              />
              {touched.href && errors.href && (
                <Text style={styles.errorText}>{errors.href}</Text>
              )}

              <TextInput
                style={styles.input}
                label="Extract"
                mode="outlined"
                onChangeText={handleChange('extract')}
                onBlur={handleBlur('extract')}
                multiline={true}
                value={values.extract}
                error={touched.extract && !!errors.extract}
              />
              {touched.extract && errors.extract && (
                <Text style={styles.errorText}>{errors.extract}</Text>
              )}

              {submitError && <Text style={styles.errorText}>{submitError}</Text>}

              <Button
                style={styles.button}
                mode="contained"
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto',
    margin: 30,
    textAlign: 'center',
  },
  infoText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 18,
  },
  input: {
    width: '100%',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  link: {
    color: '#D0BCFF',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
});

export default MovieAdd;