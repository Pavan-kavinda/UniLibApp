
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { LIBRARY_BOOKS } from '../data/books';

export default function CatalogScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Search and filter logic
  const filteredBooks = LIBRARY_BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title, author, or category..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Details', { book: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.author}>By {item.author}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={[styles.copies, { color: item.availableCopies > 0 ? '#17b978' : '#ff6b6b' }]}>
                {item.availableCopies > 0 ? `Available: ${item.availableCopies}` : 'Out of Stock'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3d59',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#576574',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#007acc',
    marginBottom: 4,
  },
  copies: {
    fontSize: 13,
    fontWeight: '600',
  },
});