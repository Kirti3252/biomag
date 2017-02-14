module.exports = function (appExtensions) {
    console.log("---------------------------");
    console.log("Loading JsonResponse Filter ");
    console.log("---------------------------");

    var JsonResponseFilter = {};

    //authenticate 
    JsonResponseFilter.OnExecuted = function (req, res, next) {
              
                res.send();
         
    }

   
    console.log(appExtensions.appConfig.chalk.white.bgGreen.bold('success'));
    return jwtAuthorizationFilter;
}