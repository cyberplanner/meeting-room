
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vues Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

import store from './store'

Vue.use(require('vue-moment'));
const moment = require('moment');

import { mapState } from 'vuex'
import fullCalendar from 'vue-fullcalendar'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

Vue.component('new-booking', require('./components/new-booking.vue'));
Vue.component('twoweeks', require('./components/twoweeks.vue'));
Vue.component('update', require('./components/update.vue'));
Vue.component('alert', require('./components/Alert.vue'));
Vue.component('full-calendar', fullCalendar);
 

export default {
  computed: mapState({
    count: state => state.count,
    
    countAlias: 'count',
    
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}


const app = new Vue({
    el: '#app',
    store,
    data: {
      calendar: false,
      demo: [{
        title : 'Sunny Out of Office',
        start : '2016-08-25',
        end : '2016-08-27'
      }]
    },
      
    created() {
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
         list () {
         return this.$store.state.bookings;
        },
        
        ...mapState({
          counter: 'count'
        })
    }
});
