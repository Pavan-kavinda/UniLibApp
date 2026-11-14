// screens/BorrowedScreen.js
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function BorrowedScreen() {
  const { theme } = useTheme();

  const borrowedBooks = [
    { id: '1', title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', dueDate: '2026-11-25', status: 'Reserved' },
    { id: '2', title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Erich Gamma et al.', dueDate: '2026-11-20', status: 'Borrowed' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.headerTitle, { color: theme.colors.text }]}>My Active Library Records</Text>

      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.info}>
              <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={2}>{item.title}</Text>
              <Text style={[styles.author, { color: theme.colors.subText }]}>By {item.author}</Text>
              <Text style={styles.dueDate}>📅 Due Date: {item.dueDate}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: item.status === 'Reserved' ? '#e0f2fe' : '#ecfdf5' }]}>
              <Text style={[styles.badgeText, { color: item.status === 'Reserved' ? '#0284c7' : '#10b981' }]}>
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: '800', marginBottom: 16, letterSpacing: -0.3 },
  card: { 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 14, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderWidth: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 6, 
    elevation: 2 
  },
  info: { flex: 1, marginRight: 12 },
  title: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  author: { fontSize: 13, marginBottom: 8 },
  dueDate: { fontSize: 12, color: '#ef4444', fontWeight: '700' },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: '700' },
});