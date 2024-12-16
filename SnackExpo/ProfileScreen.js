import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [articlesRead, setArticlesRead] = useState(0);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  // Fetch user data, nickname, and bio from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        const articles = await AsyncStorage.getItem('articlesRead');
        const savedNickname = await AsyncStorage.getItem('userNickname');
        const savedBio = await AsyncStorage.getItem('userBio');

        if (user) {
          setUsername(user);
        }
        if (articles) {
          setArticlesRead(parseInt(articles)); // Ensure articlesRead is a number
        }
        if (savedNickname) {
          setNickname(savedNickname); // Set nickname from AsyncStorage
        }
        if (savedBio) {
          setBio(savedBio); // Set bio from AsyncStorage
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Logout function to clear only session data
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser'); // Remove only session data
      navigation.replace('Login'); // Redirect to login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome, {nickname || username || 'Guest'}!</Text>
      <Text style={styles.bodyText}>Bio: {bio || 'No bio available.'}</Text>
      <Text style={styles.bodyText}>You have read {articlesRead} articles.</Text>

      {/* Go to Learning Library */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LearningLibrary')}
      >
        <Text style={styles.buttonText}>Go to Learning Library</Text>
      </TouchableOpacity>

      {/* Navigate to Customize Profile Screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('CustomizeProfileScreen', {
            onSaveNickname: (newNickname) => setNickname(newNickname), // Pass callback
            onSaveBio: (newBio) => setBio(newBio), // Pass callback
          })
        }
      >
        <Text style={styles.buttonText}>Customize Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
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
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 18,
    color: '#843B62',
    marginBottom: 30,
    textAlign: 'center',
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
  logoutButton: {
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#FDAA90',
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;
