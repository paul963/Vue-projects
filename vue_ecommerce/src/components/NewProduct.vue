<template>
    <div id="new-product">
        <p class="head">New Product</p>
        
        <div>
            <form @submit.prevent="saveProduct">
                <div class="row">
                    <div>
                        <label>Type (Ex.: Laptop)</label><br>
                        <input type="text" v-model="type" required class="input-field-new">
                    </div>
                </div>

                <div class="row">
                    <div>
                        <label>Name (Ex.: Dell)</label><br>
                        <input type="text" v-model="name" required class="input-field-new">
                    </div>
                </div>

                <div class="row">
                    <div>
                        <label>Model (Ex.: Latitude)</label><br>
                        <input type="text" v-model="model" required class="input-field-new">
                    </div>
                </div>

                <div class="row">
                    <div>
                        <label>Price (Ex.: 1200.00)</label><br>
                        <input type="text" v-model="price" required class="input-field-new">
                    </div>
                </div>

                <div>
                    <button type="submit" class="btn-new add">Add product</button>
                    <router-link to="/" class="btn-new cancel">Cancel</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import { uuid } from 'vue-uuid'

export default {
    name: 'new-product',

    data () {
        return {
            product_id: null,
            type: null,
            name: null,
            model: null,
            price: null
        }
    },

    methods: {
        saveProduct() {
            db.collection('product').add({
                product_id: uuid.v4(),
                type: this.type,
                name: this.name,
                model: this.model,
                price: this.price
            })
            .then(this.$router.push('/'))
        }
    }
}
</script>

<style>
.head{
    margin: 50px 0px 50px 50px;
    font-size: 40px;
}

.row{
    margin: 20px 0px 0px 50px;
}

label{
    font-size: 18px;
    color: grey;
}

.input-field-new{
    padding: 5px;
    width: 30%;
    border: none;
    border-bottom: 2px solid lightgrey;
    font-size: 20px;
}

.btn-new{
    margin: 30px 0px 0px 50px;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    text-decoration: none;
    font-size: 18px;
    color: #fff;
    background-color: grey;
}

.add:hover{
    cursor: pointer;
    background-color: rgb(116, 183,	65);
}

.cancel:hover{
    cursor: pointer;
    background-color: cornflowerblue;
}
</style>