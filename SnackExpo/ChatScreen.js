import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal } from 'react-native';

export default function ChatScreen() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [fullText, setFullText] = useState('');

  // Handle the query and process the results
  const handleQuery = async () => {
    if (!query) {
      setError("Please enter a query.");
      return;
    }

    // Reset error message when query is provided
    setError('');

    try {
      const res = await fetch('https://5da7a7bd-932d-48a2-8942-5c721558a077-00-2yrn8ppkuwwon.picard.repl.co/process_query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.keywords && data.keywords.length > 0) {
          setResponse(data.keywords);
        } else {
          setError("No relevant results found.");
          setResponse([]); // Clear any previous response if no results found
        }
      } else {
        setError("Error processing the query.");
      }
    } catch (error) {
      console.error('Error processing query:', error);
      setError('Failed to communicate with the server.');
    }

    setQuery(''); // Clear the input field after query submission
  };

  // Function to open the modal with the full text content
  const openFullText = async (docName) => {
    try {
      const res = await fetch(`https://5da7a7bd-932d-48a2-8942-5c721558a077-00-2yrn8ppkuwwon.picard.repl.co/get_full_text?doc_name=${docName}`);
      if (res.ok) {
        const data = await res.json();
        setFullText(data.fullText);
        setModalVisible(true);
      } else {
        setError('Failed to load full text.');
      }
    } catch (error) {
      console.error('Error fetching full text:', error);
      setError('Error loading full text.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your query"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Submit Query" onPress={handleQuery} color="#F67E7D" />

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.resultsContainer}>
        {response.length > 0 && (
          <Text style={styles.resultsTitle}>Relevant Results:</Text>
        )}
        {response.map((keyword, index) => (
          <View key={index} style={styles.resultItem}>
            <Text style={styles.queryTitle}>Query: "{keyword.query}"</Text>
            <Text style={styles.docName}>{keyword.doc_name}</Text>
            <Text>Similarity: {keyword.similarity.toFixed(2)}</Text>
            <Text>Relevant Sentences:</Text>
            {keyword.relevant_sentences && keyword.relevant_sentences.length > 0 ? (
              keyword.relevant_sentences.slice(0, 3).map((sentence, idx) => (  // Show up to 3 relevant sentences
                <Text key={idx}>{sentence.sentence.trim()}</Text>
              ))
            ) : (
              <Text>No relevant sentences found.</Text>
            )}
            <Button 
              title="View Full Text"
              onPress={() => openFullText(keyword.doc_name)}
              color="#F67E7D"
            />
          </View>
        ))}
        {response.length === 0 && !error && (
          <Text style={styles.noResults}>No matches found. Try refining your query.</Text>
        )}
      </View>

      {/* Scrollable Modal for Full Text */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Full Text</Text>
            <ScrollView style={styles.modalTextContainer}>
              <Text>{fullText}</Text>
            </ScrollView>
            <Button title="Close" onPress={() => setModalVisible(false)} color="#F67E7D" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#FCECDE',
  },
  input: {
    height: 40,
    borderColor: '#481F48',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#481F48',
  },
  queryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F67E7D',
    marginBottom: 5,
  },
  resultItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  docName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#481F48',
  },
  noResults: {
    fontSize: 16,
    color: '#481F48',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#481F48',
    marginBottom: 10,
  },
  modalTextContainer: {
    maxHeight: 300, // Set maximum height for modal scrollable area
  },
});

