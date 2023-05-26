$("#newcall").on("click",function(){
	$(".overlay").show();
	$(".newcallcontainer").show();
    //generateCallnum();
    showClients();
});
$(".overlay").on("click",function(){
	$(".newcallcontainer").hide();
	$(".overlay").hide();
});
$(document).ready(function(){
   
    $("#psvfare").val(0);$("#psvfare").val(0);
    $("#psvfare").val(0);$("#Km_covered").val(0);
    $("#lunch").val(0); $("#dinner").val(0);
    $("#accomodation").val(0); $("#petties").val(0);
   // $("#others").val(0);
    //$("#laundry").val(0);
});
/*
$(function(){
  $("#ticketdate").datetimepicker({
      value: '',
      rtl: false,
       format: 'Y/m/d H:i',
      formatTime: 'H:i',
     formatDate: 'Y/m/d',
     step: 30,
     monthChangeSpinner: true,
      closeOnDateSelect: false,
      closeOnTimeSelect: true,
      closeOnWithoutClick: true,
       closeOnInputClick: true,
       openOnFocus: true,
       timepicker: true,
       datepicker: true,
  });
});
*/
/*
  $(document).ready(function(){
  	if(window.location.pathname =="/service_tickets"){
  		getUsers();
  		showClients();
      getServicetickets();
      getClaimservices();
  	}
    */

    /**
     * EXIT TICKET DISPLAY
     */
    $("#cancelticketbtn").on("click",function(event){
      event.preventDefault();
      $("#ticketupdate").fadeOut();
      $("#ticketupdate").css("display", "none");
      $("#newticket").fadeOut();
      $("#ticketlist").fadeIn();
      window.location.reload();
    });
  
 // $(document).ready(function(){
    $("#technician").change(function(){
    	$("#techlisttable").show();
        var techid =$("#technician option:selected").val();
        var techname = $("#technician option:selected").text();
         var rows = parseFloat($("#techlisttable tbody tr").length);
        $.ajax({
          url:"filteruser",
          method:"post",
          data:{"id":techid},
          dataType:"json",
          success:function(data){
             var newrow ="<tr>"+
                  "<td class='deleterow'><a class='text-danger fw-bold'>"+
                  "<i class='fa fa-times' aria-hidden='true' style='font-size:10px;'></i></a></td>"+
                  "<td>"+(rows+1)+"</td>"+
                   "<td>"+techid+"</td>"+
                  "<td>"+techname+"</td>"+
                  "<td>"+data[0].idnumber+"</td>"+
                  "<td>"+data[0].email+"</td>"+
                  "<td>"+data[0].phone+"</td>"+
                   "</tr>";
                       for(var i=0; i<=rows;i++){
                        var tech = $("tr:nth-child("+i+") td:nth-child(3)").text();
                        if(tech !==techid){
                          $("#techlisttable tbody").append(newrow);
                            break;
                         }else{
                            $(".statusmsg").removeClass("alert-success");
                            $(".statusmsg").addClass("alert-danger");
                            $("#errormsq").text("Technician already exists on list!");
                            $(".statusmsg").css("display","block").fadeOut(3000);
                            break;
                          }
        }
          }
        });
    });
//});



$(document).ready(function(){
  if(window.location.pathname =="/servicetickets"){
      var date = new Date();
      var year = date.getFullYear();
      var currentyear = parseFloat(year);
            for(var i=currentyear;i>=2017;i--){
                   // //console.log("year: "+i);
                    var yearoption ="<option value="+i+">"+i+"</option>";
                     $("#csryear").append(yearoption);
                }
        $("#billing").change(function (){
           //$("#refdescription").empty();
           var reference =  $("#billing option:selected").val();
           if(reference==="contract"){
               $("#yearlabel").css({"display":"none"});
                $("#csryear").css({"display":"none"});
                $(getReferences(""));
           }else  if(reference==="csr"){
               $("#yearlabel").css({"display":"block"});
                $("#csryear").css({"display":"block"});  
           }
      });
      $("#csryear").change(function(){
          var csryear = $("#csryear option:selected").val();
          $("#billdescription").empty();
          getReferences(csryear);
        });
     }
  });

