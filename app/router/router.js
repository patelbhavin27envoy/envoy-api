var Visitor = require('../models/visitor.model');

var VisitorController = require('../controllers/visitor.controller')(Visitor);

module.exports = function(app){

	// Visitor APIs
	app.get('/api/visitors', VisitorController.GetVisitor);
	app.post('/api/visitors', VisitorController.PostVisitor);
	// // Instead of PATCH consider put for now
	app.put('/api/visitors/:visitor_id', VisitorController.UpdateVisitor);

	app.get('/api/entries', VisitorController.GetVisitor);
	app.post('/api/entries', VisitorController.PostVisitor);
	// // Instead of PATCH consider put for now
	app.put('/api/entries/:visitor_id', VisitorController.UpdateVisitor);

	// Warning ::
	// Disabled DELETE for now. DO not enable it unless required by business.
	// app.delete('/api/visitors/:visitor_id', VisitorController.DeleteVisitor);

}
