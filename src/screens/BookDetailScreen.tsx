import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParamList  } from '../types';
import { bookService } from '../services/bookService';

type Props = NativeStackScreenProps<LibraryStackParamList , 'BookDetail'>;

export const BookDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { book } = route.params;
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    checkBorrowedStatus();
  }, []);

  const checkBorrowedStatus = async () => {
    const borrowed = await bookService.isBookBorrowed(book.id);
    setIsBorrowed(borrowed);
  };

  const handleBorrowBook = async () => {
    if (isBorrowed) {
      Alert.alert('Already Borrowed', 'You have already borrowed this book.');
      return;
    }

    setIsBorrowing(true);
    try {
      await bookService.borrowBook(book);
      Alert.alert(
        'Success', 
        'Book borrowed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsBorrowed(true);
            }
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to borrow book');
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: book.coverUrl }} 
        style={styles.cover}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Genre</Text>
            <Text style={styles.metaValue}>{book.genre}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Published</Text>
            <Text style={styles.metaValue}>{book.publishedYear}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>ISBN</Text>
            <Text style={styles.metaValue}>{book.isbn}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.borrowButton,
            (isBorrowing || isBorrowed) && styles.borrowButtonDisabled
          ]} 
          onPress={handleBorrowBook}
          disabled={isBorrowing || isBorrowed}
          activeOpacity={0.7}
        >
          {isBorrowing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.borrowButtonText}>
              {isBorrowed ? 'Already Borrowed' : 'Borrow Book'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cover: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  borrowButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  borrowButtonDisabled: {
    backgroundColor: '#ccc',
  },
  borrowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});