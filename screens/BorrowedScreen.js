
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function BorrowedScreen() {
  
  const borrowedBooks = [
    {
      id: '1',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      dueDate: '2026-11-25',
      status: 'Reserved',
    },
    {
      id: '2',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma et al.',
      dueDate: '2026-11-20',
      status: 'Borrowed',
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Active Library Records</Text>

      {borrowedBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No books currently borrowed or reserved.</Text>
        </View>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>By {item.author}</Text>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3d59',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e3d59',
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: '#576574',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
  },
});