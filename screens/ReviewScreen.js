// screens/ReviewScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function ReviewScreen({ route, navigation }) {
  const { book } = route.params || { book: { title: 'Book' } };
  const { theme } = useTheme();
  
  const [rating, setRating] = useState('5');
  const [reviewText, setReviewText] = useState('');

  const handleSubmittedReview = () => {
    if (!reviewText.trim()) {
      Alert.alert("Error", "Please write a short review before submitting.");
      return;
    }

    Alert.alert("Success", "Thank you! Your review has been submitted successfully.", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Rate & Review</Text>
        <Text style={[styles.bookTitle, { color: theme.colors.primary }]}>{book.title}</Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>Select Rating (1 to 5 Stars)</Text>
        <View style={styles.starsContainer}>
          {['1', '2', '3', '4', '5'].map((star) => (
            <TouchableOpacity 
              key={star} 
              style={[styles.starBtn, { backgroundColor: rating === star ? theme.colors.primary : theme.colors.background, borderColor: theme.colors.border }]}
              onPress={() => setRating(star)}
            >
              <Text style={[styles.starText, { color: rating === star ? '#fff' : theme.colors.text }]}>{star} ⭐</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: theme.colors.text }]}>Your Review / Feedback</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
          placeholder="Write your thoughts about this book..."
          placeholderTextColor={theme.colors.subText}
          multiline
          numberOfLines={4}
          value={reviewText}
          onChangeText={setReviewText}
        />

        <TouchableOpacity 
          style={[styles.submitBtn, { backgroundColor: theme.colors.primary }]}
          onPress={handleSubmittedReview}
          activeOpacity={0.8}
        >
          <Text style={styles.submitBtnText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  card: { 
    borderRadius: 24, 
    padding: 24, 
    borderWidth: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    elevation: 3 
  },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  bookTitle: { fontSize: 15, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  starsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  starBtn: { flex: 1, padding: 10, marginHorizontal: 2, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  starText: { fontSize: 12, fontWeight: '700' },
  input: { padding: 14, borderRadius: 12, fontSize: 15, borderWidth: 1, textAlignVertical: 'top', marginBottom: 20, height: 100 },
  submitBtn: { padding: 16, borderRadius: 14, alignItems: 'center', elevation: 2 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});