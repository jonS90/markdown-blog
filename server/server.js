FileHandler = {}
FileHandler.handleFileAddition = function(filename, content) {
  console.log('ADDED ' + filename + ' : ' + prCntnt(content));
  BlogHeaders.insert({'filename': filename});
  BlogBodies.insert({'filename': filename, 'content': content});
}
FileHandler.handleFileRemoval = function(filename) {
  console.log('REMOVED ' + filename);
  BlogBodies.remove({'filename': filename});
  BlogHeaders.remove({'filename': filename});
};
var prCntnt = function(content) {
  if (content) {
    return content.replace('\n', '');
  }
  return content;
}
Meteor.startup(function() {
 BlogHeaders.remove({});
 BlogBodies.remove({});
});
