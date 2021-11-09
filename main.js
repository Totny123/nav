let hashMap = localStorage.getItem("hashMap");
let localBgImgUrl = localStorage.getItem("bgImgUrl");
let siteArr = JSON.parse(hashMap) || [
  { favicon: "A", url: "https://www.acfun.cn" },
  { favicon: "B", url: "https://www.bilibili.com" },
];
let bgImgUrl =
  JSON.parse(localBgImgUrl) ||
  "https://cdn.wallpaperhub.app/cloudcache/3/b/3/b/a/3/3b3ba3e59c8d226e7917840d676ee09d20dfa4dd.jpg";
//渲染网站列表
function render() {
  $(".site-list li:last-child").siblings().remove();
  siteArr.forEach((item, index) => {
    $(".site-list li:last-child").before(`
      <li>
        <a class="site-wrapper" href="${item.url}">
          <div class="favicon">${item.favicon.toUpperCase()}</div>
          <div class="link">${simplifyUrl(item.url)}</div>
        </a>
        <div class="delete" onClick="deleteSite(${index})">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </div>
      </li>
    `);
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
//监听新增网站的点击
$(".add-wrapper").on("click", () => {
  let reg =
    /^(?:(http|https):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
  let url = "";
  let message = "请输入要添加的网站！";
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
  siteArr.push({ favicon: simplifyUrl(url)[0], url });
  localStorage.setItem("hashMap", JSON.stringify(siteArr));
  render();
});
//改变网页背景，只在PC端进行修改
function changeBgImg() {
  if (!navigator.userAgent.match(/mobile/i)) {
    $("body").css("background-image", `url(${bgImgUrl})`);
  }
}
render();
changeBgImg();
