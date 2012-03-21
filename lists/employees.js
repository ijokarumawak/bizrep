function(head, req) {
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
  // List doesn't return values as expected.
  // http://groups.google.com/group/couchapp/browse_thread/thread/6dfe8e989386e111
  // var List = require("vendor/couchapp/lib/list");

  provides("html", function() {
  var items = []; 
  var stash = { 
          count: 0, 
          employees : function() { 
                  if (items.length == 0) { 
                          while ((row = getRow())) { 
                                  stash.count++; 
                                  items.push(row); 
                          } 
                  } 
                  return items; 
          } 
  }; 
  return Mustache.to_html(ddoc.template.partials.employees, stash);
  });
  
};
