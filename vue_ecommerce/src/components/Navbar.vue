<template>
    <nav>
        <div class="nav-wrap">
            <div class="nav-container">
                <ul class="left">
                    <li v-if="isLoggedIn"><router-link to="/" class="nav-btn">IT eCommerce Magazine</router-link></li>
                </ul>
                <ul class="right">
                    <li v-if="!isLoggedIn"><router-link to="/login" class="nav-btn">Login</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/register" class="nav-btn">Register</router-link></li>
                    <li v-if="isLoggedIn"><span class="user">{{ currentUser }}</span></li>
                    <li v-if="isLoggedIn"><router-link to="/cart" class="nav-btn">Cart</router-link></li>
                    <li v-if="isLoggedIn"><button v-on:click="logout" class="nav-btn btn-out">Logout</button></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'navbar',
    
    data() {
        return {
            cart: 0,
            isLoggedIn: false,
            currentUser: false
        }
    },

    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser.email
        }
    },

    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                    this.$router.go({ path: this.$router.path })
            })
        }
    }
}
</script>

<style>
.nav-wrap{
    height: 10vh;
    background-color: #74B741
}

.nav-container{
    padding: 2.5vh 10vh 0px 10vh;
}

.left{
    float: left;
}

.right{
    float: right;
}

li{
    display: inline;
    padding-right: 15px;
}

.nav-btn{
    text-decoration: none;
    font-size: 25px;
    color: #fff;
}

.user{
    font-size: 20px;
    padding-right: 15px;
}

.btn-out{
    font-size: 20px;
    padding: 5px 20px;
    border: none;
    background-color: black;
}

.btn-out:hover{
    cursor: pointer;
}
</style>