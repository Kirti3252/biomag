var genricmasterController = function (_globalVariable) {
    var genricmasterfacade = require("../facade/genericmasterFacade.js");
    var server = _globalVariable.server;
    var app = _globalVariable.app;
    var appConfig = _globalVariable.appConfig;
	var _=require("underscore");
	this.routing=function(){
	    //Generic APIs - Starts
	    //Generic API to do GetAll operation of any table -- GET ALL
	    app.get("/api/:table", [this.GetAll]);

	    //Generic API to do GetById operation of any table --GET BY ID
	    app.get("/api/:table/:id", [this.getById, this.responseHandler]);

	    //Generic API to do Save operation of any table --SAVE
	    app.post("/api/:table", [this.save, this.responseHandler]);

	    //Generic API to do Update operation of any table --UPDATE
	    app.put("/api/:table/:id", [this.update, this.responseHandler]);

	    //Generic API to do Hard Delete operation of any table by Id --DELETE
	    app.delete("/api/:table/:id", [this.delete, this.responseHandler]);

	    //Generic API to do Search By Attributes operation of any table --Search
	    app.post("/api/search/:table", [this.search, this.responseHandler]);

	    //Generic API to do Server Side Pagination Search By Attributes operation of any table --Get Paged
	    app.post("/api/paged/:table", [this.pagination, this.responseHandler]);

	    //Generic APIs - Ends
	}
    this.init=function(){
		this.routing();
    }

   
    this.GetAll = function (req, res) {    
        console.log('Inside controller: GetAll');
        var response = {};
        try {
            var u = new genricmasterfacade(_globalVariable);
            u.GetAll(req, res).then(function (gsvm) {
                res.send(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            res.send(response);
        }       
    }
    this.save = function (req, res) {
        console.log('Inside controller: save');
        var response = {};
        try {
            
            var u = new genricmasterfacade(_globalVariable);
            u.save(req, res).then(function (gsvm) {
                res.send(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            res.send(response);
        }
    }
    this.update = function (req, res) {
        console.log('Inside controller: update');
        var response = {};
        try {
            
            var u = new genricmasterfacade(_globalVariable);
            u.update(req, res).then(function (gsvm) {
                res.send(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            res.send(response);
        }
    }
    this.getById = function (req, res) {
        console.log('Inside controller: getById');
        var response = {};
        try {
            
            var u = new genricmasterfacade(_globalVariable);
            u.getById(req, res).then(function (gsvm) {
                res.send(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            res.send(response);
        }
    }
    this.search = function (req, res,next) {
        console.log('Inside controller:  search');
        var response = {};
        try {
            
            var u = new genricmasterfacade(_globalVariable);
            u.search(req, res).then(function (gsvm) {
                res.send(gsvm);
               // next();
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            res.send(response);
        }
    }
    this.pagination = function (req, res) {
        console.log('Inside controller: pagination');
        var response = {};
        try {
            
            var u = new genricmasterfacade(_globalVariable);
            u.pagination(req, res).then(function (gsvm) {
                res.send(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            res.send(response);
        }
    }
    this.delete = function (req, res) {
        console.log('Inside controller: delete');;
        var response = {};
        try {            
            var u = new genricmasterfacade(_globalVariable);
            u.delete(req, res).then(function (gsvm) {
                res.send(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            res.send(response);
        }
    }

    //Function to handle api response
 	this.responseHandler = function (req, res, next) {
 	    console.log('Inside controller: responseHandler()');
 	    var _response = {};
 	    try {
 	        if (_response.Success) {
 	            if (req.path.match('authentication') && _response.Records.length != 0) {
 	                //_authToken = _response.Records[0].Code;
 	                _response.AuthToken = _authToken;
 	            }
 	            if (req.path.match('authentication') && _response.Records.length == 0) {
 	                //_authToken = _response.Records[0].Code;
 	                _response.Message = "Invalid UserName or Password";
 	                _response.Success = false;
 	            }
 	            if ((req.path.match('user') || req.path.match('authentication')) && _response.Records.length) {
 	                for (var i = 0; i < _response.Records.length; i++) {
 	                    delete _response.Records[i].Password;
 	                }
 	            }
 	            //Handling Response for server side pagination api call
 	            if (req.path.match('paged')) {
 	                //Getting total records count
 	                _response.TotalRecords = _response.Records[0].TotalRecords;
 	                //checking whether current page records count and total number of records count not equals zero
 	                if (_response.Records.length > 0 && _response.TotalRecords != 0) {
 	                    var PageSize = parseInt(req.query.limit);
 	                    //If limit is more than total number of records
 	                    if (PageSize > _response.TotalRecords) {
 	                        _response.TotalPages = 1;
 	                    }
 	                    else {
 	                        _response.TotalPages = ((_response.TotalRecords % PageSize == 0) ? (_response.TotalRecords / PageSize) : ((parseInt(_response.TotalRecords / PageSize) + 1)));
 	                    }
 	                    //removing 1st object from array , since it is taken for count purpose
 	                    _response.Records.slice(1, _response.Records.length);
 	                    //removing TotalRecords Property from each object of records array ,since it is taken for count purpose
 	                    for (var i = 0; i < _response.Records.length; i++) {
 	                        delete _response.Records[i].TotalRecords;
 	                    }
 	                }
 	                else {
 	                    _response.TotalRecords = 0;
 	                    _response.TotalPages = 0;
 	                    _response.Records = [];
 	                }
 	            }
 	        }
 	        res.send(_response);
 	    }
 	    catch (e) {
 	        _response.Success = false;
 	        _response.Message = appConfig.recordReterived_Failed_Message;
 	        _response.ErrorDetails = e;
 	        console.log("Exception: " + e);
 	        res.send(_response);
 	    }
 	}

	

	this.init();
}
module.exports = genricmasterController;