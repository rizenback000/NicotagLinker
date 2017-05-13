// ==UserScript==
// @name           Nicotag Linker
// @namespace      http://unote.hatenablog.com/
// @description    ニコ動のタグに設定された動画IDをリンクとして抽出する
// @include        http://www.nicovideo.jp/watch/*
// @version        1.1.1
// @grant GM_info
// ==/UserScript==

(function() {
  const JUMP_TEXT = "[動画へのリンク] ";

  //Flash版
  let relPath = "watch/";
  let vheader = document.getElementById("videoMenuWrapper");
  let tags = document.getElementsByClassName("videoHeaderTagLink");
  let obsTgt = document.getElementById("videoHeaderTagList");

  //HTML5版
  if (vheader == null) {
    vheader = document.getElementsByClassName("MainContainer")[0];
    tags = document.getElementsByClassName("TagItem-name");
    relPath = "";
    obsTgt = document.getElementsByClassName("TagList")[0];
  }

  //リンク生成
  function InitLinker() {
    const jumpId = GM_info.script.name + "_container";
    let jumpDiv = document.getElementById(jumpId);

    //既に作成済みなら一回削除してコンテナを作り直す
    if (jumpDiv != null) {
      jumpDiv.parentNode.removeChild(jumpDiv);
    }
    jumpDiv = document.createElement("div");
    jumpDiv.id = jumpId;

    for (let i = 0; i < tags.length; i++) {
      if (/([sn]m\d+)/.test(tags[i].textContent)) {
        const jumpLink = document.createElement("a");
        jumpLink.textContent = tags[i].textContent;
        jumpLink.href = relPath + RegExp.$1;
        jumpLink.style.marginRight = "1em";
        jumpDiv.appendChild(jumpLink);
      }
    }
    if (jumpDiv.childElementCount) {
      jumpDiv.insertBefore(document.createTextNode(JUMP_TEXT), jumpDiv.firstChild);
    }
    vheader.parentNode.insertBefore(jumpDiv, vheader);
  }

  //FLASH版はページ毎読み込まないのでMutationObserverでタグ更新を監視
  let refreshFlg = false;
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      refreshFlg = true;
    });

    if (refreshFlg) {
      InitLinker();
      refreshFlg = false;
    }
  });

  // オブザーバの設定
  const config = {
    attributes: true,
    childList: true,
    characterData: true
  };

  // 対象ノードとオブザーバの設定を渡す
  observer.observe(obsTgt, config);
  InitLinker();
  //observer.disconnect();
})();
