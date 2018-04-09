<template>

<nav id="pagination" class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous" 
     :disabled="current == 1"
     @click="onClickPage(current-1)"
     href="#">
   Previous
 </a>
  <a class="pagination-next" 
     :disabled="current == total"
     @click="onClickPage(current+1)"
     href="#">
   Next
 </a>
  
  <ul class="pagination-list">
    
    <li v-for="pageNumber in total">
      <a class="pagination-link" 
         :class="{ 'current':  isCurrent(pageNumber) }"
         :aria-label="`Page ${pageNumber}`"
         @click="onClickPage(pageNumber)"
         href="#">
       {{ pageNumber }}
      </a>
    </li>

  </ul>
</nav>

</template>

<script>
export default {
  props: {
    current: { required: true },
    total: { required: true }
  },

  methods: {
    onClickPage(pageNumber) {
      if (pageNumber <= 0 || pageNumber > this.total) {
        return;
      }

      Event.fire('pageChange', pageNumber);
    },

    isCurrent(pageNumber) {
      return pageNumber == this.current;
    }
  }
};
</script>

<style type="text/css">
  .current {
    background-color: rgba(255, 155, 75, 0.7);
  }
</style>