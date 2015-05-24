ExposedHeaders = new Mongo.Collection('blog headers collection');
ExposedBodies = new Mongo.Collection('blog bodies colletion');
console.log("hello to client");

var mdConverter = new Showdown.converter();
