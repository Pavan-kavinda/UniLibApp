import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}>👤 Student Profile</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Name:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>University Student</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Student ID:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>UNI/LIB/2026/001</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Faculty:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>Computing & Engineering</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Library Membership:</Text>
          <Text style={[styles.value, { color: '#17b978', fontWeight: 'bold' }]}>Active</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}>🕒 Library Hours</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Monday - Friday:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>8:00 AM - 8:00 PM</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Saturday:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>9:00 AM - 5:00 PM</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: theme.colors.subText }]}>Sunday & Holidays:</Text>
          <Text style={[styles.value, { color: '#e74c3c' }]}>Closed</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}>📌 Library Rules & Guidelines</Text>
        <Text style={[styles.ruleText, { color: theme.colors.subText }]}>1. Standard borrowing period is 14 days per book.</Text>
        <Text style={[styles.ruleText, { color: theme.colors.subText }]}>2. Quietness must be maintained inside reading halls.</Text>
        <Text style={[styles.ruleText, { color: theme.colors.subText }]}>3. Food and beverages are strictly prohibited near computers and book shelves.</Text>
        <Text style={[styles.ruleText, { color: theme.colors.subText }]}>4. Online reservations expire if not collected within 24 hours.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 15 },
  card: { borderRadius: 10, padding: 18, marginBottom: 15, borderWidth: 1, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, borderBottomWidth: 1, paddingBottom: 6 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label: { fontSize: 14 },
  value: { fontSize: 14, fontWeight: '500' },
  ruleText: { fontSize: 13, marginBottom: 6, lineHeight: 18 },
});