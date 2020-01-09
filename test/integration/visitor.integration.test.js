"use strict";

var should = require('should'),
    request = require('supertest'),
    app = require('../../server.js'),
    mongoose = require('mongoose'),
    Visitor = mongoose.model('Visitor'),
    agent = request.agent(app);

describe('Visitor CRUD integration testing', function () {

    describe('Get all visitor', function () {

        before(function (done) {
            var newVisitor = { name: "John1 Doe1" };
            agent
                .post('/api/visitors')
                .end(function(){
                    done();
                })
        });

        it('Should get status equal success and array of visitor', function (done) {
            agent
                .get('/api/visitors')
                .expect(200)
                .end(function(err, results){
                    results.body.status.should.equal(true);
                    console.log(results.visitor);
                    done();
                });
        });

        if('Should get two visitors', () => {

            var params = {
                "name":"John Doe",
                "notes":"This is Creating new visitor."
            };

            agent
                .post('/api/visitors')
                .send(params);

            agent
                .get('/api/visitors')
                .expect(200)
                .end(function(err, results){
                    results.body.status.should.equal(true);
                    results.body.visitor.should.not.equal(null);

                    // Check values
                    results.body.visitor.length().should.equal(3);
                    done();
                });

        });

        if('Should get searched visitors', () => {

            var params = {
                "name":"JohnDelete DoeDelete",
                "notes":"This is Creating new visitor."
            };

            agent
                .post('/api/visitors')
                .send(params);

            agent
                .get('/api/visitors?name'+searchName)
                .expect(200)
                .end(function(err, results){
                    results.body.status.should.equal(true);
                    results.body.visitor.should.not.equal(null);

                    // Check values
                    results.body.visitor.length().should.not.equal(0);
                    done();
                });

        });

    });


    describe('Get all visitor', function () {

        before(function (done) {
            var newVisitor = { name: "JohnDelete DoeDelete" };
            agent
                .post('/api/visitors')
                .end(function(){
                    done();
                })
        });

        if('Should get searched visitors', () => {

            console.log("===================================================");

            var searchName = "JohnDelete";
            agent
                .get('/api/visitors?name'+searchName)
                .expect(200)
                .end(function(err, results){
                    results.body.status.should.equal(true);
                    results.body.visitor.should.not.equal(null);

                    console.log(".." + results);

                    // Check values
                    results.body.visitor.length().should.equal(3);
                    done();
                });

            console.log("===================================================");


        });

    });


    describe('Post a Visitor', function () {
        it('Should allow post to post a visitor and return _id', function (done) {

            var params = {
                "name":"John Doe",
                "notes":"This is Creating new visitor."
            };

            agent
                .post('/api/visitors')
                .send(params)
                .expect(200)
                .end(function(err, results){

                    results.body.status.should.equal(true);
                    results.body.visitor.should.not.equal(null);

                    // Check values
                    results.body.visitor.should.have.property('_id');
                    results.body.visitor.name.should.equal("John Doe");
                    results.body.visitor.notes.should.equal("This is Creating new visitor.");
                    results.body.visitor.signedOut.should.equal(false);
                    results.body.visitor.signedIn.should.equal(true);

                    done();
                });
        });
    });


    describe('Delete a Visitor', function () {

        var id;
        before(function (done) {

            var params = {
                "name":"JohnDelete DoeDelete",
                "notes":"This is Delete."
            };

            agent
                .post('/api/visitors')
                .send(params)
                .expect(200)
                .end(function(err, results){

                    results.body.status.should.equal(true);
                    results.body.visitor.should.not.equal(null);
                    id = results.body.visitor._id;
                    done();
                });

        });

        it('Should NOT delete the visitor by _id. The DELETE is not allowed.', function (done) {
            agent
                .delete('/api/visitors/'+id)
                .end(function(err, result){

                    result.req.res.statusCode.should.equal(404);
                    done();
                })

        });

    });

    describe('Update a Visitor', function () {
        var id;
        before(function (done) {

            var params = {
                "name":"JohnUpdate DoeUpdate",
                "notes":"This is for update."
            };

            agent
                .post('/api/visitors')
                .send(params)
                .expect(200)
                .end(function(err, results){

                    results.body.status.should.equal(true);
                    results.body.visitor.should.not.equal(null);
                    id = results.body.visitor._id;
                    done();
                });
        });

        it('Should update the signedOut by _id to true', function (done) {
            var params = { signedOut: true };
            agent
                .put('/api/visitors/'+id)
                .send(params)
                .end(function(err, result){
                    result.body.status.should.equal(true);

                    result.body.visitor.signedOut.should.equal(true);
                    result.body.visitor.signedIn.should.equal(true);
                    result.body.visitor.signOutTime.should.not.equal(null);
                    done();
                })

        });
    });

});

