<template>
<div v-if="result" class="container">
    <div class="center">
        <img class="circle profile-img" :src="`https://robohash.org/${result.user.fname}.png?size=200x200`" alt="pic" />
        <h5>{{result.user.fname}} {{result.user.lname}}</h5>
        <h6>{{result.user.email}}</h6>
        <button @click="editProfile">edit</button>
    </div>
    <h3>Your products</h3>
    <div class="p-maindiv">
        <div class="product" v-for="q in result.user.products" :key="q">
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

    <div v-if="showEditForm">
        <EditProfileForm :user="result.user" @close="closeEditForm" />
    </div>
</div>
</template>

<script>
import gql from 'graphql-tag'
import { ref } from 'vue';
import router from '../router.js'
import EditProfileForm from "./EditProfileForm.vue";
import {
    useQuery
} from '@vue/apollo-composable'
const CHARACTERS_QUERY = gql `
query getProfile{
  user:myprofile{
    fname
    lname
    email
     products{
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
    components: {
        EditProfileForm,
    },
    setup() {
        const {
            result,
            loading,
            error
        } = useQuery(CHARACTERS_QUERY);
        const showEditForm = ref(false);
        // console.log(result)
        if (!localStorage.getItem('token')) {
            //   throw new Error("You must be logged in");
            router.push('/login')
        }

        function editProfile() {
            showEditForm.value = true;
        }

        function closeEditForm() {
            showEditForm.value = false;
        }
        return {
            result,
            loading,
            error,
            showEditForm,
            editProfile,
            closeEditForm,
        }
    }
}
</script>
