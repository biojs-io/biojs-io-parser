var test = require('tape');

var Parser = require('../');

// TODO: find a better way to mock requests for request and xhr
var testUrl = "https://cdn.rawgit.com/biojs/edu/master/.nojekyll";
var dummyResponse = "We use plugins (which are turned of on github)\n";

var throughParser = function() {
  this.parse = function(data) {
    return data;
  };
  Parser.mixin(this);
};

test('Should return the same file on read of urls', function(t) {
  t.plan(2);
  var sparser = new throughParser();
  sparser.read(testUrl, function(err, body) {
    t.equal(body, dummyResponse);
    t.equal(err, null);
  });
});

test('Should support extend of objects', function(t) {
  t.plan(2);
  var throughParserAlt = {
    parse: function(data) {
      return data;
    }
  };
  Parser.mixin(throughParserAlt);

  var sparser = throughParserAlt;
  sparser.read(testUrl, function(err, body) {
    t.equal(body, dummyResponse);
    t.equal(err, null);
  });
});

test('Should return a promise if the callback is undefined ', function(t) {
  t.plan(1);
  var sparser = new throughParser();
  sparser.read(testUrl).then(function(body) {
    t.equal(body, dummyResponse);
  }, function() {
    t.fail("err");
  });
});
