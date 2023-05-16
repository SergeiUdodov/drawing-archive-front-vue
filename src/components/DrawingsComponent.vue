<template>
  <div v-if="token"> 
        <div v-for="drawing in drawings" :key="drawing.id">

          <div class="block">
                <img v-bind:src="drawing.imageURL" />
                <h5>{{ drawing.designation }}</h5>
                <p>{{ drawing.name }}</p>
          </div>

          <button v-if="isAdmin" type="button" class="btn btn-link" @click="deleteDrawing(drawing.id)">
            Удалить чертеж
          </button>

          <router-link to="/updateDrawing" v-if="isAdmin" class="btn btn-link"
            @click="saveDrawingId(drawing.id)">Редактировать чертеж</router-link>

          <div style="display: flex; align-items: flex-end; margin-bottom: 10px; margin-left: 10px">
            <div style="margin: 5px">Обновлено {{ drawing.date.slice(0, 16) }}</div>
          </div>

          <hr />
          <br />
        </div>
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
    }
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
    }

    await axios
      .get("api/drawings", { headers: { Authorization: this.token } })
      .then((response) => {
        this.drawings = response.data;
      });

      console.log(this.drawings);
  },
};
</script>
