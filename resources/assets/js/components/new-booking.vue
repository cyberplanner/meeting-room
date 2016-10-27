<template id="new-booking">
    
    <div class="panel-body">
        <h1>Mettrr</h1>
        <h4>Meeting Room Booking Form</h4>
        
        <form @submit.prevent="ajaxPost"> 
        
            <label for="title" class="control-label">Booking Title</label>
            
            <p>
            <div class="form-group">
                <input class="field form-control" name="title" type="text" v-model="form.title">
            </div>
            </p>
            
            <label for="date" class="control-label">Date</label>
            <p>
            <div class="form-group">
                <input class="field form-control" name="input_date" type="date" v-model="form.input_date">
            </div>
            </p>
            
            <p>
            <div class="form-group">
                <label for="start-time" class="control-label">Start Time</label>
                <input v-model="form.start_time" @change="returnEndTime" class="field" name="start_time" type="time" step="1800" required="required" style="font-size: 2rem; width: 8rem;" />
                &nbsp;&nbsp;<i class="fa fa-minus mouse-over" v-on:click="decrementStartTime" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-plus mouse-over" v-on:click="incrementStartTime" aria-hidden="true"></i>
            </div>
            </p>
            
            <p>
            <div class="form-group">
                <label for="end-time" class="control-label">End Time &nbsp;</label>
                <input v-model="form.end_time" class="field" name="end_time" type="time" step="1800" required="required" style="font-size: 2rem; width: 8rem;" />
                &nbsp;&nbsp;<i class="fa fa-minus mouse-over" v-on:click="decrementEndTime" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-plus mouse-over" v-on:click="incrementEndTime" aria-hidden="true"></i>
            </div>
            </p>
            
            <div class="form-group">
                <label for="priority" class="control-label">Priority&nbsp;</label>
                <input class="field mouse-over" name="priority" type="radio" value="11" v-model="form.priority">&nbsp; 1 &nbsp;
                <input class="field mouse-over" name="priority" type="radio" value="5" v-model="form.priority">&nbsp; 2 &nbsp;
                <input class="field mouse-over" name="priority" type="radio" value="10" v-model="form.priority">&nbsp; 3 &nbsp;
            </div>
            
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Add Meeting</button>
            </div>
        
         </form>
      
      </div>
</template>

<script>

const moment = require('moment');

  module.exports = Vue.extend({
    template :'#new-booking',
    props : {
      email : String
    },
    
    data: function() {
      return {
        form: {
          title: '',
          input_date: '',
          start_time: '08:00',
          end_time: '',
          priority: '',
          email : this.email        
        }
      }
    },
    
    methods: {
        incrementStartTime() {
          return this.form.start_time = moment(this.form.start_time, "HH:mm").add(30, "minutes").format("HH:mm");
        },
        decrementStartTime() {
          return this.form.start_time = moment(this.form.start_time, "HH:mm").subtract(30, "minutes").format("HH:mm");
        },
        incrementEndTime() {
          return this.form.end_time = moment(this.form.end_time, "HH:mm").add(30, "minutes").format("HH:mm");
        },
        decrementEndTime() {
          return this.form.end_time = moment(this.form.end_time, "HH:mm").subtract(30, "minutes").format("HH:mm");
        },
        
        ajaxPost: function() {
          this.$http.post('api/post', this.form).then(function() {
            this.$parent.$nextTick(function () {
              this.$parent.$events.$boardcast('datahere');
              console.log("ticked");
            });
          });
        }
    },
    
    computed: {
        returnEndTime() {
          return this.form.end_time = moment(this.form.start_time, "HH:mm").add(30, "minutes").format("HH:mm");
        }
    }
});
  
</script>