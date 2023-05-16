<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/drawings" class="navbar-brand" v-if="token">На главную</router-link>
      <div>

        <ul class="navbar-nav ml-auto" v-if="token">
          <li class="nav-item" v-if="isAdmin">
            <router-link to="/register" class="nav-link">Зарегистрировать пользователя</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <div class="nav-link"> | </div>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link to="/settings" class="nav-link">Настройки</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
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

export default {
  name: 'NavComponent',
  data() {
    return {
      token: '',
      isAdmin: false
    }
  },
  methods: {
    getOut() {
      localStorage.removeItem('token');
      // this.$router.push('/');
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
