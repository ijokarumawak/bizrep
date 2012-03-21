function(doc, req) {
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
  return Mustache.to_html(ddoc.template.partials.customer_edit, doc);
};

