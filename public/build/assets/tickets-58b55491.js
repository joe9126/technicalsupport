$("#newcall").on("click",function(){$(".overlay").show(),$(".newcallcontainer").show(),showClients()});$(".overlay").on("click",function(){$(".newcallcontainer").hide(),$(".overlay").hide()});$(document).ready(function(){$("#psvfare").val(0),$("#psvfare").val(0),$("#psvfare").val(0),$("#Km_covered").val(0),$("#lunch").val(0),$("#dinner").val(0),$("#accomodation").val(0),$("#petties").val(0)});$("#cancelticketbtn").on("click",function(a){a.preventDefault(),$("#ticketupdate").fadeOut(),$("#ticketupdate").css("display","none"),$("#newticket").fadeOut(),$("#ticketlist").fadeIn(),window.location.reload()});$("#technician").change(function(){$("#techlisttable").show();var a=$("#technician option:selected").val(),e=$("#technician option:selected").text(),n=parseFloat($("#techlisttable tbody tr").length);$.ajax({url:"filteruser",method:"post",data:{id:a},dataType:"json",success:function(t){for(var s="<tr><td class='deleterow'><a class='text-danger fw-bold'><i class='fa fa-times' aria-hidden='true' style='font-size:10px;'></i></a></td><td>"+(n+1)+"</td><td>"+a+"</td><td>"+e+"</td><td>"+t[0].idnumber+"</td><td>"+t[0].email+"</td><td>"+t[0].phone+"</td></tr>",c=0;c<=n;c++){var l=$("tr:nth-child("+c+") td:nth-child(3)").text();if(l!==a){$("#techlisttable tbody").append(s);break}else{$(".statusmsg").removeClass("alert-success"),$(".statusmsg").addClass("alert-danger"),$("#errormsq").text("Technician already exists on list!"),$(".statusmsg").css("display","block").fadeOut(3e3);break}}}})});$(document).ready(function(){if(window.location.pathname=="/servicetickets"){for(var a=new Date,e=a.getFullYear(),n=parseFloat(e),t=n;t>=2017;t--){var s="<option value="+t+">"+t+"</option>";$("#csryear").append(s)}$("#billing").change(function(){var c=$("#billing option:selected").val();c==="contract"?($("#yearlabel").css({display:"none"}),$("#csryear").css({display:"none"}),$(m(""))):c==="csr"&&($("#yearlabel").css({display:"block"}),$("#csryear").css({display:"block"}))}),$("#csryear").change(function(){var c=$("#csryear option:selected").val();$("#billdescription").empty(),m(c)})}});function m(a){var e=$("#billing option:selected").val(),n=$("#customername option:selected").val();$.ajax({url:"tickets/getreference",type:"post",dataType:"json",data:{client:n,reference:e,csryear:a},success:function(t){var s="<option value=''>Select Billing Description</option>";$("#billdescription").empty().append(s),$.each(t,function(c,l){e==="contract"?s="<option value="+l.contractno+">"+l.description+"</option>":s="<option value="+l.csrno+">"+l.description+"</option>",$("#billdescription").append(s)})}})}$(document).ready(function(){$("#billdescription").change(function(){var a=$("#billdescription option:selected").val();$("#billingrefno").val(a)}),$("#notification").change(function(){$("#notification").is(":checked")?($("#optionalmsg").show(),$("#messagelabel").show()):($("#optionalmsg").hide(),$("#messagelabel").hide())})});$("#newticketform").submit(function(a){if(a.preventDefault(),$("#newticketform").parsley(),$("#newticketform").parsley().isValid()){var e=$("#newticketno").val(),n=0,t=0;let r=[];var s=new FormData($("form#newticketform")[0]);s.append("ticketno",e),$("input[type='checkbox']#notification").is(":checked")&&(n=1),s.append("notifyclient",n),$("input[type='checkbox']#technotification").is(":checked")&&(t=1),s.append("notifytech",t);for(var c=$("#techlisttable tbody tr").length,l=1;l<=c;l++){s.append("billrefno",$("#billingrefno").val()),s.append("optionalmsg",$("#optionalmsg").val()),s.append("personnel",$("#techlisttable tr:nth-child("+l+") td:nth-child(3)").text()),s.append("personnelname",$("#techlisttable tr:nth-child("+l+") td:nth-child(4)").text());var d={techstaffid:$("#techlisttable tr:nth-child("+l+") td:nth-child(3)").text(),techid:$("#techlisttable tr:nth-child("+l+") td:nth-child(5)").text(),techname:$("#techlisttable tr:nth-child("+l+") td:nth-child(4)").text(),techphone:$("#techlisttable tr:nth-child("+l+") td:nth-child(7)").text(),techemail:$("#techlisttable tr:nth-child("+l+") td:nth-child(6)").text()};r.push(d)}s.append("techdata",JSON.stringify(r));var i=new Date($("#newticketdate").val().replace(/(\d{2})-(\d{2})-(\d{4})/,"$2/$1/$3"));console.log("assigned date: "+i);var p=moment(i).format("YYYY-MM-DD HH:mm:ss");s.append("ticketdate",p),s.append("clientname",$("#customername option:selected").text()),s.append("client",$("#customername option:selected").val()),console.log(s),$.ajax({url:"saveticket",method:"post",data:s,processData:!1,contentType:!1,beforeSend:function(){var o='<div class="spinner-border spinner-border-sm text-success fs-5" role="status"><span class="visually-hidden"> Loading...</span></div>';$(".message").html(o+" Processing..."),$("#alertmessage3").css("display","block"),$("#alertmessage3")[0].scrollIntoView()},success:function(o){o.response>0?($("#newticketform")[0].reset(),$("#newticketform").parsley().reset(),$("#techlisttable tbody").empty(),$("#saveticketBtn").attr("disabled",!1),$("#alertmessage3").removeClass("alert-danger"),$("#alertmessage3").addClass("alert-success"),$(".message").text(o.msg),$("#alertmessage3").css("display","block").fadeOut(3e3)):($("#alertmessage3").removeClass("alert-success"),$("#alertmessage3").addClass("alert-danger"),$(".message").text(o.msg),$("#alertmessage3").css("display","block").fadeOut(3e3))}})}});$(document).ready(function(){$("#techlisttable tbody").on("click","td",function(){if($(this).attr("class")=="deleterow"){$(this).closest("tr").remove();for(var a=$("#techlisttable >tbody >tr").length,e=1;e<=a;e++)$("#techlisttable tbody tr:nth-child("+e+")").find("td:nth-child(2)").html(e)}})});$("#deleteTicketbtn").on("click",function(a){if(a.preventDefault(),!$("#newticketno").val())$(".message").text("Ticket number is required"),$("#alertmessage3").removeClass("alert-success"),$("#alertmessage3").addClass("alert-danger"),$("#alertmessage3").css("display","block").fadeOut(5e3);else{var e=$("#newticketno").val();$.ajax({url:"deleteticket",method:"post",dataType:"json",data:{ticketno:e},beforeSend:function(){var n='<div class="spinner-border spinner-border-sm text-success fs-5" role="status"><span class="visually-hidden"> Loading...</span></div>';$(".message").html(n+" Deleting..."),$("#alertmessage3").css("display","block")},success:function(n){n.success==!0?($(".message").text(n.message),$("#alertmessage3").removeClass("alert-danger"),$("#alertmessage3").addClass("alert-success"),$("#alertmessage3").css("display","block").fadeOut(5e3),$("#alertmessage3")[0].scrollIntoView(),$("#techlisttable tbody").empty(),$("#newticketform")[0].reset(),$("#newticketform").parsley().reset()):($(".message").text(n.message),$("#alertmessage3").removeClass("alert-success"),$("#alertmessage3").addClass("alert-danger"),$("#alertmessage3").css("display","block").fadeOut(5e3),$("#alertmessage3")[0].scrollIntoView())}})}});$(document).on("click","table#servicelisttable >tbody >tr",function(a){var e=$(this).closest("tr").find("td.td-jobcardno").text(),n=$("#ticketno").val();$.ajax({url:"searchticketservice",method:"get",dataType:"json",data:{ticketno:n,jobcardno:e},success:function(t){$(".servicecontainer").show(),$(".servicelist").hide(),$("#customer").val($("#customername option:selected").text()),$("#sitename").val($("#location").val()),$("#jobcardno").val(e),$("#servicedate").val(moment(t[0].servicedate).format("MM/DD/YYYY")),$("#starttime").val(t[0].start_time),$("#endtime").val(t[0].end_time),$("#serialno").val(t[0].serialno),$("#endtime").val(t[0].end_time),$("#servicetown option:selected").val(t[0].city),$("#servicetown option:selected").text(t[0].city),$("#billing option:selected").val("csr"),$("#findings").val(t[0].findings),$("#actiontaken").val(t[0].action_taken),$("#recommendations").val(t[0].recommendations),$("#jobcardfilename").val(t[0].attachment)}})});$(document).on("click","table#claimservicestable >tbody >tr",function(a){$(".overlay").show(),$(".claimscontainer").show();var e=$(this).closest("tr").find("td.td-ticketno").text(),n=$(this).closest("tr").find("td.td-servicedate").text(),t=$(this).closest("tr").find("td.td-client").text(),s=$(this).closest("tr").find("td.td-location").text();$(this).closest("tr").find("td.td-name").text(),$(this).closest("tr").find("td.td-status").text(),$(this).closest("tr").find("td.td-claimstatus").text(),$(this).closest("tr").find("td.td-claimdate").text(),$("#clientname").val(t),$("#siteattended").val(s),$("#claimjobcardno").val(e),$("#claimservicedate").val(n)});$("#transportmode").on("change",function(){var a=$(this).val();a=="Public"?($("#transclaimlabel").text("PSV Fare"),$("#psvfare").show(),$("#Km_covered").hide(),$("#transclaim").hide()):a=="Private"?($("#Km_covered").show(),$("#transclaim").hide(),$("#psvfare").hide(),$("#transclaimlabel").text("KM Covered")):a=="Company"&&($("#transclaim").show(),$("#psvfare").hide(),$("#Km_covered").hide(),$("#transclaimlabel").text("Trans. Claim"))});$('#mileageclaimform input[type="text"]').change(function(){let a=parseInt($("#laundry").val())+parseInt($("#others").val())+parseInt($("#petties").val())+parseInt($("#accomodation").val())+parseInt($("#dinner").val())+parseInt($("#lunch").val())+parseInt($("#psvfare").val())+parseInt($("#Km_covered").val())*40;$("#totalclaim").val(a)});$("#saveclaimBtn").on("click",function(a){a.preventDefault(),$("#mileageclaimform").parsley();var e=new FormData;e.append("ticketno",$("#claimjobcardno").val());var n=new Date;e.append("claimdate",moment(n).format("YYYY-MM-DD"));var t=Math.floor(Math.random()*1e4)+1,s=n.getFullYear(),c=parseFloat(n.getMonth())+1,l=n.getDate(),d=s+""+c+l+"-"+t;e.append("claimno",d),e.append("psvfare",$("#psvfare").val()),e.append("km",$("#Km_covered").val()),e.append("lunch",$("#lunch").val()),e.append("dinner",$("#dinner").val()),e.append("accommodation",$("#accomodation").val()),e.append("petties",$("#petties").val()),e.append("others",$("#others").val()),e.append("laundry",$("#laundry").val()),e.append("claimstatus","Unclaimed");var i=parseInt($("#Km_covered").val())*40;e.append("kmclaim",i);var p=parseInt($("#laundry").val())+parseInt($("#others").val())+parseInt($("#petties").val())+parseInt($("#accomodation").val())+parseInt($("#dinner").val())+parseInt($("#lunch").val())+parseInt($("#psvfare").val())+i;e.append("claimamount",p),$.ajax({url:"createclaim",method:"post",dataType:"json",data:e,processData:!1,contentType:!1,success:function(r){alert("Hello! I am an alert box!!"),r.response>0&&($(".statusmsg").removeClass("alert-danger"),$(".statusmsg").addClass("alert-success"),$(".errormsgs").text(r.msg),$(".statusmsg").css("display","block").fadeOut(4e3))}})});