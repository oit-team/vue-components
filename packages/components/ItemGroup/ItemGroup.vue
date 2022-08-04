<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'VcItemGroup',

  provide() {
    return {
      ItemGroup: this,
    }
  },

  model: {
    event: 'change',
  },

  props: {
    tag: {
      type: String,
      default: 'div',
    },
    // 多选时是一个数组
    value: {
      required: false,
    },
    // item 激活的 class
    activeClass: {
      type: [String, Object, Array],
      default: 'vc-item--active',
    },
    // item 未激活的 class
    inactiveClass: [String, Object, Array],
    // 必须选择一项
    mandatory: Boolean,
    // 允许多选
    multiple: Boolean,
    // item改变时是否聚焦到视图可视区
    intoView: Boolean,
  },

  data() {
    const innerValue = this.multiple ? (this.value ?? []) : this.value
    return {
      innerValue,
    }
  },

  watch: {
    value() {
      this.innerValue = this.value
    },
    innerValue(value) {
      this.$emit('change', value)
    },
  },

  created() {
    this.items = []
  },

  mounted() {
    this.mandatory && this.initValue()
  },

  methods: {
    initValue() {
      if (!this.items.length) return

      const firstItemValue = this.items[0].itemValue

      if (this.multiple) {
        if (!this.innerValue.length) {
          this.innerValue.push(firstItemValue)
        }
      } else {
        this.innerValue = this.innerValue ?? firstItemValue
      }
    },
    toggle(item) {
      if (this.multiple) {
        if (item.active) {
          if (
            this.innerValue.includes(item.itemValue) &&
            (!this.mandatory || this.innerValue.length > 1)
          ) {
            this.innerValue.splice(this.innerValue.indexOf(item.itemValue), 1)
          }
        } else {
          this.innerValue.push(item.itemValue)
        }
      } else {
        if (item.active) {
          if (this.mandatory) return
          this.innerValue = undefined
        } else {
          this.innerValue = item.itemValue
        }
      }
    },
    register(item) {
      this.items.push(item)
      return this.items.length - 1
    },
    unregister(item) {
      if (this.items.includes(item)) {
        this.items.splice(this.items.indexOf(item), 1)
      }
    },
  },
}
</script>

<style scoped>

</style>
