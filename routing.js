import express from "express";
const router= express.Router();
import {v4 as uuidv4} from 'uuid';
import data from './data/mock.json' assert {type: 'json'};
import validator from "validator";
router.route("/foodtruck").get( (req, res)=>{
  res.send(data);
});

router.route("/foodtruck").post( async(req, res)=>{

  let errors = await inputPostRequestValidation(req);  
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;     
  }     
  let {name, date}=req.body;
  let id = uuidv4();
  data.push({"id":id,"name":name, "date":date});
  res.send({message:"Record added Successfully."});

});

router.route("/foodtruck").put(async(req, res)=>{
  let errors = await inputPutRequestValidation(req);  
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;     
  }  

  let {name, date, id}=req.body;
  data.forEach((item, index)=>{
          if(item.id==id){
             data[index].name=name;
             data[index].date=date;
            }
   });
   res.send({message:"Record Updated Successfully."});
});

router.route("/foodtruck/:date").get( (req, res)=>{
  const date= req.params.date;  
  res.send(data.filter(item=>item.date==date));
});

router.route("/foodtruck/:id").delete( (req, res)=>{
  const id= req.params.id;  
  let index=-1;
  for(let i=0; i <data.length; i++){
     if(data[i].id==id){
      index=i;
      break;
     }
  }
  data.splice(index, 1);
  res.send({message:"Record Deleted Successfully"});
});
const inputPostRequestValidation = async function(req) {
	
	var errors = [];	
  var name =req.body.name? req.body.name:'';
	if (validator.isEmpty(name)) {
		var error = {};
		error['field'] = 'name';
		error['message'] = 'Required parameter missing: name';
		errors.push(error);
	}	

  var date =req.body.date? req.body.date:'';
		
	if (validator.isEmpty(date)) {
		var error = {};
		error['field'] = 'date';
		error['message'] = 'Required parameter missing: date';
		errors.push(error);
	}	  
	return errors;	

};

const inputPutRequestValidation = async function(req) {
	
	var errors = [];	
  var name =req.body.name? req.body.name:'';
	if (validator.isEmpty(name)) {
		var error = {};
		error['field'] = 'name';
		error['message'] = 'Required parameter missing: name';
		errors.push(error);
	}	

  var id =req.body.id? req.body.id:'';
	if (validator.isEmpty(id)) {
		var error = {};
		error['field'] = 'id';
		error['message'] = 'Required parameter missing: id';
		errors.push(error);
	}	

  var date =req.body.date? req.body.date:'';
		
	if (validator.isEmpty(date)) {
		var error = {};
		error['field'] = 'date';
		error['message'] = 'Required parameter missing: date';
		errors.push(error);
	}	  
	return errors;	

};

export default router;