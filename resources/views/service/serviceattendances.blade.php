
<div class="row">
    <div class="col-sm-12">
       
        <div class="card pl-10 pr-10 pt-3 pb-10">
            <div class="row justify-content-center mb-3">
                <div class="col-sm-8" >
                    <p class="fs-3">Filter Records</p><hr class="hr">
                    <div class="pl-10 pr-10 pt-10 mt-3" style="border:1px solid #5356; border-radius:10px;">
                        <div class="alert alert-success text-center mt-3" role="alert" id="alertmessage3" style="display:block;">
                            <span class="message fw-bold"></span>
                        </div>

                     <form id="searchattendanceform" method="post" action="#" data-parsley-validate="">
                        @csrf
                      <div class="row mt-3 mb-3">
                        <div class="col-sm-1 text-end pt-1">
                            <label  class="" for="startdate">From</label>
                        </div>
                        <div class="col-sm-3">
                            <input type="text" id="startdate" name="startdate" class="form-control dateonlypicker" 
                                required data-parsley-required-message="From date is required"placeholder="dd-mm-yyyy">
                        </div>
                        <div class="col-sm-1 text-end pt-1">
                            <label   class="" for="todate">To</label>
                        </div>
                        <div class="col-sm-3">
                            <input type="text" id="todate" name="todate" class="form-control dateonlypicker"
                                required data-parsley-required-message="To date is required" placeholder="dd-mm-yyyy">
                        </div>
                        <div class="col-sm-1 text-end pt-1">
                            <label   class="" for="client">Client</label>
                        </div>
                        <div class="col-sm-3">
                            <select class="form-control customername" id="clientname" name="clientname" class="form-control">
                                <option value="">Select Client</option>
                            </select>
                        </div>
                    </div>
                     <div class="row mt-3 mb-3">
                        <div class="col-sm-2 text-end pt-1">
                            <label   class="" for="searchphrase">Search Phrase</label>
                        </div>
                        <div class="col-sm-10 text-end pt-1">
                            <input type="text" id="searchphrase" name="searchphrase" class="form-control" placeholder="e.g contract number">
                        </div>
                     </div>
                    <div class="row mt-3 mb-3 justify-content-end" >
                        <div class="col-sm-6 pt-1 text-end">
                           <p> 
                            <button type="submit" class="btn btn-sm btn-primary"><i class="fa fa-search"></i> Search</button>
                            <button type="button" id="clearsearchform" class="btn btn-sm btn-info"><i class="fa fa-brush"></i> Clear</button>
                           </p>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
            <div class="table-responsive overflow-hidden" id="tablecontainer">
                <table class="table table-hover table-striped table-bordered table-sm" id="serviceentriestable">
                    <thead class="thead-dark">
                        <th>No</th>
                        <th>Ticket #</th>
                        <th>Job Card #</th>
                        <th>Client</th>
                        <th>Site</th>
                        <th>Activity</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Equip. Model</th>
                        <th>Serial #</th>
                        <th style="width:10px;">Findings</th>
                        <th>Action Taken</th>
                        <th>Conclusion</th> 
                    </thead>
                    <tbody id="serviceentriestablebody"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>