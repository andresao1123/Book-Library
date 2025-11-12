import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Book, BorrowedBook } from '../types';

export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    try {
      const booksCollection = collection(db, 'books');
      const bookSnapshot = await getDocs(booksCollection);
      const bookList = bookSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Book));
      return bookList;
    } catch (error) {
      console.log('Error fetching books:', error);
      throw error;
    }
  },

  async getBorrowedBooks(): Promise<BorrowedBook[]> {
    try {
      const borrowedCollection = collection(db, 'borrowedBooks');
      const borrowedSnapshot = await getDocs(borrowedCollection);
      const borrowedList = borrowedSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          bookId: data.bookId,
          borrowedAt: data.borrowedAt.toDate(),
          bookData: data.bookData
        } as BorrowedBook;
      });
      return borrowedList;
    } catch (error) {
      console.log('Error fetching borrowed books:', error);
      throw error;
    }
  },

  async borrowBook(book: Book): Promise<void> {
    try {
      const borrowedCollection = collection(db, 'borrowedBooks');
      
      const q = query(borrowedCollection, where('bookId', '==', book.id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        throw new Error('This book is already borrowed');
      }

      const allBorrowed = await getDocs(borrowedCollection);
      if (allBorrowed.size >= 3) {
        throw new Error('You cannot borrow more than 3 books at a time');
      }

      await addDoc(borrowedCollection, {
        bookId: book.id,
        borrowedAt: Timestamp.now(),
        bookData: book
      });
    } catch (error) {
      console.log('Error borrowing book:', error);
      throw error;
    }
  },

  async returnBook(borrowedBookId: string): Promise<void> {
    try {
      const borrowedDocRef = doc(db, 'borrowedBooks', borrowedBookId);
      await deleteDoc(borrowedDocRef);
    } catch (error) {
      console.log('Error returning book:', error);
      throw error;
    }
  },

  async isBookBorrowed(bookId: string): Promise<boolean> {
    try {
      const borrowedCollection = collection(db, 'borrowedBooks');
      const q = query(borrowedCollection, where('bookId', '==', bookId));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.log('Error checking borrowed status:', error);
      return false;
    }
  }
};