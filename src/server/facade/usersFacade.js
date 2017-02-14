var UsersController = function (_globalVariable) {
    var server = _globalVariable.server;
    var app = _globalVariable.app;
    var appConfig = _globalVariable.appConfig;
    var userModel = require("../models/userModel.js");

    this.GetAll = function (req, res) {
        console.log('Inside facade: GetAll');
        var response = {};
        return new Promise(function (resolve, reject) {

            try {
                var u = new userModel(_globalVariable);
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
                var u = new userModel(_globalVariable);
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
                var u = new userModel(_globalVariable);
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

                var u = new userModel(_globalVariable);
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
                var u = new userModel(_globalVariable);
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
        console.log('Inside facade: pagination');
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                req.paginationRquest = req.body;
                req.paginationRquest.limit = req.query.limit;
                req.paginationRquest.offset = ((parseInt(req.query.page) - 1) * parseInt(req.query.limit)).toString();
                var u = new userModel(_globalVariable);
                u.pagination(req, res).then(function (gsvm) {                    
                    resolve(authenticateResponse(gsvm));
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

                var u = new userModel(_globalVariable);
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


    this.authenticate = function (req, res) {
        var _this = this;
        console.log('Inside facade:  authenticate');
        var response = {};
        return new Promise(function (resolve, reject) {
            try {
                req.authenticateRequest = {};
                req.authenticateRequest.password = _globalVariable.utility.encrypt(req.body.password);
                req.authenticateRequest.email = req.body.email;
                var u = new userModel(_globalVariable);
                u.authenticate(req, res).then(function (gsvm) {
                    resolve(_this.authenticateResponse(gsvm));
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
    //Function to handle authenticate response object
    this.authenticateResponse = function (res) {
        console.log('Inside facade:  authenticateResponse');
        var response = {};
        try {
            if (res.Success && res.GenericSearchViewmodels.length > 0) {
                var token = _globalVariable.utility.jwt.sign(res.GenericSearchViewmodels[0], _globalVariable.app.get('superSecret'), {
                    expiresIn: _globalVariable.appConfig.jwtTokenExpiryTime //expiresIn 3 Hours
                });
                response.GenericSearchViewmodels = res.GenericSearchViewmodels[0];
                delete response.GenericSearchViewmodels.Password;
                response.AuthToken = token;
                response.Message = "Authentication Successfull";
                response.Success = true;
            }
            else {
                response.Message = "Invalid UserName or Password";
                response.Success = false;
            }
            return response;
        }
        catch (e) {
            response.Success = false;
            response.Message = _globalVariable.appConfig.recordReterived_Failed_Message;
            response.ErrorDetails = "Exception: " + e;
            _globalVariable.logger.error("Exception: " + e);
            return response;
        }
    }
}
module.exports = UsersController;