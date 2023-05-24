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
            " ></div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="min-height:200px; background:#e6eeee; padding:20px 5px 20px 5px;" >
                <p style="font-weight:bold">To Finance & Procurement,</p>
                    <p>Please login to <a href='http://tech.symphony.co.ke/'>Tech Support->Supply Requests</a> to view and download attachments for the CSR.</p>
                    <p style="font-weight:bold">Regards,</p>
                    <p style="font-weight:bold">Symphony Tech Support</p>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="height:50px; border-radius:0px 0px 10px 10px; background: #de6161;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #2657eb, #de6161);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #2657eb, #de6161); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            text-align:center;padding:20px 5px 20px 5px; color:antiquewhite;">
                <p >This is an auto-generated email.<br> You may reply to it via service@symphony.co.ke.</p>
            </div>
        </div>
    </div>
    
</div>
@endsection

