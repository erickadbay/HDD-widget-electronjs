var os = require('os');
var disk = require('diskusage');
var prettyBytes = require('pretty-bytes');
var WebFrame = require('web-frame');

WebFrame.setZoomLevelLimits(1,1);//Disables zoom

var free, total, freeInBytes, totalInBytes, percent;

var getPlatform = function (){
    if (os.platform()=='darwin' || os.platform()=='linux' ){
        return '/';
    }else if(os.platform()=='win32'){
        return 'c:';
    }
};

function getUsage(platform){
    disk.check(platform(), function(err, info) {
        free=info.available;
        total=info.total;
        freeInBytes = prettyBytes(free);
        totalInBytes = prettyBytes(total);
        percent = 100-(free/total *100).toFixed(2);
    });
}

function checkDiskUsage(){
    getUsage(getPlatform);
    $('#slider-free').css("width",percent+"%");
    if (percent>=20){
        $('#slider-free').html("<p>"+percent+"%</p>");
    }
    $('#amounts').html("<p>"+freeInBytes+" free of "+totalInBytes+"</p>");
}
//console.log("First time only");
checkDiskUsage();
setInterval(checkDiskUsage, 5000);
