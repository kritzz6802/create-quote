<template>
    <div class="container my-container">
        <h3>Create Product!!</h3>
        <form action="" @submit.prevent="getData()">
            <input type="text" name="name" placeholder="name" v-model="form.name" required>
            <input type="text" name="price" placeholder="price" v-model="form.price" required>
            <input type="text" name="discription" placeholder="description" v-model="form.discription" required>
            <input type="text" name="url" placeholder="write your url" v-model="form.url" required>
            <button type="submit" class="btn #673ab7 deep-purple">Create Product</button>
        </form>
    </div>
</template>

<script>
import { request} from 'graphql-request';

export default {
  name: 'createProduct',
  data() {
    return {
      form: {
        name: '',
        price: '',
        discription: '',
        url: '',
      },
      endpoint: process.env.VUE_APP_BASE_URL,
      mutation: `
mutation CreateProduct($addproduct: product!) {
  createProduct(addproduct: $addproduct) {
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
      `,
      headers:  localStorage.getItem('token')
    }
  },
  methods: {
    async getData() {
      const { name,
      price,
      discription,url } = this.form;
      const variables = { addproduct:{
      name,
      price,
      discription,
      url
      } };
      const options = { authorization: this.headers};
      try {
        const data = await request(this.endpoint, this.mutation, variables,options);
        console.log(data);
        alert('create your Product successfully!! ');
      } catch (error) {
        console.error(error);
        alert('Error creating Product!');
      }
    }
  }
}
</script>