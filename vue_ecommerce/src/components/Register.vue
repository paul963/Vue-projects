<template>
    <div id="register">
        <div class="container-log">
            <form class="form-log">
                <p class="head-log">Create new user</p>

                <div class="row-log">
                    <input type="email" placeholder="Email" v-model="email" class="input-field-log">
                </div>
            
                <div class="row-log">
                    <input type="password" placeholder="Password" v-model="password" class="input-field-log">
                </div>

                <button v-on:click="register" class="reg">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'register',

    data: function() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        register: function(e) {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Account successfully created!')
                    this.$router.go({ path: this.$router.path })
                },
                err => {
                    alert(err.message)
                });
            e.preventDefault()
        }
    }
}
</script>

<style>
.reg{
    margin: 50px 0px 50px 45%;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    background-color: rgb(116, 183,	65);
}
</style>