function getReferences(csryear){
    var reference =  $("#billing option:selected").val();
    var client = $("#customername option:selected").val();
    $.ajax({
               url:"tickets/getreference",
               type:"post",
               dataType:"json",
               data:{client:client,reference:reference,csryear:csryear},
               success:function(data){
                     var options ="<option value=''>Select Billing Description</option>";
                      $("#billdescription").empty().append(options);
                      //console.log(data);
                      $.each(data,function(index, value){
                           if(reference==="contract"){
                                  options ="<option value="+value.contractno+">"+value.description+"</option>";
                           }else{
                                options ="<option value="+value.csrno+">"+value.description+"</option>";
                             } 
                               $("#billdescription").append(options);
                     });
                  }
           });
}
$(document).ready(function(){
   $("#billdescription").change( function(){
      var refnumber = $("#billdescription option:selected").val();
      $("#billingrefno").val(refnumber);
   });
    $("#notification").change(function(){
       if($("#notification").is(":checked")){
           $("#optionalmsg").show();  $("#messagelabel").show();
        }else{
          $("#optionalmsg").hide();  $("#messagelabel").hide();
          }
   });
  });
////////////////////////////////////////////////SAVE TICKET ///////////////////////////////////////////////////////////////

$("#newticketform").submit(function(event){ 
    event.preventDefault(); 
    
        $("#newticketform").parsley();
      if($("#newticketform").parsley().isValid()){
        
          var ticketno = $('#newticketno').val();
        
               var notifyclient=0; var notifytech =0; 
               let techdata = [];
               var formData = new FormData($("form#newticketform")[0]);
               formData.append('ticketno',ticketno);
               if($("input[type='checkbox']#notification").is(':checked')){
                            notifyclient =1;   
                          }
                formData.append('notifyclient',notifyclient);
                if($("input[type='checkbox']#technotification").is(':checked')){
                            notifytech =1;  
                         }
                 formData.append('notifytech',notifytech);
            
               var techs =  $('#techlisttable tbody tr').length;

             for(var i=1;i<=techs;i++){
                   /* if(ticket_avail<1){ // formData.set('ticketno',ticketno+"-"+i);
                      }*/
                formData.append('billrefno',$("#billingrefno").val());
                 formData.append('optionalmsg',$("#optionalmsg").val());
                formData.append('personnel',$("#techlisttable tr:nth-child("+i+") td:nth-child(3)").text());
                formData.append('personnelname',$("#techlisttable tr:nth-child("+i+") td:nth-child(4)").text());
                var techinfo = {techstaffid: $("#techlisttable tr:nth-child("+i+") td:nth-child(3)").text(),
                                techid: $("#techlisttable tr:nth-child("+i+") td:nth-child(5)").text(),
                                techname:$("#techlisttable tr:nth-child("+i+") td:nth-child(4)").text(),
                                techphone:$("#techlisttable tr:nth-child("+i+") td:nth-child(7)").text(),
                                techemail:$("#techlisttable tr:nth-child("+i+") td:nth-child(6)").text()
                              };
                 techdata.push(techinfo); //alert(techdata);
                }

                formData.append('techdata',JSON.stringify(techdata));
                var assignedon = new Date($("#newticketdate").val().replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                console.log("assigned date: "+assignedon);
                var ticketdate = moment(assignedon).format("YYYY-MM-DD HH:mm:ss");
                formData.append('ticketdate',ticketdate);
                formData.append('clientname',$("#customername option:selected").text());   
                 formData.append('client',$("#customername option:selected").val());               
                
               //console.log(formData);
                $.ajax({
                    url:"saveticket",
                    method:"post",
                    data:formData,
                    processData:false,
                    contentType:false,
                     beforeSend:function(){
                        var spinner = '<div class="spinner-border spinner-border-sm text-success fs-5" role="status"><span class="visually-hidden"> Loading...</span></div>';
                           $(".message").html(spinner+" Processing..." );
                           $("#alertmessage3").css("display","block");
                           $("#alertmessage3")[0].scrollIntoView();
                     },
                    success:function(data){
                       if(data.response>0){
                      
                          $('#newticketform')[0].reset();
                          $('#newticketform').parsley().reset();
                          $('#techlisttable tbody').empty();
                          $('#saveticketBtn').attr('disabled', false);
                          $("#alertmessage3").removeClass("alert-danger");
                          $("#alertmessage3").addClass("alert-success");
                            $(".message").text(data.msg);
                            $("#alertmessage3").css("display","block").fadeOut(3000);
                        }else{
                          $("#alertmessage3").removeClass("alert-success");
                          $("#alertmessage3").addClass("alert-danger");
                            $(".message").text(data.msg);
                            $("#alertmessage3").css("display","block").fadeOut(3000);
                        }
              }
            });
          //}
      }
   // });
         
 });



 


//remove technician from the list
$(document).ready(function(){
$("#techlisttable tbody").on("click","td",function(){
    //console.log("clicked");
    if($(this).attr("class")=="deleterow"){
        $(this).closest("tr").remove();
       var rows = $("#techlisttable >tbody >tr").length;
       for(var t=1;t<=rows;t++){
        $("#techlisttable tbody tr:nth-child("+t+")").find("td:nth-child(2)").html(t);
       }
      }
});
});

/*
$(function() {
    $("body").delegate(".datepicker", "focusin", function(){
        $(this).datepicker();
    });
});

function closeminiDialog(){
  $(".servicelist").hide();
}
*/
/**
 * DELETE SERVICE TICKET
 */
$("#deleteTicketbtn").on("click",function(event){
  event.preventDefault();
  //console.log("delete initiated");
  if( !$("#newticketno").val()){
    $(".message").text("Ticket number is required");
    $("#alertmessage3").removeClass("alert-success");
    $("#alertmessage3").addClass("alert-danger");
    $("#alertmessage3").css("display","block").fadeOut(5000);;
  }else{
    var ticketno =  $("#newticketno").val();
    $.ajax({
      url:"deleteticket",
      method:"post",
      dataType:"json",
      data:{"ticketno":ticketno},
      beforeSend:function(){
        var spinner = '<div class="spinner-border spinner-border-sm text-success fs-5" role="status"><span class="visually-hidden"> Loading...</span></div>';
          $(".message").html(spinner+" Deleting...");
          $("#alertmessage3").css("display","block");
      },     
      success:function(response){
        if(response.success ==true){ 
          $(".message").text(response.message);
          $("#alertmessage3").removeClass("alert-danger");
          $("#alertmessage3").addClass("alert-success");
          $("#alertmessage3").css("display","block").fadeOut(5000);;
          $("#alertmessage3")[0].scrollIntoView();
          $('#techlisttable tbody').empty();
          $('#newticketform')[0].reset();
          $('#newticketform').parsley().reset(); 
        }else{
          $(".message").text(response.message);
          $("#alertmessage3").removeClass("alert-success");
          $("#alertmessage3").addClass("alert-danger");
          $("#alertmessage3").css("display","block").fadeOut(5000);;
          $("#alertmessage3")[0].scrollIntoView();
        }
      }
   
    });
  }
})


///////////////////////////////////////////// *************UPDATE TICKET*********************///////////////////////////////////////////////////
/*$(document).ready(function(){
   $("#ticketupdateForm").parsley();
    $("#ticketupdateForm").submit(function(event){
      event.preventDefault();
      if($("#ticketupdateForm").parsley().isValid()){
        var formdata = new FormData();
         formdata.append('ticketno', $("#ticketno").val());
        formdata.append('jobcardno', $("#jobcardno").val());
        formdata.append('servicedate', moment($("#servicedate").val()).format("YYYY-MM-DD"));
        formdata.append('start_time', moment($("#starttime").val(),"hh:mm A").format("HH:mm"));
        formdata.append('end_time', moment($("#endtime").val(),"hh:mm A").format("HH:mm"));
        formdata.append('serialno', $("#serialno").val());
        formdata.append('city', $("#servicetown option:selected").val());
        formdata.append('findings', $("#findings").val());
        formdata.append('action_taken', $("#actiontaken").val());
        formdata.append('recommendations', $("#recommendations").val());
        formdata.append('client', $("#client option:selected").val());
        formdata.append('status', $("#client option:selected").val());
         formdata.append('location', $("#sitename").val());
         formdata.append('faultreported', $("#faultreported").val());
          formdata.append('equipmodel', $("#equipmodel").val());
           formdata.append('clientname', $("#client option:selected").text());
         $service = function(){
            var temp=0;
           $.ajax({url:"checkservice",method:"get",data:{jobcardno:$("#jobcardno").val()},async:false,dataType:"text",success(data){temp = data;}});
                        return temp;
          }();
          if($service<1 && $("#jobcard").get(0).files.length===0){
                   $(".errormsgs").text("Attach the job card!");
                    $(".statusmsg").css("display","block").fadeOut(4000);
                     alert("job card no. not found");      
          }else{
            var filename = $("#jobcardattachmentstable tr:nth-child(1) td:nth-child(2) input[type='text']").val();
            var fileattachment = $("#jobcardattachmentstable tr:nth-child(1) td:nth-child(3) input[type='file']")[0].files[0];
            formdata.append('file',fileattachment);
            formdata.append('attachment', filename);
            formdata.append('status', $("#ticketstatus option:selected").val());
            if($("#notify").is(":checked")){
              formdata.append('notification', 1); //alert("checked");
             }else{
               formdata.append('notification', 0);
            }
             var techs =  $('#techlisttable tbody tr').length; 
             var techdata =[];
             for(var i=1;i<=techs;i++){
                 var techinfo = {
                                  techstaffid: $("#techlisttable tr:nth-child("+i+") td:nth-child(3)").text(),
                                  techid: $("#techlisttable tr:nth-child("+i+") td:nth-child(5)").text(),
                                  techname:$("#techlisttable tr:nth-child("+i+") td:nth-child(4)").text(),
                                  techphone:$("#techlisttable tr:nth-child("+i+") td:nth-child(7)").text(),
                                  techemail:$("#techlisttable tr:nth-child("+i+") td:nth-child(6)").text()
                                };
                    techdata.push(techinfo);
             }
             //alert(techdata);
             formdata.append('techdata',JSON.stringify(techdata));
             $.ajax({
                url:"ticketupdate",
                method:"post",
                data:formdata,
                dataType:"json",
                contentType:false,
                 processData:false,
                  success:function(data){
                      if(data.response>0){
                          $("#jobcardfilename").val(null); $("#jobcard").val(null);
                           $('#ticketupdateForm')[0].reset();
                          $('#ticketupdateForm').parsley().reset();
                          $('#saveticketupdateBtn').attr('disabled', false);
                          $(".statusmsg").removeClass("alert-danger");
                          $(".statusmsg").addClass("alert-success");
                           $(".errormsgs").text(data.msg);
                          $(".statusmsg").css("display","block").fadeOut(4000);
                   getServicetickets();
              } 
              else{
                   $(".statusmsg").removeClass("alert-success");
                  $(".statusmsg").addClass("alert-danger");
                   $(".errormsgs").text(data.msg);
              }
           }
        });
      }
      }
  });
});

*/
$(document).on("click","table#servicelisttable >tbody >tr",function(e){
   var jobcardno = $(this).closest('tr').find('td.td-jobcardno').text();
   var ticketno = $("#ticketno").val();
     $.ajax({
        url:"searchticketservice",
        method:"get",
        dataType:"json",
        data:{"ticketno":ticketno,"jobcardno":jobcardno},
        success:function(data){
            $(".servicecontainer").show();
             $(".servicelist").hide();
             $("#customer").val($("#customername option:selected").text());
            $("#sitename").val($("#location").val());
            $("#jobcardno").val(jobcardno);
            $("#servicedate").val(moment(data[0].servicedate).format("MM/DD/YYYY"));
             $("#starttime").val(data[0].start_time);
            $("#endtime").val(data[0].end_time);
            $("#serialno").val(data[0].serialno);
            $("#endtime").val(data[0].end_time);
             $("#servicetown option:selected").val(data[0].city);
              $("#servicetown option:selected").text(data[0].city);
              $("#billing option:selected").val("csr");
              $("#findings").val(data[0].findings);
               $("#actiontaken").val(data[0].action_taken);
                $("#recommendations").val(data[0].recommendations);
              $("#jobcardfilename").val(data[0].attachment);
        }
     });
});
///********************************************GET SERVICE CLAIMS LIST****************************************************************////
function getClaimservices(){
  $.ajax({
    url:"getclaimservices",
    method:"get",
    dataType:"json",
    success:function(data){
        var i=1;
           $("#claimservicestable").DataTable({
               processing: true,
                dom:'Bfrtip',
                buttons:[
                         {
                            extend: 'excelHtml5',
                            title: 'Mileage Claims'
                        },
                            {
                             extend: 'csvHtml5',
                            title: 'Mileage Claims'
                            },
                            {
                             extend: 'copyHtml5',
                             title: 'Mileage Claims'
                            },
                         {
                             extend: 'pdfHtml5',
                             title: 'Mileage Claims'
                            }
                   // 'copy','csv','excel','pdf','print'
                 ],
                data: data,
                  createdRow: function(row,data,index){
                    $(row).attr('id',data.id).find('td').eq(0).attr('class','td-del');
                     $(row).attr('id',data.id).find('td').eq(1).attr('class','td-no');
                      $(row).attr('id',data.id).find('td').eq(2).attr('class','td-servicedate');
                     $(row).attr('id',data.id).find('td').eq(3).attr('class','td-ticketno');
                     $(row).attr('id',data.id).find('td').eq(4).attr('class','td-client');
                     $(row).attr('id',data.id).find('td').eq(5).attr('class','td-location');
                      $(row).attr('id',data.id).find('td').eq(6).attr('class','td-name');
                     $(row).attr('id',data.id).find('td').eq(7).attr('class','td-status');
                     $(row).attr('id',data.id).find('td').eq(8).attr('class','td-claimstatus');
                     $(row).attr('id',data.id).find('td').eq(9).attr('class','td-claimamount');
                      $(row).attr('id',data.id).find('td').eq(10).attr('class','td-claimdate');
                 },
                  columns:[
                      {mRender:function(){
                        var del_link = '<a><i class="fa fa-times" aria-hidden="true" style="font-size: 20px;"></i></a>';
                        return del_link;
                      }},
                      {mRender:function(){
                             return i++;
                         }},
                         {mRender:function(data,type,row){
                          return moment(row.ticketdate).format("ddd Do MMM,YYYY");
                       }},
                       {data:"ticketno"},
                       {data:"clientname"},
                       {data:"location"},
                       {data:"name"},
                       {mRender:function(data,type,row){
                        var status ="";
                              if(row.status=="Closed"){
                                  status = '<i class="fa fa-circle text-success" aria-hidden="true" style="font-size: 14px;"> Closed</i>';
                              }else  if(row.status=="Awaiting Parts"){
                                  status = '<i class="fa fa-circle text-warning" aria-hidden="true" style="font-size: 14px;"> Awaiting Parts</i>';
                               } 
                               else if(row.status=="No Access"){
                                  status = '<i class="fa fa-circle text-secondary" aria-hidden="true" style="font-size: 14px;"> No Access</i>';
                               }
                               else{
                                  status = '<i class="fa fa-circle text-danger" aria-hidden="true" style="font-size: 14px;"> Pending</i>';
                              }
                              return status;
                         }},
                         {mRender:function(data,type,row){
                              var claimstatus = row.claimstatus;
                              if(claimstatus==null || claimstatus=="N/A")
                                {
                                    claimstatus="Unclaimed";
                                }
                                return claimstatus;
                          }},
                          {mRender:function(data,type,row){
                              var claimamount= row.claimamount;
                              if(claimamount==null){
                                  claimamount=0;
                              }
                                 claimamount = numeral(claimamount).format("0.00")
                              return claimamount;
                          }},
                         {mRender:function(data,type,row){
                            var claimdate = row.claimdate;
                            if(claimdate!=null && claimdate!="N/A")
                            {
                              claimdate = moment(claimdate).format("ddd Do MMM,YYYY");
                            }else{
                               claimdate ="N/A"; 
                            }
                            return claimdate;
                         }},       
                 ],
                   pageLength:10,
                   bLengthChange:false,
                   bAutoWidth:false,
                   autowidth:false,
                   bDestroy: true,
           });
    }
  });
}
$(document).on("click","table#claimservicestable >tbody >tr",function(e){
   $(".overlay").show();
   $(".claimscontainer").show();
     var ticketno = $(this).closest('tr').find('td.td-ticketno').text();
     var servicedate = $(this).closest('tr').find('td.td-servicedate').text();
     var client = $(this).closest('tr').find('td.td-client').text();
     var location = $(this).closest('tr').find('td.td-location').text();
     var name = $(this).closest('tr').find('td.td-name').text();
     var status = $(this).closest('tr').find('td.td-status').text();
     var claimstatus = $(this).closest('tr').find('td.td-claimstatus').text();
     var claimdate = $(this).closest('tr').find('td.td-claimdate').text();
      $("#clientname").val(client);
      $("#siteattended").val(location);
      $("#claimjobcardno").val(ticketno);
      $("#claimservicedate").val(servicedate);
});
$("#transportmode").on("change", function(){
  var selected = $(this).val();
  if(selected =="Public"){
      $("#transclaimlabel").text("PSV Fare");
      $("#psvfare").show();  $("#Km_covered").hide();   $("#transclaim").hide();
  }else if(selected=="Private"){
       $("#Km_covered").show();  $("#transclaim").hide(); $("#psvfare").hide();  $("#transclaimlabel").text("KM Covered");
     }else if(selected=="Company"){
       $("#transclaim").show(); $("#psvfare").hide(); $("#Km_covered").hide();  $("#transclaimlabel").text("Trans. Claim");
     }
});
///********************************************************MILEAGE FORM UPDATE***************************************************************************
$('#mileageclaimform input[type="text"]').change(function() {
    let totalclaim = parseInt($("#laundry").val())+parseInt($("#others").val())+parseInt($("#petties").val())+
                                parseInt($("#accomodation").val())+parseInt($("#dinner").val())+parseInt($("#lunch").val())+parseInt($("#psvfare").val())+parseInt($("#Km_covered").val())*40;
     $("#totalclaim").val(totalclaim);
});
///*************************************************************POST MILEAGE CLAIM*****************************************************************************************
  $("#saveclaimBtn").on("click", function(event){
          event.preventDefault();
    $("#mileageclaimform").parsley();
        var formdata = new FormData();
         formdata.append('ticketno', $("#claimjobcardno").val());
             var date = new Date();
          formdata.append('claimdate', moment(date).format("YYYY-MM-DD"));
          var random = Math.floor(Math.random()*10000)+1;
            var year = date.getFullYear();
            var month = parseFloat(date.getMonth())+1;
            var day = date.getDate();
            var claimnumber = year+""+month+""+day+"-"+random;
            formdata.append('claimno', claimnumber);
            formdata.append('psvfare', $("#psvfare").val());
            formdata.append('km', $("#Km_covered").val());
            formdata.append('lunch', $("#lunch").val());
             formdata.append('dinner', $("#dinner").val());
            formdata.append('accommodation', $("#accomodation").val());
            formdata.append('petties', $("#petties").val());
            formdata.append('others', $("#others").val());
            formdata.append('laundry', $("#laundry").val());
            formdata.append('claimstatus', "Unclaimed");
             var kmclaim = parseInt($("#Km_covered").val())*40;
             formdata.append('kmclaim', kmclaim);
            var claimamount = parseInt($("#laundry").val())+parseInt($("#others").val())+parseInt($("#petties").val())+
                                parseInt($("#accomodation").val())+parseInt($("#dinner").val())+parseInt($("#lunch").val())+parseInt($("#psvfare").val())+kmclaim;
             formdata.append('claimamount', claimamount);
                  $.ajax({
                 url:"createclaim",
                 method:"post",
                 dataType:"json",
                 data:formdata,
                 processData:false,
                 contentType:false,
                 success:function(data){
                       alert("Hello! I am an alert box!!");
                            //$(".servicecontainer").show();
                            //$(".servicelist").hide();
                            if(data.response>0){
                                $(".statusmsg").removeClass("alert-danger");
                                $(".statusmsg").addClass("alert-success");
                                $(".errormsgs").text(data.msg);
                                $(".statusmsg").css("display","block").fadeOut(4000);
              }
        }
     });
  });
