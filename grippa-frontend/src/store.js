
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
    state: {
        userData:{},
        orderData:{},
        uploadData:{},
        orgData:{}
    },
    mutations: {
        SET_USER_TO_STATE:(state, userData)=>{
            state.userData = userData;
            console.log(state.userData)
        },
        SET_ORDER_TO_STATE:(state, orderData)=>{
            state.orderData = orderData;
            console.log(state.orderData)
        },
        SET_UPLOAD_TO_STATE:(state, uploadData)=>{
            state.uploadData = uploadData;
            console.log(state.uploadData)
        },
        SET_ORG_TO_STATE:(state, orgData)=>{
            state.orgData = orgData;
            console.log(state.orgData)
        },
        SET_SERVICE_TO_STATE:(state, serviceData)=>{
            state.serviceData = serviceData;
            console.log(state.seviceData)
        }
    },
    actions: {
        GET_USER_FROM_API({commit}){
            return axios.get('http://localhost:1337/api/users/me',
            {
                headers:
                {Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
            )
            .then((userData) =>{
                
                commit('SET_USER_TO_STATE', userData.data); 
                console.log(userData.data);
                return userData.data;
                
            })
            .catch((error)=>{
                console.log(error);
                return error;
            })
        },

        GET_ORDER_FROM_API({commit}){
            return axios.get('http://localhost:1337/api/orders',
            {
                headers:
                {Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
            )
            .then((orderData) =>{
                
                commit('SET_ORDER_TO_STATE', orderData.data.data); 
                console.log(orderData.data.data);
                return orderData.data.data;
                
            })
            .catch((error)=>{
                console.log(error);
                return error;
            })
        },

        GET_UPLOAD_FROM_API({commit}){
            return axios.get('http://localhost:1337/api/upload/files',
            {
                headers:
                {Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
            )
            .then((uploadData) =>{
                
                commit('SET_UPLOAD_TO_STATE', uploadData.data); 
                console.log(uploadData.data);
                return uploadData.data;
                
            })
            .catch((error)=>{
                console.log(error);
                return error;
            })
        },

        GET_ORG_FROM_API({commit}){
            return axios.get('http://localhost:1337/api/organizations',
            {
                headers:
                {Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
            )
            .then((orgData) =>{
                
                commit('SET_ORG_TO_STATE', orgData.data.data); 
                console.log(orgData.data.data);
                return orgData.data.data;
                
            })
            .catch((error)=>{
                console.log(error);
                return error;
            })
        },

        GET_SERVICE_FROM_API({commit}){
            return axios.get('http://localhost:1337/api/services',
            {
                headers:
                {Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }
            )
            .then((serviceData) =>{
                
                commit('SET_SERVICE_TO_STATE', serviceData.data.data); 
                console.log(serviceData.data.data);
                return serviceData.data.data;
                
            })
            .catch((error)=>{
                console.log(error);
                return error;
            })
        },
    },

    getters: {
        USERS(state){
            return state.userData;
        },

        ORDERS(state){
            return state.orderData.data;
        },
        UPLOAD(state){
            return state.uploadData;
        },

        ORG(state){
            return state.orgData.data;
        },

        SERVICES(state){
            return state.serviceData.data;
        }
    }
})

export default store;
