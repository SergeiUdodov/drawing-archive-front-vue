<template>
    <form @submit.prevent="handleSubmit">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Регистрация нового пользователя</h3>

        <div class="form-group">
            <input type="text" class="form-control" v-model="first_name" placeholder="Имя"/>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" v-model="last_name" placeholder="Фамилия"/>
        </div>

        <div class="form-group">
            <input type="email" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Пароль"/>
        </div>

        <button class="btn btn-primary btn-block" style="margin: 15px">Зарегистрировать</button>
    </form>
</template>

<script>
import axios from 'axios'
import ErrorComponent from './ErrorComponent.vue'
    export default {
        name: 'RegisterComponent',

        components: {
            ErrorComponent
        },

        data(){
            return {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                error: '',
                token: ''
            }
        },
        methods: {
            async handleSubmit(){

                if (localStorage.getItem("token")) {
                    this.token = "Bearer " + localStorage.getItem("token");

                } else {
                    this.token = "";
                }
                    try{
                const response = await axios.post('register', {
                    firstName: this.first_name,
                    lastName: this.last_name,
                    email: this.email,
                    password: this.password

                },
                {
                    headers: {
                        Authorization: this.token
                    }
                });
                
                console.log(response);
                this.$router.push('/');

                } catch (e){
                    window.scrollTo(0,0);
                    this.error = 'Не все поля заполнены / email уже существует';
                    // this.error = e;
                }
            }
        }
    }
</script>
