<template>
    <div class="loader" v-if="datastore.loading">
        <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div id="container" :style="{ display: datastore.loading ? 'none' : '' }">
        <aside>
            <router-link class="close" to="/home">X</router-link>
            <header>
                <input type="text" placeholder="search">
            </header>
            <ul>
                <div v-for="(item, index) in datastore.historyroom">
                    <li v-if="item._id == datastore.roomID._id">
                        <a>
                            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                            <div>
                                <h2>{{ item.topic }}</h2>
                                <h3>
                                    <span class="status green"></span>
                                    ACTIVE NOW
                                </h3>
                            </div>
                        </a>
                    </li>
                    <li v-else>
                        <a @click="changTopic(item._id)">
                            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                            <div>
                                <h2>{{ item.topic }}</h2>
                                <h3>
                                    <span class="status orange"></span>
                                    OTHER TOPIC
                                </h3>
                            </div>
                        </a>
                    </li>
                </div>
            </ul>
        </aside>
        <main>
            <header>
                <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                <div>
                    <h2>Admin</h2>
                </div>
            </header>
            <ul id="chat" ref="chat">
                <div v-for="(item, index) in datastore.datahistory">
                    <li v-if="item.sender == userid" class="me">
                        <div class="entete">
                            <span class="status blue"></span>
                            <h2>ME</h2>&nbsp;
                            <h3>{{ item.time_send }}</h3>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            {{ item.message }}
                        </div>
                    </li>
                    <li v-else class="you">
                        <div class="entete">
                            <h3>{{ item.time_send }}</h3>&nbsp;
                            <h2>ADMIN</h2>
                            <span class="status green"></span>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            {{ item.message }}
                        </div>
                    </li>
                </div>
            </ul>
            <footer>
                <textarea v-model="newmessage" @keyup.enter="ignoreNewLine" placeholder="message..."></textarea>
                <a @click="sendmessage" style="float: right;">SEND</a>
            </footer>
        </main>
    </div>
</template>

<script lang="js">
import serviceSocket from '../services/service.socket';
import { useDataStore } from '../store/store'
import axios from 'axios'

export default {
    data() {
        return {
            newmessage: "",
            userid: localStorage.getItem('userid'),
            token: localStorage.getItem('token'),
        }
    },
    setup() {
        const datastore = useDataStore()
        return { datastore }
    },
    created() {
        serviceSocket.setupSocketConnection();
    },
    beforeUnmount() {
        serviceSocket.disconnect();
    },
    components: {
    },
    name: 'boxchat',
    watch: {
        "datastore.datahistory": {
            // This will let Vue know to look inside the array
            deep: true,
            // We have to move our method to a handler field
            handler() {
                this.checkscroll();
            }
        }
    },
    methods: {
        sendmessage() {
            if (this.newmessage != undefined || this.newmessage != null || this.newmessage != "" || this.newmessage != "\n") {
                serviceSocket.sendMessage(this.newmessage);
                this.newmessage = ""
            }
        },
        scrollBottom() {
            setTimeout(() => {
                var container = this.$refs.chat;
                container.scrollTop = container.scrollHeight;
            }, 200);
        },
        checkscroll() {
            const progress = (this.$refs.chat.scrollTop / (this.$refs.chat.scrollHeight - this.$refs.chat.clientHeight)) * 100

            if (progress >= 80) {
                this.scrollBottom()
            }
        },
        ignoreNewLine(event) {
            // Get the value of the textarea. 
            let value = event.target.value;
            // Replace all new line characters with an empty string. 
            value = value.replace(/\n/g, '');
            // Update the model with the new value. 
            this.newmessage = value;

            this.sendmessage()
        },
        changTopic(room) {
            this.datastore.historyroom.forEach(data => {
                serviceSocket.disconnect();
                this.datastore.setloading(true)
                if (data._id == room && room != this.datastore.roomID._id) {
                    var data = JSON.stringify({
                        "userid": this.userid,
                        "roomid": room
                    });

                    var config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: 'http://localhost:3000/room/updatestatusbyuser',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    axios(config)
                        .then((response) => {
                            serviceSocket.setupSocketConnection();
                            setTimeout(() => {
                                this.datastore.setloading(false)
                            }, 2000);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            });
        },
    }
}
</script>