import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Welcome Banner */}
      <View style={[styles.welcomeCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>✨ Smart Campus Hub</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>UniLib Library</Text>
        <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
          Explore thousands of academic books, journals, and reserve your study resources instantly.
        </Text>
      </View>

      {/* Action Buttons / Cards */}
      <TouchableOpacity 
        style={[styles.menuCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Catalog')}
        activeOpacity={0.8}
      >
        <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryLight }]}>
          <Text style={styles.iconEmoji}>📚</Text>
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={[styles.menuTitle, { color: theme.colors.text }]}>Book Catalog & Search</Text>
          <Text style={[styles.menuDesc, { color: theme.colors.subText }]}>Browse and filter available university books</Text>
        </View>
        <Text style={[styles.arrow, { color: theme.colors.subText }]}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.menuCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Borrowed')}
        activeOpacity={0.8}
      >
        <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryLight }]}>
          <Text style={styles.iconEmoji}>📖</Text>
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={[styles.menuTitle, { color: theme.colors.text }]}>My Borrowed Books</Text>
          <Text style={[styles.menuDesc, { color: theme.colors.subText }]}>Check active borrowings and due dates</Text>
        </View>
        <Text style={[styles.arrow, { color: theme.colors.subText }]}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.menuCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.8}
      >
        <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryLight }]}>
          <Text style={styles.iconEmoji}>ℹ️</Text>
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={[styles.menuTitle, { color: theme.colors.text }]}>Library Info & Hours</Text>
          <Text style={[styles.menuDesc, { color: theme.colors.subText }]}>View student profile, schedules and rules</Text>
        </View>
        <Text style={[styles.arrow, { color: theme.colors.subText }]}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  welcomeCard: { 
    borderRadius: 20, 
    padding: 24, 
    marginBottom: 24, 
    borderWidth: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    elevation: 3 
  },
  badgeContainer: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#ecfdf5', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 20, 
    marginBottom: 12 
  },
  badgeText: { color: '#10b981', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, lineHeight: 20 },
  menuCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 14, 
    borderWidth: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 6, 
    elevation: 2 
  },
  iconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  iconEmoji: { fontSize: 22 },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: '700', marginBottom: 3 },
  menuDesc: { fontSize: 13 },
  arrow: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});