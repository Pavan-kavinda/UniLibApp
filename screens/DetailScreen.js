// screens/DetailScreen.js
import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useTheme } from '../ThemeContext';

// Initial preloaded authentic university reviews per book
const INITIAL_REVIEWS_BY_BOOK = {
  '1': [
    {
      id: 'rev-1',
      studentId: 'STU-2023-014',
      rating: 5,
      comment: 'Essential reading for the Data Structures & Algorithms module. Robert Lafore explains concepts with wonderful clarity.',
      date: 'Nov 12, 2026',
    },
    {
      id: 'rev-2',
      studentId: 'CS-2024-042',
      rating: 4,
      comment: 'Great diagrams and code examples. Hard copy from the 2nd floor library shelf is in pristine condition.',
      date: 'Oct 30, 2026',
    },
  ],
  '2': [
    {
      id: 'rev-3',
      studentId: 'CS-2023-118',
      rating: 5,
      comment: 'The gold standard for database normalization, SQL queries, and transaction management. Highly recommended!',
      date: 'Nov 08, 2026',
    },
    {
      id: 'rev-4',
      studentId: 'IT-2024-025',
      rating: 4,
      comment: 'Very thorough explanations of ACID properties and relational algebra.',
      date: 'Oct 25, 2026',
    },
  ],
  '3': [
    {
      id: 'rev-5',
      studentId: 'SE-2023-089',
      rating: 5,
      comment: 'Comprehensive guide covering Scrum, Agile, and software architectural patterns needed for our group project.',
      date: 'Nov 04, 2026',
    },
  ],
  '4': [
    {
      id: 'rev-6',
      studentId: 'SE-2022-019',
      rating: 5,
      comment: 'Must-read for every aspiring software engineer. Completely transformed how I structure functions and classes.',
      date: 'Nov 11, 2026',
    },
    {
      id: 'rev-7',
      studentId: 'CS-2024-061',
      rating: 5,
      comment: 'Brilliant insights by Uncle Bob. Short, punchy, and highly practical examples.',
      date: 'Oct 18, 2026',
    },
  ],
  '101': [
    {
      id: 'rev-8',
      studentId: 'MGT-2024-033',
      rating: 5,
      comment: 'Practical and actionable frameworks for habit stacking and building daily study disciplines.',
      date: 'Nov 09, 2026',
    },
    {
      id: 'rev-9',
      studentId: 'ENG-2023-104',
      rating: 5,
      comment: 'Read this during exam season and it helped me manage distractions and improve study consistency.',
      date: 'Oct 29, 2026',
    },
  ],
};

const RATING_DESCRIPTIONS = {
  5: '⭐⭐⭐⭐⭐ Excellent (5/5)',
  4: '⭐⭐⭐⭐ Very Good (4/5)',
  3: '⭐⭐⭐ Good (3/5)',
  2: '⭐⭐ Fair (2/5)',
  1: '⭐ Needs Improvement (1/5)',
};

