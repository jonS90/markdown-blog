var FILE_EVENT_DELAY = 0;

var fs = Npm.require('fs');

var blogposts = {};

var readFile = function(filename, callback) {
  var res =  fs.readFile(PATH_TO_FILES + '/' + filename, 'utf8', function(err,data){
    if (callback) {
      callback(data);
    }
  });
}
var readAllFiles = function(filenames) {
  _.each(filenames, function(filename) {
    readFile(filename, function(content) {
      console.log("== file ==");
      console.log(filename);
      console.log(content);
    });
  });
}
var prCntnt = function(content) {
  if (content) {
    return content.replace('\n', '');
  }
  return content;
}

Meteor.startup(function () {
  // get current files in directory
  filenames = fs.readdirSync(PATH_TO_FILES);
  _.each(filenames, function(filename) {
  });

  // build list
  readAllFiles(filenames);

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
        Meteor.clearTimeout(readTimers[filename]);
      }
      var id=Meteor.setTimeout(function(){
        readTimers[filename] = undefined;
        readFile(filename, function(content) {
          console.log("( event " + filename + ", " + event + " : " + prCntnt(content) + ")");
          if (content) {
            var old_content = blogposts[filename];
            console.log(prCntnt(old_content) +  ">>>" + prCntnt(content));
            if (content !== old_content) {
              console.log("diff found");
              blogposts[filename] = content;
              if (old_content) {
                FileHandler.handleFileRemoval(filename);
              }
              FileHandler.handleFileAddition(filename, content);
            } else console.log("no diff");
          } else {
            if (blogposts[filename] !== undefined) {
              blogposts[filename] = undefined;
              FileHandler.handleFileRemoval(filename);
            }
          }
          if (content != null) {
          }
        });
      }, FILE_EVENT_DELAY);
      readTimers[filename] = id;
    }));
  }

});

