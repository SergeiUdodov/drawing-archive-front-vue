
<template>
    <form v-if="isAdmin" @submit.prevent="updateDrawing">

        <ErrorComponent v-if="error" :error="error" />

        <h3>Редактировать чертеж</h3>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:150px;" class="form-control" id="floatingInput"
                v-model="designation" />
            <label for="floatingInput">Обозначение:</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:400px;" class="form-control" id="floatingInput"
                v-model="name" />
            <label for="floatingInput">Название:</label>
        </div>

        <div class="form-floating mb-3">
            <textarea name="textarea" style="width:content; height:200px;" class="form-control" id="floatingInput"
                v-model="imageURL" />
            <label for="floatingInput">Ссылка на чертеж:</label>
        </div>

        <button class="btn btn-primary btn-block" style="margin: 15px">Сохранить</button>
        <router-link to="/drawings" class="btn btn-primary btn-block" style="margin: 15px">Назад</router-link>
    </form>
</template>

<script>
import axios from 'axios';
import ErrorComponent from './ErrorComponent.vue';

export default {
    name: 'UpdateDrawing',
    components: {
        ErrorComponent
    },
    data() {
        return {
            drawings: [],
            drawingId: '',
            designation: '',
            name: '',
            imageURL: '',
            error: '',
            token: '',
            isAdmin: false
        }
    },
    methods: {
        async updateDrawing() {

            try {

                if (this.designation.trim() === '' || this.name.trim() === '' || this.imageURL.trim() === '') {
                    window.scrollTo(0,0);
                    throw new Error('Все поля должны быть заполнены');
                }

                await axios.put('api/updateDrawing/' + this.drawingId,
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

                localStorage.removeItem('drawingId');

                this.$router.push('/drawings')
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

        if (!this.isAdmin) {
            return;
        }

        if (localStorage.getItem('drawingId')) {
            this.drawingId = localStorage.getItem('drawingId');

        }
        else {
            this.drawingId = ''
        }

        await axios.get('api/drawings').then((response) => {
            this.drawings = response.data;
            for (let i in this.drawings) {
                if (this.drawings[i].id == this.drawingId) {
                    this.designation = this.drawings[i].designation;
                    this.name = this.drawings[i].name;
                    this.imageURL = this.drawings[i].imageURL;
                    break;
                }
            }
        });
    }
}

</script>