import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying alerts

  const handleLogin = async () => {
    try {
      // Retrieve stored users from AsyncStorage
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if credentials match
      const user = users.find((u) => u.username === username && u.password === password);
      if (user) {
        setMessage('Login successful!');
        setTimeout(() => navigation.replace('Dashboard'), 1500); // Redirect after showing the message
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FDAA90' }]}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
    color: 'red', // Red for error messages
  },
});

export default LoginScreen;
