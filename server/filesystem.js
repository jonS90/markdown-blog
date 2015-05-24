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
  console.log("Reading all files in directory");
  _.each(filenames, function(filename) {
    readFile(filename, Meteor.bindEnvironment(function(content) {
      blogposts[filename] = hashStr(content);
      FileHandler.handleFileAddition(filename, content);
    }));
  });
}
var hashStr = function(str) {
  return (function() {
    // http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }).apply(str);
};

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
        readFile(filename, Meteor.bindEnvironment(function(content) {
          console.log('( FileEvent "' + filename + '", "' + event + '" : "' + prCntnt(content) + '")');
          if (content) {
            var old_hash = blogposts[filename];
            console.log(old_hash +  ">>>" + hashStr(content));
            if (hashStr(content) !== old_hash) {
              console.log("diff found");
              blogposts[filename] = hashStr(content);
              if (old_hash) {
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
        }));
      }, FILE_EVENT_DELAY);
      readTimers[filename] = id;
    }));
  }

});

