var f=[];$("input[type=text]").val("");$("#Cancelproductbtn").on("click",function(t){t.preventDefault(),$(".overlay").css("display","none"),$(".newproductcontainer").css("display","none"),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset()});$(document).ready(function(){var t=window.location.pathname;t==="/supplyrequests"&&(q(),console.log("path found"))});function q(){$.ajax({url:"supplylist",type:"get",dataType:"json",success:function(t){$.each(t,function(l,e){f.push(e.id),f.push(e.name)})}})}$("#sendto").on("change",function(){var t=$("#sendto option:selected").text(),l=$("#sendto option:selected").val(),e="<tr><td>1</td><td>"+t+"</td><td>"+l+"</td></tr>";$("#recipientslist tbody").append(e)});$(function(){$("#inventorysearch").autocomplete({source:function(t,l){var e=$.ui.autocomplete.filter(f,t.term);l(e.slice(0,10))}})});$("#inventorysearch").on("keypress",function(t){if(t.which===13){$(this).attr("disabled","disabled");var l=$(this).val();$.ajax({url:"searchproduct",type:"get",async:!1,dataType:"json",data:{searchphrase:l},success:function(e){for(var s=$("table#supplylisttable >tbody >tr").length,r=0,n=1;n<=s;n++){var i=$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(4)").text();if(i===$.trim(e[0].partno)||i===""){$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(3)").text(e[0].id),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(4)").text(e[0].partno),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(5)").text(e[0].name);var a=$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(6)").text();return(a===""||a===null)&&(a=parseInt("0")),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(6)").text(parseInt(a)+1),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(7)").text($.number(e[0].unitbp,2)),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(8)").text("0.00"),r=$.number(parseFloat($.trim(e[0].unitcost))*parseFloat(a)*1.16,2),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(9)").text(e[0].unitbp),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(11)").text(r),$("#inventorysearch").val(""),$("#inventorysearch").focus(),!0}}r=$.number(parseFloat($.trim(e[0].unitcost))*parseFloat(1.16),2);var c="<tr><td class='td-remove'><button class='del-item'><i class='fa fa-times' aria-hidden='true'></i></button></td><td>"+(s+1)+"</td><td class='td-itemid' contentEditable='true' onclick='$(this).focus();'>"+e[0].id+"</td><td class='td-partno' contentEditable='true' onclick='$(this).focus();'>"+e[0].partno+"</td><td class='td-itemname' contentEditable='true' onclick='$(this).focus();'>"+e[0].name+"</td><td class='td-qty' contentEditable='true' onclick='$(this).focus();'>1</td><td class='td-unitcost' contentEditable='true' onclick='$(this).focus();'>"+e[0].unitbp+"</td><td class='td-markup' contentEditable='true' onclick='$(this).focus();'>0.00</td><td class='td-unitsp' contentEditable='true' onclick='$(this).focus();'>"+e[0].unitbp+"</td><td class='td-vatrate' contentEditable='true' onclick='$(this).focus();'>16.00</td><td class='td-itemtotal' contentEditable='true' onclick='$(this).focus();'>"+r+"</td></tr>";$("table#supplylisttable >tbody:last-child").append(c),$("#inventorysearch").val(""),$("#inventorysearch").focus()},compelete:function(e){}}),$(this).removeAttr("disabled")}});$(document).ready(function(){window.location.pathname=="/supplyrequests"&&k()});$("#currency").on("change",function(){var t=$("#currency").find(":selected").val();console.log(t),$("#csrcurrency").innerHTML="",$("#csrcurrency").text(t)});$("#addproducts").on("click",function(){$(".newproductcontainer").css("display","block"),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset(),$("#supplylisttable tbody").empty(),$("#grandtotal").val("0.00"),$("table#supplylisttable tbody tr:nth-child(1)").find("td:nth-child(3)").text(A()),$("table#supplylisttable tbody tr:nth-child(1)").find("td:nth-child(4)").text(g()),m(),x(),V(),k()});function A(){var t="1";return $.ajax({url:"nextItemid",method:"get",dataType:"text",async:!1,success:function(l){t=l}}),t}function g(){var t=Math.floor(Math.random()*1e6+1);return t}function m(){var t=$("table#supplylisttable >tbody >tr").length,l="<tr><td><a class='deleterow' onclick='deleterow($(this))'><i class='fa fa-times' aria-hidden='true'></i></a></td><td class='no'>"+(t+1)+"</td><td class='itemid' contenteditable='true' onclick='$(this).focus();'>"+(t+1)+"</td><td class='partno' contenteditable='true'onclick='$(this).focus();'>"+g()+"</td> <td class='descr' contenteditable='true' onclick='$(this).focus();'></td><td class='qty' contenteditable='true' onclick='$(this).focus();'></td><td class='unitBP'contenteditable='true' onclick='$(this).focus();'></td><td class='margin'contenteditable='true' onclick='$(this).focus();'></td><td class='unitSPcell'contenteditable='false'></td><td class='vat' contenteditable='true' onclick='$(this).focus();'>16.00</td><td class='itemtotal' contenteditable='false'>0.00</td></tr>";if(t===0)$("#supplylisttable tbody").append(l);else{var e=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(4)").text(),s=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(5)").text(),r=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(6)").text(),n=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(7)").text(),i=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(9)").text();e.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item part number")):s.trim()===""||s.trim()===0?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item description")):r.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item quantity")):n.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item unit price")):i.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item VAT rate")):($("#supplylisttable tbody").append(l),$("tr:nth-child("+(t+1)+") td:nth-child(4)").focus())}}$(document).ready(function(){$("#supplylisttable").keyup(function(){for(var t=$("table#supplylisttable >tbody >tr").length,l=0,e=1;e<=t;e++){$("#supplylisttable tr:nth-child("+e+") td:nth-child(5)").html(),$("#supplylisttable tr:nth-child("+e+") td:nth-child(3)").html();var s=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(6)").html()),r=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(7)").html().replace(",","")),n=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(8)").html());console.log("unit bp: "+r+" "+$("#supplylisttable tr:nth-child("+e+") td:nth-child(7)").html());var i=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(10)").html()),a=0;if(!isNaN(s)&&!isNaN(r)&&!isNaN(n)&&(a=(n+100)/100*r,$("#supplylisttable tr:nth-child("+e+") td:nth-child(9)").text(a.toFixed(2)),!isNaN(i))){var c=(100+i)/100*a*s;$("#supplylisttable tr:nth-child("+e+") td:nth-child(11)").text($.number(c,2)),l=l+c;var o=$("#currency option:selected").text();$("#csrcurrency").text(o),$("#grandtotal").text($.number(l,0)),$("#csrvalue").val($.number(l,2))}}}),$("#supplylisttable").keypress(function(t){t.keyCode===13&&(t.preventDefault(),m())})});function V(){$.ajax({url:"showclients",method:"get",dataType:"json",success:function(t){$("#clientid").empty().append('<option selected="selected" value="">Select Client</option>'),$("#customername").empty().append('<option selected="selected" value="">Select Client</option>'),$("#customer").empty().append('<option selected="selected" value="">Select Client</option>'),$.each(t,function(l,e){var s=new Option(e.clientname,e.id);$(s).html(e.clientname),$("#clientid").append(s),$("#customer").append(s);var r="<option value='"+e.id+"'>"+e.clientname+"</option>";$("#customername").append(r),$(".clientdropdown").append(r)})}})}$("#newcsrbtn").on("click",function(){$("#csrpanel").children().hide(),$("#csrinfosection").hide(),$("#createcsrsection").show(),x()});function x(){$.ajax({async:!1,url:"countcsr",type:"get",dataType:"json",success:function(t){var l=new Date,e=t.csrno,s=/[^/]*$/.exec(e)[0];s<1||s==null?s=1:s=parseFloat(s)+1;var r=null;s>100?r="TS"+l.getFullYear()+"/"+s:s>=10&&s<100?r="TS"+l.getFullYear()+"/0"+s:s<10&&(r="TS"+l.getFullYear()+"/00"+s),$("#csrno").val(r)}})}function k(){$.ajax({async:!1,url:"getusers",type:"get",dataType:"json",success:function(t){$("#salespersons1").empty().append('<option selected="selected" value="">Select Salesperson</option>'),$("#sendto").empty().append('<option selected="selected" value="">Select Recipient</option>'),$.each(t,function(l,e){var s=new Option(e.name,e.id);$(s).html(e.name),$("#sendto").append("<option value='"+e.email+"'>"+e.name+"</option>"),$("#technician").append(s),$("#salespersons1").append("<option value='"+e.id+"'>"+e.name+"</option>")})}})}$(document).on("submit","#newcsrForm",function(t){if(t.preventDefault(),$("#newcsrForm").parsley(),$("#newcsrForm").parsley().isValid()){var l=function(){var e=0;return $.ajax({url:"checkcsr",method:"get",data:{csrno:$("#csrno").val()},async:!1,success(s){e=s}}),e}();$("#csrvalue").val()<1?($("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text("Add at least one item!"),$("#alertmessage")[0].scrollIntoView()):l<1?$("#costingsheet").get(0).files.length===0?($(".message").text("Attach the costing sheet!"),$("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage")[0].scrollIntoView()):$("#purchaseorder").get(0).files.length===0?($(".message").text("Attach the purchase order!"),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage")[0].scrollIntoView()):$("#quotation").get(0).files.length===0?($("#alertmessage")[0].scrollIntoView(),$(".message").text("Attach the quotation!"),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage").css("display","block").fadeOut(5e3)):b():b()}});function b(){var t=new FormData;t.append("clientid",$("#clientid option:selected").val()),t.append("csrno",$("#csrno").val()),t.append("description",$("#description").val());var l=new Date($("#csrdate").val().replace(/(\d{2})-(\d{2})-(\d{4})/,"$2/$1/$3"));t.append("csrdate",moment(l).format("YYYY-MM-DD")),t.append("ponumber",$("#ponumber").val());var e=new Date($("#podate").val().replace(/(\d{2})-(\d{2})-(\d{4})/,"$2/$1/$3"));t.append("podate",moment(e).format("YYYY-MM-DD")),t.append("currency",$("#currency option:selected").val()),t.append("csrvalue",$("#csrvalue").val().replace(/\,/g,"")),t.append("soldby",$("#salespersons1 option:selected").val()),t.append("status",$("#status option:selected").val());var s,r=$("#supplylisttable tbody tr").length,n=$("#csrno").val();let i=[];for(var a=1;a<=r;a++){s=parseFloat($("tr:nth-child("+a+") td:nth-child(11)").text().replace(/\,/g,""));var c=$("#supplylisttable tr:nth-child("+a+") td:nth-child(3)").text(),o=$("#supplylisttable tr:nth-child("+a+") td:nth-child(4)").text(),u=$("#supplylisttable tr:nth-child("+a+") td:nth-child(5)").text(),d=$("#supplylisttable tr:nth-child("+a+") td:nth-child(6)").text(),w=$("#supplylisttable tr:nth-child("+a+") td:nth-child(7)").text(),C=$("#supplylisttable tr:nth-child("+a+") td:nth-child(8)").text(),S=$("#supplylisttable tr:nth-child("+a+") td:nth-child(9)").text(),F=$("#supplylisttable tr:nth-child("+a+") td:nth-child(10)").text(),D={csrno:n,itemid:c,partno:o,qty:d,unitbp:w,markup:C,unitsp:S,vatrate:F,itemtotal:s,name:u};i.push(D)}t.append("csritems",JSON.stringify(i));var O=$("#attachmentstable tbody tr").length,T=$("#clientid option:selected").text();t.append("clientname",T);for(var a=1;a<=O;a++){var j=$("#attachmentstable tr:nth-child("+a+") td:nth-child(2) input[type='text']").val(),E=$("#attachmentstable tr:nth-child("+a+") td:nth-child(3) input[type='file']")[0].files[0],y=$.trim($("#attachmentstable tr:nth-child("+a+") td:nth-child(3) input[type='file']").val());j!=null&&y!==""&&y&&t.append("Attachment["+a+"]",E)}var v=[],I=$("#sendto option:selected").val();t.append("notification",I);for(var h=1;h<=$("#recipientslist tbody tr").length;h++){var K={name:$("#recipientslist tr:nth-child("+h+") td:nth-child(2)").text(),email:$("#recipientslist tr:nth-child("+h+") td:nth-child(3)").text()};v.push(K)}t.append("mailinglist",JSON.stringify(v)),$("#savecsrBtn").clone(),$.ajax({url:"newcsr",method:"post",data:t,dataType:"json",processData:!1,contentType:!1,beforeSend:function(){var p='<div class="spinner-border text-success spinner-border-sm" role="status"><span class="visually-hidden"> Loading...</span></div>';$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-info"),$(".message").html(p+" Processing..."),$("#alertmessage").css("display","block"),$("#alertmessage")[0].scrollIntoView()},success:function(p){var N="<i class='fa fa-save'></i> Save";$("#saveitemBtn").val(N),$("#alertmessage")[0].scrollIntoView(),p.response>0?($("#alertmessage").removeClass("alert-info"),$("#alertmessage").addClass("alert-success"),$(".message").text(p.msg),$("#alertmessage").css("display","block").fadeOut(5e3),$("#purchaseorder").val(null),$("#pofilename").val(null),$("#quotation").val(null),$("#quotefilename").val(null),$("#costingsheet").val(null),$("#costingfilename").val(null),$("#others").val(null),$("#othersfilename").val(null),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset(),$("#supplylisttable tbody").empty(),$("#saveitemBtn").attr("disabled",!1),m()):($("#alertmessage")[0].scrollIntoView(),$(".message").text(p.msg),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage").css("display","block").fadeOut(3e3))}})}$(document).on("click","table#csrtable >tbody >tr",function(t){$(".newproductcontainer").css("display","block"),$(".newproductcontainer").show().focus();const l=$(this).closest("tr").find("td:nth-child(3)").text();console.log("csr no: "+l),$.ajax({url:"filter",method:"get",timeout:3e3,data:{csrno:l},dataType:"json",beforeSend:function(){var e='<div class="spinner-border spinner-border-sm text-success" role="status"><span class="visually-hidden">Loading...</span></div>';$(".message").html(e+" Retrieving CSR..."),$("#alertmessage2").removeClass("alert-danger"),$("#alertmessage2").addClass("alert-success"),$("#alertmessage2").css("display","block")},success:function(e){$("#alertmessage2").css("display","none"),$("#csrpanel").children().hide(),$("#csrinfosection").hide(),$("#createcsrsection").animate({opacity:"show",top:"100"},500),$("#csrno").val(e[0].csrno),$("#clientid option:selected").text(e[0].clientname),$("#clientid option:selected").val(e[0].id),$("#description").val(e[0].description),$("#csrdate").val(e[0].csrdate),$("#podate").val(e[0].podate),$("#ponumber").val(e[0].ponumber),$("#csrvalue").val($.number(e[0].csrvalue,2)),$("#grandtotal").text($.number(e[0].csrvalue,2)),$("#csrcurrency").text(e[0].currency),$("#currency option:selected").val(e[0].currency),$("#salespersons1 option:selected").text(e[0].saleperson),$("#salespersons1 option:selected").val(e[0].salepersonid),$("#status option:selected").val(e[0].status),$("#grandtotal").val($.number(e[0].csrvalue,2))},complete:function(){}}),$.ajax({url:"getcsritems",method:"get",data:{csrno:l},dataType:"json",success:function(e){var s=1;$("#supplylisttable tbody").empty(),$.each(e,function(r,n){var i="<a class='deleterow' onclick='deleterow($(this))'><i class='fa fa-times'></></a>";parseFloat(n.unitcost)*parseFloat(n.qty),n.unitbp;var a="<tr><td>"+i+"</td><td>"+s+"</td><td class='itemid' contenteditable='true' onclick='$(this).focus();'>"+n.id+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.partno+"</td><td class='description' contenteditable='true' onclick='$(this).focus();'>"+n.name+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.qty+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.unitbp+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.markup+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.unitsp+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.vatrate+"</td><td>"+$.number(n.itemtotal,2)+"</td></tr>";$("#csrtablebody").append(a),s++})}}),$.ajax({url:"getcsrattachments",method:"get",data:{csrno:l},dataType:"json",success:function(e){$("#attachmentstable tbody tr").length;for(var s=0;s<e.length;s++)$("#attachmentstable tr:nth-child("+parseFloat(s+1)+") td:nth-child(2) input[type='text']").val(e[s].filename)}})});$("#printcsrBtn").on("click",function(){var t=function(){var l=0;return $.ajax({url:"checkcsr",method:"get",data:{csrno:$("#csrno").val(),clientid:$("#clientid option:selected").val()},dataType:"text",async:!1,success:function(e){l=e}}),l}();t>0?window.open("csrprinter?csrno="+$("#csrno").val(),"","width=800,height=900,scrollbars=yes"):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text("CSR No "+$("#csrno").val()+" does not exist!"),$("#alertmessage").css("display","block").fadeOut(3e3))});$("#printInvoice").on("click",function(){window.print()});$(".downloadbtn").on("click",function(){event.preventDefault();var t=$(this).closest("tr").find("input[type='text']").val(),l=$("#csrno").val();window.location.href="downloadattachment?filename="+t+"&csrno="+l});$(".filebrowser").on("change",function(){var t=$(this)[0].files[0],l=t.name.split(".").shift();$(this).closest("tr").find("input[type='text']").val(l)});$(".deletebtn").on("click",function(){event.preventDefault();var t=$(this).closest("tr").find("input[type='text']").val(),l=$("#csrno").val();t!==""||t===null?$.ajax({url:"deletefile",method:"post",data:{csrno:l,filename:t},success:function(e){e.status>0?($("#alertmessage").removeClass("alert-danger"),$("#alertmessage").addClass("alert-success"),$(".message").text(e.msg),$("#alertmessage").css("display","block").fadeOut(3e3),$(this).closest("tr").find("input[type='text']").val(""),$(this).closest("tr").find("input[type='file']").val("")):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text(e.msg),$("#alertmessage").css("display","block").fadeOut(3e3))}}):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text("File does not exist!"),$("#alertmessage").css("display","block").fadeOut(3e3))});$("#deletecsrBtn").on("click",function(){$.ajax({url:"deletecsr",method:"post",dataType:"json",beforeSend:function(){$("#printcsrBtn").attr("disabled","disabled")},data:{csrno:$("#csrno").val()},success:function(t){t.response>0?($("#alertmessage").removeClass("alert-danger"),$("#alertmessage").addClass("alert-success"),$(".message").text(t.msg),$("#alertmessage").css("display","block").fadeOut(5e3),$("#printcsrBtn").attr("disabled",!1),$("#purchaseorder").val(null),$("#pofilename").val(null),$("#quotation").val(null),$("#quotefilename").val(null),$("#costingsheet").val(null),$("#costingfilename").val(null),$("#others").val(null),$("#othersfilename").val(null),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset(),$("#supplylisttable tbody").empty(),$("#saveitemBtn").attr("disabled",!1),m(),setTimeout(function(){},5e3)):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text(t.msg))}})});$(function(){$("#accordion").accordion({active:!1,collapsible:!0,animate:200})});$(document).ready(function(){var t=window.location.pathname;if(t=="/supplyrequests"){const l=document.getElementById("myChart");$.ajax({url:"csryearsales",method:"get",dataType:"json",contentType:!1,processType:!1,success:function(e){var s=[],r=e.sales;const n=r.filter(d=>d.currency.indexOf("USD")!==-1);for(var i=n.length,a=0;a<i;a++){var c={month:n[a].monthname,sales:{USD:n[a].monthsales}};s.push(c)}const o=r.filter(d=>d.currency.indexOf("KES")!==-1);for(var a in o)if(o.monthname===s.month)s[a]!=null&&(s[a].sales.KES=o[a].monthsales);else switch(o[a].month){case 1:var c={month:"January",sales:{USD:0,KES:o[a].monthsales}};s.push(c);break;case 2:var c={month:"February",sales:{USD:0,KES:o[a].monthsales}};s.push(c);break;case 3:var c={month:"March",sales:{USD:0,KES:o[a].monthsales}};s.push(c);break;case 4:var c={month:"April",sales:{USD:0,KES:o[a].monthsales}};s.push(c);break;case 5:var c={month:"May",sales:{USD:0,KES:o[a].monthsales}};s.push(c);break}var u=new Chart(l,{});u.destroy(),u=new Chart(l,{type:"bar",data:{datasets:[{label:"USD Monthly Sales",data:s,backgroundColor:"rgba(0, 102, 255)",borderColor:"rgba(255, 255, 255)",tension:.4,parsing:{xAxisKey:"month",yAxisKey:"sales.USD"}},{label:"KES Monthly Sales",data:s,backgroundColor:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,28,9,1) 35%, rgba(0,212,255,1) 100%)",borderColor:"rgba(255, 255, 255)",tension:.4,parsing:{xAxisKey:"month",yAxisKey:"sales.KES"}}]},options:{scales:{y:{beginAtZero:!1}}}})}})}});$("#billcsrBtn").on("click",function(t){var l=$("#csrno").val(),e=$("#sendto option:selected").val(),s=new FormData;if(l===""||l===void 0)$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-info"),$("#alertmessage").css("display","block").fadeOut(4e3),$(".message").text("CSR number is required!"),$("#alertmessage")[0].scrollIntoView();else if(e==""||e==null)$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-info"),$("#alertmessage").css("display","block").fadeOut(4e3),$(".message").text("Select where to send request"),$("#alertmessage")[0].scrollIntoView();else{var r=[];s.append("notification",e);for(var n=1;n<=$("#recipientslist tbody tr").length;n++){var i={name:$("#recipientslist tr:nth-child("+n+") td:nth-child(2)").text(),email:$("#recipientslist tr:nth-child("+n+") td:nth-child(3)").text()};r.push(i)}s.append("mailinglist",JSON.stringify(r)),s.append("csrno",l),s.append("description",$("#description").val()),s.append("client",$("#clientid option:selected").text()),$.ajax({url:"billcsr",type:"post",data:s,dataType:"json",processData:!1,contentType:!1,beforeSend:function(){var a='<div class="spinner-border spinner-border-sm text-info fs-5" role="status"><span class="visually-hidden"> Loading...</span></div>';$(".message").html(a+" Sending request..."),$("#alertmessage").addClass("alert-info"),$("#alertmessage").css("display","block"),$("#alertmessage")[0].scrollIntoView()},success:function(a){a.success==1?($("#alertmessage").removeClass("alert-info"),$("#alertmessage").addClass("alert-success")):($("#alertmessage").removeClass("alert-info"),$("#alertmessage").addClass("alert-danger")),$(".message").html(a.msg),$("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage")[0].scrollIntoView()}})}});