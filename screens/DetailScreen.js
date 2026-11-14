// screens/DetailScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function DetailScreen({ route }) {
  const { book } = route.params || { book: {} };
  const { theme } = useTheme();
  const [availableCopies, setAvailableCopies] = useState(book.availableCopies || 0);
  const [isReserved, setIsReserved] = useState(false);

  const handleReserve = () => {
    if (availableCopies > 0 && !isReserved) {
      setAvailableCopies(prev => prev - 1);
      setIsReserved(true);
      Alert.alert("Success", "Book successfully reserved!");
    } else if (isReserved) {
      Alert.alert("Notice", "You have already reserved this book.");
    } else {
      Alert.alert("Out of Stock", "Sorry, no copies are currently available.");
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.imageCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Image source={{ uri: book.image }} style={styles.image} />
      </View>

      <View style={[styles.detailsContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{book.title}</Text>
        <Text style={[styles.author, { color: theme.colors.subText }]}>By {book.author}</Text>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{book.category}</Text>
        </View>

        <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>ISBN:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{book.isbn || 'N/A'}</Text>
        </View>

        <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Shelf Location:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{book.shelf || 'Main Library - Floor 2'}</Text>
        </View>

        <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Available Copies:</Text>
          <Text style={[styles.value, { color: availableCopies > 0 ? theme.colors.primary : '#ef4444', fontWeight: '700' }]}>
            {availableCopies}
          </Text>
        </View>

        <Text style={[styles.descriptionTitle, { color: theme.colors.text }]}>Description</Text>
        <Text style={[styles.description, { color: theme.colors.subText }]}>
          {book.description || 'Standard academic resource available for university students and researchers.'}
        </Text>

        <TouchableOpacity 
          style={[styles.reserveBtn, { backgroundColor: availableCopies > 0 && !isReserved ? theme.colors.primary : '#94a3b8' }]} 
          onPress={handleReserve}
          activeOpacity={0.8}
        >
          <Text style={styles.reserveBtnText}>
            {isReserved ? 'Reserved Successfully ✅' : availableCopies > 0 ? 'Reserve This Book Now' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  imageCard: { 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2
  },
  image: { width: 140, height: 200, borderRadius: 12 },
  detailsContainer: { 
    borderRadius: 20, 
    padding: 24, 
    borderWidth: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 8, 
    elevation: 2 
  },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 6, letterSpacing: -0.5 },
  author: { fontSize: 15, marginBottom: 12 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 16 },
  categoryText: { color: '#0284c7', fontSize: 12, fontWeight: '700' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 },
  label: { fontSize: 14 },
  value: { fontSize: 14, fontWeight: '600' },
  descriptionTitle: { fontSize: 17, fontWeight: '700', marginTop: 18, marginBottom: 6 },
  description: { fontSize: 14, lineHeight: 22, marginBottom: 24 },
  reserveBtn: { padding: 16, borderRadius: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  reserveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});