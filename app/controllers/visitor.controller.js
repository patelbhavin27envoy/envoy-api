"use strict";

var VisitorCtrl = function(Visitor){

	var VisitorObj = {};

	VisitorObj.PostVisitor = function(req, res, next){

		var newVisitor = new Visitor(req.body);

		newVisitor.signedIn = true;
		newVisitor.signedOut = false;
		newVisitor.signOutTime = null;

		newVisitor.save(function(err, visitor){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}

			res.json({status: true, visitor: visitor});
		});
	}

	VisitorObj.GetVisitor = function(req, res, next){

		if(req.query && req.query.name) {

			const name = req.query.name;
			Visitor.find({name: {$regex: '.*' + name + '.*'}}, function (err, visitors) {
				if (err) {
					res.json({status: false, error: "Something went wrong"});
					return
				}
				res.json({status: true, visitor: visitors});
			}).limit(25);

		} else {

			Visitor.find(function (err, visitors) {
				if (err) {
					res.json({status: false, error: "Something went wrong"});
					return
				}
				res.json({status: true, visitor: visitors});
			}).limit(25);

		}

	}

	VisitorObj.UpdateVisitor = function(req, res, next){

		Visitor.findById(req.params.visitor_id, function(err, visitor){
			visitor.signedOut = true;
			visitor.signOutTime = new Date();
			visitor.save(function(err, visitor){
				if(err) {
					res.json({status: false, error: "Status not updated"});
				}

				res.json({status: true, visitor: visitor});
			});
		});
	}

	// Disclaimer : This is not exposed right now
	// Please do not enable it via router...
	VisitorObj.DeleteVisitor = function(req, res, next){

		Visitor.remove({_id : req.params.visitor_id }, function(err, visitors){
			if(err) {
				res.json({status: false, error: "Deleting visitor is not successfull"});
			}
			res.json({status: true, message: "Todo deleted successfully"});
		});
	}

	return VisitorObj;
}

module.exports = VisitorCtrl;
