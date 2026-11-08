
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { book } = route.params;
  const [availableCopies, setAvailableCopies] = useState(book.availableCopies);
  const [isReserved, setIsReserved] = useState(false);

  const handleReserve = () => {
    if (availableCopies > 0 && !isReserved) {
      setAvailableCopies(prev => prev - 1);
      setIsReserved(true);
      Alert.alert("Success", "Book successfully reserved! You can view it in 'My Borrowed Books'.");
    } else if (isReserved) {
      Alert.alert("Notice", "You have already reserved this book.");
    } else {
      Alert.alert("Out of Stock", "Sorry, no copies are currently available for reservation.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: book.image }} style={styles.image} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>By {book.author}</Text>
        <Text style={styles.categoryBadge}>{book.category}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>ISBN:</Text>
          <Text style={styles.value}>{book.isbn || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Shelf Location:</Text>
          <Text style={styles.value}>{book.shelf || 'Main Library - Floor 2'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Available Copies:</Text>
          <Text style={[styles.value, { color: availableCopies > 0 ? '#17b978' : '#ff6b6b', fontWeight: 'bold' }]}>
            {availableCopies}
          </Text>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>
          {book.description || 'This is a standard academic resource available for university students and staff members in the library.'}
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
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 130,
    height: 180,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3d59',
    marginBottom: 6,
  },
  author: {
    fontSize: 15,
    color: '#576574',
    marginBottom: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1f5fe',
    color: '#0288d1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    color: '#2f3542',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3d59',
    marginTop: 15,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#576574',
    lineHeight: 20,
    marginBottom: 20,
  },
  reserveBtn: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  reserveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});