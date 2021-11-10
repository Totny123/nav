// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var hashMap = localStorage.getItem("hashMap");
var localBgImgUrl = localStorage.getItem("bgImgUrl");
var siteArr = JSON.parse(hashMap) || [{ favicon: "A", url: "https://www.acfun.cn" }, { favicon: "B", url: "https://www.bilibili.com" }];
var bgImgUrl = JSON.parse(localBgImgUrl) || "https://cdn.wallpaperhub.app/cloudcache/3/b/3/b/a/3/3b3ba3e59c8d226e7917840d676ee09d20dfa4dd.jpg";
//渲染网站列表
function render() {
  $(".site-list li:last-child").siblings().remove();
  siteArr.forEach(function (item, index) {
    $(".site-list li:last-child").before("\n      <li>\n        <a class=\"site-wrapper\" href=\"" + item.url + "\">\n          <div class=\"favicon\">" + item.favicon.toUpperCase() + "</div>\n          <div class=\"link\">" + simplifyUrl(item.url) + "</div>\n        </a>\n        <div class=\"delete\" onClick=\"deleteSite(" + index + ")\">\n          <svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=\"#icon-delete\"></use>\n          </svg>\n        </div>\n      </li>\n    ");
  });
}
//简化URL，便于展示
function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://").replace("www.", "");
}
//移除某个网站
function deleteSite(index) {
  siteArr.splice(index, 1);
  localStorage.setItem("hashMap", JSON.stringify(siteArr));
  render();
}
//改变网页背景，只在PC端进行修改
function changeBgImg() {
  if (!navigator.userAgent.match(/mobile/i)) {
    $("body").css("background-image", "url(" + bgImgUrl + ")");
  }
}
//监听新增网站的点击
$(".add-wrapper").on("click", function () {
  var reg = /^(?:(http|https):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
  var url = "";
  var message = "请输入要添加的网站！";
  while (1) {
    url = window.prompt(message);
    if (url === null) {
      return;
    }
    if (url.indexOf("https://") === -1 && url.indexOf("http://")) {
      url = "https://" + url;
    }
    if (reg.test(url)) {
      break;
    } else {
      message = "输入网址格式错误，请重新输入！";
    }
  }
  siteArr.push({ favicon: simplifyUrl(url)[0], url: url });
  localStorage.setItem("hashMap", JSON.stringify(siteArr));
  render();
});
//PC监听body的双击,进行背景修改。
$("body").dblclick(function (e) {
  if (e.target === e.currentTarget) {
    var reg = /^(?:(http|https):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
    var url = "";
    var message = "请输入背景图片URL！";
    while (1) {
      url = window.prompt(message);
      if (url === null) {
        return;
      }
      if (url.indexOf("https://") === -1 && url.indexOf("http://")) {
        url = "https://" + url;
      }
      if (reg.test(url)) {
        break;
      } else {
        message = "输入URL格式错误，请重新输入！";
      }
    }
    bgImgUrl = url;
    localStorage.setItem("bgImgUrl", JSON.stringify(bgImgUrl));
    changeBgImg();
  }
});
//监听键盘事件
$(document).keydown(function (e) {
  var key = e.key.toLowerCase();
  siteArr.forEach(function (item) {
    if (item.favicon.toLowerCase() === key) {
      window.location.href = item.url;
    }
  });
});
render();
changeBgImg();
//判断是否第一次进入该网站。
if (!localStorage.getItem("first")) {
  if (!navigator.userAgent.match(/mobile/i)) {
    setTimeout(function () {
      alert("\n      \u53CB\u60C5\u63D0\u793A\uFF1A\n            \u53CC\u51FB\u80CC\u666F\u56FE\u7247\u53EF\u8FDB\u884C\u80CC\u666F\u4FEE\u6539\uFF01\n            \u952E\u76D8\u6309\u4E0B\u7F51\u7AD9\u5BF9\u5E94\u9996\u5B57\u6BCD\u53EF\u5FEB\u6377\u8DF3\u8F6C\uFF01\n            ");
      localStorage.setItem("first", 1);
    }, 1000);
  }
}
//parcel打包时忽略该函数bug。hack方法解决。百度实在找不到。
console.log(deleteSite);
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.1457b2e3.map