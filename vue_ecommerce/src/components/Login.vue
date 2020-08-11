<template>
    <div id="login">
        <div class="container-log">
            <form class="form-log">
                <p class="head-log">Login</p>

                <div class="row-log">
                    <input type="email" placeholder="Email" v-model="email" class="input-field-log">
                </div>
            
                <div class="row-log">
                    <input type="password" placeholder="Password" v-model="password" class="input-field-log">
                </div>

                <button v-on:click="singInWithEmail" class="log">Login</button>

                <br>
                <button v-on:click="singInWithGoogle" class="social"><img src="../assets/gmail.png"/></button>
                <button v-on:click="singInWithGithub" class="social"><img src="../assets/github.png"/></button>
                <button v-on:click="singInWithFacebook" class="social"><img src="../assets/facebook.png"/></button>
                <button v-on:click="singInWithTwitter" class="social"><img src="../assets/twitter.png"/></button>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',

    data: function() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        singInWithEmail(e) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.go({ path: this.$router.path })
                },
                error => {
                    alert(error.message)
                })
            e.preventDefault()
        },

        singInWithGoogle() {
            var provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log(result)
                    this.$router.go({ path: this.$router.path })
                }).catch((error) => {
                    console.log(error)
                })
        },
        
        singInWithGithub() {
            var provider = new firebase.auth.GithubAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log(result)
                    this.$router.go({ path: this.$router.path })
                }).catch((error) => {
                    console.log(error)
                })
        },

        singInWithFacebook() {
            var provider = new firebase.auth.FacebookAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log(result)
                    this.$router.go({ path: this.$router.path })
                }).catch((error) => {
                    console.log(error)
                })
        },

        singInWithTwitter() {
            var provider = new firebase.auth.TwitterAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log(result)
                    this.$router.go({ path: this.$router.path })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>
.form-log{
    margin: 50px 30% 0px 30%;
    border: 1px solid lightgrey;
    box-shadow: 5px 5px 5px lightgray;
}

.head-log{
    margin: 50px 0px 50px 50px;
    font-size: 40px;
    text-align: center;
}

.row-log{
    text-align: center;
}

.input-field-log{
    margin-top: 20px;
    padding: 10px;
    font-size: 20px;
    border: none;
    border-bottom: 2px solid lightgrey;
}

.log{
    margin: 50px 0px 50px 47%;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    background-color: rgb(116, 183,	65);
}

.social{
    margin-left: 6vw;
    margin-bottom: 25px;
    border: none;
    background-color: transparent;
}

.social:hover{
    cursor: pointer;
}
</style>