<template>
    <div id="cart">
        <h1 v-if="total == 0">Cart empty</h1>
        
        <div class="items" v-else>
            <div v-bind:key="item" v-for="item in items">
                <p>{{ item.type }}</p>
                <p>{{ item.name }}</p>
                <p>{{ item.model }}</p>
                <p>{{ item.price }}</p>
                <p>x{{ item.quantity }}</p>
                <p>{{ item.quantity * item.price }} Lei</p>
            </div>
        </div>

        <div class="cart-total">
            <p>Toral</p>
            <p>{{ total }} Lei</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cart',

    data () {
        return {
            items: []
        }
    },

    methods: {
        inc() {

        },
        dec() {
            
        }
    },

    computed: {
        total() {
            return 0
        }
    }
}
</script>