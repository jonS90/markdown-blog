FileHandler = {}
FileHandler.handleFileAddition = function(filename, content) {
  console.log('ADDED ' + filename + ' : ' + prCntnt(content));
  blogHeaders.insert({'filename': filename});
  blogBodies.insert({'filename': filename, 'content': content});
}
FileHandler.handleFileRemoval = function(filename) {
  console.log('REMOVED ' + filename);
  blogBodies.remove({'filename': filename});
  blogHeaders.remove({'filename': filename});
};
var prCntnt = function(content) {
  if (content) {
    return content.replace('\n', '');
  }
  return content;
}
var blogHeaders = new Mongo.Collection('blog headers collection');
var blogBodies = new Mongo.Collection('blog bodies colletion');
blogHeaders.remove({});
blogBodies.remove({});

