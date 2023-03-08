<template>
    <div class="loader" v-if="datastore.loading">
        <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div class="form" :style="{ display: datastore.loading ? 'none' : '' }">
        <div class="nav">
            <router-link class="nav-controller" to="/qamanagement">
                BACK
            </router-link>
        </div>
        <div class="form-group">
            <label for="my-select">Question :</label>
            <select id="my-select" name="my-select" v-model="questionuid">
                <option v-for="question in dataquestion" :value="question._id">{{ question.message }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="ans">Answer :</label>
            <input type="text" id="ans" name="ans" v-model="answerupdate">
        </div>
        <div class="form-group">
            <button type="submit" @click="updateAnswerAPI">Submit</button>
        </div>
    </div>
</template>

<script lang="js">
import axios from 'axios';
import { useDataStore } from '../store/store'

export default {
    data() {
        return {
            dataquestion: [],
            questionuid: "",
            answerupdate: "",
            token: localStorage.getItem('token'),
        }
    },
    setup() {
        const datastore = useDataStore()
        return { datastore }
    },
    created() {
        var data = '';
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/qa/showquestion',
            headers: {},
            data: data
        };
        axios(config)
            .then((response) => {
                if (response.data.data.length != 0) {
                    this.dataquestion = response.data.data
                } else {
                    this.dataquestion = [{ message: "Not found question !" }]
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        updateAnswerAPI() {
            this.datastore.setloading(true)
            var data = JSON.stringify({
                "questionid": this.questionuid,
                "answer": this.answerupdate
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/qa/ansupdate',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    setTimeout(() => {
                        this.datastore.setloading(false)
                    }, 2000);
                    this.questionuid = ""
                    this.answerupdate = ""
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>