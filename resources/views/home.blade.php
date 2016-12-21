@extends('layouts.app')

@section('content')

<div class="container">
        <ul class="nav navbar-nav navbar-right">
            Logged in as : <b>{{ Auth::user()->name }}</b> &nbsp;&nbsp;
            <a href="{{ url('/logout') }}"
                onclick="event.preventDefault();
                         document.getElementById('logout-form').submit();">
                <b>Logout</b>
            </a>

                <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                    {{ csrf_field() }}
                </form>
        </ul>
</div>
<div class="col-md-3">
        <new-booking @pagewefresh="fetchEventList" email="{{ Auth::user()->email }}"></new-booking>
</div>
         <p>@{{ counter }}</p>
              <p>
                <button @click="increment">+</button>
                <button @click="decrement">-</button>
              </p>
        
    
    
    <div class="col-md-9">
        <div class="form-group">
            <full-calendar :events="list" lang="en" title-format="MMMM yyyy"></full-calendar>
            
            <button class="btn btn-primary" v-on:click="toggle">
                <span v-if="calendar">View 2 Weeks</span>
                <span v-else>View Calendar</span>
            </button>
                <h3 v-if="calendar">Calendar View</h3>
                <h3 v-else>2 Week View</h3>
        </div>
        
    <twoweeks @pagefresh="fetchEventList" v-show="twoWeeks" email="{{ Auth::user()->email }}"></twoweeks>
    
    <div v-show="calendar">
        @include('calendar')
    </div>
                
                
            
            
            
            
        <!--<div v-show="twoWeeks" class="responsive-twoweeks">-->
            
        <!--</div>-->
        <!--<div v-show="calendar" class="responsive-iframe-container">-->
        <!--    @include('calendar')-->
        <!--</div>-->
    </div>
        
        
</div>

@endsection
