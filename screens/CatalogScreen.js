import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { LIBRARY_BOOKS } from '../data/books';
import { useTheme } from '../ThemeContext';

export default function CatalogScreen({ navigation }) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = LIBRARY_BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={[styles.searchBar, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
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
            style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Details', { book: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={2}>{item.title}</Text>
              <Text style={[styles.author, { color: theme.colors.subText }]}>By {item.author}</Text>
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
  container: { flex: 1, padding: 15 },
  searchBar: { padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 15, borderWidth: 1 },
  card: { flexDirection: 'row', borderRadius: 10, marginBottom: 12, padding: 10, borderWidth: 1, elevation: 2 },
  image: { width: 70, height: 100, borderRadius: 6 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  author: { fontSize: 14, marginBottom: 2 },
  category: { fontSize: 12, color: '#007acc', marginBottom: 4 },
  copies: { fontSize: 13, fontWeight: '600' },
});