export default function DetailScreen({ route, navigation }) {
  const { book = {} } = route.params || {};
  const { theme, isDarkMode } = useTheme();

  // Active Tab: 'overview' | 'reviews'
  const [activeTab, setActiveTab] = useState('overview');

  // Book Reservation State
  const [availableCopies, setAvailableCopies] = useState(book.availableCopies ?? 3);
  const [isReserved, setIsReserved] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState(() => {
    if (book.id && INITIAL_REVIEWS_BY_BOOK[book.id]) {
      return INITIAL_REVIEWS_BY_BOOK[book.id];
    }
    return [
      {
        id: 'rev-init-1',
        studentId: 'STU-2024-012',
        rating: 5,
        comment: 'Exceptional academic resource available on university shelves. Clear explanations and well structured.',
        date: 'Nov 01, 2026',
      },
      {
        id: 'rev-init-2',
        studentId: 'STU-2023-097',
        rating: 4,
        comment: 'Very informative and directly aligned with our university semester curriculum.',
        date: 'Oct 20, 2026',
      },
    ];
  });

  // Add Review Form State
  const [studentId, setStudentId] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [formSuccessMessage, setFormSuccessMessage] = useState(false);

  // Calculate Average Rating & Distribution
  const totalReviews = reviews.length;
  const averageRating = useMemo(() => {
    if (totalReviews === 0) return '0.0';
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / totalReviews).toFixed(1);
  }, [reviews, totalReviews]);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (counts[r.rating] !== undefined) {
        counts[r.rating] += 1;
      }
    });
    return counts;
  }, [reviews]);

  // Handle Book Reservation
  const handleReserve = useCallback(() => {
    if (availableCopies > 0 && !isReserved) {
      setAvailableCopies((prev) => prev - 1);
      setIsReserved(true);
      Alert.alert('Reserved Successfully', `You have successfully reserved "${book.title}". Please collect it from the front desk within 48 hours.`);
    } else if (isReserved) {
      Alert.alert('Notice', 'You have already reserved this book.');
    } else {
      Alert.alert('Out of Stock', 'Sorry, no copies are currently available for this title.');
    }
  }, [availableCopies, isReserved, book.title]);

  // Handle Submit Review
  const handleSubmitReview = useCallback(() => {
    if (!studentId.trim()) {
      Alert.alert('Required Field', 'Please enter your Student ID (e.g., STU-2024-089).');
      return;
    }
    if (!commentText.trim()) {
      Alert.alert('Required Field', 'Please enter your review comments before submitting.');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      studentId: studentId.trim().toUpperCase(),
      rating: userRating,
      comment: commentText.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setReviews((prev) => [newReview, ...prev]);
    setStudentId('');
    setCommentText('');
    setUserRating(5);
    setFormSuccessMessage(true);

    setTimeout(() => {
      setFormSuccessMessage(false);
    }, 4500);

    Alert.alert('Review Submitted', 'Thank you! Your review has been added to UniLib.');
  }, [studentId, commentText, userRating]);

  // Category Badge Colors
  const categoryBadgeColors = useMemo(() => {
    switch (book.category) {
      case 'Computer Science':
        return {
          bg: isDarkMode ? 'rgba(16, 185, 129, 0.18)' : '#ecfdf5',
          text: isDarkMode ? '#34d399' : '#059669',
          border: isDarkMode ? 'rgba(16, 185, 129, 0.35)' : '#a7f3d0',
        };
      case 'Software Engineering':
        return {
          bg: isDarkMode ? 'rgba(56, 189, 248, 0.18)' : '#e0f2fe',
          text: isDarkMode ? '#38bdf8' : '#0284c7',
          border: isDarkMode ? 'rgba(56, 189, 248, 0.35)' : '#bae6fd',
        };
      case 'Self-Improvement':
        return {
          bg: isDarkMode ? 'rgba(192, 132, 252, 0.18)' : '#faf5ff',
          text: isDarkMode ? '#c084fc' : '#9333ea',
          border: isDarkMode ? 'rgba(192, 132, 252, 0.35)' : '#e9d5ff',
        };
      default:
        return {
          bg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
          text: isDarkMode ? '#94a3b8' : '#475569',
          border: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0',
        };
    }
  }, [book.category, isDarkMode]);

  return (
    <ScrollView
      style={[styles.screenWrapper, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer}>
        {/* Floating Book Hero Card */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 12px 30px -4px rgba(0, 0, 0, 0.5)'
                  : '0 12px 30px -4px rgba(16, 185, 129, 0.1), 0 4px 12px rgba(0,0,0,0.05)',
              },
            }),
          ]}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: book.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.heroDetails}>
            <View
              style={[
                styles.categoryBadge,
                {
                  backgroundColor: categoryBadgeColors.bg,
                  borderColor: categoryBadgeColors.border,
                },
              ]}
            >
              <Text style={[styles.categoryText, { color: categoryBadgeColors.text }]}>
                {book.category || 'Academic Resource'}
              </Text>
            </View>

            <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={2}>
              {book.title || 'Book Details'}
            </Text>

            <Text style={[styles.author, { color: theme.colors.subText }]}>
              By {book.author || 'University Faculty'}
            </Text>

            {/* Quick Rating Preview Tag that jumps to Reviews tab */}
            <TouchableOpacity
              style={[
                styles.ratingPill,
                {
                  backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
                  borderColor: isDarkMode ? 'rgba(16, 185, 129, 0.3)' : '#a7f3d0',
                },
              ]}
              onPress={() => setActiveTab('reviews')}
              activeOpacity={0.7}
            >
              <Text style={styles.ratingPillStars}>⭐ {averageRating} / 5.0</Text>
              <Text style={styles.ratingPillCount}>
                ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}) →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Switcher / Toggle Navigation */}
        <View
          style={[
            styles.tabBarContainer,
            {
              backgroundColor: isDarkMode ? '#161b22' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 6px 16px -2px rgba(0, 0, 0, 0.4)'
                  : '0 6px 16px -2px rgba(16, 185, 129, 0.06)',
              },
            }),
          ]}
        >
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'overview' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('overview')}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'overview' }}
          >
            <Text
              style={[
                styles.tabButtonText,
                { color: activeTab === 'overview' ? '#ffffff' : theme.colors.subText },
              ]}
            >
              📖 Overview & Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'reviews' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('reviews')}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'reviews' }}
          >
            <Text
              style={[
                styles.tabButtonText,
                { color: activeTab === 'reviews' ? '#ffffff' : theme.colors.subText },
              ]}
            >
              ⭐ Reviews & Ratings ({totalReviews})
            </Text>
          </TouchableOpacity>
        </View>

        {/* TAB 1: OVERVIEW & DETAILS */}
        {activeTab === 'overview' && (
          <View
            style={[
              styles.contentCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
              },
              Platform.select({
                web: {
                  boxShadow: isDarkMode
                    ? '0 10px 25px -4px rgba(0, 0, 0, 0.45)'
                    : '0 10px 25px -4px rgba(16, 185, 129, 0.08)',
                },
              }),
            ]}
          >
            <Text style={[styles.sectionHeading, { color: theme.colors.text }]}>
              Academic Specifications
            </Text>

            <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.infoLabel, { color: theme.colors.subText }]}>ISBN:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {book.isbn || '978-0132350884'}
              </Text>
            </View>

            <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.infoLabel, { color: theme.colors.subText }]}>Shelf Location:</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                {book.shelf || 'Main Library - Floor 2'}
              </Text>
            </View>

            <View style={[styles.infoRow, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.infoLabel, { color: theme.colors.subText }]}>Available Copies:</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: availableCopies > 0 ? theme.colors.primary : '#ef4444',
                    fontWeight: '800',
                  },
                ]}
              >
                {availableCopies > 0 ? `✓ ${availableCopies} copies on shelf` : '✕ Currently Out of Stock'}
              </Text>
            </View>

            <Text style={[styles.sectionHeading, { color: theme.colors.text, marginTop: 22 }]}>
              Description
            </Text>
            <Text style={[styles.descriptionText, { color: theme.colors.subText }]}>
              {book.description ||
                'Standard university library academic textbook designed for coursework, module research, and comprehensive self-study.'}
            </Text>

            {/* Reserve Action Button */}
            <TouchableOpacity
              style={[
                styles.primaryBtn,
                {
                  backgroundColor:
                    availableCopies > 0 && !isReserved
                      ? theme.colors.primary
                      : isReserved
                      ? '#10b981'
                      : '#94a3b8',
                },
                Platform.select({
                  web: {
                    boxShadow: availableCopies > 0
                      ? '0 6px 18px rgba(16, 185, 129, 0.35)'
                      : 'none',
                  },
                }),
              ]}
              onPress={handleReserve}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>
                {isReserved
                  ? 'Reserved Successfully ✅'
                  : availableCopies > 0
                  ? 'Reserve This Book Now'
                  : 'Out of Stock'}
              </Text>
            </TouchableOpacity>

            {/* Switch to Reviews Shortcut Button */}
            <TouchableOpacity
              style={[
                styles.secondaryBtn,
                {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setActiveTab('reviews')}
              activeOpacity={0.8}
            >
              <Text style={[styles.secondaryBtnText, { color: theme.colors.text }]}>
                ⭐ View Student Reviews & Feedback ({totalReviews})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* TAB 2: REVIEWS & RATINGS */}
        {activeTab === 'reviews' && (
          <View style={styles.reviewsContainer}>
            {/* RATINGS SCORECARD */}
            <View
              style={[
                styles.scorecard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
                },
                Platform.select({
                  web: {
                    boxShadow: isDarkMode
                      ? '0 10px 25px -4px rgba(0, 0, 0, 0.45)'
                      : '0 10px 25px -4px rgba(16, 185, 129, 0.08)',
                  },
                }),
              ]}
            >
              <View style={styles.scorecardMain}>
                <Text style={[styles.bigRatingNumber, { color: theme.colors.text }]}>
                  {averageRating}
                </Text>
                <Text style={styles.starsRow}>
                  {'★'.repeat(Math.round(Number(averageRating)))}
                  {'☆'.repeat(5 - Math.round(Number(averageRating)))}
                </Text>
                <Text style={[styles.scorecardCountText, { color: theme.colors.subText }]}>
                  Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </Text>
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>✓ 96% Student Approval</Text>
                </View>
              </View>

              {/* Star Distribution Breakdown */}
              <View style={styles.breakdownContainer}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingCounts[star] || 0;
                  const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <View key={star} style={styles.breakdownRow}>
                      <Text style={[styles.starLabel, { color: theme.colors.text }]}>
                        {star} ★
                      </Text>
                      <View
                        style={[
                          styles.barTrack,
                          {
                            backgroundColor: isDarkMode
                              ? 'rgba(255, 255, 255, 0.08)'
                              : '#e2e8f0',
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.barFill,
                            {
                              width: `${pct}%`,
                              backgroundColor: '#10b981',
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.countLabel, { color: theme.colors.subText }]}>
                        {count}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* ADD REVIEW FORM */}
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
                      ? '0 8px 24px -4px rgba(0, 0, 0, 0.4)'
                      : '0 8px 24px -4px rgba(16, 185, 129, 0.1)',
                  },
                }),
              ]}
            >
              <View style={styles.formHeader}>
                <Text style={[styles.formTitle, { color: theme.colors.text }]}>
                  ✍️ Write a Student Review
                </Text>
                <Text style={[styles.formSubtitle, { color: theme.colors.subText }]}>
                  Help fellow students by rating course relevance and textbook clarity.
                </Text>
              </View>

              {formSuccessMessage && (
                <View style={styles.successBanner}>
                  <Text style={styles.successBannerText}>
                    ✅ Your review was posted successfully!
                  </Text>
                </View>
              )}

              {/* Student ID Input */}
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                Student Registration ID
              </Text>
              <TextInput
                style={[
                  styles.textInput,
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

              {/* Interactive Star Rating Selector */}
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                Select Your Rating (1 - 5 Stars)
              </Text>
              <View style={styles.starsPicker}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isSelected = userRating >= star;
                  return (
                    <TouchableOpacity
                      key={star}
                      style={[
                        styles.starPickBtn,
                        isSelected
                          ? styles.starPickBtnActive
                          : [
                              styles.starPickBtnInactive,
                              {
                                backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
                                borderColor: theme.colors.border,
                              },
                            ],
                      ]}
                      onPress={() => setUserRating(star)}
                      activeOpacity={0.7}
                      accessibilityLabel={`Rate ${star} star`}
                    >
                      <Text
                        style={[
                          styles.starPickIcon,
                          { color: isSelected ? '#ffffff' : theme.colors.subText },
                        ]}
                      >
                        ★
                      </Text>
                      <Text
                        style={[
                          styles.starPickNumber,
                          { color: isSelected ? '#ffffff' : theme.colors.text },
                        ]}
                      >
                        {star}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Rating Description Label */}
              <Text style={[styles.ratingDescriptionText, { color: theme.colors.primary }]}>
                {RATING_DESCRIPTIONS[userRating]}
              </Text>

              {/* Review Comment Input */}
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                Review Feedback / Comments
              </Text>
              <TextInput
                style={[
                  styles.textAreaInput,
                  {
                    backgroundColor: isDarkMode ? '#0d1117' : '#f8fafc',
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  },
                  Platform.select({ web: { outlineStyle: 'none' } }),
                ]}
                placeholder="Share your thoughts on book difficulty, module relevance, and quality..."
                placeholderTextColor={theme.colors.subText}
                multiline
                numberOfLines={4}
                value={commentText}
                onChangeText={setCommentText}
                textAlignVertical="top"
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.primaryBtn,
                  { backgroundColor: theme.colors.primary, marginTop: 6 },
                  Platform.select({
                    web: {
                      boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)',
                    },
                  }),
                ]}
                onPress={handleSubmitReview}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Submit Student Review</Text>
              </TouchableOpacity>
            </View>

            {/* REVIEWS LIST */}
            <View style={styles.reviewsListHeader}>
              <Text style={[styles.reviewsListTitle, { color: theme.colors.text }]}>
                Student Reviews ({totalReviews})
              </Text>
              <Text style={[styles.reviewsListSubtitle, { color: theme.colors.subText }]}>
                Verified campus feedback
              </Text>
            </View>

            {reviews.map((rev) => (
              <View
                key={rev.id}
                style={[
                  styles.reviewCard,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: isDarkMode
                      ? 'rgba(255, 255, 255, 0.08)'
                      : theme.colors.border,
                  },
                  Platform.select({
                    web: {
                      boxShadow: isDarkMode
                        ? '0 6px 18px -2px rgba(0, 0, 0, 0.4)'
                        : '0 6px 18px -2px rgba(0, 0, 0, 0.04)',
                    },
                  }),
                ]}
              >
                <View style={styles.reviewCardHeader}>
                  <View style={styles.studentInfo}>
                    <View style={styles.avatarCircle}>
                      <Text style={styles.avatarText}>🎓</Text>
                    </View>
                    <View>
                      <Text style={[styles.studentIdText, { color: theme.colors.text }]}>
                        {rev.studentId}
                      </Text>
                      <Text style={[styles.reviewDate, { color: theme.colors.subText }]}>
                        {rev.date}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.reviewRatingPill,
                      {
                        backgroundColor: isDarkMode
                          ? 'rgba(16, 185, 129, 0.15)'
                          : '#ecfdf5',
                      },
                    ]}
                  >
                    <Text style={styles.reviewRatingStars}>
                      {'★'.repeat(rev.rating)}
                    </Text>
                    <Text style={styles.reviewRatingScore}>{rev.rating}.0</Text>
                  </View>
                </View>

                <Text style={[styles.reviewComment, { color: theme.colors.text }]}>
                  "{rev.comment}"
                </Text>

                <View style={styles.reviewFooter}>
                  <Text style={styles.verifiedTag}>✓ Verified UniLib Student</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.select({
      web: 80,
      ios: 50,
      android: 40,
      default: 60,
    }),
    flexGrow: 1,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 780,
    alignSelf: 'center',
  },
  // Hero Card
  heroCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  imageWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 105,
    height: 155,
    borderRadius: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
  },
  heroDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 4,
    lineHeight: 23,
  },
  author: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  ratingPillStars: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10b981',
    marginRight: 4,
  },
  ratingPillCount: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10b981',
  },

  // Tab Switcher / Toggle
  tabBarContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 5,
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Overview Content Card
  contentCard: {
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 13.5,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  primaryBtn: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
  },

  // Reviews Container
  reviewsContainer: {
    width: '100%',
  },

  // Ratings Scorecard
  scorecard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  scorecardMain: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 18,
    borderRightWidth: 1,
    borderRightColor: 'rgba(100, 116, 139, 0.15)',
    minWidth: 130,
  },
  bigRatingNumber: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -1,
  },
  starsRow: {
    fontSize: 16,
    color: '#f59e0b',
    letterSpacing: 2,
    marginBottom: 4,
  },
  scorecardCountText: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  recommendedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  recommendedText: {
    color: '#10b981',
    fontSize: 10.5,
    fontWeight: '700',
  },
  breakdownContainer: {
    flex: 1,
    paddingLeft: 18,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5,
  },
  starLabel: {
    fontSize: 11,
    fontWeight: '600',
    width: 26,
  },
  barTrack: {
    flex: 1,
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  countLabel: {
    fontSize: 11,
    fontWeight: '600',
    width: 18,
    textAlign: 'right',
  },

  // Add Review Form
  formCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  formHeader: {
    marginBottom: 14,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  formSubtitle: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  successBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  successBannerText: {
    color: '#10b981',
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    marginBottom: 6,
  },
  starsPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 2,
  },
  starPickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    marginHorizontal: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
  starPickBtnActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  starPickBtnInactive: {},
  starPickIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  starPickNumber: {
    fontSize: 12,
    fontWeight: '700',
  },
  ratingDescriptionText: {
    fontSize: 11.5,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  textAreaInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    height: 85,
    marginBottom: 12,
  },

  // Reviews List Header
  reviewsListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  reviewsListTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  reviewsListSubtitle: {
    fontSize: 12,
  },

  // Individual Review Card
  reviewCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 15,
  },
  studentIdText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  reviewDate: {
    fontSize: 11,
  },
  reviewRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
  },
  reviewRatingStars: {
    color: '#f59e0b',
    fontSize: 11,
    letterSpacing: 1,
    marginRight: 4,
  },
  reviewRatingScore: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
  },
  reviewComment: {
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 10,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedTag: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '600',
  },
});