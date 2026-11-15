// screens/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const [isSignIn, setIsSignIn] = useState(true);
  
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (studentId.trim() === '' || password.trim() === '') {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (!isSignIn && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    
    if (isSignIn) {
      navigation.replace('Home');
    } else {
      Alert.alert("Success", "Account created successfully! Please sign in.", [
        { text: "OK", onPress: () => setIsSignIn(true) }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          
          {/* Sign In & Sign Up Tabs */}
          <View style={[styles.tabContainer, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
            <TouchableOpacity 
              style={[styles.tab, isSignIn && { backgroundColor: theme.colors.primary }]}
              onPress={() => setIsSignIn(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, { color: isSignIn ? '#fff' : theme.colors.text }]}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tab, !isSignIn && { backgroundColor: theme.colors.primary }]}
              onPress={() => setIsSignIn(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, { color: !isSignIn ? '#fff' : theme.colors.text }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>🔐 Secure Portal</Text>
          </View>
          
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
            {isSignIn ? 'Enter your university credentials to access the library' : 'Register with your student ID to get started'}
          </Text>

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

          {!isSignIn && (
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Confirm Password</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
                placeholder="Confirm your password"
                placeholderTextColor={theme.colors.subText}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          )}

          <TouchableOpacity 
            style={[styles.loginBtn, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.loginBtnText}>{isSignIn ? 'Sign In to UniLib' : 'Register Account'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { 
    width: '100%',
    maxWidth: 450,
    borderRadius: 24, 
    padding: 24, 
    borderWidth: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    elevation: 3 
  },
  tabContainer: { 
    flexDirection: 'row', 
    borderRadius: 14, 
    borderWidth: 1, 
    padding: 4, 
    marginBottom: 20,
    overflow: 'hidden'
  },
  tab: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabText: { fontSize: 14, fontWeight: '700' },
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
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});