<template>
  <div class="edit-profile">
    <form @submit.prevent="onSubmit">
      <label for="fname">First Name</label>
      <input type="text" id="fname" :value="fname" @input="fname = $event.target.value" />

      <label for="lname">Last Name</label>
      <input type="text" id="lname" :value="lname" @input="lname = $event.target.value" />

      <label for="email">Email</label>
      <input type="email" id="email" :value="email" @input="email = $event.target.value" />

      <button type="submit">Update Profile</button>
    </form>
    <p>{{ fname }} {{ lname }} {{ email }} </p>
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
  },
  setup(props) {
    const user = ref(props.user)

    const fname = ref(user.value.fname)
    const lname = ref(user.value.lname)
    const email = ref(user.value.email)

    const { mutate, loading } = useMutation(UPDATE_PROFILE_MUTATION)

    const onSubmit = () => {
      mutate({
        fname: fname.value,
        lname: lname.value,
        email: email.value
      }).then(() => {
        // Navigate back to the user profile page
        router.push('/profile')
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
