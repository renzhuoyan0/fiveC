window.onload=function(){
	var chessboard=document.getElementById('chessboard');
	var row=15,kaiguan=true,dict1={},dict2={};
	for (var i = 0; i < row; i++) {
		var hangxian=document.createElement('div');
		hangxian.style.width='600px';
		hangxian.style.height='1px';
		hangxian.style.position='absolute';
		hangxian.style.top=Math.floor( 600/row/2+600/row*i );
		hangxian.style.left='0';
		hangxian.style.background='#fff';
		chessboard.appendChild(hangxian);

		var shuxian=document.createElement('div');
		shuxian.style.height='600px';
		shuxian.style.width='1px';
		shuxian.style.position='absolute';
		shuxian.style.left=Math.floor( 600/row/2+600/row*i );
		shuxian.style.top='0';
		shuxian.style.background='#fff';
		chessboard.appendChild(shuxian);
	}
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < row; j++) {
			var chess=document.createElement('div');
			chess.setAttribute('class','chess');
			chess.setAttribute('id',i+'_'+j);

			wid=Math.floor(600/row)+'px';
			chess.style.width=wid;
			chess.style.height=wid;
			chessboard.appendChild(chess);
		}
	}
	var chesss=document.getElementsByClassName('chess');
	var win = document.getElementsByClassName("win")[0];
	for (var i = 0; i < chesss.length; i++) {
		chesss[i].onclick=function(){
			if(flag){
			var id=this.getAttribute('id');			
			if (this.hasAttribute('hascolor')) {
				return;
			}
			if (kaiguan) {
				this.style.background='url("./images/white.png")';
				// this.style.boxShadow='0 0 3px black';
				kaiguan=false;
				dict1[id]=true;
				if ( panduan(id,dict1) ) {
					win.style.display = 'block';
					win.innerHTML = '小月赢了!';
				}
			}else {
				this.style.background='url("./images/black.png")';
				// this.style.boxShadow='0 0 3px white';
				kaiguan=true;
				dict2[id]=true;
				if ( panduan(id,dict2) ) {
					win.style.display = 'block';
					win.innerHTML = '天明赢了!';
				}
			}
			this.setAttribute('hascolor','true');
			}
		};
	}

	var panduan=function(id,dict){
		var xx=Number(id.split('_')[0]);
		var yy=Number(id.split('_')[1]);
		var tx,ty;
		var zx=1;
		tx=xx;ty=yy;
		while(dict[(tx-1)+'_'+(ty+1)]){zx++;tx--;ty++;}
		tx=xx;ty=yy;
		while(dict[(tx+1)+'_'+(ty-1)]){zx++;tx++;ty--;}
		if (zx>=5) { return true;}

		var yx=1;
		tx=xx;ty=yy;
		while(dict[(tx-1)+'_'+(ty-1)]){yx++;tx--;ty--;}
		tx=xx;ty=yy;
		while(dict[(tx+1)+'_'+(ty+1)]){yx++;tx++;ty++;}
		if (yx>=5) { return true;}

		var shu=1;
		tx=xx;ty=yy;
		while(dict[(tx-1)+'_'+ty]){shu++;tx--;}
		tx=xx;ty=yy;
		while(dict[(tx+1)+'_'+ty]){shu++;tx++;}
		if (shu>=5) { return true;}

		var heng=1;
		tx=xx;ty=yy;
		while(dict[tx+'_'+(ty-1)]){heng++;ty--;}
		tx=xx;ty=yy;
		while(dict[tx+'_'+(ty+1)]){heng++;ty++;}
		if (heng>=5) { return true;}

	};
	var button1=document.getElementsByClassName('button1')[0];
	var button2=document.getElementsByClassName('button2')[0];
	var button3=document.getElementsByClassName('button3')[0];
	var flag = false;
	button1.onclick = function(){
		if(flag){
			flag = false;
			button1.innerHTML = "开始";
		}else{
			flag = true;
			button1.innerHTML = "暂停";
		}
	}
	button3.onclick = function(){
		for (var i = 0; i < chesss.length; i++) {
			chesss[i].style.background="none";
			chesss[i].removeAttribute("hascolor");
		}
		dict1=[];
		dict2 = [];
		kaiguan = true;
		win.style.display="none";
	}

	

};