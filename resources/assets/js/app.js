
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vues Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

import Vuex from 'vuex'
Vue.use(Vuex);


Vue.use(require('vue-moment'));
const moment = require('moment');


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

Vue.component('new-booking', require('./components/new-booking.vue'));
Vue.component('twoweeks', require('./components/twoweeks.vue'));
Vue.component('update', require('./components/update.vue'));
Vue.component('alert', require('./components/Alert.vue'));


import { mapState } from 'vuex'

export default {
  computed: mapState({
    count: state => state.count,
    
    countAlias: 'count',
    
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

const store = new Vuex.Store({
  state: {
    count: 0,
    bookings: []
  },
  
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
   
    populateBookings (state, bookings) {
      state.bookings = bookings;
    }
  }
  
})

const app = new Vue({
    el: '#app',
    store,
    data: {
      word: "test",
      calendar: false
    },
      
    created: function () {
      this.fetchEventList();
    },
    
    methods: {
      toggle() {
        return this.calendar = !this.calendar;
      },
      increment () {
        store.commit('increment')
      },
      decrement () {
        store.commit('decrement')
      },
        
      fetchEventList: function () {
        console.log("narp");
        this.$http.get('api/get').then((response) => {
          store.commit('populateBookings', response.body);
          console.log("insideFetch");
        });
      }
    },
    
    computed: {
        twoWeeks () {
          return !this.calendar;
        },
        
        ...mapState({
          counter: 'count'
        })
    }
});
