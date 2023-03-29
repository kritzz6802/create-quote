<template>
<p v-if="error">Something went wrong...</p>
<p v-if="loading">Loading...</p>
<div v-else class="container my-container">
        <div class="p-maindiv">
            <div class="product" v-for="q in result.quotes" :key="q">
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
          <!--  <blockquote v-for="q in result.quotes" :key="q">
                <h6>{{ q.name }}</h6>
                <h6>{{ q.price }}</h6>
                <h6>{{ q.discription }}</h6>
                <h6>{{ q.quote }}</h6>
                <img v-if="q.url!==null" class="profile-img" :src="`${q.url}`" alt="pic" />
                <router-link :to="`/profile/${q.by._id}`">
                    <p class="right-align">~ {{q.by.fname}}</p>
                </router-link>
            </blockquote> -->
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
    quotes{
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
    //            quotes{
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
    //         this.items = response.data.data.quotes;
    //         // console.log(response.data.data.quotes);
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
