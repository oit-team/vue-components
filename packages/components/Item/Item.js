// @vue/components
export default {
  name: 'VcItem',

  inject: {
    ItemGroup: {
      default: undefined,
    },
  },

  props: {
    tag: {
      type: [String, Boolean],
      default: 'div',
    },
    value: {
      required: false,
    },
  },

  data: () => ({
    itemValue: undefined,
  }),

  computed: {
    active() {
      let active

      if (this.ItemGroup?.multiple) {
        active = this.ItemGroup.innerValue.includes(this.itemValue)
      } else {
        active = this.ItemGroup?.innerValue === this.itemValue
      }

      if (active && this.ItemGroup?.intoView) {
        // eslint-disable-next-line vue/no-async-in-computed-properties
        this.$nextTick(() => {
          this.$el.scrollIntoView({
            behavior: 'smooth',
          })
        })
      }

      return active
    },
    classes() {
      const activeClass = this.ItemGroup?.activeClass
      const inactiveClass = this.ItemGroup?.inactiveClass
      return this.active ? activeClass : inactiveClass
    },
  },

  created() {
    if (!this.ItemGroup) throw new TypeError('Item组件必须在ItemGroup组件下使用')
    this.register()
  },

  destroyed() {
    this.ItemGroup.unregister(this)
  },

  methods: {
    register() {
      const index = this.ItemGroup.register(this)
      this.itemValue = this.value ?? index
    },
    onToggle(e) {
      this.ItemGroup.toggle(this)
      this.$emit('click', e)
    },
  },
  render(h) {
    let render

    if (this.tag) {
      render = h(
        this.tag,
        {
          props: this.$attrs,
          on: {
            click: this.onToggle,
          },
        },
        this.$scopedSlots.default({
          active: this.active,
        }),
      )
    } else {
      render = this.$scopedSlots.default({
        active: this.active,
        toggle: this.onToggle,
      })[0]
    }

    render.data = Object.assign(render.data, {
      class: this.classes,
    })

    return render
  },
}
