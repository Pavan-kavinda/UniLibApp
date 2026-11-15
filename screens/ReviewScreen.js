// screens/ReviewScreen.js
import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useTheme } from '../ThemeContext';

const RATING_DESCRIPTIONS = {
  5: '⭐⭐⭐⭐⭐ 5/5 - Outstanding Course Material',
  4: '⭐⭐⭐⭐ 4/5 - Very Good & Informative',
  3: '⭐⭐⭐ 3/5 - Average Academic Value',
  2: '⭐⭐ 2/5 - Fair, Lacks Clear Explanations',
  1: '⭐ 1/5 - Poor, Needs Replacement',
};

const FEEDBACK_TAGS = [
  '📚 Exam Preparation',
  '💡 Clear Explanations',
  '⚙️ Practical Examples',
  '📖 Coursework Required',
  '✨ Pristine Condition',
];

export default function ReviewScreen({ route, navigation }) {
  const { book = { title: 'Academic Book', author: 'University Library', category: 'General' } } =
    route.params || {};
  const { theme, isDarkMode } = useTheme();

  const [studentId, setStudentId] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reviewText, setReviewText] = useState('');

  const toggleTag = useCallback((tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSubmittedReview = useCallback(() => {
    if (!studentId.trim()) {
      Alert.alert('Required Field', 'Please enter your university Student ID (e.g. STU-2024-042).');
      return;
    }
    if (!reviewText.trim()) {
      Alert.alert('Required Field', 'Please write a short review before submitting.');
      return;
    }

    Alert.alert(
      'Review Submitted Successfully ✅',
      `Thank you for reviewing "${book.title}". Your feedback has been verified and added to the UniLib catalog.`,
      [
        {
          text: 'Return to Library',
          onPress: () => {
            if (navigation && navigation.canGoBack()) {
              navigation.goBack();
            }
          },
        },
      ]
    );
  }, [studentId, reviewText, book.title, navigation]);

  return (
    <ScrollView
      style={[
        styles.screenWrapper,
        { backgroundColor: theme.colors.background },
      ]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.innerContainer}>
        {/* Book Overview Banner Card */}
        <View
          style={[
            styles.bookBannerCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 10px 25px -4px rgba(0, 0, 0, 0.45)'
                  : '0 10px 25px -4px rgba(16, 185, 129, 0.08), 0 4px 10px rgba(0,0,0,0.03)',
              },
            }),
          ]}
        >
          {book.image && (
            <Image
              source={{ uri: book.image }}
              style={styles.bookThumb}
              resizeMode="cover"
            />
          )}
          <View style={styles.bannerInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>
                {book.category || 'Academic Resource'}
              </Text>
            </View>
            <Text style={[styles.bookTitle, { color: theme.colors.text }]} numberOfLines={2}>
              {book.title}
            </Text>
            <Text style={[styles.bookAuthor, { color: theme.colors.subText }]}>
              By {book.author || 'University Faculty'}
            </Text>
          </View>
        </View>

        {/* Rating Submission Form Card */}
        <View
          style={[
            styles.formCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(16, 185, 129, 0.3)' : '#a7f3d0',
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 12px 30px -4px rgba(0, 0, 0, 0.5)'
                  : '0 12px 30px -4px rgba(16, 185, 129, 0.12)',
              },
            }),
          ]}
        >
          <View style={styles.formHeader}>
            <View style={styles.formIconBox}>
              <Text style={styles.formIcon}>⭐</Text>
            </View>
            <View style={styles.formHeaderTextGroup}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Rate & Review Book
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.subText }]}>
                Share your academic experience to help fellow students.
              </Text>
            </View>
          </View>

          {/* Student ID Input */}
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Student Registration ID *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
              Platform.select({ web: { outlineStyle: 'none' } }),
            ]}
            placeholder="e.g. STU-2024-042 or CS-2023-018"
            placeholderTextColor={theme.colors.subText}
            value={studentId}
            onChangeText={setStudentId}
            autoCapitalize="characters"
          />

          {/* Star Rating Selector */}
          <Text style={[styles.label, { color: theme.colors.text, marginTop: 12 }]}>
            Select Star Rating (1 to 5 Stars) *
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isSelected = rating >= star;
              return (
                <TouchableOpacity
                  key={star}
                  style={[
                    styles.starBtn,
                    isSelected
                      ? styles.starBtnActive
                      : [
                          styles.starBtnInactive,
                          {
                            backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
                            borderColor: theme.colors.border,
                          },
                        ],
                  ]}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.starIcon, { color: isSelected ? '#ffffff' : '#94a3b8' }]}>
                    ★
                  </Text>
                  <Text style={[styles.starText, { color: isSelected ? '#ffffff' : theme.colors.text }]}>
                    {star}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Rating Description Label */}
          <View style={styles.ratingDescriptionPill}>
            <Text style={styles.ratingDescriptionText}>
              {RATING_DESCRIPTIONS[rating]}
            </Text>
          </View>

          {/* Quick Feedback Tags */}
          <Text style={[styles.label, { color: theme.colors.text, marginTop: 12 }]}>
            Key Highlights (Optional)
          </Text>
          <View style={styles.tagsContainer}>
            {FEEDBACK_TAGS.map((tag) => {
              const isTagSelected = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagPill,
                    isTagSelected
                      ? styles.tagPillActive
                      : [
                          styles.tagPillInactive,
                          {
                            backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
                            borderColor: theme.colors.border,
                          },
                        ],
                  ]}
                  onPress={() => toggleTag(tag)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: isTagSelected ? '#ffffff' : theme.colors.subText },
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Review Text Input */}
          <Text style={[styles.label, { color: theme.colors.text, marginTop: 14 }]}>
            Your Review / Academic Feedback *
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
              Platform.select({ web: { outlineStyle: 'none' } }),
            ]}
            placeholder="Write your thoughts regarding book clarity, exercise problems, and relevance to university exams..."
            placeholderTextColor={theme.colors.subText}
            multiline
            numberOfLines={4}
            value={reviewText}
            onChangeText={setReviewText}
            textAlignVertical="top"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              { backgroundColor: theme.colors.primary },
              Platform.select({
                web: {
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
                },
              }),
            ]}
            onPress={handleSubmittedReview}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Submit Student Review</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  bookBannerCard: {
    flexDirection: 'row',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  bookThumb: {
    width: 60,
    height: 85,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  bannerInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 5,
  },
  categoryBadgeText: {
    color: '#10b981',
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 3,
  },
  bookAuthor: {
    fontSize: 12.5,
  },
  formCard: {
    borderRadius: 22,
    padding: 22,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  formIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  formIcon: {
    fontSize: 22,
  },
  formHeaderTextGroup: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  starBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  starBtnActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
    elevation: 3,
  },
  starBtnInactive: {},
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  starText: {
    fontSize: 13,
    fontWeight: '700',
  },
  ratingDescriptionPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingDescriptionText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tagPill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagPillActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  tagPillInactive: {},
  tagText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  textArea: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    fontSize: 14,
    height: 100,
    marginBottom: 18,
  },
  submitBtn: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});