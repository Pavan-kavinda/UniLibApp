// screens/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (studentId.trim() === '' || password.trim() === '') {
      Alert.alert("Error", "Please enter both Student ID and Password.");
      return;
    }
    
    // සාර්ථකව ලොග් වූ පසු Home Screen එකට යැවීම
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>🔐 Secure Portal</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>UniLib Login</Text>
        <Text style={[styles.subtitle, { color: theme.colors.subText }]}>Enter your university credentials to access the library</Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Student ID</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="e.g. UNI/LIB/2026/001"
            placeholderTextColor={theme.colors.subText}
            value={studentId}
            onChangeText={setStudentId}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.subText}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.loginBtn, { backgroundColor: theme.colors.primary }]}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginBtnText}>Login to UniLib</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
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
  badgeContainer: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#ecfdf5', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 20, 
    marginBottom: 12 
  },
  badgeText: { color: '#10b981', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, lineHeight: 20, marginBottom: 24 },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  input: { padding: 14, borderRadius: 12, fontSize: 15, borderWidth: 1 },
  loginBtn: { padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 10, elevation: 2 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});