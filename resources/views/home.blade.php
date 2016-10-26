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
        <new-booking email="{{ Auth::user()->email }}"></new-booking>
</div>
        <!--@include('flash')-->
        <!--<alert></alert>-->
    
    <div class="col-md-9">
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="toggle">
                <span v-if="calendar">View 2 Weeks</span>
                <span v-else>View Calendar</span>
            </button>
                <h3 v-if="calendar">Calendar View</h3>
                <h3 v-else>2 Week View</h3>
        </div>
        
    <twoweeks v-show="twoWeeks" email="{{ Auth::user()->email }}" :list="list"></twoweeks>
    
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
