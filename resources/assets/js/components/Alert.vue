<template>

  <div class="Alert Alert--"v-bind:class="type | capitalize">
    
      <slot>{{ capitalize(type) }}</slot>
  </div>
  
</template>

<script>

  module.exports = {
      props: {
        type: { default: 'info' } 
      },
      data: function() {
        return {
          what: "what"
        }
      },
      methods: {
        capitalize(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }
  }

</script>

<style>
  
  .Alert {
    padding: 10px;
    position: relative;
    font-size: 250%;
  }
  
  .Alert--Info {
    background: blue;
  }
  
  .Alert--success {
    background: red;
    color: white;
  }
  
</style> 