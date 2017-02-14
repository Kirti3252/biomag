var genericmasterfacade = function (_globalVariable) {
    var genricmasterModel = require("../models/genericmasterModel.js");

    this.GetAll = function (req, res) {
        console.log('Inside facade: GetAll');
        var response = {};
        return new Promise(function (resolve, reject) {

            try {
              
                var u = new genricmasterModel(_globalVariable);
                u.GetAll(req, res).then(function (gsvm) {
                    resolve(gsvm);
                });
            }
            catch (e) {
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                _globalVariable.logger.error("Exception: " + e);
                resolve(response);
            }
        });
        }
            
    this.save = function (req, res) {
        console.log('Inside facade: save');
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                //UserId Property should be there inside request.body object
                req.saveRequest = _globalVariable.utility.attachCommonFields(req.body, req.method);
                var u = new genricmasterModel(_globalVariable);
                u.save(req, res).then(function (gsvm) {
                    resolve(gsvm);
                });
            }
            catch (e) {
                response.Success = false;
                response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
                response.ErrorDetails = "Exception: " + e;
                _globalVariable.logger.error("Exception: " + e);
                resolve(response);
            }
        });
    }
    this.update = function (req, res) {
        console.log('Inside facade: update');
        var response = {};
        return new Promise(function (resolve, reject) {
        try {
            req.body.id = req.params.id;
            //UserId Property should be there inside request.body object
            req.updateRequest = _globalVariable.utility.attachCommonFields(req.body, req.method);
            var u = new genricmasterModel(_globalVariable);
            u.update(req, res).then(function (gsvm) {
                resolve(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            resolve(response);
        }
        });
        }
    this.getById = function (req, res) {
        console.log('Inside facade: getById');
        var response = {};
        return new Promise(function (resolve, reject) {
        try {
          
            var u = new genricmasterModel(_globalVariable);
            u.getById(req, res).then(function (gsvm) {
                resolve(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            resolve(response);
        }
        });
    }
    this.search = function (req, res) {
        console.log('Inside facade: search');
        var response = {};
        return new Promise(function (resolve, reject) {
        try {
            req.searchRequest = req.body;
            var u = new genricmasterModel(_globalVariable);
            u.search(req, res).then(function (gsvm) {
                resolve(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            resolve(response);
        }
        });
    }
    this.pagination = function (req, res) {
        console.log('Inside facade:  pagination');
        var response = {};
        return new Promise(function (resolve, reject) {
        try {
            req.paginationRquest = req.body;
            req.paginationRquest.limit = req.query.limit;
            req.paginationRquest.offset = ((parseInt(req.query.page) - 1) * parseInt(req.query.limit)).toString();
            var u = new genricmasterModel(_globalVariable);
            u.pagination(req, res).then(function (gsvm) {
                resolve(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            resolve(response);
        }
    });
    }
    this.delete = function (req, res) {
        console.log('Inside facade: delete');
        var response = {};
        return new Promise(function (resolve, reject) {
        try {
           
            var u = new genricmasterModel(_globalVariable);
            u.delete(req, res).then(function (gsvm) {
                resolve(gsvm);
            });
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            resolve(response);
        }
        });
    }
}
module.exports = genericmasterfacade;