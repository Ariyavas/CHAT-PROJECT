<template>
    <nav>
        <ul>
            <li>CHAT</li>
            <a href="">LOGOUT</a>
            <a href=""><img src="https://previews.123rf.com/images/vitechek/vitechek1912/vitechek191200200/137940092-user-login-or-authenticate-icon-human-person-symbol-vector.jpg" alt=""></a>
        </ul>
    </nav>
    <div class="centerBox">
        <button @click="changepage">MESSAGE NOW</button>
    </div>
</template>

<script>
import router from '../router';
export default {
    methods: {
        changepage() {
            router.push('/chat')
        }
    }
}
</script>