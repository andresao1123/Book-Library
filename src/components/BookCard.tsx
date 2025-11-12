import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image 
        source={{ uri: book.coverUrl }} 
        style={styles.cover}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        <Text style={styles.genre}>{book.genre}</Text>
      </View>
    </TouchableOpacity>
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
    justifyContent: 'center',
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
  genre: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});