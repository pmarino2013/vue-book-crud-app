<template>
  <button class="btn btn-dark" @click="getBooks">Refresh list</button>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Author</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(book, index) in books" :key="book.id">
        <td>{{ index + 1 }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.status }}</td>
        <td>
          <button class="btn btn-warning me-2" @click="bookId = book.id">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          <button class="btn btn-danger" @click="handleDelete(book.id)">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted, inject } from "vue";
import bookService from "../services/firebase-service";
const { bookId, books, getBooks } = inject("idBook");

const handleDelete = async (id) => {
  await bookService.deleteBook(id);
  getBooks();
};

onMounted(() => {
  getBooks();
});
</script>

<style></style>
