import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParamList ,Book } from '../types';
import { BookCard } from '../components/BookCard';
import { bookService } from '../services/bookService';

type Props = NativeStackScreenProps<LibraryStackParamList , 'BookList'>;

export const BookListScreen: React.FC<Props> = ({ navigation }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await bookService.getAllBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  }, []);

  const handleBookPress = (book: Book) => {
    navigation.navigate('BookDetail', { book });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading books...</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No books available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard 
            book={item} 
            onPress={() => handleBookPress(item)} 
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});