Router.route('/', function() {
  this.render('RootTemplate', { });
});

Router.route('/test/');

Router.route('/posts/', function() {
  this.render('AllPostsTemplate');
});
if (Meteor.isClient) {
  Template.AllPostsTemplate.helpers({
    headers: function() {return BlogHeaders.find().fetch(); }
  });
}

Router.route('/post/:filename', function() {
  var header = BlogHeaders.findOne({filename: this.params.filename});
  if (header) {
    console.log('routing to ' + header.filename);
    var converter = new Showdown.converter();
    var data = header;
    var body = BlogBodies.findOne({filename: this.params.filename});
    data.content = converter.makeHtml(body.content);
    this.render('PostTemplate', {data: data});
  } else {
    this.render('PostNotFoundTemplate', {data: {filename: this.params.filename}});
  }
});
