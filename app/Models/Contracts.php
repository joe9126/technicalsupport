<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contracts extends Model
{
    use HasFactory;

    protected $table ='contracts';
    public $timestamps = true;
  	protected $primaryKey = 'id'; 

    protected $fillable = [
    	'contractno','clientid','description','startdate','enddate','pmcycle','billingcycle','contractvalue','currency','comment'
    ];
}
