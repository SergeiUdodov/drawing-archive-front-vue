<template>
    <form @submit.prevent="handleSubmit">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Вход в систему</h3>

        <div class="form-group">
            <input type="text" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Пароль"/>
        </div>

        <button class="btn btn-primary btn-block" style="margin: 15px">Войти</button>
    </form>
</template>

<script>
    import axios from 'axios'
    import ErrorComponent from './ErrorComponent.vue'
    export default {
        name: 'LoginComponent',

        components: {
            ErrorComponent
        },

        data() {
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            async handleSubmit(){
                try{
                const response = await axios.post('authenticate', {
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('token', response.data.jwttoken);

                // this.$router.push('/drawings');
                window.location.replace('/');
                
            } catch (e){
                window.scrollTo(0,0);
                this.error = 'Неверный email или пароль'
            }
            } 
        }
    }
</script>
