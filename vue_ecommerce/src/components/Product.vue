<template>
    <div id="product">
        <div>
            
            <router-link to="/new" class="btn-add"><img src="../assets/add.png"/></router-link>

            <table class="nice-table">
                <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                </tr>

                <tr v-for="product in product" v-bind:key="product.id">
                    <td>{{ product.type }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.model }}</td>
                    <td>{{ product.price }} Lei</td>
                    <td><router-link v-bind:to="{name:'edit-product', params: {product_id: product.product_id}}"><button class="btn-table edit">Edit</button></router-link></td>
                    <td><button class="btn-table btn-add-cart" v-on:click="addToCart(product)">Add to cart</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'product',

    data () {
        return {
            product: [],
            cart: []
        }
    },

    created () {
       db.collection('product').orderBy('type').get().then(query => {
           query.forEach(doc =>{
               const data = {
                'id': doc.id,
                'product_id': doc.data().product_id,
                'type': doc.data().type,
                'name': doc.data().name,
                'model': doc.data().model,
                'price': doc.data().price
               }
               
               this.product.push(data)
           })
       })
    },

    methods: {
        addToCart() {
            
        }
    },

    computed: {
        total() {
            return 0
        }
        
    }
}
</script>

<style>
.nice-table{
    margin: 50px 0px 0px 50px;
    width: 85%;
    border-spacing: 0px;
}

.btn-add{
    float: right;
    margin-right: 5%;
}

th{
    padding: 10px;
    background-color: rgb(192,192,192);
    font-size: 22px;
}

td{
    padding: 10px;
    font-size: 20px;
    text-align: center;
    box-shadow: 0px 2px lightgrey;
}

.btn-table{
    padding: 6px 25px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
}

.btn-add-cart{
    background-color: cornflowerblue;
}

.btn-add-cart:hover{
    cursor: pointer;
}

.edit:hover{
    background-color: lightblue;
    cursor: pointer;
}
</style>