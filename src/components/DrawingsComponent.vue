<template>
  <div v-if="token"> 

    <form @submit.prevent="handleSubmit">

      <div class="form-group">
          <input type="text" class="form-control" v-model="request" placeholder="Введите запрос..."/>
      </div>

      <button class="btn btn-primary btn-block" style="margin: 15px">Найти</button>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Обозначение</th>
          <th scope="col">Название</th>
          <th scope="col">Версия</th>
          <th scope="col">Дата изменения</th>
          <th scope="col">Кто изменил</th>
          <th scope="col">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="drawing in drawings" :key="drawing.id">
          <td>{{ drawing.designation }}</td>
          <td>{{ drawing.name }}</td>
          <td>{{ drawing.version }}</td>
          <td>{{ drawing.date }}</td>
          <td>{{ drawing.user.firstName }} {{ drawing.user.lastName }}</td>
          <td>          
            <button type="button" class="btn btn-link" @click="openDrawing(drawing.imageURL)">
              Открыть
            </button>
            <router-link to="/updateDrawing" v-if="isAdmin" class="btn btn-link"
            @click="saveDrawingId(drawing.id)">Редактировать</router-link>
            <button v-if="isAdmin" @click="deleteDrawing(drawing.id)" class="btn btn-link">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DrawingsComponent",
  data() {
    return {
      drawings: [],
      token: "",
      isAdmin: false,
      request: '',
    };
  },
  methods: {
    async deleteDrawing(drawingId) {
      if (confirm("Вы действительно хотите удалить этот чертеж?")) {
        await axios.delete("api/deleteDrawing/" + drawingId, {
          headers: {
            Authorization: this.token,
          },
        });
        // window.location.replace('/');
        document.location.reload();
      }
    },
    saveDrawingId(drawingId) {
      localStorage.setItem("drawingId", drawingId);
    },
    async handleSubmit(){

    await axios
      .get("api/drawings/" + this.request)
      .then((response) => {
        this.drawings = response.data;
      });
    },
    openDrawing(drawingURL) {
      window.open(drawingURL, '_blank').focus();
    },
  },
  async created() {
    if (localStorage.getItem("token")) {
      this.token = "Bearer " + localStorage.getItem("token");

      await axios
        .get("api/isUserAdmin", { headers: { Authorization: this.token } })
        .then((response) => {
          this.isAdmin = response.data;
        });
    } else {
      this.token = "";
      this.isAdmin = false;
      this.$router.push('/login');
      // window.location.replace('/drawings');
    }
  },
};
</script>
