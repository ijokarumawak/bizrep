
function couchapp_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+scripts[i]+'"><\/script>')
  };
};

couchapp_load([
  "/_utils/script/sha1.js",
  "/_utils/script/json2.js",
  // jqueryを最新版に。
  // "/_utils/script/jquery.js",
  "vendor/couchapp/jquery-1.7.1.js",
  // jquery.couch.jsにパッチを適用。
  //"/_utils/script/jquery.couch.js",
  "vendor/couchapp/jquery.couch.js",
  "vendor/couchapp/jquery.couch.app.js",
  "vendor/couchapp/jquery.couch.app.util.js",
  "vendor/couchapp/jquery.mustache.js",
  "vendor/couchapp/jquery.evently.js",
  // 追加ライブラリ。
  "script/bootstrap.js",
  "script/jquery.ba-hashchange.js",
  "script/common.js"
]);
