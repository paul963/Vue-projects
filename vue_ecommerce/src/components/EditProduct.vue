<template>
    <div id="edit-product">
        <p class="head">Edit Product</p>
        <li>{{ product_id }}</li>
        <li>{{ type }}</li>
        <li>{{ name }}</li>
        <li>{{ model }}</li>
        <li>{{ price }}</li>
        
        <div>
            <form @submit.prevent="updateProduct">
                <div class="row">
                    <div>
                        <label>Type (Ex.: Laptop)</label><br>
                        <input type="text" v-model="type" class="input-field-new" required>
                    </div>
                </div>

                <div class="row">
                    <div>
                        <label>Name (Ex.: Dell)</label><br>
                        <input type="text" v-model="name" class="input-field-new" required>
                    </div>
                </div>

                <div class="row">
                    <div>
                        <label>Model (Ex.: Latitude)</label><br>
                        <input type="text" v-model="model" class="input-field-new"  required>
                    </div>
                </div>

                <div class="row">
                    <div>
                        <label>Price (Ex.: 1200.00)</label><br>
                        <input type="text" v-model="price" class="input-field-new"  required>
                    </div>
                </div>

                <div>
                    <button type="submit" class="btn-new add">Edit product</button>
                    <button @click="deleteProduct" class="btn-new delete">Delete</button>
                    <router-link to="/" class="btn-new cancel">Cancel</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'edit-product',

    data () {
        return {
            product_id: null,
            type: null,
            name: null,
            model: null,
            price: null
        }
    },

    beforeRouterEnter (to, from, next) {
        db.collection('product').where('product_id', '==', to.params.product_id).get()
        .then(query => {
            query.forEach(doc => {
                next(vm => {
                    vm.product_id = doc.data().product_id
                    vm.type = doc.data().type
                    vm.name = doc.data().name
                    vm.model = doc.data().model
                    vm.price = doc.data().price
                })
            })
        })
    },

    watch: {
        '$route': 'fetchData'
    },

    methods: {
        fetchData() {
            db.collection('product').where('product_id', '==', this.$route.params.product_id).get()
                .then(query => {
                    query.forEach(doc => {
                        this.product_id = doc.data().product_id
                        this.type = doc.data().type
                        this.name = doc.data().name
                        this.model = doc.data().model
                        this.price = doc.data().price
                    })
                })
        },

        updateProduct() {
            db.collection('product').where('product_id', '==', this.$route.params.product_id).get()
                .then(query => {
                    query.forEach(doc => {
                        doc.ref.update({
                            product_id: doc.data().product_id,
                            type: this.type,
                            name: this.name,
                            model: this.model,
                            price: this.price
                        })
                        .then(() => {
                            this.$router.push('/')
                        })
                    })
                })
        },

        deleteProduct() {
            if(confirm('Are you sure you want to delete?')) {
                db.collection('product').where('product_id', '==', this.$route.params.product_id).get()
                    .then(query => {
                        query.forEach(doc =>{
                            doc.ref.delete()
                            this.$router.push('/')
                        })
                    })
            }
        }
    }
}
</script>

<style>
.delete:hover{
    background-color: tomato;
    cursor: pointer;
}

.dis{
    background-color: #fff;
    cursor: not-allowed;
}
</style>