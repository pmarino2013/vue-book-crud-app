<script setup>
import { ref, provide } from "vue";
import bookService from "./services/firebase-service";

import AddBook from "./components/AddBook.vue";
import BookList from "./components/BookList.vue";

const bookId = ref("");
const books = ref([]);
const getBooks = async () => {
  const data = await bookService.getBooks();
  books.value = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

provide("idBook", { bookId, books, getBooks }); //Compartir referencias a todos los componentes
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-4 offset-md-4">
        <AddBook />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col">
        <BookList />
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
