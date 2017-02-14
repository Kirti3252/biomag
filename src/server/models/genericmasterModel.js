var _=require("underscore");
var genericMasterModel = function (_globalVariable) {    
    this.GetAll = function (req, res) {      
        var response = {};       
        return new Promise(function (resolve, reject) {        
            try {
                //request can be an array or object
                _globalVariable.db[req.params.table].find({}, function (err, result) {
                    if (err) {
                        response.Success = false;
                        _globalVariable.logger.error("Error" + err);
                    }
                    else {
                        response.GenericSearchViewmodels = result;
                        response.Success = true;
                    }
                    resolve(response);
                });
            }
            catch (e) {
                console.log('excep');
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                resolve(response);               
                _globalVariable.logger.error("Exception: " + e);              
            };            
        });
    }
	
    //Save 
    this.save = function (req, res) {
        var response = {};
        return new Promise(function (resolve, reject) {         
            try {               
                //request can be an array or object
                _globalVariable.db[req.params.table].insert(req.saveRequest, function (err, result) {
                    if (err) {
                        response.Success = false;
                        _globalVariable.logger.error("Error " + err);
                    }
                    else {
                        response.GenericSearchViewmodels = result;
                        response.Success = true;
                    }
                    resolve(response);
                });
            }
            catch (e) {
                console.log('excep');
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                resolve(response);
                _globalVariable.logger.error("Exception: " + e);
               
            };
        });

    }

    //Update 
    this.update = function (req, res) {
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                console.log(req.updateRequest)
                //request can be an array or object
                _globalVariable.db[req.params.table].save(req.updateRequest, function (err, result) {
                    if (err) {
                        response.Success = false;
                        _globalVariable.logger.error("Error " + err);
                    }
                    else {
                        response.GenericSearchViewmodels = result;
                        response.Success = true;
                    }
                    resolve(response);
                });
            }
            catch (e) {
                console.log('excep');
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                resolve(response);
                _globalVariable.logger.error("Exception: " + e);

            };
        });

    }

    //Get By Id
    this.getById = function (req, res) {
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                //request can be an array or object
                _globalVariable.db[req.params.table].find(parseInt(req.params.id), function (err, result) {
                    if (err) {
                        response.Success = false;
                        _globalVariable.logger.error("Error" + err);
                    }
                    else {
                        response.GenericSearchViewmodels = result;
                        response.Success = true;
                    }
                    resolve(response);
                });
            }
            catch (e) {
                console.log('excep');
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                resolve(response);
                _globalVariable.logger.error("Exception: " + e);

            };
        });

    }
    
    //Search By Attributes
    this.search = function (req, res) {
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                //request can be an array or object
                _globalVariable.db[req.params.table].find(req.searchRequest, function (err, result) {
                    if (err) {
                        response.Success = false;
                        _globalVariable.logger.error("Error" + err);
                    }
                    else {
                        response.GenericSearchViewmodels = result;
                        response.Success = true;
                    }
                    resolve(response);
                });
            }
            catch (e) {
                console.log('excep');
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                resolve(response);
                _globalVariable.logger.error("Exception: " + e);

            };
        });

    }

    //Delete Record   
    this.delete = function (req, res) {
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                //request can be an array or object
                _globalVariable.db[req.params.table].destroy({ id: req.params.id }, function (err, result) {
                    if (err) {
                        response.Success = false;
                        _globalVariable.logger.error("Error" + err);
                    }
                    else {
                        response.GenericSearchViewmodels = result;
                        response.Success = true;
                    }
                    resolve(response);
                });
            }
            catch (e) {
                console.log('excep');
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                resolve(response);
                _globalVariable.logger.error("Exception: " + e);

            };
        });

    }
    //Server Side Pagination Search By Attributes
    //Server Side Pagination Search By Attributes
    this.pagination = function (req, res) {
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                //Send in an ORDER clause and a LIMIT with OFFSET
                var options = {
                    limit: req.paginationRquest.limit,
                    order: "id",
                    offset: req.paginationRquest.offset
                };
                delete req.paginationRquest.limit;
                delete req.paginationRquest.offset
                db[req.params.table].find(req.paginationRquest, options, function (err, result) {
                    if (err) {
                        response.Success = false;
                        _globalVariable.logger.error("Error" + err);
                    }
                    else {
                        response.GenericSearchViewmodels = result;
                        response.Success = true;
                    }
                    resolve(response);
                });
            }
            catch (e) {
                console.log('excep');
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                resolve(response);
                _globalVariable.logger.error("Exception: " + e);

            };
        });
    }
}
module.exports = genericMasterModel;