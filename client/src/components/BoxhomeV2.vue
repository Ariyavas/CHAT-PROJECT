<template>
    <div>
        <!-- <header>
            <nav>
                <ul class="menuItems">
                    <li><a data-item='Chat' @click="changpage">chat</a></li>
                    <li v-if="role == 'Admin'"><a data-item='Management' href="/qamanagement">management</a></li>
                </ul>
            </nav>
        </header> -->
        <div class="home-content" v-if="role == 'User'">
            <div class="menu" onclick="this.classList.toggle('open')">
                <div class="button" @click="switchoption('faqs')"></div>
                <div class="button" @click="switchoption('chat')"></div>
                <div class="button" @click="signout"></div>
            </div>
        </div>
        <div class="home-content" v-else>
            <div class="menu" onclick="this.classList.toggle('open')">
                <div class="button" @click="changpageMG"></div>
                <div class="button" @click="changpage"></div>
                <div class="button" @click="signout"></div>
            </div>
        </div>
        <div class="chatV2" style="position: fixed; top: 130px; right: 240px;">
            <div v-if="screen == 'chat'">
                <boxchat />
            </div>
            <div v-if="screen == 'faqs'">
                <boxfaqs />
            </div>
        </div>
        <!-- <footer>
            <div class="footer-content">
                <h3>NAKAMOTO FOOTER</h3>
                <p>this footer page so good.</p>
            </div>
        </footer> -->
    </div>
</template>

<script lang="js">
import { useDataStore } from '../store/store'
import router from '../router'
import boxchat from "../components/BoxchatV2.vue"
import boxfaqs from '../components/BoxfaqV2.vue'

export default {
    components: {
        boxchat,
        boxfaqs

    },
    data() {
        return {
            userid: localStorage.getItem('userid'),
            role: localStorage.getItem('role'),
            screen: ''
        }
    },
    setup() {
        const datastore = useDataStore()
        return { datastore }
    },
    methods: {
        switchoption(text) {
            if (text == this.screen) {
                this.screen = ''
            } else {
                this.screen = text
            }
        },
        signout() {
            localStorage.clear();
            router.push('/')
        },
        changpage() {
            if (this.role == "Admin") {
                router.push('/management')
            }
            else {
                router.push('/home')
            }
        },
        changpageMG() {
            router.push('/qamanagement')
        }
    }
}
</script>