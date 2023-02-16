<template>
    <div id="container">
        <aside>
            <router-link class="close" to="/home">X</router-link>
            <header>
                <input type="text" placeholder="search">
            </header>
            <ul>
                <div v-for="(item, index) in historyroom">
                    <li v-if="item._id == datastore.roomID._id">
                        <a href="" @click="changTopic(item._id)">
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
                        <a href="" @click="changTopic(item._id)">
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
            <ul id="chat">
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
            historyroom: [],
        }
    },
    setup() {
        const datastore = useDataStore()
        return { datastore }
    },
    created() {
        serviceSocket.setupSocketConnection();
        setTimeout(() => {

            this.historyroomofUser();
        }, 700)
    },
    beforeUnmount() {
        serviceSocket.disconnect();
    },
    components: {
    },
    name: 'boxchat',
    watch: {
        "serviceSocket.setupSocketConnection"(newtest2, oldtest2) {
            console.log(newtest2, "old", oldtest2);
        }
    },
    methods: {
        sendmessage() {
            //how to ignore \n in textarea
            if (this.newmessage != undefined || this.newmessage != null || this.newmessage != "" || this.newmessage != "\n") {
                serviceSocket.sendMessage(this.newmessage);
                this.newmessage = ""
                setTimeout(() => {
                    this.scrollBottom()
                }, 500)
            }
        },
        scrollBottom() {
            var container = this.$el.querySelector("#chat");
            container.scrollTop = container.scrollHeight;
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
        historyroomofUser() {
            var data = JSON.stringify({
                "userid": this.userid
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/room/roomhistory',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    this.historyroom = response.data.data
                    console.log(this.historyroom);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        changTopic(room) {
            this.historyroom.forEach(data => {
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
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            });
        }
    }
}
</script>