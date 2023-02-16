<template>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <div id="container">
        <div>
            <aside class="left">
                <header>MESSAGEBOX</header>
                <div class="barhistory">
                    <ul>
                        <li><a href="">TOPIC 0</a><i class="glyphicon glyphicon-remove"></i></li>
                        <li><a href="">TOPIC 1</a><i class="glyphicon glyphicon-remove"></i></li>
                        <li><a href="">TOPIC 2</a><i class="glyphicon glyphicon-remove"></i></li>
                        <li><a href="">TOPIC 2</a><i class="glyphicon glyphicon-remove"></i></li>
                        <li><a href="">TOPIC 2</a><i class="glyphicon glyphicon-remove"></i></li>
                        <li><a href="">TOPIC 2</a><i class="glyphicon glyphicon-remove"></i></li>
                        <li><a href="">TOPIC 2</a><i class="glyphicon glyphicon-remove"></i></li>
                    </ul>
                </div>
            </aside>
        </div>
        <div>
            <main class="right">
                <div class="chatbox-frame">
                    <div class="chatbox" id="app">
                        <div class="chatbox__header">
                            <div class="chatbox__headerText">Robert Smith
                                <div class="chatbox__onlineDot"></div>
                            </div>
                            <div class="chatbox__button"></div>
                        </div>
                        <div id="chat" class="chatbox__messages">
                            <div class="chatbox__messageBox">
                                <div class="chatbox__message">
                                    Hi
                                    <div class="chatbox__tooltip chatbox__tooltip--left">2.30</div>
                                </div>
                            </div>
                            <div class="chatbox__messageBox--primary">
                                <div class="chatbox__message chatbox__message--primary">
                                    Hi
                                    <div class="chatbox__tooltip chatbox__tooltip--left">2.30</div>
                                </div>
                            </div>
                        </div>
                        <div class="chatbox__inputPanel">
                            <input class="chatbox__input" placeholder="Aa" @keyup.enter="sendmessage"
                                v-model="newmessage" />
                            <div class="chatbox__tooltip chatbox__tooltip--bottom">
                                Press enter to send the message</div>
                            <!--.chatbox__button +-->
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import serviceSocket from '../services/service.socket';
import { useDataStore } from '../store/store'

export default {
    setup() {
        const datastore = useDataStore()
        return { datastore }
    },
    data() {
        return {
            userid: localStorage.getItem('userid'),
            token: localStorage.getItem('token'),
            history: [],
            newmessage: "",
            roomid: "",
        }
    },
    created() {
        serviceSocket.setupSocketConnectionForadmin(this.roomid);
    },
    beforeUnmount() {
        serviceSocket.disconnect();
    },
    methods: {
        sendmessage() {
            console.log(this.newmessage);
            if (this.newmessage != undefined || this.newmessage != null || this.newmessage != "" || this.newmessage != "\n") {
                serviceSocket.sendMessage(this.newmessage);
                this.newmessage = ""
            }
        },
    }
}
</script>