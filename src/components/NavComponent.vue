<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand" v-if="token">На главную</router-link>
      <div>

        <ul class="navbar-nav ml-auto" v-if="token">
          <li class="nav-item">
            <UserComponent class="nav-link" />
          </li>
          <li class="nav-item">
            <div class="nav-link"> | </div>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link to="/addDrawing" class="nav-link">Добавить чертеж</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <div class="nav-link"> | </div>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link to="/register" class="nav-link">Зарегистрировать пользователя</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <div class="nav-link"> | </div>
          </li>
          <li class="nav-item">
            <router-link to="/settings" class="nav-link">Настройки</router-link>
          </li>
          <li class="nav-item">
            <div class="nav-link"> | </div>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="getOut" class="nav-link">Выйти</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import UserComponent from './UserComponent.vue'

export default {
  name: 'NavComponent',
  components: {
    UserComponent

  },
  data() {
    return {
      token: '',
      isAdmin: false
    }
  },
  methods: {
    getOut() {
      localStorage.removeItem('token');
      // this.$router.push('/login');
      window.location.replace('/');
    }
  },
  async created() {
    if (localStorage.getItem('token')) {
      this.token = 'Bearer ' + localStorage.getItem('token');

      await axios.get('api/isUserAdmin', { headers: { Authorization: this.token } })
        .then((response) => {
          this.isAdmin = response.data;
        });
    }
    else {
      this.token = '';
      this.isAdmin = false;
    }
  }
}
</script>
