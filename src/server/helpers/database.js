var Database = function (_globalVariable) {
    console.log("---------------------------");
    console.log("Loading massive");
    console.log("---------------------------");
    var massive = require("massive");

    //Initiallising Database Connection
    _globalVariable.db = massive.connectSync({ connectionString: _globalVariable.appConfig.db_ConnString });
    // console.log("_globalVariable.appConfig.db_ConnString  " + _globalVariable.appConfig.db_ConnString)
    console.log(_globalVariable.appConfig.chalk.white.bgGreen.bold('success'));
}
module.exports = Database;

