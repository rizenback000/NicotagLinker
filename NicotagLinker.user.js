// ==UserScript==
// @name           Nicotag Linker
// @namespace      http://unote.hatenablog.com/
// @description    ニコ動のタグに設定された動画IDをリンクとして抽出する
// @include        http://www.nicovideo.jp/watch/*
// @grant none
// ==/UserScript==

(function() {
  const VERSION = "1.0.1";
  const JUMP_TEXT = "[動画へのリンク] ";

  //Flash版
  var vheader = document.getElementById("videoMenuWrapper");
  var tags = document.getElementsByClassName("videoHeaderTagLink");
  var relPath = "watch/";

  //HTML5版
  if (vheader == null) {
    vheader = document.getElementsByClassName("MainContainer")[0];
    tags = document.getElementsByClassName("TagItem-name");
    relPath = "";
  }

  var jumpDiv = document.createElement("div");
  jumpDiv.textContent = JUMP_TEXT;

  for (var i = 0; i < tags.length; i++) {
    if (/([sn]m\d+)/.test(tags[i].textContent)) {
      var jumpLink = document.createElement("a");
      jumpDiv.appendChild(jumpLink);
      jumpLink.text = tags[i].textContent;
      jumpLink.href = relPath + RegExp.$1;
      jumpLink.style.marginRight = "1em";
    }
  }
  vheader.parentNode.insertBefore(jumpDiv, vheader);
})();
