var f=[];$("input[type=text]").val("");$("#Cancelproductbtn").on("click",function(t){t.preventDefault(),$(".overlay").css("display","none"),$(".newproductcontainer").css("display","none"),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset()});$(document).ready(function(){var t=window.location.pathname;t==="/supplyrequests"&&(N(),console.log("path found"))});function N(){$.ajax({url:"supplylist",type:"get",dataType:"json",success:function(t){$.each(t,function(l,e){f.push(e.id),f.push(e.name)})}})}$("#sendto").on("change",function(){var t=$("#sendto option:selected").text(),l=$("#sendto option:selected").val(),e="<tr><td>1</td><td>"+t+"</td><td>"+l+"</td></tr>";$("#recipientslist tbody").append(e)});$(function(){$("#inventorysearch").autocomplete({source:function(t,l){var e=$.ui.autocomplete.filter(f,t.term);l(e.slice(0,10))}})});$("#inventorysearch").on("keypress",function(t){if(t.which===13){$(this).attr("disabled","disabled");var l=$(this).val();$.ajax({url:"searchproduct",type:"get",async:!1,dataType:"json",data:{searchphrase:l},success:function(e){for(var s=$("table#supplylisttable >tbody >tr").length,c=0,n=1;n<=s;n++){var o=$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(4)").text();if(o===$.trim(e[0].partno)||o===""){$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(3)").text(e[0].id),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(4)").text(e[0].partno),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(5)").text(e[0].name);var a=$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(6)").text();return(a===""||a===null)&&(a=parseInt("0")),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(6)").text(parseInt(a)+1),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(7)").text($.number(e[0].unitbp,2)),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(8)").text("0.00"),c=$.number(parseFloat($.trim(e[0].unitcost))*parseFloat(a)*1.16,2),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(9)").text(e[0].unitbp),$("#supplylisttable tbody tr:nth-child("+n+")").find("td:nth-child(11)").text(c),$("#inventorysearch").val(""),$("#inventorysearch").focus(),!0}}c=$.number(parseFloat($.trim(e[0].unitcost))*parseFloat(1.16),2);var r="<tr><td class='td-remove'><button class='del-item'><i class='fa fa-times' aria-hidden='true'></i></button></td><td>"+(s+1)+"</td><td class='td-itemid' contentEditable='true' onclick='$(this).focus();'>"+e[0].id+"</td><td class='td-partno' contentEditable='true' onclick='$(this).focus();'>"+e[0].partno+"</td><td class='td-itemname' contentEditable='true' onclick='$(this).focus();'>"+e[0].name+"</td><td class='td-qty' contentEditable='true' onclick='$(this).focus();'>1</td><td class='td-unitcost' contentEditable='true' onclick='$(this).focus();'>"+e[0].unitbp+"</td><td class='td-markup' contentEditable='true' onclick='$(this).focus();'>0.00</td><td class='td-unitsp' contentEditable='true' onclick='$(this).focus();'>"+e[0].unitbp+"</td><td class='td-vatrate' contentEditable='true' onclick='$(this).focus();'>16.00</td><td class='td-itemtotal' contentEditable='true' onclick='$(this).focus();'>"+c+"</td></tr>";$("table#supplylisttable >tbody:last-child").append(r),$("#inventorysearch").val(""),$("#inventorysearch").focus()},compelete:function(e){}}),$(this).removeAttr("disabled")}});$(document).ready(function(){window.location.pathname=="/supplyrequests"&&k()});$("#currency").on("change",function(){var t=$("#currency").find(":selected").val();console.log(t),$("#csrcurrency").innerHTML="",$("#csrcurrency").text(t)});$("#addproducts").on("click",function(){$(".newproductcontainer").css("display","block"),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset(),$("#supplylisttable tbody").empty(),$("#grandtotal").val("0.00"),$("table#supplylisttable tbody tr:nth-child(1)").find("td:nth-child(3)").text(A()),$("table#supplylisttable tbody tr:nth-child(1)").find("td:nth-child(4)").text(g()),m(),x(),q(),k()});function A(){var t="1";return $.ajax({url:"nextItemid",method:"get",dataType:"text",async:!1,success:function(l){t=l}}),t}function g(){var t=Math.floor(Math.random()*1e6+1);return t}function m(){var t=$("table#supplylisttable >tbody >tr").length,l="<tr><td><a class='deleterow' onclick='deleterow($(this))'><i class='fa fa-times' aria-hidden='true'></i></a></td><td class='no'>"+(t+1)+"</td><td class='itemid' contenteditable='true' onclick='$(this).focus();'>"+(t+1)+"</td><td class='partno' contenteditable='true'onclick='$(this).focus();'>"+g()+"</td> <td class='descr' contenteditable='true' onclick='$(this).focus();'></td><td class='qty' contenteditable='true' onclick='$(this).focus();'></td><td class='unitBP'contenteditable='true' onclick='$(this).focus();'></td><td class='margin'contenteditable='true' onclick='$(this).focus();'></td><td class='unitSPcell'contenteditable='false'></td><td class='vat' contenteditable='true' onclick='$(this).focus();'>16.00</td><td class='itemtotal' contenteditable='false'>0.00</td></tr>";if(t===0)$("#supplylisttable tbody").append(l);else{var e=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(4)").text(),s=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(5)").text(),c=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(6)").text(),n=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(7)").text(),o=$("#supplylisttable tbody tr:nth-child("+t+") td:nth-child(9)").text();e.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item part number")):s.trim()===""||s.trim()===0?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item description")):c.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item quantity")):n.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item unit price")):o.trim()===""?($("#alertmessage").css("display","block").fadeOut(2500),$(".message").text("Please enter item VAT rate")):($("#supplylisttable tbody").append(l),$("tr:nth-child("+(t+1)+") td:nth-child(4)").focus())}}$(document).ready(function(){$("#supplylisttable").keyup(function(){for(var t=$("table#supplylisttable >tbody >tr").length,l=0,e=1;e<=t;e++){$("#supplylisttable tr:nth-child("+e+") td:nth-child(5)").html(),$("#supplylisttable tr:nth-child("+e+") td:nth-child(3)").html();var s=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(6)").html()),c=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(7)").html().replace(",","")),n=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(8)").html());console.log("unit bp: "+c+" "+$("#supplylisttable tr:nth-child("+e+") td:nth-child(7)").html());var o=parseFloat($("#supplylisttable tr:nth-child("+e+") td:nth-child(10)").html()),a=0;if(!isNaN(s)&&!isNaN(c)&&!isNaN(n)&&(a=(n+100)/100*c,$("#supplylisttable tr:nth-child("+e+") td:nth-child(9)").text(a.toFixed(2)),!isNaN(o))){var r=(100+o)/100*a*s;$("#supplylisttable tr:nth-child("+e+") td:nth-child(11)").text($.number(r,2)),l=l+r;var i=$("#currency option:selected").text();$("#csrcurrency").text(i),$("#grandtotal").text($.number(l,0)),$("#csrvalue").val($.number(l,2))}}}),$("#supplylisttable").keypress(function(t){t.keyCode===13&&(t.preventDefault(),m())})});function q(){$.ajax({url:"showclients",method:"get",dataType:"json",success:function(t){$("#clientid").empty().append('<option selected="selected" value="">Select Client</option>'),$("#customername").empty().append('<option selected="selected" value="">Select Client</option>'),$("#customer").empty().append('<option selected="selected" value="">Select Client</option>'),$.each(t,function(l,e){var s=new Option(e.clientname,e.id);$(s).html(e.clientname),$("#clientid").append(s),$("#customer").append(s);var c="<option value='"+e.id+"'>"+e.clientname+"</option>";$("#customername").append(c),$(".clientdropdown").append(c)})}})}$("#newcsrbtn").on("click",function(){$("#csrpanel").children().hide(),$("#csrinfosection").hide(),$("#createcsrsection").show(),x()});function x(){$.ajax({async:!1,url:"countcsr",type:"get",dataType:"json",success:function(t){var l=new Date,e=t.csrno,s=/[^/]*$/.exec(e)[0];s<1||s==null?s=1:s=parseFloat(s)+1;var c=null;s>100?c="TS"+l.getFullYear()+"/"+s:s>=10&&s<100?c="TS"+l.getFullYear()+"/0"+s:s<10&&(c="TS"+l.getFullYear()+"/00"+s),$("#csrno").val(c)}})}function k(){$.ajax({async:!1,url:"getusers",type:"get",dataType:"json",success:function(t){$("#salespersons1").empty().append('<option selected="selected" value="">Select Salesperson</option>'),$("#sendto").empty().append('<option selected="selected" value="">Select Recipient</option>'),$.each(t,function(l,e){var s=new Option(e.name,e.id);$(s).html(e.name),$("#sendto").append("<option value='"+e.email+"'>"+e.name+"</option>"),$("#technician").append(s),$("#salespersons1").append("<option value='"+e.id+"'>"+e.name+"</option>")})}})}$(document).on("submit","#newcsrForm",function(t){if(t.preventDefault(),$("#newcsrForm").parsley(),$("#newcsrForm").parsley().isValid()){var l=function(){var e=0;return $.ajax({url:"checkcsr",method:"get",data:{csrno:$("#csrno").val()},async:!1,success(s){e=s}}),e}();$("#csrvalue").val()<1?($("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text("Add at least one item!"),$("#alertmessage")[0].scrollIntoView()):l<1?$("#costingsheet").get(0).files.length===0?($(".message").text("Attach the costing sheet!"),$("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage")[0].scrollIntoView()):$("#purchaseorder").get(0).files.length===0?($(".message").text("Attach the purchase order!"),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage")[0].scrollIntoView()):$("#quotation").get(0).files.length===0?($("#alertmessage")[0].scrollIntoView(),$(".message").text("Attach the quotation!"),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage").css("display","block").fadeOut(5e3)):y():y()}});function y(){var t=new FormData;t.append("clientid",$("#clientid option:selected").val()),t.append("csrno",$("#csrno").val()),t.append("description",$("#description").val());var l=new Date($("#csrdate").val().replace(/(\d{2})-(\d{2})-(\d{4})/,"$2/$1/$3"));t.append("csrdate",moment(l).format("YYYY-MM-DD")),t.append("ponumber",$("#ponumber").val());var e=new Date($("#podate").val().replace(/(\d{2})-(\d{2})-(\d{4})/,"$2/$1/$3"));t.append("podate",moment(e).format("YYYY-MM-DD")),t.append("currency",$("#currency option:selected").val()),t.append("csrvalue",$("#csrvalue").val().replace(/\,/g,"")),t.append("soldby",$("#salespersons1 option:selected").val()),t.append("status",$("#status option:selected").val());var s,c=$("#supplylisttable tbody tr").length,n=$("#csrno").val();let o=[];for(var a=1;a<=c;a++){s=parseFloat($("tr:nth-child("+a+") td:nth-child(11)").text().replace(/\,/g,""));var r=$("#supplylisttable tr:nth-child("+a+") td:nth-child(3)").text(),i=$("#supplylisttable tr:nth-child("+a+") td:nth-child(4)").text(),u=$("#supplylisttable tr:nth-child("+a+") td:nth-child(5)").text(),d=$("#supplylisttable tr:nth-child("+a+") td:nth-child(6)").text(),w=$("#supplylisttable tr:nth-child("+a+") td:nth-child(7)").text(),S=$("#supplylisttable tr:nth-child("+a+") td:nth-child(8)").text(),C=$("#supplylisttable tr:nth-child("+a+") td:nth-child(9)").text(),D=$("#supplylisttable tr:nth-child("+a+") td:nth-child(10)").text(),F={csrno:n,itemid:r,partno:i,qty:d,unitbp:w,markup:S,unitsp:C,vatrate:D,itemtotal:s,name:u};o.push(F)}t.append("csritems",JSON.stringify(o));var E=$("#attachmentstable tbody tr").length,O=$("#clientid option:selected").text();t.append("clientname",O);for(var a=1;a<=E;a++){var T=$("#attachmentstable tr:nth-child("+a+") td:nth-child(2) input[type='text']").val(),j=$("#attachmentstable tr:nth-child("+a+") td:nth-child(3) input[type='file']")[0].files[0],v=$.trim($("#attachmentstable tr:nth-child("+a+") td:nth-child(3) input[type='file']").val());T!=null&&v!==""&&v&&t.append("Attachment["+a+"]",j)}var b=[],K=$("#sendto option:selected").val();t.append("notification",K);for(var h=1;h<=$("#recipientslist tbody tr").length;h++){var U={name:$("#recipientslist tr:nth-child("+h+") td:nth-child(2)").text(),email:$("#recipientslist tr:nth-child("+h+") td:nth-child(3)").text()};b.push(U)}t.append("mailinglist",JSON.stringify(b)),$("#savecsrBtn").clone(),$.ajax({url:"newcsr",method:"post",data:t,dataType:"json",processData:!1,contentType:!1,beforeSend:function(){var p='<div class="spinner-border text-success spinner-border-sm" role="status"><span class="visually-hidden"> Loading...</span></div>';$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-info"),$(".message").html(p+" Processing..."),$("#alertmessage").css("display","block"),$("#alertmessage")[0].scrollIntoView()},success:function(p){var I="<i class='fa fa-save'></i> Save";$("#saveitemBtn").val(I),$("#alertmessage")[0].scrollIntoView(),p.response>0?($("#alertmessage").removeClass("alert-info"),$("#alertmessage").addClass("alert-success"),$(".message").text(p.msg),$("#alertmessage").css("display","block").fadeOut(5e3),$("#purchaseorder").val(null),$("#pofilename").val(null),$("#quotation").val(null),$("#quotefilename").val(null),$("#costingsheet").val(null),$("#costingfilename").val(null),$("#others").val(null),$("#othersfilename").val(null),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset(),$("#supplylisttable tbody").empty(),$("#saveitemBtn").attr("disabled",!1),m()):($("#alertmessage")[0].scrollIntoView(),$(".message").text(p.msg),$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$("#alertmessage").css("display","block").fadeOut(3e3))}})}$(document).on("click","table#csrtable >tbody >tr",function(t){$(".newproductcontainer").css("display","block"),$(".newproductcontainer").show().focus();const l=$(this).closest("tr").find("td:nth-child(3)").text();console.log("csr no: "+l),$.ajax({url:"filter",method:"get",timeout:3e3,data:{csrno:l},dataType:"json",beforeSend:function(){var e='<div class="spinner-border spinner-border-sm text-success" role="status"><span class="visually-hidden">Loading...</span></div>';$(".message").html(e+" Retrieving CSR..."),$("#alertmessage2").removeClass("alert-danger"),$("#alertmessage2").addClass("alert-success"),$("#alertmessage2").css("display","block")},success:function(e){$("#alertmessage2").css("display","none"),$("#csrpanel").children().hide(),$("#csrinfosection").hide(),$("#createcsrsection").animate({opacity:"show",top:"100"},500),$("#csrno").val(e[0].csrno),$("#clientid option:selected").text(e[0].clientname),$("#clientid option:selected").val(e[0].id),$("#description").val(e[0].description),$("#csrdate").val(e[0].csrdate),$("#podate").val(e[0].podate),$("#ponumber").val(e[0].ponumber),$("#csrvalue").val($.number(e[0].csrvalue,2)),$("#grandtotal").text($.number(e[0].csrvalue,2)),$("#csrcurrency").text(e[0].currency),$("#currency option:selected").val(e[0].currency),$("#salespersons1 option:selected").text(e[0].saleperson),$("#salespersons1 option:selected").val(e[0].salepersonid),$("#status option:selected").val(e[0].status),$("#grandtotal").val($.number(e[0].csrvalue,2))},complete:function(){}}),$.ajax({url:"getcsritems",method:"get",data:{csrno:l},dataType:"json",success:function(e){var s=1;$("#supplylisttable tbody").empty(),$.each(e,function(c,n){var o="<a class='deleterow' onclick='deleterow($(this))'><i class='fa fa-times'></></a>";parseFloat(n.unitcost)*parseFloat(n.qty),n.unitbp;var a="<tr><td>"+o+"</td><td>"+s+"</td><td class='itemid' contenteditable='true' onclick='$(this).focus();'>"+n.id+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.partno+"</td><td class='description' contenteditable='true' onclick='$(this).focus();'>"+n.name+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.qty+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.unitbp+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.markup+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.unitsp+"</td><td contenteditable='true' onclick='$(this).focus();'>"+n.vatrate+"</td><td>"+$.number(n.itemtotal,2)+"</td></tr>";$("#csrtablebody").append(a),s++})}}),$.ajax({url:"getcsrattachments",method:"get",data:{csrno:l},dataType:"json",success:function(e){$("#attachmentstable tbody tr").length;for(var s=0;s<e.length;s++)$("#attachmentstable tr:nth-child("+parseFloat(s+1)+") td:nth-child(2) input[type='text']").val(e[s].filename)}})});$("#printcsrBtn").on("click",function(){var t=function(){var l=0;return $.ajax({url:"checkcsr",method:"get",data:{csrno:$("#csrno").val(),clientid:$("#clientid option:selected").val()},dataType:"text",async:!1,success:function(e){l=e}}),l}();t>0?window.open("csrprinter?csrno="+$("#csrno").val(),"","width=800,height=900,scrollbars=yes"):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text("CSR No "+$("#csrno").val()+" does not exist!"),$("#alertmessage").css("display","block").fadeOut(3e3))});$("#printInvoice").on("click",function(){window.print()});$(".downloadbtn").on("click",function(){event.preventDefault();var t=$(this).closest("tr").find("input[type='text']").val(),l=$("#csrno").val();window.location.href="downloadattachment?filename="+t+"&csrno="+l});$(".filebrowser").on("change",function(){var t=$(this)[0].files[0],l=t.name.split(".").shift();$(this).closest("tr").find("input[type='text']").val(l)});$(".deletebtn").on("click",function(){event.preventDefault();var t=$(this).closest("tr").find("input[type='text']").val(),l=$("#csrno").val();t!==""||t===null?$.ajax({url:"deletefile",method:"post",data:{csrno:l,filename:t},success:function(e){e.status>0?($("#alertmessage").removeClass("alert-danger"),$("#alertmessage").addClass("alert-success"),$(".message").text(e.msg),$("#alertmessage").css("display","block").fadeOut(3e3),$(this).closest("tr").find("input[type='text']").val(""),$(this).closest("tr").find("input[type='file']").val("")):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text(e.msg),$("#alertmessage").css("display","block").fadeOut(3e3))}}):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text("File does not exist!"),$("#alertmessage").css("display","block").fadeOut(3e3))});$("#deletecsrBtn").on("click",function(){$.ajax({url:"deletecsr",method:"post",dataType:"json",beforeSend:function(){$("#printcsrBtn").attr("disabled","disabled")},data:{csrno:$("#csrno").val()},success:function(t){t.response>0?($("#alertmessage").removeClass("alert-danger"),$("#alertmessage").addClass("alert-success"),$(".message").text(t.msg),$("#alertmessage").css("display","block").fadeOut(5e3),$("#printcsrBtn").attr("disabled",!1),$("#purchaseorder").val(null),$("#pofilename").val(null),$("#quotation").val(null),$("#quotefilename").val(null),$("#costingsheet").val(null),$("#costingfilename").val(null),$("#others").val(null),$("#othersfilename").val(null),$("#newcsrForm")[0].reset(),$("#newcsrForm").parsley().reset(),$("#supplylisttable tbody").empty(),$("#saveitemBtn").attr("disabled",!1),m(),setTimeout(function(){},5e3)):($("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-danger"),$(".message").text(t.msg))}})});$(function(){$("#accordion").accordion({active:!1,collapsible:!0,animate:200})});$(document).ready(function(){var t=window.location.pathname;if(t=="/supplyrequests"){const l=document.getElementById("myChart");$.ajax({url:"csryearsales",method:"get",dataType:"json",contentType:!1,processType:!1,success:function(e){console.log(e);var s=[],c=e.sales;const n=c.filter(d=>d.currency.indexOf("USD")!==-1);for(var o=n.length,a=0;a<o;a++){var r={month:n[a].monthname,sales:{USD:n[a].monthsales}};s.push(r)}const i=c.filter(d=>d.currency.indexOf("KES")!==-1);console.log(s,"newcollection");for(var a in i)if(i.monthname===s[a].month)s[a]!=null&&(s[a].sales.KES=i[a].monthsales);else switch(i[a].month){case 1:var r={month:"January",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 2:var r={month:"February",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 3:var r={month:"March",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 4:var r={month:"April",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 5:var r={month:"May",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 6:var r={month:"June",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 7:var r={month:"July",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 8:var r={month:"August",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 9:var r={month:"Sept",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 10:var r={month:"Oct",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 11:var r={month:"Nov",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break;case 12:var r={month:"Dec",sales:{USD:0,KES:i[a].monthsales}};s.push(r);break}var u=new Chart(l,{});u.destroy(),u=new Chart(l,{type:"bar",data:{datasets:[{label:"USD Monthly Sales",data:s,backgroundColor:"rgba(0, 102, 255)",borderColor:"rgba(255, 255, 255)",tension:.4,parsing:{xAxisKey:"month",yAxisKey:"sales.USD"}},{label:"KES Monthly Sales",data:s,backgroundColor:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,28,9,1) 35%, rgba(0,212,255,1) 100%)",borderColor:"rgba(255, 255, 255)",tension:.4,parsing:{xAxisKey:"month",yAxisKey:"sales.KES"}}]},options:{scales:{y:{beginAtZero:!1}}}})}})}});$("#billcsrBtn").on("click",function(t){var l=$("#csrno").val(),e=$("#sendto option:selected").val(),s=new FormData;if(l===""||l===void 0)$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-info"),$("#alertmessage").css("display","block").fadeOut(4e3),$(".message").text("CSR number is required!"),$("#alertmessage")[0].scrollIntoView();else if(e==""||e==null)$("#alertmessage").removeClass("alert-success"),$("#alertmessage").addClass("alert-info"),$("#alertmessage").css("display","block").fadeOut(4e3),$(".message").text("Select where to send request"),$("#alertmessage")[0].scrollIntoView();else{var c=[];s.append("notification",e);for(var n=1;n<=$("#recipientslist tbody tr").length;n++){var o={name:$("#recipientslist tr:nth-child("+n+") td:nth-child(2)").text(),email:$("#recipientslist tr:nth-child("+n+") td:nth-child(3)").text()};c.push(o)}s.append("mailinglist",JSON.stringify(c)),s.append("csrno",l),s.append("description",$("#description").val()),s.append("client",$("#clientid option:selected").text()),$.ajax({url:"billcsr",type:"post",data:s,dataType:"json",processData:!1,contentType:!1,beforeSend:function(){var a='<div class="spinner-border spinner-border-sm text-info fs-5" role="status"><span class="visually-hidden"> Loading...</span></div>';$(".message").html(a+" Sending request..."),$("#alertmessage").addClass("alert-info"),$("#alertmessage").css("display","block"),$("#alertmessage")[0].scrollIntoView()},success:function(a){a.success==1?($("#alertmessage").removeClass("alert-info"),$("#alertmessage").addClass("alert-success")):($("#alertmessage").removeClass("alert-info"),$("#alertmessage").addClass("alert-danger")),$(".message").html(a.msg),$("#alertmessage").css("display","block").fadeOut(5e3),$("#alertmessage")[0].scrollIntoView()}})}});
