// src/components/BorrowedBookCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BorrowedBook } from '../types';

interface BorrowedBookCardProps {
  borrowedBook: BorrowedBook;
  onReturn: () => void;
}

export const BorrowedBookCard: React.FC<BorrowedBookCardProps> = ({ 
  borrowedBook, 
  onReturn 
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: borrowedBook.bookData.coverUrl }} 
        style={styles.cover}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {borrowedBook.bookData.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {borrowedBook.bookData.author}
        </Text>
        <Text style={styles.borrowedDate}>
          Borrowed: {formatDate(borrowedBook.borrowedAt)}
        </Text>
        <TouchableOpacity 
          style={styles.returnButton} 
          onPress={onReturn}
          activeOpacity={0.7}
        >
          <Text style={styles.returnButtonText}>Return Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cover: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  borrowedDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  returnButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});