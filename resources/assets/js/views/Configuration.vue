<!-- 
  Configuration page 
-->

<!-- ...................................................................... -->

<template>
<div class="configuration-box">
  Parametrize me like one of your french asymptote.
  
<!--
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Quotes per page</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input class="input" type="number" :value="this.config.quotesPerPage">
        </div>
      </div>
    </div>
  </div>

<div class="field is-horizontal">
  <div class="field-label">
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-primary">
          Update
        </button>
      </div>
    </div>
  </div>
</div>
-->

</div>
</template>

<script>

class Configuration {
  constructor() {
    this.quotesPerPage = 32;
  }
};

export default {
  data() {
    return {
      config: new Configuration()
    };
  }
};
</script>

<!-- ...................................................................... -->

<style>  
.configuration-box {
  padding: 32px;

  border-radius: 3px;
  background-color: rgba(200, 200, 200, 0.4);
}
</style>

<!-- ...................................................................... -->
