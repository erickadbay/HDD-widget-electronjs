var menubar = require('menubar');

var mb = menubar({
    height: 100,
    width: 300,
    resizable: false,
    useContentSize: true
});

mb.on('after-create-window', function(){
    //mb.window.openDevTools();
});
