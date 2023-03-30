<template>
  <div class="edit-profile">
    <form @submit.prevent="onSubmit">
      <label for="fname">First Name</label>
      <input type="text" id="fname" :value="user.fname" @input="fname = $event.target.value" />

      <label for="lname">Last Name</label>
      <input type="text" id="lname" v-model="lname" />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />

      <button type="submit">Update Profile</button>
    </form>
<p>{{ user.fname  }} {{ lname }} {{ email }}</p>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { defineComponent, toRefs,reactive } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import router from '../router.js'

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateUser($fname: String!, $lname: String!, $email: String!) {
    updateUser(input: { fname: $fname, lname: $lname, email: $email }) {
      fname
      lname
      email
    }
  }
`

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
//   data() {
//     return {
//       fname: ''
//     }
//   },
  setup(props) {
    // const { fname, lname, email } = toRefs(props.user)
    const user = reactive(props.user)
 const { fname, lname, email } = toRefs(user)
    const { mutate, loading } = useMutation(UPDATE_PROFILE_MUTATION)

    const onSubmit = () => {
      mutate({
        fname: fname.value,
        lname: lname.value,
        email: email.value
      }).then(() => {
      console.log(fname);
      console.log(lname);
      console.log(email);
        // Navigate back to the user profile page
        router.push('/profile')
      })
    }

    return {
      fname: fname.value,
      lname: lname.value,
      email: email.value,
      loading,
      onSubmit
    }
  }
})
</script>
