// screens/CatalogScreen.js
import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import { LIBRARY_BOOKS } from '../data/books';
import { useTheme } from '../ThemeContext';

const CATEGORIES = [
  { id: 'All', label: 'All', icon: '📚' },
  { id: 'Computer Science', label: 'Computer Science', icon: '💻' },
  { id: 'Software Engineering', label: 'Software Engineering', icon: '⚙️' },
  { id: 'Self-Improvement', label: 'Self-Improvement', icon: '🧠' },
];

export default function CatalogScreen({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Real-time filtering by title, author, or category
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return LIBRARY_BOOKS.filter((book) => {
      // Category Chip Filter
      const matchesCategoryPill =
        selectedCategory === 'All' ||
        book.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategoryPill) return false;

      // Search Query Filter (Title, Author, or Category)
      if (!query) return true;

      const titleMatch = book.title.toLowerCase().includes(query);
      const authorMatch = book.author.toLowerCase().includes(query);
      const categoryMatch = book.category.toLowerCase().includes(query);
      const isbnMatch = book.isbn ? book.isbn.toLowerCase().includes(query) : false;

      return titleMatch || authorMatch || categoryMatch || isbnMatch;
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
  }, []);

  const getCategoryBadgeStyle = useCallback((category) => {
    switch (category) {
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
  }, [isDarkMode]);

  // Render individual Anti-Gravity Book Card
  const renderBookCard = useCallback(({ item }) => {
    const badgeStyle = getCategoryBadgeStyle(item.category);
    const isAvailable = item.availableCopies > 0;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : theme.colors.border,
          },
          Platform.select({
            web: {
              boxShadow: isDarkMode
                ? '0 10px 25px -4px rgba(0, 0, 0, 0.45), 0 4px 10px -2px rgba(0, 0, 0, 0.3)'
                : '0 10px 25px -4px rgba(16, 185, 129, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
            },
          }),
        ]}
        onPress={() => navigation.navigate('Details', { book: item })}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${item.title}`}
      >
        {/* Anti-Gravity Floating Book Cover */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View
            style={[
              styles.floatingStockIndicator,
              { backgroundColor: isAvailable ? '#10b981' : '#ef4444' },
            ]}
          />
        </View>

        {/* Book Details */}
        <View style={styles.infoContainer}>
          <View style={styles.metaRow}>
            {/* Category Tag */}
            <View
              style={[
                styles.categoryBadge,
                {
                  backgroundColor: badgeStyle.bg,
                  borderColor: badgeStyle.border,
                },
              ]}
            >
              <Text style={[styles.categoryText, { color: badgeStyle.text }]}>
                {item.category}
              </Text>
            </View>

            {/* Availability Pill */}
            <View
              style={[
                styles.stockPill,
                {
                  backgroundColor: isAvailable
                    ? isDarkMode
                      ? 'rgba(16, 185, 129, 0.15)'
                      : '#ecfdf5'
                    : isDarkMode
                    ? 'rgba(239, 68, 68, 0.15)'
                    : '#fef2f2',
                },
              ]}
            >
              <Text
                style={[
                  styles.stockPillText,
                  { color: isAvailable ? '#10b981' : '#ef4444' },
                ]}
              >
                {isAvailable ? `✓ ${item.availableCopies} left` : '✕ Out'}
              </Text>
            </View>
          </View>

          {/* Book Title */}
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          {/* Author */}
          <Text
            style={[styles.author, { color: theme.colors.subText }]}
            numberOfLines={1}
          >
            By {item.author}
          </Text>

          {/* Shelf location & Action row */}
          <View style={styles.footerRow}>
            <Text
              style={[styles.shelfText, { color: theme.colors.subText }]}
              numberOfLines={1}
            >
              📍 {item.shelf || 'Main Library'}
            </Text>

            <View style={styles.viewDetailsPill}>
              <Text style={styles.viewDetailsText}>View</Text>
              <Text style={styles.viewDetailsArrow}>→</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [navigation, theme, isDarkMode, getCategoryBadgeStyle]);

  // List Header with Header Banner, Search Bar, Category Chips, and Result Count
  const renderListHeader = useMemo(() => {
    return (
      <View style={styles.headerContainer}>
        {/* Banner Card */}
        <View
          style={[
            styles.bannerCard,
            {
              backgroundColor: isDarkMode ? '#161b22' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: isDarkMode
                  ? '0 8px 20px -4px rgba(0,0,0,0.4)'
                  : '0 8px 20px -4px rgba(16, 185, 129, 0.06)',
              },
            }),
          ]}
        >
          <View style={styles.bannerBadge}>
            <Text style={styles.bannerBadgeText}>✨ UniLib Discovery</Text>
          </View>
          <Text style={[styles.bannerTitle, { color: theme.colors.text }]}>
            University Book Catalog
          </Text>
          <Text style={[styles.bannerSubtitle, { color: theme.colors.subText }]}>
            Search academic resources across Computer Science, Software Engineering, and Self-Improvement.
          </Text>
        </View>

        {/* Search Input Box */}
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: theme.colors.card,
              borderColor: searchQuery ? '#10b981' : theme.colors.border,
            },
            Platform.select({
              web: {
                boxShadow: searchQuery
                  ? '0 0 0 2px rgba(16, 185, 129, 0.25), 0 4px 12px rgba(0, 0, 0, 0.05)'
                  : isDarkMode
                  ? '0 4px 12px rgba(0,0,0,0.3)'
                  : '0 4px 12px rgba(0,0,0,0.03)',
              },
            }),
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[
              styles.searchInput,
              { color: theme.colors.text },
              Platform.select({
                web: {
                  outlineStyle: 'none',
                },
              }),
            ]}
            placeholder="Search by title, author, or category..."
            placeholderTextColor={theme.colors.subText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
              activeOpacity={0.7}
              accessibilityLabel="Clear search text"
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Horizontal Category Filter Pills */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryPill,
                    isSelected
                      ? [
                          styles.categoryPillActive,
                          Platform.select({
                            web: {
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
                            },
                          }),
                        ]
                      : [
                          styles.categoryPillInactive,
                          {
                            backgroundColor: theme.colors.card,
                            borderColor: theme.colors.border,
                          },
                        ],
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.categoryPillIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.categoryPillText,
                      isSelected
                        ? styles.categoryPillTextActive
                        : { color: theme.colors.text },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Results Counter & Active Filter Strip */}
        <View style={styles.resultsBar}>
          <Text style={[styles.resultsCount, { color: theme.colors.subText }]}>
            Showing{' '}
            <Text style={[styles.resultsHighlight, { color: theme.colors.text }]}>
              {filteredBooks.length}
            </Text>{' '}
            {filteredBooks.length === 1 ? 'book' : 'books'}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </Text>

          {(searchQuery !== '' || selectedCategory !== 'All') && (
            <TouchableOpacity
              onPress={handleResetFilters}
              style={styles.resetButton}
              activeOpacity={0.7}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }, [
    isDarkMode,
    theme,
    searchQuery,
    selectedCategory,
    filteredBooks.length,
    handleResetFilters,
  ]);

  // List Empty Component
  const renderListEmpty = useCallback(() => {
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
          No Books Found
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.colors.subText }]}>
          {searchQuery
            ? `We couldn't find any books matching "${searchQuery}".`
            : `No books available under "${selectedCategory}".`}
        </Text>
        <TouchableOpacity
          style={styles.emptyResetBtn}
          onPress={handleResetFilters}
          activeOpacity={0.85}
        >
          <Text style={styles.emptyResetBtnText}>Clear Search & Filters</Text>
        </TouchableOpacity>
      </View>
    );
  }, [theme, searchQuery, selectedCategory, handleResetFilters]);

  // List Footer Component
  const renderListFooter = useCallback(() => {
    if (filteredBooks.length === 0) return null;
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footerLine} />
        <Text style={[styles.footerText, { color: theme.colors.subText }]}>
          • UniLib University Library Catalog •
        </Text>
      </View>
    );
  }, [filteredBooks.length, theme]);

  return (
    <View
      style={[
        styles.screenWrapper,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.centeredWrapper}>
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookCard}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderListEmpty}
          ListFooterComponent={renderListFooter}
          style={styles.flatList}
          contentContainerStyle={styles.listContent}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={7}
          removeClippedSubviews={Platform.OS !== 'web'}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Root Screen Wrapper: handles cross-platform heights & viewport
  screenWrapper: {
    flex: 1,
    width: '100%',
    ...Platform.select({
      web: {
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden', // Avoids double scrollbars on web
      },
      default: {
        flex: 1,
      },
    }),
  },
  // Centered wrapper for desktop web readability & mobile responsiveness
  centeredWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    ...Platform.select({
      web: {
        height: '100%',
        minHeight: 0, // Crucial for CSS flex scrolling on Web!
      },
      default: {
        flex: 1,
      },
    }),
  },
  flatList: {
    flex: 1,
    width: '100%',
    ...Platform.select({
      web: {
        height: '100%',
        minHeight: 0,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
    }),
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    // Generous bottom padding completely resolves clipping
    paddingBottom: Platform.select({
      web: 80,
      ios: 50,
      android: 40,
      default: 60,
    }),
    flexGrow: 1,
  },
  // Header section
  headerContainer: {
    marginBottom: 16,
  },
  bannerCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '700',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  // Search Box
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
    height: '100%',
  },
  clearButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(100, 116, 139, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  // Categories Section
  categoriesSection: {
    marginBottom: 14,
  },
  categoriesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryPillInactive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryPillIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  // Results status bar
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  resultsHighlight: {
    fontWeight: '700',
  },
  resetButton: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  resetButtonText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '700',
  },
  // Anti-Gravity Card Styles
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 14,
    padding: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 82,
    height: 116,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  floatingStockIndicator: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    height: 116,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  stockPill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 12,
  },
  stockPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 3,
    marginBottom: 2,
  },
  author: {
    fontSize: 12.5,
    fontWeight: '500',
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shelfText: {
    fontSize: 11.5,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  viewDetailsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10b981',
    marginRight: 2,
  },
  viewDetailsArrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10b981',
  },
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
    maxWidth: 300,
  },
  emptyResetBtn: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  emptyResetBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  // List Footer
  footerContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },
  footerLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});