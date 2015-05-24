FileHandler = {}
FileHandler.handleFileAddition = function(filename, content) {
  console.log('ADDED ' + filename + ' : ' + prCntnt(content));
  // blogH...
}
FileHandler.handleFileRemoval = function(filename) {
  console.log('REMOVED ' + filename);
};
var prCntnt = function(content) {
  if (content) {
    return content.replace('\n', '');
  }
  return content;
}
var blogHeaders = new Mongo.Collection("blog headers collection");
var blogBodies = new Mongo.Collection("blog bodies colletion");

