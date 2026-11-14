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
              <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
              <Text style={[styles.author, { color: theme.colors.subText }]}>By {item.author}</Text>
              <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: item.status === 'Reserved' ? '#e1f5fe' : '#e8f8f5' }]}>
              <Text style={[styles.badgeText, { color: item.status === 'Reserved' ? '#0288d1' : '#17b978' }]}>
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
  container: { flex: 1, padding: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { borderRadius: 10, padding: 15, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, elevation: 2 },
  info: { flex: 1, marginRight: 10 },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  author: { fontSize: 13, marginBottom: 4 },
  dueDate: { fontSize: 12, color: '#e74c3c', fontWeight: '600' },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
});