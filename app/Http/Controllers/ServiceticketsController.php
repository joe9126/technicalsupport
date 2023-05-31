<?php

namespace App\Http\Controllers;

use Validator,Response,Redirect;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Servicetickets;
use App\Models\Serviceentries;
use App\Models\Contracts;
use App\Models\SupplyRequests;
use App\Models\User;
use App\Models\Clients;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Exception;
use Carbon\Carbon;
use Mail;
class ServiceticketsController extends Controller
{
    public $ticketinfo,$techinfo, $assignedtechs, $generalmsg;
    public function __construct(){
       //  $this->email_message="";
    }
    public function index(){
        if(Auth::user()->role=="Admin"){
            $tickets = DB::table('servicetickets')
            ->select(
                "servicetickets.faultreported",
                "servicetickets.ticketno",
                DB::raw("IFNULL(serviceentries.jobcardno,'no update') as jobcardno"),
                "servicetickets.ticketdate",
                "servicetickets.location",
                "servicetickets.status",
                "servicetickets.urgency",
                "servicetickets.billingrefno",
                "clients.clientname",
                "users.name",
                "clients.clientname",
                )
            ->leftjoin("clients","servicetickets.client","=","clients.id")
            ->leftjoin("serviceentries","serviceentries.ticketno","=","servicetickets.ticketno")
           ->leftjoin("users","servicetickets.personnel","=","users.id")
            ->orderBy("servicetickets.ticketdate","desc")
            ->get();
        }else{
        $tickets = DB::table('servicetickets')
        ->select(
            "servicetickets.faultreported",
            "servicetickets.ticketno",
            DB::raw("IFNULL(serviceentries.jobcardno,'no update') as jobcardno"),
            "servicetickets.ticketdate",
            "servicetickets.location",
            "servicetickets.status",
            "servicetickets.urgency",
            "servicetickets.billingrefno",
            "clients.clientname",
            "users.name",
            "clients.clientname",
            )
        ->leftjoin("clients","servicetickets.client","=","clients.id")
        ->leftjoin("serviceentries","serviceentries.ticketno","=","servicetickets.ticketno")
       ->leftjoin("users","servicetickets.personnel","=","users.id")
       ->where("servicetickets.personnel",Auth::user()->id)
        ->orderBy("servicetickets.ticketdate","desc")
        ->get();
        }
     // dump($tickets);
        return view('service.tickets',['tickets'=>$tickets]);
    }

public function searchTicket(Request $request){
        $ticket = Servicetickets::where("servicetickets.ticketno",'=',$request->ticketno)
                ->from("servicetickets")
                ->leftjoin('clients','clients.id','=','servicetickets.client')
                ->leftjoin('users as technicians','servicetickets.personnel','=','technicians.id')
                ->leftjoin('users as creators','servicetickets.createdby','=','creators.id')
                ->orderBy('servicetickets.created_at','desc')
                ->select('servicetickets.ticketno','servicetickets.ticketdate','servicetickets.billingrefno','clients.clientname','clients.id as clientid','servicetickets.location','servicetickets.faultreported','servicetickets.urgency','technicians.name as engineer','technicians.id as techid','technicians.email as techemail','technicians.phone as techphone','technicians.idnumber as idnumber','servicetickets.status','creators.name as ticketcreator')
                ->get();

                return response()->json($ticket);
    }

public function checkTicket(Request $request){
        $ticket = Servicetickets::where("servicetickets.ticketno",'=',$request->ticketno)
                                        ->select("ticketno")->get();
        $ticketcount = $ticket->count();
        return $ticketcount;
    }

/**
 * SAVE A NEW SERVICE TICKET
 */
public function store(Request $request){
   // dd($request->ticketdate);
        $techdata = json_decode($request->input('techdata'));
        if(count($techdata)>1){
           
            foreach($techdata as $key=>$ticket){
                $ticketno = $request->ticketno."-".($key+1);
                $status = Servicetickets::updateOrCreate(
                    ['ticketno'=>$ticketno],
                    [
                       'ticketno'=>$ticketno,
                       'ticketdate'=>$request->ticketdate,
                       'client'=>$request->client,
                       'billingrefno'=>$request->billingrefno,
                       'faultreported'=>$request->faultreported,
                       'urgency'=>$request->urgency,
                       'location'=>$request->location,
                       'personnel'=>$ticket->techstaffid,
                       'status'=>$request->status,
                       'createdby'=>Auth::user()->id
                      ]);
            }
        }else{
            $status = Servicetickets::updateOrCreate(
                ['ticketno'=>$request->ticketno],
                [
                   'ticketno'=>$request->ticketno,
                   'ticketdate'=>$request->ticketdate,
                   'client'=>$request->client,
                   'billingrefno'=>$request->billingrefno,
                   'faultreported'=>$request->faultreported,
                   'urgency'=>$request->urgency,
                   'location'=>$request->location,
                   'personnel'=>$request->personnel,
                   'status'=>$request->status,
                   'createdby'=>Auth::user()->id
                  ]);
        }
     
         $mail_list  = array(); $cc_list = array();$msg=""; $response=0; $responsemsg=""; $contactname = "";
        if($status){
            $responsemsg ="Ticket saved successfully.";$response =1;
            
            if($request->notifyclient>0){
                $clientdata = Clients::where("id","=",$request->client)
                                            ->select("email","secemail","contactperson")
                                            ->get();

                 foreach($clientdata as $row){
                    array_push($mail_list,$row->email);
                    array_push($mail_list,$row->secemail);
                       $contactname   =$row->contactperson;                
                 }
            }

            if($request->notifytech>0){ 

                foreach($techdata as $row){
                    $techname = $row->techname;
                    $techphone = $row->techphone;
                    $techid = $row->techid;
                    $techemail = $row->techemail;
                    array_push($cc_list,$techemail);
                    array_push($mail_list,$techemail);
                }
            }

            if($request->notifyclient==1 || $request->notifytech ==1){
                
                if($request->optionalmsg!==null){
                    $msg=$request->optionalmsg;
                }
                $subject = "TICKET # ".$request->ticketno." | ".$request->faultreported." AT ".$request->clientname.", ".$request->location."";
             $ticketinfo = [
                            "ticketno"=>$request->ticketno,
                            "fault"=>$request->faultreported,
                            "site"=>$request->location,
                            "client"=>$request->clientname,
                            "contact"=>$contactname,
                            "optionalmsg"=>$msg,
                            "billrefno"=>$request->billrefno,
                            "ticketdate"=>Carbon::parse($request->ticketdate)->format("l jS \\of F Y h:i"),
                            "priority"=>$request->urgency,
                        ];

           $assignedtechs = [];
         foreach($techdata as $row){
            $techname = $row->techname;
            $techphone = $row->techphone;
            $techid = $row->techid;
            $techemail = $row->techemail; 
            $techinfo = (object)[
                    "techname"=> $techname,
                    "techphone"=>$techphone,
                    "techid"=>$techid,
                    "techemail"=>$techemail
                    ];
                    array_push($assignedtechs,$techinfo); 
            } 
                // array_push($cc_list,"service@symphony.co.ke"); 
                //array_push($cc_list,"tscalls@symphony.co.ke");
                //$emaildata = array("ticketinfo"=>$ticketinfo );
             $status =  Mail::send('layouts.ticketemail', ["ticketinfo"=>$ticketinfo,"techdata"=>$assignedtechs],function($message) use ($mail_list,$cc_list, $subject){
                        $message->to($mail_list, '')
                            ->replyTo('service@symphony.co.ke','')
                            ->cc($cc_list,'')
                            ->subject($subject);
                    });

        
             
                if($status){
                     $response =1; $responsemsg .=" Email notification sent!";
                }else{
                        $response =1; $responsemsg .=" Could not send notification.";
                }
            }
            else{
                 $response =1; $responsemsg="Ticket saved successfully. No notification sent.";
            }
            
        }else{
                $response =0; $responsemsg="Ticket not saved! Try again";
        }

         return response()->json(["msg"=>$responsemsg,"response"=>$response]);								
}


public function showTicket(Request $request){
        if($request->jobcardno =='no update'){
            $ticket = DB::table('servicetickets')
            ->select(
                "servicetickets.faultreported",
                "servicetickets.ticketdate",
                "servicetickets.ticketno",
                "servicetickets.status",
                "servicetickets.location",
                DB::raw("IFNULL(serviceentries.jobcardno,'no update') as jobcardno"),
                DB::raw("IFNULL(serviceentries.start_time,'no update') as start_time"),
                DB::raw("IFNULL(serviceentries.end_time,'no update') as end_time"),
                DB::raw("IFNULL(serviceentries.serialno,'no update') as serialno"),
                DB::raw("IFNULL(serviceentries.model,'no update') as model"),
                DB::raw("IFNULL(serviceentries.city,'no update') as site"),
                DB::raw("IFNULL(serviceentries.findings,'no update') as findings"),
                DB::raw("IFNULL(serviceentries.action_taken,'no update') as action_taken"),
                DB::raw("IFNULL(serviceentries.recommendations,'no update') as recommendations"),
                DB::raw("IFNULL(serviceentries.attachment,'no file found') as attachment"),
                "users.name",
                "clients.clientname",
                )
            ->leftjoin("serviceentries","serviceentries.ticketno","=","servicetickets.ticketno")
            ->leftjoin("clients","servicetickets.client","=","clients.id")
           ->leftjoin("users","servicetickets.personnel","=","users.id")
           ->where("servicetickets.ticketno",$request->ticketno) //->toSql(); 
            ->get();
        }else{
       
        $ticket = DB::table('servicetickets')
        ->select(
            "servicetickets.faultreported",
            "servicetickets.ticketdate",
            "servicetickets.ticketno",
            "servicetickets.status",
            "servicetickets.location",
            DB::raw("IFNULL(serviceentries.jobcardno,'no update') as jobcardno"),
            DB::raw("IFNULL(serviceentries.start_time,'no update') as start_time"),
            DB::raw("IFNULL(serviceentries.end_time,'no update') as end_time"),
            DB::raw("IFNULL(serviceentries.serialno,'no update') as serialno"),
            DB::raw("IFNULL(serviceentries.model,'no update') as model"),
            DB::raw("IFNULL(serviceentries.city,'no update') as site"),
            DB::raw("IFNULL(serviceentries.findings,'no update') as findings"),
            DB::raw("IFNULL(serviceentries.action_taken,'no update') as action_taken"),
            DB::raw("IFNULL(serviceentries.recommendations,'no update') as recommendations"),
            DB::raw("IFNULL(serviceentries.attachment,'no file found') as attachment"),
            "users.name",
            "clients.clientname",
            )
        ->leftjoin("serviceentries","serviceentries.ticketno","=","servicetickets.ticketno")
        ->leftjoin("clients","servicetickets.client","=","clients.id")
       ->leftjoin("users","servicetickets.personnel","=","users.id")
       ->where("servicetickets.ticketno",$request->ticketno) //->toSql();
       ->where("serviceentries.jobcardno",$request->jobcardno)
        ->get();
        }
          //  dump($ticket);
        return $ticket;
    }

