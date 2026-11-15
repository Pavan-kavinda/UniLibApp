// screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const performLogout = useCallback(() => {
    setShowLogoutModal(false);
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [navigation]);

  const handleLogoutPress = useCallback(() => {
    if (Platform.OS === 'web') {
      setShowLogoutModal(true);
    } else {
      Alert.alert(
        'Log Out',
        'Are you sure you want to log out of UniLib?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: performLogout,
          },
        ],
        { cancelable: true }
      );
    }
  }, [performLogout]);

  return (
    <ScrollView
      style={[
        styles.screenWrapper,
        { backgroundColor: theme.colors.background },
      ]}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.innerContainer}>
        {/* Welcome Banner */}
        <View
          style={[
            styles.welcomeCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 10px 25px -4px rgba(0, 0, 0, 0.45)'
                  : '0 10px 25px -4px rgba(16, 185, 129, 0.08), 0 4px 12px rgba(0,0,0,0.04)',
              },
            }),
          ]}
        >
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
          style={[
            styles.menuCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 6px 16px -2px rgba(0, 0, 0, 0.3)'
                  : '0 6px 16px -2px rgba(0, 0, 0, 0.03)',
              },
            }),
          ]}
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
          style={[
            styles.menuCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 6px 16px -2px rgba(0, 0, 0, 0.3)'
                  : '0 6px 16px -2px rgba(0, 0, 0, 0.03)',
              },
            }),
          ]}
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
          style={[
            styles.menuCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 6px 16px -2px rgba(0, 0, 0, 0.3)'
                  : '0 6px 16px -2px rgba(0, 0, 0, 0.03)',
              },
            }),
          ]}
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

        {/* Professional Log Out Card */}
        <TouchableOpacity
          style={[
            styles.menuCard,
            {
              backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.08)' : '#fef2f2',
              borderColor: isDarkMode ? 'rgba(239, 68, 68, 0.25)' : '#fecaca',
            },
            Platform.select({
              web: {
                boxShadow: '0 6px 16px -2px rgba(239, 68, 68, 0.12)',
              },
            }),
          ]}
          onPress={handleLogoutPress}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Log out of UniLib"
        >
          <View
            style={[
              styles.iconBox,
              { backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2' },
            ]}
          >
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: '#ef4444' }]}>Log Out</Text>
            <Text style={[styles.menuDesc, { color: theme.colors.subText }]}>End current student session safely</Text>
          </View>
          <Text style={[styles.arrow, { color: '#ef4444' }]}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal (Web & Cross-Platform) */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : theme.colors.border,
              },
              Platform.select({
                web: {
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                },
              }),
            ]}
          >
            <View style={styles.modalIconBox}>
              <Ionicons name="alert-circle-outline" size={36} color="#ef4444" />
            </View>

            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Confirm Log Out
            </Text>

            <Text style={[styles.modalMessage, { color: theme.colors.subText }]}>
              Are you sure you want to log out of UniLib? You will need to sign in again to access book reservations.
            </Text>

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={[
                  styles.modalCancelBtn,
                  {
                    backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={[styles.modalCancelText, { color: theme.colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={performLogout}
                activeOpacity={0.85}
              >
                <Ionicons name="log-out-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.modalConfirmText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    width: '100%',
    ...Platform.select({
      web: {
        height: '100vh',
        maxHeight: '100vh',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
      default: {
        flex: 1,
      },
    }),
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.select({
      web: 80,
      ios: 60,
      android: 50,
      default: 60,
    }),
  },
  innerContainer: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
  welcomeCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
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
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconEmoji: {
    fontSize: 22,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    marginBottom: 3,
  },
  menuDesc: {
    fontSize: 12.5,
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 22,
  },
  modalActionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
  },
  modalConfirmBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});