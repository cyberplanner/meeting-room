
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vues Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
Vue.use(require('vue-moment'));

const moment = require('moment');

var Alert = require('./components/Alert.vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */
 
Vue.component('twoweeks', require('./components/twoweeks.vue'));



const app = new Vue({
    el: '#app',
    components: { 
      alert: Alert 
    },
    data: {
      word: "test",
      calendar: false,
      startTime:"08:00",
      endTime: "",
      moment: moment(),
      list: [],
      form: {
        title: '',
        input_date: '',
        start_time: '19:00',
        end_time: '20:00',
        email: 'np@mettrr.com'
      }
    },
    created: function() {
        this.fetchEventList();
    },
    methods: {
        incrementStartTime() {
          return this.startTime = moment(this.startTime, "HH:mm").add(30, "minutes").format("HH:mm");
        },
        decrementStartTime() {
          return this.startTime = moment(this.startTime, "HH:mm").subtract(30, "minutes").format("HH:mm");
        },
        incrementEndTime() {
          return this.endTime = moment(this.endTime, "HH:mm").add(30, "minutes").format("HH:mm");
        },
        decrementEndTime() {
          return this.endTime = moment(this.endTime, "HH:mm").subtract(30, "minutes").format("HH:mm");
        },
        toggle() {
          return this.calendar = !this.calendar;
        },
        
        fetchEventList() {
          this.$http.get('api/get').then((response) => {
              this.list = response.body; 
          }, (response) => { 
              console.log("errors");  
          });
        },
        ajaxPost: function (){
          var form = this.form;
          this.$http.post('api/post', form).then((response) => {
                this.fetchEventList();
            }, (response) => {
                  console.log(response);
            });
          
        }
    },
    ready: function () {
      this.fetchEventList();
    },
    computed: {
        returnEndTime() {
          return this.endTime = moment(this.startTime, "HH:mm").add(30, "minutes").format("HH:mm");
        }, 
        twoWeeks() {
          return !this.calendar;
        },
        formStartTime() {
          return this.form.start_time = this.startTime;
        },
        formEndTime() {
          return this.form.end_time = this.endTime;
        }
    }
});
