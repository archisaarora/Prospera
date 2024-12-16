import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Prospera!</Text>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#481F48' }]} // Primary deep purple
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#843B62' }]} // Secondary rich pink
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F67E7D' }]} // Button color soft red
        onPress={() => navigation.navigate('ChatScreen')}> {/* Corrected navigation name */}
        <Text style={styles.buttonText}>Chatbot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCECDE', // Light cream background
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#481F48', // Primary color for text
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DashboardScreen;
