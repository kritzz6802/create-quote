<template>
<p v-if="error">Something went wrong...</p>
<p v-if="loading">Loading...</p>
<div v-else class="container my-container">
    <h2 class="center">Your Product</h2>
        <div class="p-maindiv">
            <div class="product" v-for="q in result.products" :key="q">
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
                    <router-link :to="`/profile/${q.by._id}`">
                    <p class="right-align">~ {{q.by.fname}}</p>
                </router-link>
            </div>
        </div>
</div>
</template>

<script>
// import axios from 'axios';
// import {useRoute} from 'vue-router';
import gql from 'graphql-tag'
import {
    useQuery
} from '@vue/apollo-composable'
const CHARACTERS_QUERY = gql `
query
    {
    products{
        name
      price
      discription
      url
        by{
        _id
         fname
        }
     }
 }
`
export default {
    name: 'homePage',
    // data() {
    //     return {
    //         items: [],
    //         query: `
    //         query
    //         {
    //            products{
    //               name
    //               by{
    //                  fname
    //               }
    //            }
    //         }`
    //     }
    // },
    // mounted() {
    //     axios.post('http://localhost:4000/', {
    //         query: this.query
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(response => {
    //         this.items = response.data.data.products;
    //         // console.log(response.data.data.products);
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }
    setup() {

        const {
            result,
            loading,
            error
        } = useQuery(CHARACTERS_QUERY);
        console.log(result)
        return {
            result,
            loading,
            error
        }
    }
}
</script>
