// screens/CatalogScreen.js
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
        placeholder="🔍 Search by title, author, or category..."
        placeholderTextColor={theme.colors.subText}
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
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={2}>{item.title}</Text>
              <Text style={[styles.author, { color: theme.colors.subText }]}>By {item.author}</Text>
              
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>

              <Text style={[styles.copies, { color: item.availableCopies > 0 ? theme.colors.primary : '#ef4444' }]}>
                {item.availableCopies > 0 ? `✓ Available: ${item.availableCopies}` : '✕ Out of Stock'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBar: { 
    padding: 14, 
    borderRadius: 14, 
    fontSize: 15, 
    marginBottom: 16, 
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2
  },
  card: { 
    flexDirection: 'row', 
    borderRadius: 16, 
    marginBottom: 14, 
    padding: 12, 
    borderWidth: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 6, 
    elevation: 2 
  },
  image: { width: 75, height: 105, borderRadius: 10 },
  info: { flex: 1, marginLeft: 14, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  author: { fontSize: 13, marginBottom: 8 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: '#e0f2fe', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 8 },
  categoryText: { fontSize: 11, color: '#0284c7', fontWeight: '700' },
  copies: { fontSize: 12, fontWeight: '700' },
});