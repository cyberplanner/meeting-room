 @foreach ($eventListing->getItems() as $event)

<form method="POST" action="/patch">
  {{ method_field('PATCH') }}
  <input type="hidden" name="_token" value="{{ csrf_token() }}">
  <input type="hidden" name="_token" value="{{ csrf_token() }}">
  <input type="hidden" name="eventId"  value="{{{ $event->getId() }}}" >
  
  <label for="title" class="control-label">Booking Title</label>
            
            <p>
            <div class="form-group">
                <input class="field" name="title" type="text" class="form-control">
            </div>
            </p>
            
            <label for="date" class="control-label">Date</label>
            <p>
            <div class="form-group">
                <input class="field" name="input_date" type="date" class="form-control">
            </div>
            </p>
            
            <p>
            <div class="form-group">
                <label for="start-time" class="control-label">Start Time</label>
                <input v-model="startTime" @change="returnEndTime" class="field" name="start_time" type="time" min="08:00" max="18:00" class="form-control" step="1800" required="required">
                <i class="fa fa-minus mouse-over" v-on:click="decrementStartTime" aria-hidden="true"></i>&nbsp;<i class="fa fa-plus mouse-over" v-on:click="incrementStartTime"  aria-hidden="true"></i>
            </div>
            </p>
            
            <p>
            <div class="form-group">
                <label for="end-time" class="control-label">End Time &nbsp;</label>
                <input v-model="endTime" input class="field" name="end_time" type="time" class="form-control" min="08:00" max="18:00" step="1800" required="required">
                <i class="fa fa-minus mouse-over" v-on:click="decrementEndTime" aria-hidden="true"></i>&nbsp;<i class="fa fa-plus mouse-over" v-on:click="incrementEndTime" aria-hidden="true"></i>
            </div>
            </p>
            
            <div class="form-group">
                <label for="priority" class="control-label">Priority&nbsp;</label>
                <input class="field mouse-over" name="priority" type="radio" value="11">&nbsp; 1 &nbsp;
                <input class="field mouse-over" name="priority" type="radio" value="5">&nbsp; 2 &nbsp;
                <input class="field mouse-over" name="priority" type="radio" value="10">&nbsp; 3 &nbsp;
            </div>
            
            <div class="form-group">
                <button type="submit" class="btn btn-primary ">Update Meeting</button>
            </div>
</form>

@endforeach
  