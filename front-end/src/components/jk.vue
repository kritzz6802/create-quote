<script setup>
defineProps({
  modelValue: String,
  lastName: String
})

// defines what events our component emits
defineEmits(['update:modelValue', 'update:lastName'])
</script>

<template>
  <div>
    <label> First Name </label>
    <input
      type="text"
      placeholder="Input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label> Last Name </label>
    <input
      type="text"
      placeholder="Input"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)"
    />
  </div>
</template>


<template>
  <div class="edit-profile">
    <form @submit.prevent="onSubmit">
      <label for="fname">First Name</label>
      <input type="text" id="fname" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />

      <label for="lname">Last Name</label>
      <input type="text" id="lname" :value="lastName" @input="$emit('update:lastName', $event.target.value)" />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />

      <button type="submit">Update Profile</button>
    </form>
    <p>{{ modelValue }} {{ lastName }} {{ email }}</p>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { defineComponent, toRefs, reactive } from 'vue'
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
    },
    modelValue: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const user = reactive(props.user)
    const { email } = toRefs(user)
    const { mutate, loading } = useMutation(UPDATE_PROFILE_MUTATION)

    const onSubmit = () => {
      mutate({
        fname: props.modelValue,
        lname: props.lastName,
        email: email.value
      }).then(() => {
        // Navigate back to the user profile page
        router.push('/profile')
      })
    }

    return {
      email: email.value,
      loading,
      onSubmit
    }
  }
})
</script>



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


<script>
import gql from 'graphql-tag'
import { reactive } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable'

const CHARACTERS_QUERY = gql`
  query getProfile{
    user: myprofile {
      fname
      lname
      email
      products {
        id
        name
        price
        discription
        url
      }
    }
  }
`;

const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      fname
      lname
      email
    }
  }
`;

export default {
  name: 'profileUser',
  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    const { mutate: updateUserProfileMutation } = useMutation(UPDATE_USER_PROFILE_MUTATION);
    const userProfile = reactive({});

    function updateUserProfile() {
      const input = { ...userProfile };
      updateUserProfileMutation({ input }).then(() => {
        // Do something after the mutation is executed successfully.
      });
    }

    if (!localStorage.getItem('token')) {
      router.push('/login')
    }

    return {
      result,
      loading,
      error,
      userProfile,
      updateUserProfile,
    };
  },
};
</script>
