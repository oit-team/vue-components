<script>
import { getScroller } from '../../utils/scroll'
import './LoadMore.scss'

const LOAD_STATUS = {
  INACTIVE: 0,
  LOADING: 1,
  DONE: 2,
  FAIL: 3,
}

let slots

export default {
  name: 'VcLoadMore',

  LOAD_STATUS,

  install(Vue, options) {
    slots = options
  },

  props: {
    offset: {
      type: [String, Number],
      default: 300,
    },
    firstLoad: Boolean,
  },

  data: () => ({
    status: 0,
    active: false,
  }),

  computed: {
    scope() {
      return {
        status: this.status,
        ...this.booleanStatus,
      }
    },
    booleanStatus() {
      return {
        inactive: this.status === LOAD_STATUS.INACTIVE,
        loading: this.status === LOAD_STATUS.LOADING,
        done: this.status === LOAD_STATUS.DONE,
        fail: this.status === LOAD_STATUS.FAIL,
      }
    },
    statusClass() {
      const status = Object
        .entries(this.booleanStatus)
        .find(([, value]) => value)[0]

      return `vc-load-more--${status}`
    },
  },

  mounted() {
    this.scroller = getScroller(this.$el)
    this.observerWay()
  },

  destroyed() {
    this.$emit('hook:destroyed')
  },

  methods: {
    load() {
      this.status = LOAD_STATUS.LOADING

      this.$emit('load', {
        next: this.next,
        done: this.done,
        fail: this.fail,
      })
    },
    next() {
      this.status = LOAD_STATUS.INACTIVE
    },
    done() {
      this.status = LOAD_STATUS.DONE
    },
    fail() {
      this.status = LOAD_STATUS.FAIL
    },
    onClick(e) {
      if ([LOAD_STATUS.FAIL, LOAD_STATUS.INACTIVE].includes(this.status))
        this.load()

      this.$emit('click', e)
    },
    reset() {
      this.status = LOAD_STATUS.INACTIVE
      return this
    },
    observerWay() {
      const observer = new IntersectionObserver((entries) => {
        const canTrigger = !this.firstLoad ? this.active : true

        if (entries[0].isIntersecting && canTrigger) {
          if (this.status === LOAD_STATUS.INACTIVE || this.status === LOAD_STATUS.FAIL)
            this.load()
        }
      }, {
        root: this.scroller,
        threshold: [1, 0],
      })

      observer.observe(this.$refs.trigger)

      const rootEl = this.scroller
      const onActive = () => {
        this.active = true
        rootEl.removeEventListener('scroll', onActive)
      }
      rootEl.addEventListener('scroll', onActive)

      this.$once('hook:destroyed', observer.disconnect)
    },
  },
}
</script>

<template>
  <div class="vc-load-more">
    <div class="vc-load-more__trigger">
      <div
        ref="trigger"
        class="vc-load-more__trigger-core"
        :style="{ height: `${offset}px` }"
      />
    </div>
    <div class="vc-load-more__tips">
      <div :class="statusClass" class="vc-load-more__status" @click="onClick">
        <slot v-bind="scope" />
      </div>
    </div>
  </div>
</template>
