<template>
    <div id="container">
        <aside>
            <router-link class="close" to="/">X</router-link>
            <header>
                <input type="text" placeholder="search">
            </header>
            <ul>
                <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                    <div>
                        <h2>TOPIC</h2>
                        <h3>
                            <span class="status orange"></span>
                            offline
                        </h3>
                    </div>
                </li>
                <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                    <div>
                        <h2>TOPIC</h2>
                        <h3>
                            <span class="status green"></span>
                            online
                        </h3>
                    </div>
                </li>
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
                            <span class="status green"></span>
                            <h2>{{ item.sender }}</h2>
                            <h3>{{ item.time_send }}</h3>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            {{ item.message }}
                        </div>
                    </li>
                    <li v-else class="you">
                        <div class="entete">
                            <h3>{{ item.sender }}</h3>
                            <h2>{{ item.time_send }}</h2>
                            <span class="status blue"></span>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            {{ item.message }}
                        </div>
                    </li>
                </div>
                <!-- <li class="you">
                    <div class="entete">
                        <span class="status green"></span>
                        <h2>ADMIN</h2>
                        <h3>10:12AM, Today</h3>
                    </div>
                    <div class="triangle"></div>
                    <div class="message">
                        TEST ADMIN
                    </div>
                </li>
                <li class="me">
                    <div class="entete">
                        <h3>10:12AM, Today</h3>
                        <h2>USER</h2>
                        <span class="status blue"></span>
                    </div>
                    <div class="triangle"></div>
                    <div class="message">
                        TEST USER
                        <p>{{ datastore.data }}</p>
                    </div>
                </li> -->
            </ul>
            <footer>
                <textarea v-model="message" placeholder="message..."></textarea>
                <a @click="sendmessage" style="float: right;">SEND</a>
            </footer>
        </main>
    </div>
</template>

<script>
import serviceSocket from '../services/service.socket';
import { useDataStore } from '../store/store'

export default {
    data() {
        return {
            message: "",
            userid: localStorage.getItem('userid')
        }
    },
    setup() {
        const datastore = useDataStore()

        return { datastore }
    },
    name: 'boxchat',
    components: {
    },
    created() {
        serviceSocket.setupSocketConnection();
    },
    beforeUnmount() {
        serviceSocket.disconnect();
    },
    watch: {
        "serviceSocket.datamessage"(newtest2, oldtest2) {
            console.log(newtest2, "old", oldtest2);
        }
    },
    methods: {
        sendmessage() {
            serviceSocket.socket.emit('message', this.message);

        }
    }
}
</script>