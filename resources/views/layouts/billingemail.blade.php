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
            <p style="font-size: 25px; color: white; text-align: center; font-weight: bold; padding-top:5px;">
                Billing Request: {{$billinginfo['csrno']}} </p>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="min-height:200px; background:#e6eeee; padding:20px 20px 20px 20px;" >
              
                @foreach($recipient as $key=>$data) 
               <p>Dear {{$data->name.", "}},</p>
               @endforeach

               @if($billinginfo['attachment'] ==0)
                <p>Please note that CSR #  {{$billinginfo['csrno']}} is ready for billing. Click the link below to download the job card. </p>
              
                <a href="{{$billinginfo['jobcard']}}" style="height:10px; width:20px; border-radius:5px 5px 5px 5px; background:#2657eb; color:#e6eeee; text-align:center; font-weight:bold font-size:15px;">
                        DOWNLOAD JOB CARD
                </a>
                <p>The LPO and other CSR details can be found on the portal.</p>
                <p>Can't click the button, click the link below to download the job card.</p>
                    {{$billinginfo['jobcard']}}
                @else
                <p>Please note that CSR #  {{$billinginfo['csrno']}} is ready for billing. Download the attached job card for billing. </p>
                <p>The LPO and other CSR details can be found on the portal.</p>
                @endif
                <p style="margin-top:10px; font-weight:bold">Regards,</p>
                <p style="margin-top:10px; font-weight:bold">Symphony Customer Support.</p>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-sm-8 justify-content-center">
            <div style="height:50px; border-radius:0px 0px 10px 10px; background: #ADA996;  /* fallback for old browsers */
                        background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);  /* Chrome 10-25, Safari 5.1-6 */
                        background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ 
                        text-align:center;padding:20px 5px 20px 5px; ">

                <p style="text-align: center;">This is an auto-generated email.<br> You may reply to it via service@symphony.co.ke or tscalls@symphony.co.ke.</p>

            </div>
        </div>
    </div>
    
</div>
@endsection

