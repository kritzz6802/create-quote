<template>
   <div v-if="result" class="container">
      <div class="center">
         <img class="circle profile-img" :src="`https://robohash.org/${result.user.fname}.png?size=200x200`" alt="pic" />
         <h5>{{result.user.fname}} {{result.user.lname}}</h5>
         <h6>{{result.user.email}}</h6>
      </div>
      <h3>Your quotes</h3>
     <!-- <blockquote v-for="q in result.user.quotes" :key="q">
         <h6>{{q.name}}</h6>
         <h6>{{ q.price }}</h6>
        <h6>{{ q.discription }}</h6>
        <h6>{{ q.quote }}</h6>
        <img v-if="q.url!==null" class="profile-img" :src="`${q.url}`" alt="pic" />
      </blockquote> -->
          <div class="p-maindiv">
        <div class="product" v-for="q in result.user.quotes" :key="q">
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
import gql from 'graphql-tag'
import router from '../router.js'
import {
    useQuery
} from '@vue/apollo-composable'
const CHARACTERS_QUERY = gql`
query getProfile{
  user:myprofile{
    fname
    lname
    email
     quotes{
    name
          price
      discription
      url
  }
  }

}
`
export default {
   name: 'profileUser',
    setup () {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    console.log(result)
   if (!localStorage.getItem('token')) {
//   throw new Error("You must be logged in");
  router.push('/login')
}
    return {
      result,
      loading,
      error
    }
  }
}
</script>