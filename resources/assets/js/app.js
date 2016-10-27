
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vues Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
Vue.use(require('vue-moment'));

const moment = require('moment');

import Alert from './components/Alert.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */


Vue.component('new-booking', require('./components/new-booking.vue'));
Vue.component('twoweeks', require('./components/twoweeks.vue'));

const app = new Vue({
    el: '#app',
    components: { 
      alert: { Alert },
    },
    
    data: {
      word: "test",
      calendar: false,
      moment: moment(),
      list: []
    },
    created: function() {
        this.fetchEventList();
    },

    events: {
      datahere: function () {
        this.$nextTick(function () {
          console.log('Item loaded!', this.list);
        });
      }
    },
    
    methods: {
        toggle() {
          return this.calendar = !this.calendar;
        },
        
      fetchEventList: function () {
        console.log("narp");
          this.$http.get('api/get').then(function (response) {
          console.log("insideFetch");
          this.list = response.body; 
        },function(response){ 
            console.log("errors");  
        });
      }
    },
    
    computed: {
        twoWeeks() {
          return !this.calendar;
        }
    }
});
