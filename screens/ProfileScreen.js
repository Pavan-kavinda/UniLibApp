
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>👤 Student Profile</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>University Student</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Student ID:</Text>
          <Text style={styles.value}>UNI/LIB/2026/001</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Faculty:</Text>
          <Text style={styles.value}>Computing & Engineering</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Library Membership:</Text>
          <Text style={[styles.value, { color: '#17b978', fontWeight: 'bold' }]}>Active</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🕒 Library Hours</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Monday - Friday:</Text>
          <Text style={styles.value}>8:00 AM - 8:00 PM</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Saturday:</Text>
          <Text style={styles.value}>9:00 AM - 5:00 PM</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Sunday & Holidays:</Text>
          <Text style={[styles.value, { color: '#e74c3c' }]}>Closed</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📌 Library Rules & Guidelines</Text>
        <Text style={styles.ruleText}>1. Standard borrowing period is 14 days per book.</Text>
        <Text style={styles.ruleText}>2. Quietness must be maintained inside reading halls.</Text>
        <Text style={styles.ruleText}>3. Food and beverages are strictly prohibited near computers and book shelves.</Text>
        <Text style={styles.ruleText}>4. Online reservations expire if not collected within 24 hours.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f7fa',
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3d59',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
    paddingBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    color: '#576574',
  },
  value: {
    fontSize: 14,
    color: '#2f3542',
    fontWeight: '500',
  },
  ruleText: {
    fontSize: 13,
    color: '#576574',
    marginBottom: 6,
    lineHeight: 18,
  },
});