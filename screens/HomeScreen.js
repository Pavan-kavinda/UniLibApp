import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.welcomeCard}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to UniLib</Text>
        <Text style={[styles.subtitle, { color: theme.colors.subText }]}>Smart University Library System</Text>
      </View>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Catalog')}
      >
        <Text style={[styles.btnText, { color: theme.colors.text }]}>📚 Browse Book Catalog & Search</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Borrowed')}
      >
        <Text style={[styles.btnText, { color: theme.colors.text }]}>📖 My Borrowed / Reserved Books</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={[styles.btnText, { color: theme.colors.text }]}>ℹ️ Library Info & Hours</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  welcomeCard: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 15 },
  btn: { padding: 18, borderRadius: 12, marginBottom: 15, alignItems: 'center', borderWidth: 1, elevation: 2 },
  btnText: { fontSize: 16, fontWeight: 'bold', color: '#17b978' },
});