    /**
     * SERVICE TICKET UPDATE // MAKING SERVICE ENTRY
     */
public function updateTicket(Request $request){
      
        try{
            $response = Serviceentries::updateOrCreate(
                ['ticketno'=>$request->ticketno, 'jobcardno'=>$request->jobcardno],
                ['ticketno'=>$request->ticketno,
                'jobcardno'=>$request->jobcardno,
                'servicedate'=>$request->start_time,
                'start_time'=>$request->start_time,
                'end_time'=>$request->end_time,
                'model'=>$request->model,
                'serialno'=>$request->serialno,
                'city'=>$request->city,
                'findings'=>$request->findings,
                'action_taken'=>$request->action_taken,
                'recommendations'=>$request->recommendations,
                'updatedby'=>Auth::user()->id,
                'attachment'=>$request->filename,]
            );
            $response = Servicetickets::where("ticketno",$request->ticketno)
            ->update(
               ["status"=>$request->status]
            );
    
            if( $response){
                if ($request->hasFile('attachment')) {
                    $attachment = $request->file('attachment');
                    $filename = $request->filename.'.'.$attachment->getClientOriginalExtension();
                     $destinationPath = base_path('Uploads');
                     $filecheck = $destinationPath.'/'.$request->filename;
    
                        if(Storage::exists($filecheck)){
                            Storage::delete($filecheck);
                        }
                          $response = $attachment->move($destinationPath,$request->filename);
                    }
            }

            if($response){
                $csrno = Servicetickets::where("servicetickets.ticketno",$request->ticketno)
                                        ->select(
                                            "servicetickets.billingrefno",
                                            "servicetickets.faultreported",
                                            "users.name",
                                            "clients.clientname"
                                            )
                                            ->leftjoin("users","servicetickets.personnel","=","users.id")
                                            ->leftjoin("clients","servicetickets.client","=","clients.id")
                                            ->get();
                           // $csrno = json_encode($csrno);
                          //  dd($csrno[0]->billingrefno);        

                SupplyRequests::where("csrno",$csrno[0]->billingrefno)->update(["status"=>"Ready to bill"]);
                
                $subject = "TICKET # ".$request->ticketno." UPDATED: JOB CARD HAS BEEN UPLOADED FOR REQUEST #".$csrno[0]->billingrefno." ";
                $mail_list  = array(); $cc_list = array();

                array_push($mail_list,"jasewe@symphony.co.ke");
              //  array_push($cc_list,"nwatwiri@symphony.co.ke"); 
                array_push($cc_list,"service@symphony.co.ke"); 
                array_push($cc_list,"tscalls@symphony.co.ke"); 

                $generalmsg = [
                    "message"=>"Please note that the job card for Ticket # ".$request->ticketno." carried out by ".$csrno[0]->name." has been uploaded.
                                 Request #".$csrno[0]->billingrefno." for ".$csrno[0]->clientname." : ".$csrno[0]->faultreported." may be ready for billing."
                ];
                $status =  Mail::send('layouts.generalemail', ["generalmsg"=>$generalmsg],function($message) use ($mail_list,$cc_list, $subject){
                    $message->to($mail_list, '')
                        ->replyTo('jasewe@symphony.co.ke','')
                        ->cc($cc_list,'')
                        ->subject($subject);
                        });
                $clientnotify = $request->notifyclient;
                if( $status && $clientnotify ==1){
                    $jobcardurl=""; $attachstatus=0;
                    $clientdata = Clients::where("clientname","=",$csrno[0]->clientname)
                    ->select("email","secemail","contactperson")
                    ->get();

                        foreach($clientdata as $row){
                            array_push($mail_list,$row->email);
                            array_push($mail_list,$row->secemail);
                            $contactname =$row->contactperson;                
                        }

                        $jobcard = Servicetickets::where('servicetickets.ticketno',$request->ticketno)
                                    ->select( "servicetickets.faultreported","serviceentries.attachment","clients.clientname")
                                    ->leftjoin("serviceentries","servicetickets.ticketno","=","serviceentries.ticketno")
                                    ->leftjoin("clients","servicetickets.client","=","clients.id")
                                    ->get();

                                if(filter_var($jobcard[0]->attachment,FILTER_VALIDATE_URL) !==false){
                                        $jobcardurl = $jobcard[0]->attachment; $attachstatus=0;
                                }else{
                                    $destinationPath = base_path('Uploads');
                                    $jobcardurl = $destinationPath.'/'.$jobcard[0]->attachment;
                                    $attachstatus=1;
                                }
                               
                                $ticketinfo = [
                                    "ticketno"=>$request->ticketno,
                                    "client"=>$jobcard[0]->clientname,
                                    "fault"=>$jobcard[0]->faultreported,
                                    "jobcardno"=>$request->jobcardno,
                                    "cardtitle"=>$request->cardtitle,
                                    "start_time"=>Carbon::parse($request->start_time)->format("d/m/Y h:m"),
                                    "end_time"=>Carbon::parse($request->end_time)->format("d/m/Y h:m"),
                                    "site"=>$request->city,
                                    "model"=>$request->model,
                                    "serialno"=>$request->serialno,
                                    "contact"=>$contactname,
                                    "findings"=>$request->findings,
                                    "actiontaken"=>$request->action_taken,
                                    "recommendations"=>$request->recommendations,
                                    "status"=>$request->status,
                                    "attachstatus"=>$attachstatus,
                                ];
                       $subject = "TICKET # ".$request->ticketno." UPDATED|".$jobcard[0]->faultreported." AT ".$jobcard[0]->clientname.", ".$request->city."";
                        Mail::send('layouts.jobcardemail', ["ticketinfo"=>$ticketinfo],
                                    function($message) use ($mail_list,$cc_list,$attachstatus,$jobcardurl, $subject){
                                     $message->to($mail_list, '')
                                    ->replyTo('service@symphony.co.ke','')
                                    ->cc($cc_list,'')
                                    ->subject($subject);

                            if($attachstatus==1){
                                $message->attach($jobcardurl);
                            }else{

                                array_push($ticketinfo["jobcardurl"],$jobcardurl);
                            }
                        });
                }


                return response()->json([
                    'success'=>true,
                    'message'=>'Your service ticket updated successfully.'
                ],200);
            }
            else{
                return response()->json([
                    'success'   =>  false,
                    'message'   =>  'An error occured. Could not update the service ticket.'
                ], 200);
            }

        }
        catch(Exception $except){
            return response()->json([
                'success'   =>  false,
                'message'   =>  $except->getMessage() //'An error occured. Possible duplicate job card number.'
            ], 200);
        }    
            
    }



/**
 * DELETE TICKET
 */
public function deleteTicket(Request $request){
                 Serviceentries::where("ticketno",$request->ticketno)
                              ->delete();
           
                $response = Servicetickets::where("ticketno",$request->ticketno)
                            ->delete();
       

            if($response){
                return response()->json([
                    'success'=>true,
                    'message'=>'Service ticket deleted successfully.'
                ],200);
            }
            else{
                return response()->json([
                    'success'   =>  false,
                    'message'   =>  'An error occured. Could not delete the service ticket.'
                ], 200);
            }
}

