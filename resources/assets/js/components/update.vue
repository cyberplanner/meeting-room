<template id="update">
  
  
  <div class="modal-mask" transition="modal"> 
    <div class="modal-container">
      <div class="modal-body">
        
        <h4>Update Booking</h4>
        
        <form @submit.prevent>
         
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
                <button type="submit" @click="$emit('close')">Cancel</button>
                <button type="submit" @click="updateAjax">Update</button>
            </div>
        
         </form>
    
      </div>
    </div>
  </div>
  
</template>

<script>
  
const moment = require('moment');

  module.exports = {
    
    template : '#update',
    
    props: ['email','event'],
    
    data: function() {
      return {
        title: "titleYO",
        form: {
          title: '',
          input_date: '',
          start_time: '',
          end_time: '',
          priority: '',
          email : this.email,   
          eventId : ''
        }
      }
    },
    
    methods: {
      updateAjax: function() {
        this.$http.post('api/update', this.form).then((response) => {
          console.log("updated");
          console.log(response);
          this.$emit('close');
        });
      },
      
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
      momentDate: function(date) {
        return moment(date).format("YYYY-MM-DD");
      },
      momentTime: function(time) {
        return moment(time).format("HH:mm");
      },
      
      returnDefaults: function () {
          return this.form.input_date = this.momentDate(this.event.start.dateTime), 
                 this.form.start_time = this.momentTime(this.event.start.dateTime),
                 this.form.end_time = this.momentTime(this.event.end.dateTime),
                 this.form.title = this.event.summary,
                 this.form.eventId = this.event.id,
                 this.form.priority = this.event.colorId;
      }
    },
    
    mounted: function() {
      this.returnDefaults();  
    },
    
    computed: {
        returnEndTime() {
          return this.form.end_time = moment(this.form.start_time, "HH:mm").add(30, "minutes").format("HH:mm");
        }
    }
    
}
  
</script>

<style>
* {
  box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

.modal-enter, .modal-leave {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
  

</style>