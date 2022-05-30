import { db } from "../firebase";

import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const bookCollectionRef = collection(db, "books");

class BookDataService {
  addBook(newBook) {
    return addDoc(bookCollectionRef, newBook);
  }
  updateBook(id, updatedBook) {
    const bookDoc = doc(db, "books", id);

    return updateDoc(bookDoc, updatedBook);
  }
  deleteBook(id) {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  }
  getBooks() {
    return getDocs(bookCollectionRef);
  }
  getBook(id) {
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  }
}

export default new BookDataService();
