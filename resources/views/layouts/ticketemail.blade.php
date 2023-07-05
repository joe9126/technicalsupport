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
            <p style="font-size: 25px; color: white; text-align: center; font-weight: bold; padding-top: 5px;">Service Ticket</p>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="min-height:200px; background:#e6eeee; padding:20px 5px 20px 5px;" >
              
               <p>Dear {{$ticketinfo['contact']}},</p>
               <p>Please take note of the service ticket below and make arrangements to facilitate service engineer's site access.</p>
               <p>{{$ticketinfo['optionalmsg']}}</p>

               <table  border="1" style="width:80%; border-collapse:collapse; margin-top:5px; margin-left:auto; margin-right:auto; background-color:#fff;">
                <thead style="background: #111145; color:#e6eeee; font-weight:bold;">
                    <th colspan="4">Ticket # {{$ticketinfo['ticketno']." : ".$ticketinfo['fault']}}</th>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-weight:bold;">Client </td><td>{{$ticketinfo['client']}}</td><td style="font-weight:bold;">Site </td><td>{{$ticketinfo['site']}}</td>
                    </tr>
                    <tr>
                        <td  style="font-weight:bold;">Activity </td><td colspan="3">{{$ticketinfo['fault']}}</td>
                    </tr>
                    <tr>
                        <td style="font-weight:bold;">Date </td><td>{{$ticketinfo['ticketdate']}}</td><td style="font-weight:bold;">Priority </td><td>{{$ticketinfo['priority']}}</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="background: #111145; color:#e6eeee; font-weight:bold; text-align:center">Service Personnel </td>
                    </tr>
                   
                </tbody>
                </table>
                 
               <table  border="1" style="width:80%; border-collapse:collapse; margin-left:auto;margin-right:auto;">
                <thead>
                    <th>No</th> <th>Name</th> <th>ID No</th> <th>Phone</th>
                </thead>
                <tbody>
                    @foreach($techdata as $key=>$data)
                        <tr> 
                            <td>{{$key+1}}</td>  <td>{{$data->techname}}</td>  <td>{{$data->techid}}</td>  <td>{{$data->techphone}}</td>
                        </tr>
                    @endforeach
                
                </tbody>
                </table>
               
                <p style="margin-top:10px; font-weight:bold">Regards,</p>
                <p style="margin-top:10px; font-weight:bold">Symphony Customer Support.</p>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="height:50px; border-radius:0px 0px 10px 10px; background: #ADA996;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ text-align:center;padding:20px 5px 20px 5px; ">

    <p style="text-align: center;">This is an auto-generated email.<br> You may reply to it via service@symphony.co.ke or tscalls@symphony.co.ke.</p>

</div>
        </div>
    </div>
    
</div>
@endsection

