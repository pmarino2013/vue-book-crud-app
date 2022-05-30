<script setup>
import bookService from "../services/firebase-service";
import { ref, watch, inject } from "vue";

const { bookId, getBooks } = inject("idBook"); //Traigo las referencias reactivas que necesito

//Inicializo referencias reactivas
const title = ref("");
const author = ref("");
const status = ref("Available");

const flag = ref(true);
const message = ref({ error: false, msg: "" });

//Manejo de estado de botones Available o not available
const handleStatus = () => {
  if (flag.value) {
    status.value = "Not Available";
    flag.value = false;
  } else {
    status.value = "Available";
    flag.value = true;
  }
};

//Efecto cuando cambia el id
watch(bookId, () => {
  editHandler();
});

//Evento submit del formulario cuando cargo nuevo libro o actualizo uno editado
const handleSubmit = async (e) => {
  e.preventDefault();

  if (title.value === "" || author.value === "") {
    message.value = { error: true, msg: "Debe ingresar todos los datos" };
    return;
  }

  const newBook = {
    title: title.value,
    author: author.value,
    status: status.value,
  };

  try {
    if (bookId.value) {
      await bookService.updateBook(bookId.value, newBook);
      message.value = { error: false, msg: "Libro actualizado!" };
      bookId.value = "";
    } else {
      await bookService.addBook(newBook);
      message.value = { error: false, msg: "Libro guardado con éxito!" };
    }
  } catch (error) {
    message.value = { error: true, msg: error.message };
  }
  title.value = "";
  author.value = "";
  setTimeout(() => {
    message.value = "";
  }, 2000);
  getBooks();
};

//Cuando cambia el id ejecuto esta función para cargar los datos del libro a editar
const editHandler = async () => {
  message.value = "";

  if (bookId.value) {
    try {
      const docSnap = await bookService.getBook(bookId.value);
      title.value = docSnap.data().title;
      author.value = docSnap.data().author;
      status.value = docSnap.data().status;
      if (status.value === "Available") {
        flag.value = true;
      } else {
        flag.value = false;
      }
    } catch (error) {
      message.value = { error: true, msg: error.message };
    }
  }
};
</script>

<template>
  <div
    v-if="message?.msg"
    class="alert"
    :class="message?.error ? 'alert-danger' : 'alert-success'"
    role="alert"
  >
    {{ message.msg }}
  </div>

  <form @submit="handleSubmit">
    <div class="input-group mb-3">
      <span class="input-group-text">B</span>
      <input
        type="text"
        class="form-control"
        placeholder="Ingrese el título del libro..."
        v-model="title"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">A</span>
      <input
        type="text"
        class="form-control"
        placeholder="Ingrese el autor del libro..."
        v-model="author"
      />
    </div>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button class="btn btn-primary" :disabled="flag" @click="handleStatus">
        Available
      </button>
      <button class="btn btn-danger" :disabled="!flag" @click="handleStatus">
        Not Available
      </button>
    </div>
    <div class="d-grid mt-3">
      <button class="btn btn-primary">Add | Update</button>
    </div>
  </form>
</template>

<style></style>
