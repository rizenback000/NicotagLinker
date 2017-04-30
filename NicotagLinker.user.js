// ==UserScript==
// @name           nicotag linker
// @namespace      http://unote.hatenablog.com/
// @description    ニコ動のタグに設定された動画IDをリンクとして抽出する
// @include        http://www.nicovideo.jp/watch/*
// @grant none
// ==/UserScript==

(function(){
	//Flash版
	var vheader = document.getElementById("videoMenuWrapper");
  var tags = document.getElementsByClassName("videoHeaderTagLink");
	//HTML5版
	if (vheader == null){
		vheader = document.getElementsByClassName("MainContainer")[0];
		tags = document.getElementsByClassName("TagItem-name");
	}

	var jump_div = document.createElement("div");
	jump_div.textContent = "[動画タグへのリンク] ";
	
	for(var i=0; i < tags.length; i++) {
		if( /([sn]m\d+)/.test(tags[i].textContent) ){
			var jump_link = document.createElement("a");
			jump_div.appendChild(jump_link);
			jump_link.text = tags[i].textContent;
			jump_link.href = "watch/" + RegExp.$1;
			jump_link.style.marginRight = "1em";
		}
	}
	vheader.parentNode.insertBefore(jump_div, vheader);
})();
