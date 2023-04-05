<template>
  <h5>Update Profile</h5>
  <div class="edit-profile">
    <form @submit.prevent="onSubmit">
      <input type="text" id="fname" :value="fname" @input="fname = $event.target.value" />

      <input type="text" id="lname" :value="lname" @input="lname = $event.target.value" />

      <input type="email" id="email" :value="email" @input="email = $event.target.value" />

      <button type="submit" class="btn #673ab7 deep-purple">Update Profile</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { defineComponent, ref } from 'vue'
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
  }
  ,setup(props) {
    const user = ref(props.user)

    const fname = ref(user.value.fname)
    const lname = ref(user.value.lname)
    const email = ref(user.value.email)

    const { mutate, loading } = useMutation(UPDATE_PROFILE_MUTATION)

    const onSubmit = () => {
      console.log(fname.value)
      mutate({
        fname: fname.value,
        lname: lname.value,
        email: email.value
      }).then(() => {
        // Navigate back to the user profile page
        router.push('/')
      })
    }

    return {
      fname,
      lname,
      email,
      loading,
      onSubmit
    }
  }
})
</script>
