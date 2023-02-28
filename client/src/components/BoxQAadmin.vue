<template>
    <div>
        <label for="question">Question :</label>
        <input type="text" name="question">
        <label for="answer">Answer :</label>
        <input type="text" name="answer">
        <label for="choice">Confirm</label>
        <input @click="test" type="submit" value="ADD">
    </div>
</template>

<script lang="ts">
import router from '../router'

export default {
    data() {
        return {

        }
    },
    methods: {
        test() {
            console.log("hi");
        }
    }
}
</script>