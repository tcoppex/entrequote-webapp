<!--Application main component --> 

<template>

<div id="entrequote-app">
  <!--Header -->  
  <section class="hero is-primary is-tiny round-top">
    <div class="hero-body">
      <div class="container has-text-centered simple-cursor">
        <h1 class="title">
          <span class="red-meat">«</span>
          <span title="Tu reprendras bien une petite côtelette Dédé ?">
           EntreQuote  
          </span>
          <span class="red-meat">»</span>
        </h1>
        <h2>
          <em>Exquisite pieces &#38; bits around the interweb</em>
        </h2>
      </div>
    </div>
    <!-- Panel links (routers) -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <router-link tag="li" to="/" exact>
              <a><i class="fas fa-th-list"></i></a>
            </router-link>
            <router-link tag="li" to="/config">
              <a><i class="fas fa-cog"></i></a>
            </router-link>
          </ul>
        </div>
      </nav>
    </div>
  </section>

  <!-- Page content -->
  <section class="section boucherie round-bottom">
    <div class="container">
      <router-view></router-view>
    </div>
  </section>
</div>

</template>

<!-- ...................................................................... -->

<script>
export default {
  name: "entrequote-app",
};
</script>

<!-- ...................................................................... -->

<style>
html {
  padding: 32px;
  background-color: #eeeedc;
}

.red-meat {
  color: #ffdcdc;
}

.boucherie {
  background-color: #d04648;
}

.simple-cursor {
  cursor: default;
}

.round-top {
  border-radius: 2px 2px 0px 0px;
}

.round-bottom {
  border-radius: 0px 0px 4px 4px;
}
</style>