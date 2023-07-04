<script>
const MODE = {
  PRICE: 'price',
}

// @vue/components
export default {
  name: 'VcText',

  props: {
    tag: {
      type: String,
      default: 'span',
    },
    mode: String,
    text: [String, Number],
    textSymbol: {
      type: String,
      default: '￥',
    },
  },

  data: () => ({
    MODE,
  }),

  computed: {
    price() {
      const price = Number(parseFloat(this.text).toFixed(2))
      const arr = price.toString().split('.')
      arr[0] = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return arr.join('.')
    },
  },
}
</script>

<template>
  <component class="vc-text-price" :is="tag" v-if="mode === MODE.PRICE">
    <span class="vc-text-price__symbol" v-if="textSymbol">{{ textSymbol }}</span>
    <span class="vc-text-price__content">{{ price }}</span>
  </component>
</template>
