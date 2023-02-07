<template>
    <div class="box-form">
        <div class="left">
            <div class="overlay">
            </div>
        </div>
        <div class="right">
            <h5>Login</h5>
            <div class="inputs">
                <input v-model="username" type="text" placeholder="username" required>
                <br>
                <input v-model="password" type="password" placeholder="password" required>
            </div>

            <br><br>

            <button @click="login">LOGIN</button>
            <div class="remember-me--forget-password">
                <p>create accout click here</p>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router';
import axios from 'axios';

export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        login() {
            var data = JSON.stringify({
                "username": this.username
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:3000/user/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    router.push("/home")
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    }

}
</script>