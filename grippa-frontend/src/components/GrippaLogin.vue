<template>
    <section>
        <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Личный кабинет коллаборатора</a>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="../assets/logo_grippa.png"
                        class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit="loginHandler" class="mt-4 border border-primary border-2 rounded p-3">

                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input v-model="username" id="form3Example3" class="form-control form-control-lg"
                                placeholder="Введите логин" />
                            <label class="form-label" for="form3Example3">Логин</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <input type="password" v-model="password" id="form3Example4"
                                class="form-control form-control-lg" placeholder="Введите пароль" />
                            <label class="form-label" for="form3Example4">Пароль</label>
                        </div>

                        <div class="wrapper d-flex justify-content-end">
                            <div class="text-center text-lg-start mt-4 pt-2 d-flex flex-column">
                                <!-- <router-link to="/profile">
                                <button type="submit" class="btn btn-primary btn-lg"
                                    style="padding-left: 2.5rem; padding-right: 2.5rem;">Войти</button>
                               </router-link>  -->

                                <button type="submit" class="btn btn-primary btn-lg"
                                    style="padding-left: 2.5rem; padding-right: 2.5rem;">Войти</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

// export default {
//     name: 'GrippaLogin'
// }
import axios from 'axios';
//import { threadId } from 'worker_threads';

export default {
    name: 'GrippaLogin',
    data() {
        return {
            username: '',
            password: '',
            error: false,
            errorMsg: `An error occurred, please try again`
        }
    },
    methods: {

        async loginHandler(e) {

            e.preventDefault()

            try {
                console.log(process.env.VUE_APP_URL)
                const response = await axios.post(`${process.env.VUE_APP_URL}/api/auth/local`,
                    {
                        identifier: this.username,
                        password: this.password
                    });

                console.log(response);

                // localStorage.setItem('token', response.data.token);
                const { jwt, user } = response.data
                            localStorage.setItem('jwt', jwt)
                            localStorage.setItem('userData', JSON.stringify(user.data))
                            console.log(jwt)
                            console.log(JSON.stringify(user))
                this.$router.push('/profile');
            } catch (error) {
                this.error = true
                this.password = ''
                alert ("Неверный пароль")
            }
        },
    }
}
</script>

