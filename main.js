Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
       <div class="product">

        <div class="product-image">
          <img v-bind:src="image">
        </div>


        <div class="product-info">
          <h1>{{title}}</h1>
          <p v-if="inStock">In stock</p>
          <p v-else> out of stock</p>
          <p> Shipping:{{shipping}}</p>
          <ul>
            <li v-for="detail in details">{{detail}}
            </li>
          </ul>
          <div v-for="(variant,index) in variants" :key="variant.variantId" class="color-box"
            :style="{backgroundColor:variant.variantColor}" @mouseover="updateProduct(index)">
          </div>


          <br />


          <button v-on:click="addToCart" :disabled="!inStock">Add to cart</button>
          <button v-on:click="removeFromCart">Remove From cart</button>
  
        </div>
      <product-review></product-review>
      </div>
  
  `,
  data() {
    return {
      brand: "Vue Mastery",
      product: 'Socks',
      selectedVariant: 0,
      inventory: 100,
      details: ["80% cotton", '20% polyester', 'Gender-neutral'],
      variants: [{
        variantId: 2234,
        variantColor: 'green',
        variantImage: 'data:image/jpeg;base64,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',
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: 'data:image/jpeg;base64,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',
        variantQuantity: 0
      }]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)

    }
  },

  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } return 2.99
    }
  }

})
Vue.component('product-review', {
  template: `
  <form class="review-form>
   <p> 
   <label for="name">Name:</label>
   <input id="name" v-model="name">
   </p>
   <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
   </p>
   <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
   <option>5</option>
   <option>4</option>
  <option>3</option>
  <option>2</option>
   <option>1</option>

   </select>
   </p>
   <p>
   <input type="submit" value="Submit">
   </p>
  
  
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItem(id) {
      this.cart.pop(id)
    }
  }
})