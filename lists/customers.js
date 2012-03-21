function(head, req) {
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");

  provides("html", function() {
  var items = []; 
  var stash = { 
          count: 0, 
          customers : function() { 
                  if (items.length == 0) { 
                          while ((row = getRow())) { 
                                  stash.count++; 
                                  items.push(row); 
                          } 
                  } 
                  return items; 
          } 
  }; 
  return Mustache.to_html(ddoc.template.partials.customers, stash);
  });
  
};
