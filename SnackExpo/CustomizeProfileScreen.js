import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomizeProfileScreen = ({ navigation, route }) => {
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState(''); // For displaying feedback

  const handleSave = async () => {
    if (!nickname || !bio) {
      setMessage('Please fill out all fields.');
    } else {
      setMessage('Profile updated successfully!');
      try {
        // Save the nickname and bio to AsyncStorage
        await AsyncStorage.setItem('userNickname', nickname);
        await AsyncStorage.setItem('userBio', bio);

        // Pass the nickname and bio back to ProfileScreen
        route.params?.onSaveNickname(nickname);
        route.params?.onSaveBio(bio);

        // Navigate back after showing the message
        setTimeout(() => navigation.goBack(), 1500);
      } catch (error) {
        console.error('Error saving profile:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customize Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your nickname"
        value={nickname}
        onChangeText={setNickname}
      />

      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Enter bio"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCECDE',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#481F48',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 15,
    borderColor: '#843B62',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#481F48',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default CustomizeProfileScreen;
