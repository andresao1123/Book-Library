import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList, BorrowedBook } from '../types';
import { BorrowedBookCard } from '../components/BorrowedBookCard';
import { bookService } from '../services/bookService';

type Props = NativeStackScreenProps<RootTabParamList, 'BorrowedBooks'>;

export const BorrowedBooksScreen: React.FC<Props> = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBorrowedBooks = async () => {
    try {
      const books = await bookService.getBorrowedBooks();
      setBorrowedBooks(books);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      Alert.alert('Error', 'Failed to load borrowed books');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBorrowedBooks();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBorrowedBooks();
    setRefreshing(false);
  }, []);

  const handleReturnBook = async (borrowedBookId: string, bookTitle: string) => {
    Alert.alert(
      'Return Book',
      `Are you sure you want to return "${bookTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Return',
          style: 'destructive',
          onPress: async () => {
            try {
              await bookService.returnBook(borrowedBookId);
              Alert.alert('Success', 'Book returned successfully!');
              fetchBorrowedBooks();
            } catch (error) {
              Alert.alert('Error', 'Failed to return book');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading borrowed books...</Text>
      </View>
    );
  }

  if (borrowedBooks.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No borrowed books</Text>
        <Text style={styles.emptySubtext}>
          Borrow books from the library to see them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Borrowed: {borrowedBooks.length}/3
        </Text>
      </View>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BorrowedBookCard 
            borrowedBook={item}
            onReturn={() => handleReturnBook(item.id, item.bookData.title)}
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
    paddingHorizontal: 40,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});