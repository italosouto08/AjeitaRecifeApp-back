const express = require('express');
const app = express();
const ComplaintRoutes = express.Router();

let Complaint = require('../model/Complaint');

// api to add complaint
ComplaintRoutes.route('/add').post(function (req, res) {
  let complaint = new Complaint(req.body);
  complaint.save()
  .then(complaint => {
    res.status(200).json({'status': 'success','mssg': 'complaint added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get complaints
ComplaintRoutes.route('/').get(function (req, res) {
  Complaint.find(function (err, complaints){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','users': complaints});
    }
  });
});

// api to get complaint
ComplaintRoutes.route('/complaint/:id').get(function (req, res) {
  let id = req.params.id;
  Complaint.findById(id, function (err, complaint){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','complaint': complaint});
    }
  });
});

// api to update route
ComplaintRoutes.route('/update/:id').put(function (req, res) {
    Complaint.findById(req.params.id, function(err, complaint) {
    if (!complaint){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        complaint.name = req.body.name;
        complaint.email = req.body.email;
        complaint.phone_number = req.body.phone_number;

        complaint.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
ComplaintRoutes.route('/delete/:id').delete(function (req, res) {
  Complaint.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = ComplaintRoutes;