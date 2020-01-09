"use strict";

require('sinon-mongoose');

var should = require('should'),
    sinon = require('sinon'),
    mongoose = require('mongoose');

var VisitorModel = require('../../../app/models/visitor.model');

describe('VisitorController testing', function () {

    describe('Visitor Post test', function () {

        it('Should call save only once', function () {

            var saveStub = sinon.stub();

            function VisitorStub(){
                this.save = saveStub
            }
            var req = {
                body: {
                    "name":"John Doe",
                    "notes":"This is Creating new visitor."
                }
            }
            var res = {}, next = {};
            var VisitorController = require('../../../app/controllers/visitor.controller')(VisitorStub);
            VisitorController.PostVisitor(req, res, next);
            sinon.assert.calledOnce(saveStub);
        });

        it('Should save visitor', function (done) {

            var visitorMock = sinon.mock(new VisitorModel({
                "name":"John Doe",
                "notes":"This is Creating new visitor."
            }));
            var visitor = visitorMock.object;

            visitorMock
                .expects('save')
                .yields(null, 'SAVED');

            visitor.save(function(err, result) {
                visitorMock.verify();
                visitorMock.restore();
                should.equal('SAVED', result, "Test fails due to unexpected result")
                done();
            });
        });

    });

    describe('Get all Visitor test', function () {
        it('Should call find once', function (done) {
            var VisitorMock = sinon.mock(VisitorModel);
            VisitorMock
            .expects('find')
            .yields(null, 'VISITORS');

            VisitorModel.find(function (err, result) {
                VisitorMock.verify();
                VisitorMock.restore();
                should.equal('VISITORS', result, "Test fails due to unexpected result")
                done();
            });
        });

        if('Should call find for search', function(done){
            var find = sinon.stub();

            function VisitorStub(){
                this.find = find
            }
            var req = {
                query: {
                    "name":"JohnDelete"
                }
            }
            var res = {}, next = {};
            var VisitorController = require('../../../app/controllers/visitor.controller')(VisitorStub);
            VisitorController.find(req, res, next);
            sinon.assert.calledOnce(find);
        });

    });

    describe('Delete visitor test', function () {
        it('Should delete visitor of gived id', function (done) {
            var VisitorMock = sinon.mock(VisitorModel);

            VisitorMock
                .expects('remove')
                .withArgs({_id: 12345})
                .yields(null, 'DELETED');

            VisitorModel.remove({_id: 12345}, function(err, result){
                VisitorMock.verify();
                VisitorMock.restore();
                done();
            })


        });
    });

    describe('Update a visitor', function () {
        it('Should update the visitor with new value', function (done) {
            var visitorMock = sinon.mock(new VisitorModel({ todo: 'Save new visitor from mock'}));
            var visitor = visitorMock.object;

            visitorMock
                .expects('save')
                .withArgs({_id: 12345})
                .yields(null, 'UPDATED');

            visitor.save({_id: 12345}, function(err, result){
                visitorMock.verify();
                visitorMock.restore();
                done();
            });

        });
    });


});
