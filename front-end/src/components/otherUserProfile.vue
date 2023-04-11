<template>
<div v-if="items" class="container">
    <div class="center">
        <img class="circle profile-img" :src="`https://robohash.org/${items.fname}.png?size=200x200`" alt="pic" />
        <h5>{{items.fname}} {{items.lname}}</h5>
        <h6>{{items.email}}</h6>
    </div>
    <h3>Your products</h3>
    <div class="p-maindiv">
        <div class="product" v-for="q in items.products" :key="q">
            <div class="center">
                <img v-if="q.url!==null" :src="`${q.url}`" alt="pic" />
            </div>
            <h5 style="margin-top: 20px;">
                {{ q.name }}
            </h5>
            <div>Price: <strong>$ {{ q.price }}</strong></div>
            <p>
                {{ q.discription }}
            </p>
        </div>
    </div>
</div>
</template>

<script>
import {
    useRoute
} from 'vue-router';
import axios from 'axios';
import {
    ref
} from 'vue';

export default {
    // ...
    data() {
        const route = useRoute();
        const userId = ref(route.params.userid);
        return {
            items: [],
            query: `
        query getUser($userId: ID!) {
          user(_id: $userId) {
            _id
            fname
            lname
            email
            products {
                name
                price
                discription
                url
            }
          }
        }
      `,
            variables: {
                userId: userId.value
            }
        }
    },
    mounted() {
        // console.log(this.variables);
        axios.post('https://mevn-product-selling.onrender.com/', {
            query: this.query,
            variables: this.variables
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            this.items = response.data.data.user;
            console.log(this.items);
        }).catch(error => {
            console.error(error);
        });
    }
}
</script>
