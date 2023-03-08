<template>
    <nav>
        <ul>
            <li class="left-ul"><a @click="messagepage">{{ titlePage }}</a></li>
            <li class="right-ul"><a @click="signout">LOGOUT</a></li>
            <li class="right-ul"><a href="/profile"><img
                        src="https://previews.123rf.com/images/vitechek/vitechek1912/vitechek191200200/137940092-user-login-or-authenticate-icon-human-person-symbol-vector.jpg"
                        alt=""></a></li>
            <li v-if="role == 'Admin'" class="left-ul"><a href="/qamanagement">QAmanage</a></li>
        </ul>
    </nav>
    <div class="centerBox">
        <button ref="myBtn" @click="messagepage">MESSAGE NOW</button>
    </div>
    <div :style="{ display: modelstatus ? '' : 'block' }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span @click="messagepage" class="close">&times;</span>
            <div v-for="(item, index) in groupfaq">
                <a @click="modelQA(item.group)">{{ item.group }}</a>
            </div>
        </div>
    </div>
    <div class="FAQ-frame">
        <div>
            <h1 class="title-FAQ">FAQs</h1>
        </div>
        <div class="details-fram">
            <div class="contrainer-box">
                <details v-for="(item, index) in faqs">
                    <summary>{{ item.q }}</summary>
                    <div>
                        {{ item.a }}
                    </div>
                </details>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import router from '../router';
import { useDataStore } from '../store/store'
import axios from 'axios';

export default {
    setup() {
        const datastore = useDataStore()
        return { datastore }
    },
    data() {
        return {
            titlePage: "CHAT",
            modelstatus: true,
            groupfaq: [],
            faqs: [{ q: "How to ?", a: "do like this" }, { q: "How to ?", a: "do like this" }, { q: "How to ?", a: "do like this" }],
            role: localStorage.getItem('role'),
        }
    },
    beforeCreate() {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/qa/showquestion',
            headers: {},
            data: ""
        };

        axios(config)
            .then((response) => {
                this.groupfaq = response.data.data
                this.groupfaq = [...new Map(this.groupfaq.map(item => [item['group'], item])).values()]
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        messagepage() {
            if (this.role == "Admin") {
                router.push('/management')
            }
            else {
                if (this.modelstatus) {
                    this.modelstatus = false
                } else {
                    this.modelstatus = true
                }
            }
        },
        signout() {
            localStorage.clear();
            router.push('/')
        },
        modelQA(question) {
            this.datastore.setQA(question)
            router.push('/chat')
        }
    }
}
</script>