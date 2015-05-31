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
        regex:   '<p>(<img.*?title="(.*?)".*?)/></p>',
        replace: function (match, element, title) {
          console.log(element);
          element = "<div style='text-align:center;'>" + element;
          element += " class='col s12' style='padding-left:0px; padding-right:0px;' ";
          element += "/>";
          element += "<div align='center' style='font-size:75%; '>" + title + "</div>";
          element += "</div>";
          console.log(element);
          return element;
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
