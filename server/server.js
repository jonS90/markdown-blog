var fs = Npm.require('fs');

var readFile = function(filename, callback) {
  var res =  fs.readFile(PATH_TO_FILES + '/' + filename, 'utf8', function(err,data){
    if (callback) {
      callback(data);
    }
  });
}
var readFiles = function(filenames) {
  _.each(filenames, function(filename) {
    readFile(filename, function(content) {
      console.log("== file ==");
      console.log(filename);
      console.log(content);
    });
  });
}
var handleFileAddition = function() {};
var handleFileRemoval = function() {};




if (Meteor.isServer) {
  Meteor.startup(function () {
    // get current files in directory
    filenames = fs.readdirSync(PATH_TO_FILES);
    _.each(filenames, function(filename) {
    });

    // build list
    readFiles(filenames);

    // watch files in directory
    {
      var readTimers = {}
      fs.watch(PATH_TO_FILES, Meteor.bindEnvironment(function(event, filename) {
        // weed out transient swap files
        if (filename) {
          if ( /\.swp?x?$/.test(filename) || /~$/.test(filename) || '4913' === filename) {
            //   ^vim does these                                    ^ vim does this
            return;
          }
        }
        if (readTimers[filename]) {
          readTimers.clearTimeout(readTimers[filename]);
        }
        var id=Meteor.setTimeout(function(){
          readTimers[filename] = undefined;
          readFile(filename, function(content) {
            console.log('vvv new contents for ' + filename);
            console.log(content);
            console.log('^^^');
          });
        }, 100);
        readTimers[filename] = id;
      }));
    }

  });
}
