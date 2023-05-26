@extends('layouts.app')
@section('navigation')
@stop

@section('content')
<div class="bg-gray-100">
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="height:50px; border-radius:10px 10px 0px 0px; background: #de6161;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #2657eb, #de6161);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #2657eb, #de6161); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            " >
            <p style="font-size: 25px; color: white; text-align: center; font-weight: bold;">Service Ticket</p>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="min-height:200px; background:#e6eeee; padding:20px 5px 20px 5px;" >
              
               <p>Dear {{$ticketinfo['contact']}},</p>
               <p>Please note that this service ticket has been attended to with the status: {{$ticketinfo['status']}}.</p>
          

               <table  border="1" style="width:80%; border-collapse:collapse; margin-top:5px; margin-left:auto; margin-right:auto; background:#fff;">
                <thead style="background: #111145; color:#e6eeee; font-weight:bold;">
                    <th colspan="4">Ticket # {{$ticketinfo['ticketno']." : ".$ticketinfo['fault']}}</th>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight:bold;">Client </td><td>{{$ticketinfo['client']}}</td>
                        <td style="font-weight:bold;">Site </td><td>{{$ticketinfo['site']}}</td>
                    </tr>
                    <tr>
                        <td  style="font-weight:bold;">Equipment Model </td><td>{{$ticketinfo['model']}}</td>
                        <td  style="font-weight:bold;">Serial No </td><td >{{$ticketinfo['serialno']}}</td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Start </td><td>{{$ticketinfo['start_time']}}</td>
                        <td style="font-weight:bold;">End </td><td>{{$ticketinfo['end_time']}}</td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Status on arrival </td><td colspan="3">{{$ticketinfo['findings']}}</td>                        
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Action Taken</td><td colspan="3">{{$ticketinfo['actiontaken']}}</td>                        
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Recommendations</td><td colspan="3">{{$ticketinfo['recommendations']}}</td>                        
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Service Report</td>
                        @if($ticketinfo['attachstatus']==1)
                        <td colspan="3">Attached</td>
                        @else
                            <td colspan="3">{{$ticketinfo['jobcardurl']}}</td>     
                        @endif                   
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Ticket Status</td><td colspan="3">{{$ticketinfo['status']}}</td>                        
                    </tr>
                   
                </tbody>
                </table>
                 
              
               
                <p style="margin-top:10px; font-weight:bold">Regards,</p>
                <p style="margin-top:10px; font-weight:bold">Symphony Customer Support.</p>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="height:50px; border-radius:0px 0px 10px 10px; background: #de6161;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #2657eb, #de6161);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #2657eb, #de6161); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            text-align:center;padding:20px 5px 20px 5px; color:antiquewhite;">
                <p >This is an auto-generated email.<br> You may reply to it via <span style="text-decoration:none;">service@symphony.co.ke.</span></p>
            </div>
        </div>
    </div>
    
</div>
@endsection

