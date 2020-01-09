var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Visitor schema
var VisitorSchema = new Schema({
    name: String,
    notes: String,
    signedIn:Boolean,
    signedOut:Boolean,
    signOutTime:  { type: Date,  default: null },
    completed: { type:Boolean, default: false },
    created_by: { type: Date,  default: Date.now }
});

// True since it is a parallel middleware
VisitorSchema.pre('save', function(next, done) {

    console.log("pre-save", this);

    if(!this.name){
        next(new Error("lastName should not be null"));
    }
    if(!this.notes){
        next(new Error("lastName should not be null"));
    }

    next();
});

var VisitorModel = mongoose.model('Visitor', VisitorSchema);

module.exports = VisitorModel;
