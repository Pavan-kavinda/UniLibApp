// screens/ProfileScreen.js
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Safely reset navigation back to LoginScreen
  const performLogout = useCallback(() => {
    setShowLogoutModal(false);
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [navigation]);

  // Handle Logout button click with confirmation
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
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.innerContainer}>
        {/* Student Profile Card */}
        <View
          style={[
            styles.card,
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
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>🎓</Text>
            </View>
            <View style={styles.profileHeaderText}>
              <Text style={[styles.studentName, { color: theme.colors.text }]}>
                University Student
              </Text>
              <Text style={[styles.studentIdSubtitle, { color: theme.colors.subText }]}>
                ID: UNI/LIB/2026/001
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Active Member</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.subText }]}>Faculty:</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              Computing & Software Engineering
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.subText }]}>Degree Program:</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              BSc (Hons) in Software Engineering
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.subText }]}>Borrowing Quota:</Text>
            <Text style={[styles.value, { color: theme.colors.primary, fontWeight: '700' }]}>
              4 / 5 Books Available
            </Text>
          </View>
        </View>

        {/* Library Operating Hours Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 8px 20px -4px rgba(0, 0, 0, 0.4)'
                  : '0 8px 20px -4px rgba(0, 0, 0, 0.04)',
              },
            }),
          ]}
        >
          <View style={styles.cardTitleRow}>
            <Ionicons name="time-outline" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Library Operating Hours
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.subText }]}>Monday – Friday:</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>8:00 AM – 8:00 PM</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.subText }]}>Saturday:</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>9:00 AM – 5:00 PM</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.subText }]}>Sunday & Public Holidays:</Text>
            <Text style={[styles.value, { color: '#ef4444', fontWeight: '700' }]}>Closed</Text>
          </View>
        </View>

        {/* Library Rules Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 8px 20px -4px rgba(0, 0, 0, 0.4)'
                  : '0 8px 20px -4px rgba(0, 0, 0, 0.04)',
              },
            }),
          ]}
        >
          <View style={styles.cardTitleRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Rules & Guidelines
            </Text>
          </View>
          <Text style={[styles.ruleText, { color: theme.colors.subText }]}>
            1. Standard loan period is 14 days per physical book.
          </Text>
          <Text style={[styles.ruleText, { color: theme.colors.subText }]}>
            2. Quiet study areas must be respected at all times.
          </Text>
          <Text style={[styles.ruleText, { color: theme.colors.subText }]}>
            3. Reserved books must be collected within 48 hours of reservation.
          </Text>
          <Text style={[styles.ruleText, { color: theme.colors.subText }]}>
            4. Keep university library credentials secure and do not share barcodes.
          </Text>
        </View>

        {/* Professional Log Out Action Card */}
        <View
          style={[
            styles.logoutCard,
            {
              backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.08)' : '#fef2f2',
              borderColor: isDarkMode ? 'rgba(239, 68, 68, 0.25)' : '#fecaca',
            },
            Platform.select({
              web: {
                boxShadow: '0 8px 20px -4px rgba(239, 68, 68, 0.12)',
              },
            }),
          ]}
        >
          <View style={styles.logoutHeaderRow}>
            <View style={styles.logoutIconCircle}>
              <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            </View>
            <View style={styles.logoutTextGroup}>
              <Text style={styles.logoutCardTitle}>Account Session</Text>
              <Text style={[styles.logoutCardSubtitle, { color: theme.colors.subText }]}>
                Signed in as UNI/LIB/2026/001
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogoutPress}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Log out of UniLib"
          >
            <Ionicons name="log-out" size={18} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.logoutBtnText}>Log Out of UniLib</Text>
          </TouchableOpacity>
        </View>
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
              Are you sure you want to log out of UniLib? You will need to enter your Student ID and password to access library services again.
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.select({
      web: 80,
      ios: 60,
      android: 50,
      default: 60,
    }),
    flexGrow: 1,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  profileHeaderText: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  studentIdSubtitle: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '500',
  },
  value: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  ruleText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },

  // Logout Card
  logoutCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1.5,
  },
  logoutHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutTextGroup: {
    flex: 1,
  },
  logoutCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ef4444',
    marginBottom: 2,
  },
  logoutCardSubtitle: {
    fontSize: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutBtnText: {
    color: '#ffffff',
    fontSize: 14.5,
    fontWeight: '700',
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