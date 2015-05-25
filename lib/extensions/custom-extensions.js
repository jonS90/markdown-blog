(function () {
  'use strict';

  var mine = function () {
    return [

      // @username syntax
      {
        type:    'lang',
        regex:   '\\B(\\\\)?@([\\S]+)\\b',
        replace: function (match, leadingSlash, username) {
          // Check if we matched the leading \ and return nothing changed if so
          if (leadingSlash === '\\') {
            return match;
          } else {
            return '<a href="http://twitter.com/' + username + '">@' + username + '</a>';
          }
        }
      },

      {
        type:    'output',
        regex:   '(<img.*?)/>',
        replace: function (match, a) {
          console.log( a + " width=100px padding-bottom=10px />");
          return a + " class='col s12' style='padding-left:0px; padding-right:0px; padding-bottom:15px' /><br/><br/>";
        }
      },

      // #hashtag syntax
      {
        type:    'lang',
        regex:   '\\B(\\\\)?#([\\S]+)\\b',
        replace: function (match, leadingSlash, tag) {
          // Check if we matched the leading \ and return nothing changed if so
          if (leadingSlash === '\\') {
            return match;
          } else {
            return '<a href="http://twitter.com/search/%23' + tag + '">#' + tag + '</a>';
          }
        }
      },

      // Escaped @'s
      {
        type:    'lang',
        regex:   '\\\\@',
        replace: '@'
      }
    ];
  };

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
    window.Showdown.extensions.mine = mine;
  }
  // Server-side export
  if (typeof module !== 'undefined') {
    module.exports = twitter;
  }

}());
