<template>
  <div>
    <ErrorComponent v-if="error" :error="error" />

    <h3>Настройки</h3>
    <h5>Персональные данные</h5>
    <div class="form-group">
      <label>Имя</label>
      <input type="text" class="form-control" v-model="firstName" />
    </div>
    <div class="form-group">
      <label>Фамилия</label>
      <input type="text" class="form-control" v-model="lastName" />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email" />
    </div>
    <div class="form-group">
      <label>Новый пароль</label>
      <input type="password" class="form-control" v-model="password" />
    </div>
    <div class="form-group">
      <label>Подтверждение пароля</label>
      <input type="password" class="form-control" v-model="passwordConfirmation" />
    </div>
    <br>
    <button @click="updateUser()" class="btn btn-primary btn-block" style="margin: 15px">Сохранить</button>
    <router-link to="/" class="btn btn-primary btn-block" style="margin: 15px">Назад</router-link>
  </div>
</template>

<script>
import axios from "axios";
import ErrorComponent from './ErrorComponent.vue';

export default {
  name: "UserSettings",
  components: {
    ErrorComponent
  },
  data() {
    return {
      user: {},
      email: '',
      initialEmail: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      token: '',
      isAdmin: false,
      error: ''
    };
  },
  methods: {
    async updateUser() {
      try {

        if(this.password != this.passwordConfirmation){
          window.scrollTo(0,0);
          throw new Error('Пароли не совпадают');
        }

        await axios.put('updateUser',
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          },
          {
            headers: {
              Authorization: this.token
            }
          });

        if (this.initialEmail != this.email || this.password != '') {
          localStorage.removeItem('token');
          // this.$router.push('/');
          window.location.replace('/');
        }

        // document.location.reload();
        // this.$router.push('/');
        window.location.replace('/');
        

      } catch (e) {
        this.error = e.message;
      }
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

    if (!this.token) {
      return;
    }

    await axios.get('api/userByToken', { headers: { Authorization: this.token } })
      .then((response) => {
        this.user = response.data;

        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.email = this.user.email;
        this.initialEmail = this.user.email;

      });
  }
};
</script>