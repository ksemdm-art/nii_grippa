<template>
    <div class="container-fluid p-0">
        <div class="main-body">

            <!-- Breadcrumb -->
            <div class="row justify-content-center align-items-center m-0" style="max-width: 100vw;">
                <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-primary m-0">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Личный кабинет коллаборатора</a>
                        <button class="btn btn btn-outline-light" type="submit">
                            <span @click="logout">
                                Выйти
                            </span>
                        </button>

                    </div>
                </nav>
                <div class="wrapper col-md-10">
                    <div class="col-md-12 mt-5">
                        <h4 class="text-start">Личные данные</h4>
                        <div class="card mb-3">
                            <div class="card-body">

                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Фамилия</h6>
                                    </div>

                                    <div class="col-sm-9 text-secondary">
                                        {{ this.userData.userSurname }}
                                    </div>
                                </div>
                                <hr>

                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Имя</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {{ this.userData.fullName }}
                                    </div>
                                </div>
                                <hr>

                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Отчество</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {{ this.userData.userFathersname }}
                                    </div>
                                </div>
                                <hr>

                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">E-mail</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {{ this.userData.email }}
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Организация</h6>
                                    </div>
                                    <div v-for="org in orgData" :key="org.id" class="col-sm-9 text-secondary">
                                        {{ org.attributes.organizationName }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="wrapper">
                        <h4 class="text-start">Заказы и результаты</h4>

                        <div class="col-md-12 mt-2">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Номер заказа</h6>
                                        </div>

                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Дата заказа</h6>
                                        </div>

                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Статус заказа</h6>
                                        </div>

                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Результаты</h6>
                                        </div>
                                    </div>
                                    <hr>

                                    <div v-for="order in orderData" :key="order.id" class="rowContainer">
                                        <div class="row">
                                            <div class="col-sm-3 text-secondary">
                                                {{ order.id }}
                                            </div>

                                            <div class="col-sm-3 text-secondary">
                                                {{ formatDate(order.id) }}
                                            </div>

                                            <div class="col-sm-3 text-secondary" v-if="order.attributes.OrderStatus">
                                                Выполнен
                                            </div>

                                            <div class="col-sm-3 text-secondary" v-else>
                                                Обрабатывается
                                            </div>

                                            <div class="col-sm-3 text-secondary" style="text-align:center;">
                                                <!-- <a v-bind:href="`http://localhost:1337` + getLinkByID(order.id)"
                                                    v-if="getLinkByID(order.id) != ''"> Данные результата </a> -->
                                                <a v-for="file in getLinksById(order.id)" :key="file.id"
                                                    :href="'/api/download/?file=' + file.fileName.hash"> {{
                                                        file.fileName.name
                                                    }} <br></a>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>

                                </div>

                            </div>
                            <div class="container d-flex justify-content-end m-0 p-0">
                                <button class="btn btn btn-outline-primary btn-lg" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Создать заказ</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <form>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Создать заказ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column justify-content-start">
                        <div class="wrapper d-flex justify-content-start mb-2">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Услуги
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="width:300px">
                                    <div v-for="service in serviceData" :key="service.id" class="row"
                                        id="v-model-multiple-checkboxes">
                                        <div v-show="service.attributes.ServiceStatus" class="form-check"
                                            style="padding-left: 2.5rem;">
                                            <input class="form-check-input" type="checkbox" id="check" ref="theCheckbox"
                                                v-model="checked" :value="service.id">
                                            <label class="form-check-label" for="flexCheckChecked" id="check_label">
                                                {{ service.attributes.ServiceName }}
                                            </label>
                                        </div>
                                    </div>

                                </ul>
                            </div>
                        </div>

                        <form>
                            <div class="input-group mb-3">
                                <input type="file" class="form-control  d-inline-flex justify-content-end"
                                    id="inputGroupFile02">
                            </div>
                            <div class="wrapper" style="display: flex; flex-direction: row; justify-content: end;">
                                <!--KS-FIXED: type=submit переделан в type=button --><button type="button"
                                    class="btn btn-primary" @click="sendFile()">Загрузить</button>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <!--KS-FIXED: type=submit переделан в type=button --><button :disabled='isDisabled == 0'
                            @click="sendOrder()" type="button" class="btn btn-primary">Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
//import { result } from 'lodash';
//import { filter } from 'lodash';
//import store from '../store';
import { mapActions } from 'vuex';
//import { ref } from 'vue';




export default {

    name: 'GrippaProfile',

    data() {
        return {
            userData: {},
            orderData: {},
            uploadData: {},
            orgData: {},
            serviceData: {},
            checked: [],
            userUpload: {},
            terms: false,
            fileIsLoaded: false
        }
    },

    async created() {

        //https://gen.influenza.spb.ru/api/users/${user.id}?populate=*
        const res = await axios.get(`${process.env.VUE_APP_URL}/#/profile`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            });
        console.log("res =", res);

    },
    computed: {
        isDisabled: function () {
            //console.log(this.userUpload)
        if(this.checked.length == true && this.fileIsLoaded == true){
            return true
        }
        else{
            return false
        }
    }
    },
    methods: {
        logout() {
            localStorage.removeItem('jwt')
            this.$router.push('/login')
        },
        getLinksById(id) {
            const order = JSON.parse(JSON.stringify(Object.values(this.orderData).filter(order => order.id == id)[0]))
            return order.attributes.results
        },

        formatDate(id) {
            const order = JSON.parse(JSON.stringify(Object.values(this.orderData).filter(order => order.id == id)[0]))
            return (new Date(Date.parse(order.attributes.createdAt)).toLocaleString("ru-RU", { hour12: false }))
        },

        async sendFile() {


            let file = document.getElementById("inputGroupFile02").files[0]

            var myHeaders = new Headers();
            myHeaders.append("Authorization", 'Bearer ' + localStorage.getItem('jwt'));

            var formdata = new FormData();
            formdata.append("files", file);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${process.env.VUE_APP_URL}/api/upload`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    this.userUpload = JSON.parse(result)
                    let ext = formdata.get('files').name.split('.')[1]
                    // //console.log(ext)
                    if (ext == 'csv' || ext == 'xls' || ext == 'xlsx') {
                        alert("Файл прикреплен к заказу")
                    }
                    else{
                        alert("Прикрепите файл в формате csv, xls или xlsx")
                    }
                    // //console.log(this.userUpload)
                    
                    this.fileIsLoaded = true
                })
                .catch(error => alert('Ошибка: ', error));


        },

        async sendOrder() {

            try {

                const res = await axios.post(`${process.env.VUE_APP_URL}/api/orders`,
                    {
                        "data": {
                            OrderStatus: false,
                            services: this.checked, // KS-FIXED: после переключения типа связи strapi переименовал в services (было service)
                        }
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('jwt')
                        }

                    });

                //console.log(res);
                const id = JSON.parse(JSON.stringify(res)).data.data.id
                const dateOf = new Date(Date.parse(JSON.parse(JSON.stringify(res)).data.data.attributes.createdAt)).toLocaleString()
                //console.log("xxxxx", id)

                var myHeaders = new Headers();
                myHeaders.append("Authorization", 'Bearer ' + localStorage.getItem('jwt'));
                myHeaders.append("Content-Type", "application/json");
                const smthUpload = JSON.parse(JSON.stringify(Object.values(this.userUpload)))

                var raw = JSON.stringify({
                    "data": {
                        "orderFile": smthUpload[0].id,
                        "OrderName": `Заказ № ${id} от ${dateOf}`
                    }
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                // KS-FIXED: сделан await, чтобы ждал пока не закончит запрос перед reload
                const response = await fetch(`${process.env.VUE_APP_URL}/api/orders/${id}`, requestOptions)
                    .then(response => response.text())
                    .then((result) =>{
                        console.log(result)
                        this.fileIsLoaded = false
                    }  )
                    .catch(error => console.log('error', error));
                await response;
                // =============================
            }

            catch (error) {
                return alert(
                    "Не удалось отправить заказ"
                );
            }

            location.reload();
        },
        ...mapActions([
            'GET_USER_FROM_API'
        ])
    },
    showData(data2) {
        return new Object(data2)
    },
    async mounted() {

        if (!localStorage.getItem('jwt')) this.logout();

        const userData = { ...await this.$store.dispatch('GET_USER_FROM_API') }
        //console.log("userData", userData)
        this.userData = userData
        //console.log("this", this.userData.username)

        const orderData = { ...await this.$store.dispatch('GET_ORDER_FROM_API') }
        //console.log("orderData", orderData)
        this.orderData = orderData

        const uploadData = { ...await this.$store.dispatch('GET_UPLOAD_FROM_API') }
        //console.log("uploadData", uploadData)
        this.uploadData = uploadData

        const orgData = { ...await this.$store.dispatch('GET_ORG_FROM_API') }
        //console.log("orgData", orgData)
        this.orgData = orgData

        const serviceData = { ...await this.$store.dispatch('GET_SERVICE_FROM_API') }
        //console.log("serviceData", serviceData)
        this.serviceData = serviceData

    },

}
</script>
