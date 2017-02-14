var fs = require('fs'), 
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    
var S3Helper = {
    uploadToS3 : function(filePath, filename) {
                  
       
    },
    
    deleteFileFormS3 : function(filepath){
             
    }
}
module.exports=S3Helper; 