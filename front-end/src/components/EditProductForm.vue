<template>
<form @submit.prevent="submit">
    <div>
        <label for="name">Name:</label>
        <input type="text" id="name" :value="name" @input="name = $event.target.value">
    </div>
    <div>
        <label for="price">Price:</label>
        <input type="number" id="price" :value="price" @input="price = $event.target.value">
    </div>
    <div>
        <label for="discription">discription:</label>
        <input id="discription" :value="discription" @input="discription = $event.target.value">
    </div>
    <div>
        <label for="image">Image URL:</label>
        <input type="url" id="image" :value="url" @input="url = $event.target.value">
    </div>
    <button type="submit">Save</button>
    <button type="button" @click="cancel">Cancel</button>
</form>
</template>

<script>
import gql from 'graphql-tag'
import {
    defineComponent,
    ref
} from 'vue'
import {
    useMutation
} from '@vue/apollo-composable'
import router from '../router.js'

const UPDATE_PRODUCT_MUTATION = gql `
  mutation updateProduct($inputProduct: UpdateProInput) {
    updateProduct(inputProduct: $inputProduct) {
      id
      name
      price
      discription
      url
    }
  }
`;

export default defineComponent({
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const product = ref(props.product)

        // const id = ref(product.value.id)
        const name = ref(product.value.name)
        const price = ref(product.value.price)
        const discription = ref(product.value.discription)
        const url = ref(product.value.url)

        const {
            mutate
        } = useMutation(UPDATE_PRODUCT_MUTATION)

        function submit() {
            if (!props.product || !props.product.id) {
                console.error("Product ID not found");
                return;
            }

            mutate({
                variables: {
                    inputProduct: {
                        id: props.product.id,
                        name: name.value,
                        price: price.value,
                        discription: discription.value,
                        url: url.value
                    }
                }
            }).then(() => {
                router.push('/profile')
            }).catch((error) => {
                console.error(error)
            })
        }

        return {
            name,
            price,
            discription,
            url,
            submit
        }
    }
})
</script>