   //CHECK IF FILE  EXISTS BEFORE DOWNLOAD
public function checkFile(Request $request){
        $file =  base_path('Uploads').'/'.$request->filename;
        if(File::exists($file)){

                return response()->json([
                    'success'   =>  true,
                    'message'   =>  'Download successful.'
                ], 200);

        }
        else{
            return response()->json([
                'success'   =>  false,
                'message'   =>'Attachment not found. Click attachment link to download.'
            ], 200);
          }
    }

public function  downloadFile(Request $request){
    $file =  base_path('Uploads').'/'.$request->filename;
	$headers = [
			'Content-Type: application/pdf',
	];
	return response()->download($file,$request->filename,$headers);

  }


public function getReferences(Request $request){
    if($request->reference =="csr"){
        $references = SupplyRequests::from('supply_requests')
                ->leftjoin('clients','supply_requests.clientid','=','clients.id')
                ->select('supply_requests.csrno','supply_requests.description')	
                ->whereYear('supply_requests.created_at', '=', $request->csryear)
                 ->where('clients.id','=',$request->client)
                 ->orderBy('supply_requests.created_at','DESC')
                ->get();

  
}else if($request->reference =="contract"){
    $references = Contracts::from('contracts')
                ->leftjoin('clients','contracts.clientid','=','clients.id')
                ->select('contracts.contractno','contracts.description')	
                 ->where('contracts.clientid','=',$request->client)
                ->get();

       
}

return $references;
}

public function filterUser(Request $request){
    $userinfo = User::where('id','=',$request->id)->get();
    return $userinfo;
   }

