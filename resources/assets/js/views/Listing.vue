<!-- 
  Listing View

  Load and display quotes for the current page. 
-->

<!-- ...................................................................... -->

<template>
<div class="container">
  <div class="columns">
    <div class="column">
      <Quote v-for="quote in json_quotes" :key="quote.id"     
        :id="quote.id"
        :text="quote.text"
        :author="quote.author"
        :src="quote.src"
        :createdAt="quote.created_at">
      </Quote>

      <Pagination :current="currentPageNumber" 
                  :total="totalPageCount">
      </Pagination>
    </div>
  </div>
</div>
</template>

<!-- ...................................................................... -->

<script>
import Quote from '../components/Quote.vue';
import Pagination from '../components/Pagination.vue';

export default {
  components: { Quote, Pagination },

  data() {
    return {
      quotesPerPage: 8, // [TODO : load from settings.]

      json_quotes: [],
      totalQuotesCount: 0,
      currentPageNumber: 1
    }
  },

  mounted() {
    this.loadTotalQuotesCount();
    this.loadPageQuotes();
    Event.listen('pageChange', this.onPageChange);
    Event.listen('deletedQuote', this.onDeletedQuote);
  },

  methods: {
    loadTotalQuotesCount() {
      axios.get('/api/quotes/count')
        .then(({data}) => this.totalQuotesCount = data);
    },

    loadPageQuotes() {
      const firstQuote = (this.currentPageNumber-1) * this.quotesPerPage;

      // Fetch quotes from the server.
      axios.get(`/api/quotes?start=${firstQuote}&limit=${this.quotesPerPage}`)
        .then(({data}) => {
          this.json_quotes = data; // <- object deconstruction
        }).catch(error => console.log(error));
    },

    onPageChange(pageNumber) {
      this.currentPageNumber = pageNumber;
      this.loadPageQuotes();
    },

    onDeletedQuote(quoteId) {
      --this.totalQuotesCount;
      // [Instead of the whole page, we only need to reload the last quote.]
      this.loadPageQuotes();
    }
  },

  computed: {
    totalPageCount: function() {
      return Math.ceil(this.totalQuotesCount / this.quotesPerPage);
    }
  }
};
</script>

<!-- ...................................................................... -->
