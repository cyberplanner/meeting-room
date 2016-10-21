<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use App\Lib\CalendarClient;
use Illuminate\Http\Request;
use App\Notifications\BookingConfirmed;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $calendar;
    
    public function __construct(CalendarClient $calendar)
    {
        $this->middleware('auth');
        $this->calendar = $calendar;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eventListing = $this->calendar->getData();
        $events = $eventListing["modelData"]["items"];
        $names = array();
        foreach ($events as $event) {
            $email = $event['attendees'][0]['email'];
            $name = User::where('email', $email)->select('name','email')->first();
            $names[$email] = $name->name;
        }
        return view('home', compact('eventListing', 'names'));
    }
    
    public function store(Request $request)
    {
        $this->calendar->postData($request);
        
        $dateFormatted = formatDate($request->input_date);
        
        $flashMessage = strtoupper($request->title) . ' is booked on ' . 
                        $dateFormatted . ' from ' . 
                        $request->start_time . ' to ' . $request->end_time . '.';
        
        flash($flashMessage);
        
        $user = returnUser();
        $user->notify(new BookingConfirmed($request, $dateFormatted));
        
        return redirect('/home');
    }
    
    public function destroy(Request $request)
    {
        $this->calendar->deleteData($request->eventId);
        
        $flashMessage = strtoupper($request->title) . ' has been deleted. ';
        flash($flashMessage);
        
        return redirect('/home');
    }
    
    public function update(Request $request)
    {
        $this->calendar->updateData($request);
    }
    
    public function show(Request $request)
    {
        $event = $this->calendar->getEvent($request);
        
        return redirect('/home');
    }
}
