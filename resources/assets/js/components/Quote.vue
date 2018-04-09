<template>

<div class="card quote-box" v-show="isVisible">

  <div class="quote-ctrl">
    <!--
      <a aria-label="edit">
        <i class="fas fa-edit"></i>
      </a>
    -->
      <a aria-label="delete" @click="onClickDestroy">
        <i class="fas fa-times-circle"></i>
      </a>
  </div>

  <div class="card-content">
    <div class="entrequote">
    <span class="quote">«</span>{{ this.quote.text }}<span class="quote">»</span>
    </div>
    <div class="subtitle is-size-6 has-text-right has-text-grey-light">
      <a class="quote-author" target="_blank" :href="this.quote.src">
        {{ this.quote.author }}
      </a>
      {{ /*this.quote.created_at*/ }}
    </div>
  </div>  
</div>

</template>

<!-- ...................................................................... -->

<script>

import animateDestroyComponent from '../utils/animate';

/**
 * @class Quote
 * 
 */
class Quote {
  constructor(data) {
    // Copy data at the root of the object
    for (let field in data) {
      this[field] = data[field];
    }
  }
};

/**
 * Component
 */
export default {
  // Properties are immutable and used for passing information.
  props: {
    id: {},
    text: { required: true },
    author: { required: false },
    src: { required: false },
    createdAt: { required: false }
  },

  data() {
    return {
      // The Quote instance handles mutable datas.
      quote: new Quote({
        text: '',
        author: 'unknown',
        src: '',
        created_at: 0
      }),

      isVisible: true,

      destroyAnimationTime: 420
    };
  },

  mounted() {
    // Initialize our dynamic data to properties values.
    this.quote.text = this.text;
    this.quote.author = this.author;
    this.quote.src = this.src;
    this.quote.created_at = this.createdAt;
  },

  methods: {
    onClickDestroy() {
      axios.delete(`/api/quotes/${this.id}`)
        .then(this.onDestroy.bind(this))
        .catch(error => console.log(error));
    },

    onDestroy() {
      // [ Could return a Promise instead of sending a callback. ]
      animateDestroyComponent(this.$el, this.destroyAnimationTime, () => {
        this.isVisible = false;
        Event.fire('deletedQuote', this.id);
      });
    }
  }
};
</script>

<!-- ...................................................................... -->

<style>
@import url('https://fonts.googleapis.com/css?family=Slabo+27px');

.quote-box {
  box-shadow:  8px 12px #963537;
  border-radius: 2px 2px 4px 4px;
  margin-bottom: 36px;
  background-color: #444;
}

.quote-ctrl {
  float: right;
  margin: 0px 8px 0px 8px;
}

.quote-ctrl>a {
  padding: 4px 6px 0px 6px;
  border: 0;
  background-color: rgba(0,0,0,0);
  font-size: 75%;

  color: rgba(255, 190, 190, 0.3);
}

.quote-ctrl>a:hover {
  color: rgba(255, 190, 190, 0.7);
}

.quote {
  color: #666;
  font-style: bold;
  font-size: 2em;
  padding-left: 10px;
  padding-right: 10px;
}

.entrequote {
  color: #b8b0ac;
  font-family: 'Slabo 27px', serif;
  font-size: 1.15em;
  font-style: italic;
  line-height: 38px;
  text-shadow:  2px 3px #533;
}

.quote-author {
  font-family: 'Verdana';
  color: #855;
}

.quote-author:hover {
  color: #C77;
}
</style>

<!-- ...................................................................... -->