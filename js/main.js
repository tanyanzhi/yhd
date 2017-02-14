$(function(){
	
	// main-ad tab
	(function(){
		
		var mainAd = $('#main .main-ad');
		var oCon = mainAd.find('.content').eq(0);
		
		var iX = 0;
		var iNow = 0;
		var oTimer;
		var iW = mainAd.width();
		var oNav = mainAd.find('nav');
		var aNav = mainAd.find('nav a');
		var iStartTouchX = 0;
		var iStartX = 0;
		var iDis = 0;
		var isMove = false;
		
		oCon.append(oCon.html());
		
		var len = oCon.children().length;
		
		function auto(){
			
			oTimer = setInterval(function(){
				
				if(iNow == len - 1){
					oCon.css('transition', 'none');
					iNow = aNav.length - 1;
					oCon.css('-webkit-transform', "translateX(" + (-iNow * iW) + "px)");
					oCon.css('transform', "translateX(" + (-iNow * iW) + "px)");
					oCon.css('left');
					
				}
				
				iNow++;
				tab();
				
			}, 2000);
			
		}
		
		auto();
		
		
		function tab (){
			
			iX = -iNow * iW;
			oCon.css('transition', '0.5s');
			
			oCon.css('-webkit-transform', "translateX(" + iX + "px)");
			oCon.css('transform', "translateX(" + iX + "px)");
			aNav.removeClass('active').eq(iNow%aNav.length).addClass('active');
			
		}
		
		oCon.on('touchstart', function(ev){
			
			clearInterval(oTimer);
			oCon.css('transition', 'none');
			
			if(iNow <= 0) {
				
				iNow = aNav.length;
				oCon.css('-webkit-transform', "translateX(" + (-iNow * iW) + "px)");
				oCon.css('transform', "translateX(" + (-iNow * iW) + "px)");
			}
			
			if(iNow >= len - 1){
				
				iNow = aNav.length - 1;
				oCon.css('-webkit-transform', "translateX(" + (-iNow * iW) + "px)");
				oCon.css('transform', "translateX(" + (-iNow * iW) + "px)");
			}
			
			ev = ev.changedTouches[0];
			iStartTouchX = ev.pageX;
			iX = oCon.position().left;
			iStartX = iX;
			
			isMove = false;
			
		});
		
		oCon.on('touchmove', function(ev){
			
			ev = ev.changedTouches[0];
			iDis = ev.pageX - iStartTouchX;
			iX = iStartX + iDis;
			oCon.css('-webkit-transform', "translateX(" + iX + "px)");
			oCon.css('transform', "translateX(" + iX + "px)");
			isMove = true;
			
		});
		
		oCon.on('touchend', function(ev){
			
			if(isMove == false){
				
				return;
				
			}
			
			var tmp = -iX / iW;
			
			tem = tmp - iNow;
			
			
			if(Math.abs(tem) > 0.2) {
				
				if(iDis > 0) {
					
					iNow--;
					
				}else {
					
					iNow++;
					
				}
				
				
			}
			
			tab();
			auto();
			
		});
			
		
	})();
	
	//count down
	(function(){
		
		var curDate = new Date();
		var targetDate = new Date(curDate.getTime() + 24 * 3600 * 1000);
		var remain;
		var hour;
		var min;
		var sec;
		var timer;
		var delta;
		
		function countDown(){
			
			delta = targetDate.getTime() - new Date().getTime();
			if(delta <= 0){
				
				//count down over, stop
				clearInterval(timer);
				return;
				
			}
			remain = delta/1000;
			hour = parseInt(remain/3600);
			remain %= 3600;
			min = parseInt(remain/60);
			remain %= 60;
			sec = parseInt(remain);
			
			$('#count-down-1').find('.hour').text(supplyZero(hour));
			$('#count-down-1').find('.min').text(supplyZero(min));
			$('#count-down-1').find('.sec').text(supplyZero(sec));
			
		}
		
		timer = setInterval(countDown, 1000);
		
		function supplyZero(num){
			
			if(num < 10){
				
				num = '0' + num;
				
			}
			
			return num;
			
		}
		
		
	})();
	
	//back top
	(function(){
		
		var oMain = $('#main');
		var oBackTop = $('#back-top');

		oMain.on('scroll', function(){
			
			if(oMain.scrollTop() > 730){
				
				oBackTop.show();
				
			}else {
				
				oBackTop.hide();
				
			}
			
		});
		
		oBackTop.on('click', function(){
			
			oMain.scrollTop(0);
			
		});
		
	})();
	
	//search largen
	(function(){
		
		var oMain = $('#main');
		var iLogoML = $('#header .logo').css('marginLeft');
		var iLogoW = parseInt($('#header .logo').css('width'));
		var iHeaderAreaML = $('#header .header-area').css('marginLeft');
		var iHeaderAreaW = parseInt($('#header .header-area').css('width'));
		var iFormW = parseInt($('#header form').width());
		
		oMain.on('scroll', function(){

			if($(this).scrollTop() > 0){
				
				$('#header .logo').addClass('small');
				$('#header .header-area').addClass('small');
				$('#header form').addClass('large');
				
			}else {
				
				
				$('#header form').removeClass('large');
				$('#header .logo').removeClass('small');
				$('#header .header-area').removeClass('small');
					
				
			}
			
		})
		
	})();
	
	//app bar
	(function(){
		
		var oMain = $('#main');
		var oTop = $('#top');
		var oHeader = $('#header');
		var oMain = $('#main');
		var iHeaderTop = oTop.height();
		var iMainTop = oHeader.height() + oTop.height();
		var closedFlag = false;
		
		oMain.on('scroll', function(){
			
			if(closedFlag) {
				
				return;
				
			}
			
			if($(this).scrollTop() > 0){
				
				oTop.hide();
				oHeader.css('top', 0);
				oMain.css('top', oHeader.height());
				
			}else {
				
				oTop.show();
				oHeader.css('top', iHeaderTop);
				oMain.css('top', iMainTop);
				
			}
			
		});
		
		oTop.find('.close').on('click', function(){
			
			oTop.hide();
			oHeader.css('top', 0);
			oMain.css('top', oHeader.height());
			closedFlag = true;
			
		});
		
	})();
	

})
