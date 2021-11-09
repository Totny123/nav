let hashMap = localStorage.getItem("hashMap");

let siteArr = JSON.parse(hashMap) || [
  { favicon: "A", url: "https://www.acfun.cn" },
  { favicon: "B", url: "https://www.bilibili.com" },
];

function render() {
  $(".site-list li:last-child").siblings().remove();
  siteArr.forEach((item) => {
    $(".site-list li:last-child").before(`
      <li>
        <a class="site-wrapper" href="${item.url}">
          <div class="favicon">${item.favicon.toUpperCase()}</div>
          <div class="link">${simplifyUrl(item.url)}</div>
        </a>
      </li>
    `);
  });
}
function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://").replace("www.", "");
}
render();
$(".add-wrapper").on("click", () => {
  let url = window.prompt("请输入要添加的网站！");
  if (url.indexOf("https://") === -1 && url.indexOf("http://")) {
    url = "https://" + url;
  }
  siteArr.push({ favicon: simplifyUrl(url)[0], url });
  localStorage.setItem("hashMap", JSON.stringify(siteArr));
  render();
});
