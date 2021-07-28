"use strict";

function getJsParam(jsName, paramName) {
  var retJsonArr = [],
      retVal = null;
  var rName = new RegExp(jsName + "(\\?(.*))?$");
  var jss = document.getElementsByTagName("script");

  for (var i = 0; i < jss.length; i++) {
    var j = jss[i];

    if (j.src && j.src.match(rName)) {
      var oo = j.src.match(rName)[2];
      var t = void 0,
          r = void 0;

      if (oo && (t = oo.match(/([^&=]+)=([^=&]+)/g))) {
        for (var l = 0; l < t.length; l++) {
          r = t[l];
          var tt = r.match(/([^&=]+)=([^=&]+)/);

          if (tt) {
            retJsonArr.push({
              key: tt[1],
              val: tt[2]
            });

            if (paramName != undefined && paramName.length > 0 && paramName == tt[1]) {
              retVal = tt[2];
            }
          }
        }
      }
    }
  }

  return paramName != undefined && paramName.length > 0 ? retVal : null;
}

var id = getJsParam("im.js", "id");

if (id != null) {
  window.localStorage.setItem("serviceId", id);
}

var service = getJsParam("im.js", "service");

if (service != null) {
  window.localStorage.setItem("service", service);
}

var css = document.createElement("link");
css.href = "/Content/kcim/visitor/css/app.css";
css.rel = "stylesheet";
document.head.appendChild(css);
var div = document.createElement("div");
div.id = "jljw_IM_GdImBox";
document.body.appendChild(div);

var script = document.createElement("script");
script.src = "/Content/kcim/visitor/js/chunk-vendors.js";
document.body.appendChild(script);

var app = document.createElement("script");
app.src = "/Content/kcim/visitor/js/app.js";
document.body.appendChild(app);