  public function partsInventory(){
    return view("toolsandparts.partsinventory");
}

public function searchAttendances(Request $request){
    $query = Serviceentries::where("serviceentries.start_time",">=",date_format(date_create($request->startdate),'Y-m-d'))
    ->where("serviceentries.end_time","<=",date_format(date_create($request->todate),'Y-m-d')) 
    ->select(
        "servicetickets.ticketno",
        "serviceentries.jobcardno",
        "serviceentries.start_time",
        "serviceentries.end_time",
        "serviceentries.model",
        "serviceentries.serialno",
        "serviceentries.city",
        "servicetickets.faultreported",
        "serviceentries.findings",
        "serviceentries.recommendations",
        "clients.clientname"
        )
        ->leftjoin("servicetickets","servicetickets.ticketno","=","serviceentries.ticketno")
        ->leftjoin("clients","servicetickets.client","=","clients.id")
        ->orderBy("serviceentries.start_time","desc") //->toSql();
        ->get();

        if($request->clientname !="Select Client" && $request->searchphrase !=""){
            $query =  Serviceentries::where("serviceentries.start_time",">=",date_format(date_create($request->startdate),'Y-m-d'))
            ->where("serviceentries.end_time","<=",date_format(date_create($request->todate),'Y-m-d'))
           ->where("clients.clientname","=",$request->clientname)
           ->orWhere("serviceentries.model","like",$request->searchphrase."%") 
            ->orWhere("serviceentries.serialno","like",$request->searchphrase."%")
            ->orWhere("serviceentries.ticketno","like",$request->searchphrase."%")
            ->orWhere("serviceentries.jobcardno","like",$request->searchphrase."%")
            ->orWhere("servicetickets.faultreported","like",$request->searchphrase."%")
           ->orWhere("servicetickets.billingrefno","like",$request->searchphrase."%")
            ->select(
                "servicetickets.ticketno",
                "serviceentries.jobcardno",
                "serviceentries.start_time",
                "serviceentries.end_time",
                "serviceentries.model",
                "serviceentries.serialno",
                "serviceentries.city",
                "servicetickets.faultreported",
                "serviceentries.findings",
                "serviceentries.recommendations",
                "clients.clientname"
                )
                ->leftjoin("servicetickets","servicetickets.ticketno","=","serviceentries.ticketno")
                ->leftjoin("clients","servicetickets.client","=","clients.id")
                ->orderBy("serviceentries.start_time","desc") //->toSql();
                ->get();
        }
        else if($request->searchphrase !=""){
            $query =  Serviceentries::where("serviceentries.start_time",">=",date_format(date_create($request->startdate),'Y-m-d'))
            ->where("serviceentries.end_time","<=",date_format(date_create($request->todate),'Y-m-d'))
            //->where("clients.clientname","=",$request->clientname)
            ->orWhere("serviceentries.model","like",$request->searchphrase."%") 
            ->orWhere("serviceentries.serialno","like",$request->searchphrase."%")
            ->orWhere("serviceentries.ticketno","like",$request->searchphrase."%")
            ->orWhere("serviceentries.jobcardno","like",$request->searchphrase."%")
            ->orWhere("servicetickets.faultreported","like",$request->searchphrase."%")
           ->orWhere("servicetickets.billingrefno","like",$request->searchphrase."%")
            ->select(
                "servicetickets.ticketno",
                "serviceentries.jobcardno",
                "serviceentries.start_time",
                "serviceentries.end_time",
                "serviceentries.model",
                "serviceentries.serialno",
                "serviceentries.city",
                "servicetickets.faultreported",
                "serviceentries.findings",
                "serviceentries.recommendations",
                "clients.clientname"
                )
                ->leftjoin("servicetickets","servicetickets.ticketno","=","serviceentries.ticketno")
                ->leftjoin("clients","servicetickets.client","=","clients.id")
                ->orderBy("serviceentries.start_time","desc") //->toSql();
                ->get();
        }
       else if($request->clientname !="Select Client"){
            $query =  Serviceentries::where("serviceentries.start_time",">=",date_format(date_create($request->startdate),'Y-m-d'))
            ->where("serviceentries.end_time","<=",date_format(date_create($request->todate),'Y-m-d'))
           ->where("clients.clientname","=",$request->clientname)
           // ->orWhere("serviceentries.model","like","%".$request->searchphrase."%") 
            //->orWhere("serviceentries.serialno","like","%".$request->searchphrase."%")
          //  ->orWhere("serviceentries.ticketno","like","%".$request->searchphrase."%")
           // ->orWhere("serviceentries.jobcardno","like","%".$request->searchphrase."%")
           // ->orWhere("servicetickets.faultreported","like","%".$request->searchphrase."%")
            ->select(
                "servicetickets.ticketno",
                "serviceentries.jobcardno",
                "serviceentries.start_time",
                "serviceentries.end_time",
                "serviceentries.model",
                "serviceentries.serialno",
                "serviceentries.city",
                "servicetickets.faultreported",
                "serviceentries.findings",
                "serviceentries.recommendations",
                "clients.clientname"
                )
                ->leftjoin("servicetickets","servicetickets.ticketno","=","serviceentries.ticketno")
                ->leftjoin("clients","servicetickets.client","=","clients.id")
                ->orderBy("serviceentries.start_time","desc") //->toSql();
                ->get();
            }
      
                      $serviceentries = $query;
                                       // dd($serviceentries);

                            return   $serviceentries;
}

    }

