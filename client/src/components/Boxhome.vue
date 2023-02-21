<template>
    <nav>
        <ul>
            <li class="left-ul"><a @click="messagepage">{{ titlePage }}</a></li>
            <li class="right-ul"><a @click="signout">LOGOUT</a></li>
            <li class="right-ul"><a href="/profile"><img
                        src="https://previews.123rf.com/images/vitechek/vitechek1912/vitechek191200200/137940092-user-login-or-authenticate-icon-human-person-symbol-vector.jpg"
                        alt=""></a></li>
        </ul>
    </nav>
    <div class="centerBox">
        <button ref="myBtn" @click="messagepage">MESSAGE NOW</button>
    </div>
    <div :style="{ display: modelstatus ? '' : 'block' }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span @click="messagepage" class="close">&times;</span>
            <div v-for="(item, index) in datatest">
                <a @click="modelQA(item)">{{ item }}</a>
            </div>
        </div>
    </div>
    <div class="FAQ-frame">
        <div>
            <h1 class="title-FAQ">FAQ</h1>
        </div>
        <div class="details-fram">
            <div class="contrainer-box">
                <details v-for="(item, index) in datatest2">
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

export default {
    data() {
        return {
            titlePage: "CHAT",
            modelstatus: true,
            datatest: ["data1", "data2", "data3"],
            datatest2: [{ q: "How to ?", a: "do like this" }, { q: "How to ?", a: "do like this" }, { q: "How to ?", a: "do like this" }]
        }
    },
    methods: {
        messagepage() {
            let role = localStorage.getItem('role')
            console.log(role);
            if (role == "Admin") {
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
            // router.push('/chat')
        }
    }
}
</script>