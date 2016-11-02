<template id="twoweeks">
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <div class="panel panel-default">

                  <div class="panel-body">
                    <table>    
                      <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Title</th>
                        <th>Booker</th>
                        <th></th>
                      </tr>
                  
                      <tr v-for="event in list">
                        <td class="smallpadding"><div v-bind:class="'circle _' + event.colorId"></div></td>
                        <td>
                          <span v-if="event.start.dateTime">{{ event.start.dateTime | momentDate }}</span>
                          <span v-if="event.start.date"> {{event.start.date | momentDate }} </span>
                        </td>
                        <td>
                        <span v-if="event.start.dateTime">{{ event.start.dateTime | momentTime }} - {{ event.end.dateTime | momentTime }}</span>
                        <span v-if="event.start.date">{{ event.start.date | momentTime }} - {{ event.end.date | momentTime }}</span>
                        </td>
                        <td><span v-if="event.summary" style="font-size: 16px">{{ event.summary }}</span></td>
                        <td>
                          <span v-if="event.attendees">{{ event.attendees[0]['name']}}</span>
                          <span v-else>Mettrr</span>
                        </td>
                        <td>
                            <span v-if="checkUser(event)">
                              <button id="update-model" v-on:click="eventUpdate = event; updateModal = true"><i class="fa fa-wrench" aria-hidden="true"></i></button>
                              <form @submit.prevent="deleteEvent">
                                <button type="submit" v-on:click="form.eventId = event.id">
                                  <i class="fa fa-trash-o" aria-hidden="true" ></i>
                                </button>
                              </form>
                            </span>
                        </td>
                      </tr>
                    </table>
                  </div>
            </div>
        </div>
    </div>
    
    <update :event="eventUpdate" :email="email" v-if="updateModal" @close="closeModal"></update>

</template>

<script type>

const moment = require('moment');

 module.exports = {
  template :'#twoweeks',
  props : ['email'],
  
  data: function() {
    return {
      eventUpdate: '',
      updateModal : false,
      form : {
        eventId : ''
      }
    }
  },
  
  computed : {
    list () {
      return this.$store.state.bookings;
    }
  },
  
  filters: {
    momentDate: function(date) {
      return moment(date).format("ddd DD, MMM");
    },
    momentTime: function(time) {
      return moment(time).format("HH:mm");
    }
  },
    
  methods: {
    checkUser: function(event) {
      if (event.attendees) {
        return this.email == event.attendees[0]['email'];
      } 
    },
    
    deleteEvent: function() {
        // var params = { "eventId" : event } 
        // var conparams = JSON.stringify(params);
        console.log(this.form.eventId);
        this.$http.post('api/remove', this.form).then(() => {
            console.log("narm");
            this.$emit('pagefresh');
        });
    },
    
    closeModal: function () {
      this.updateModal = false;
      this.$emit('pagefresh');
    }
  }
};

</script>