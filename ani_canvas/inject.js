

window.loadStyleSheetFile = function (doc, css) {

  var head = doc.head || doc.getElementsByTagName('head')[0],
  style = doc.createElement('link');
  style.type = 'text/css';
  style.rel = "stylesheet";
  style.href = css;
  head.appendChild(style);
  return (style);

};

window.parseCodeBlocks = function (html) {

  var reg = new RegExp("<script[\\s\\S]*?>", "g");
  var tt;
  var htmlLength = html.length;
  while ((tt = reg.exec(html)) !== null) {
    if (tt[0].indexOf("text/html") < 0) {
      html = html.replace(tt[0], tt[0].replace("script", 'div class="codeBlock template" ') + '<!--');
      var sIndex = reg.lastIndex;
      html = html.replace(/<\/script>/g, function (match, offset) {
        if (sIndex < 0) return (match);

        if (offset > sIndex) { sIndex = -1000; return ("--></div>"); }
        return (match);
      });
    }
  }

  return html;

};
window.loadStyleSheet = function (doc, css) {
  var head = doc.head || doc.getElementsByTagName('head')[0],
  style = doc.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(doc.createTextNode(css));
  }

  head.appendChild(style);
};
window.loadJSFile = function (doc, jsFile) {
  var jsElm = doc.createElement("script");
  jsElm.type = "application/javascript";
  jsElm.src = jsFile;
  doc.body.appendChild(jsElm);
  return (jsElm);
};


window.loadUrl = function (e, t) {
  t = t || "string", console.log("loading url", e);
  var i = new XMLHttpRequest;
  return i.responseType = t,
    i.open("GET", e, !0),
    i.onload = function (e) { }, i.send(),
    i.onerror = function (e) {
      console.log("error", e);
    }, i
};