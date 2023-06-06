
<template>
    <form v-if="isAdmin" @submit.prevent="addDrawing">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Добавить чертеж</h3>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:150px;" class="form-control" id="floatingInput"
                v-model="designation" />
            <label for="floatingInput">Обозначение...</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:400px;" class="form-control" id="floatingInput"
                v-model="name" />
            <label for="floatingInput">Название...</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:120px;" class="form-control" id="floatingInput"
                v-model="imageURL" />
            <label for="floatingInput">Ссылка на чертеж...</label>
        </div>

        <button class="btn btn-primary btn-block" style="margin: 15px">Сохранить</button>
        <router-link to="/" class="btn btn-primary btn-block" style="margin: 15px">Назад</router-link>
    </form>
</template>

<script>
import axios from 'axios'
import ErrorComponent from './ErrorComponent.vue'

export default {
    name: 'AddDrawing',
    components: {
        ErrorComponent
    },
    data() {
        return {
            designation: '',
            name: '',
            imageURL: '',
            error: '',
            token: '',
            isAdmin: false
        }
    },
    methods: {
        async addDrawing() {
            try {
                if (this.designation.trim() === '' || this.name.trim() === '' || this.imageURL.trim() === '') {
                    window.scrollTo(0,0);
                    throw new Error('Все поля должны быть заполнены');
                }
                
                await axios.get('api/drawingByDesignation/' + this.designation,
                    {
                        headers: {
                            Authorization: this.token
                        }
                    }).then((response) => {
                if(response.data.designation === this.designation){
                    console.log(response.data.designation);
                    console.log(this.designation);
                    // this.designation = '';
                    window.scrollTo(0,0);
                    throw new Error('Чертеж с таким обозначением уже есть в базе данных');
                }
                });

                await axios.post('api/addDrawing',
                    {
                        designation: this.designation,
                        name: this.name,
                        imageURL: this.imageURL,
                    },
                    {
                        headers: {
                            Authorization: this.token
                        }
                    });

                this.$router.push('/')
                // window.location.replace('/');
                // document.location.reload()

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
    }
}

</script>