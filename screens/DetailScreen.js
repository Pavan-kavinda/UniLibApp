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
      <View style={styles.imageContainer}>
        <Image source={{ uri: book.image }} style={styles.image} />
      </View>

      <View style={[styles.detailsContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{book.title}</Text>
        <Text style={[styles.author, { color: theme.colors.subText }]}>By {book.author}</Text>
        <Text style={styles.categoryBadge}>{book.category}</Text>

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
          <Text style={[styles.value, { color: availableCopies > 0 ? '#17b978' : '#ff6b6b', fontWeight: 'bold' }]}>
            {availableCopies}
          </Text>
        </View>

        <Text style={[styles.descriptionTitle, { color: theme.colors.text }]}>Description</Text>
        <Text style={[styles.description, { color: theme.colors.subText }]}>
          {book.description || 'Standard academic resource available for university students.'}
        </Text>

        <TouchableOpacity 
          style={[styles.reserveBtn, { backgroundColor: availableCopies > 0 && !isReserved ? '#17b978' : '#a4b0be' }]} 
          onPress={handleReserve}
        >
          <Text style={styles.reserveBtnText}>
            {isReserved ? 'Reserved ✅' : availableCopies > 0 ? 'Reserve This Book' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  image: { width: 130, height: 180, borderRadius: 8 },
  detailsContainer: { borderRadius: 12, padding: 20, borderWidth: 1, elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  author: { fontSize: 15, marginBottom: 10 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: '#e1f5fe', color: '#0288d1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, fontSize: 12, fontWeight: '600', marginBottom: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1 },
  label: { fontSize: 14 },
  value: { fontSize: 14 },
  descriptionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 6 },
  description: { fontSize: 14, lineHeight: 20, marginBottom: 20 },
  reserveBtn: { padding: 15, borderRadius: 10, alignItems: 'center' },
  reserveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});