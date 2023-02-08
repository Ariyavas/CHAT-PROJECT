<template>
    <nav>
        <ul>
            <li class="left-ul"><a href="">{{ titlePage }}</a></li>
            <li class="right-ul"><a @click="signout">LOGOUT</a></li>
            <li class="right-ul"><a href="/profile"><img
                        src="https://previews.123rf.com/images/vitechek/vitechek1912/vitechek191200200/137940092-user-login-or-authenticate-icon-human-person-symbol-vector.jpg"
                        alt=""></a></li>
        </ul>
    </nav>
    <div class="centerBox">
        <button @click="messagepage">MESSAGE NOW</button>
    </div>
</template>

<script>
import router from '../router';

export default {
    data() {
        return {
            titlePage: "CHAT"
        }
    },
    methods: {
        messagepage() {
            router.push('/chat')
        },
        signout() {
            localStorage.clear();
            router.push('/')
        }
    }
}
</script>