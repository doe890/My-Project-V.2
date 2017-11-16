
	function oPensignup(){
		var open = document.querySelector('#modalsignup');
		open.style.display = 'block';
	}
	function oPensignin(){
		var open = document.querySelector('#modalsignin');
		open.style.display = 'block';
	}
	function cLose(){
		var closeup = document.querySelector('#modalsignup');
		var closein = document.querySelector('#modalsignin');
		closeup.style.display = 'none';
		closein.style.display = 'none';
	}

	var data;
	var xhrURL = 'json/data.json';
	var request = new XMLHttpRequest();
	request.open('GET', xhrURL);
	request.responseType = 'text';

	request.onload = function(){
		if(request.status === 200){
			var dataText = request.response;
			data = JSON.parse(dataText);
			sPark(data);
			mavicPro(data);
			phantomPro(data);
		}else{
			console.log('Network request for products.json failed with response ' + request.status + ': ' + request.statusText)
		}
	};
	request.send();

	function sPark(dataspark){
		var spark = document.querySelectorAll('.spark');
		for(var i=0;i<spark.length;i++){
			spark[i].textContent = dataspark.products[0].productname;
		}
		var spec = document.querySelectorAll('.sspec');
		for(var i=0;i<spec.length ;i++){
			var spn1 = document.createElement('span');
			var spn2 = document.createElement('span');
			var spn3 = document.createElement('span');
			spn1.textContent = dataspark.products[0].function[0];
			spn2.textContent = dataspark.products[0].function[1];
			spn3.textContent = dataspark.products[0].function[2];
			spec[i].appendChild(spn1);
			spec[i].appendChild(spn2);
			spec[i].appendChild(spn3);
		}
		var des = document.querySelectorAll('.sdesc');
		for(var i=0; i<des.length ; i++){
			des[i].textContent = dataspark.products[0].description +'.';
		}
		var price = document.querySelectorAll('.sprice');
		for(var i=0; i<price.length; i++){
			price[i].textContent = 'USD $' + dataspark.products[0].price;
		}
	}

	function mavicPro(datamv){
		var mavic = document.querySelectorAll('h2.mavic');
		for(var i=0; i<mavic.length ; i++){
			mavic[i].textContent = datamv.products[1].productname;
			var spn = document.createElement('span');
			spn.style.color = '#eabc63';
			spn.textContent = ' pro';
			mavic[i].appendChild(spn);
		}

		var spec = document.querySelectorAll('.mspec');
		for(var i=0; i<spec.length ;i++){
			var spn1 = document.createElement('span');
			var spn2 = document.createElement('span');
			var spn3 = document.createElement('span');
			spn1.textContent = datamv.products[1].function[0];
			spn2.textContent = datamv.products[1].function[1];
			spn3.textContent = datamv.products[1].function[2];
			spec[i].appendChild(spn1);
			spec[i].appendChild(spn2);
			spec[i].appendChild(spn3);
		}

		var des = document.querySelectorAll('.mdesc');
		for(var i=0; i<des.length; i++){
			des[i].textContent = datamv.products[1].description + '.';
		}

		var price = document.querySelectorAll('.mprice');
		for(var i=0;i<price.length; i++){
			price[i].textContent = 'USD $' + datamv.products[1].price;
		}

	}
	function phantomPro(data){
		var pt = document.querySelectorAll('.phantom');
		for(var i=0; i<pt.length ; i++){
			pt[i].textContent = data.products[2].productname;
		}
		var spec = document.querySelectorAll('.pspec');
		for(var i=0; i<spec.length ; i++){
			var spn1 = document.createElement('span');
			var spn2 = document.createElement('span');
			var spn3 = document.createElement('span');
			spn1.textContent = data.products[2].function[0];
			spn2.textContent = data.products[2].function[1];
			spn3.textContent = data.products[2].function[2];
			spec[i].appendChild(spn1);
			spec[i].appendChild(spn2);
			spec[i].appendChild(spn3);
		}
		var des = document.querySelectorAll('.pdesc');
		for(var i=0;i<des.length;i++){
			des[i].textContent = data.products[2].description +'.';
		}
		var price = document.querySelectorAll('.pprice');
		for(var i=0;i<price.length;i++){
			price[i].textContent = 'USD $' + data.products[2].price;
		}
	}

	

	$(document).ready(function() {

		 time = setInterval(function(){
			$('.khua').trigger('click');
		},4000);


		$('.khua').click(function(event) {
			//clearInterval(time);
			var slidetoleft = $('.active').next();

			var vitri = $('.xanh').index() + 1;
			$('.sliderdot ul li').removeClass('xanh');
			if(vitri == $('.sliderdot ul li').length){
				vitri = 0;
			}
			$('.sliderdot ul li:nth-child('+(vitri+1)+')').addClass('xanh');


			if(slidetoleft.length == 0){
				$('.active').addClass('to-Left').one('webkitAnimationEnd', function(event) {
					$('.to-Left').removeClass('to-Left')
				});
				$('._1slider:first-child()').addClass('next-to-left').one('webkitAnimationEnd', function(event) {
					$('.active').removeClass('active');
					$('.next-to-left').addClass('active').removeClass('next-to-left');
				});
			}
			else{
				$('.active').addClass('to-Left').one('webkitAnimationEnd', function(event) {
					$('.to-Left').removeClass('to-Left')
				});
				slidetoleft.addClass('next-to-left').one('webkitAnimationEnd', function(event) {
					$('.active').removeClass('active');
					$('.next-to-left').addClass('active').removeClass('next-to-left');
				});
			}
		});

		$('.sai').click(function(event) {
			var slidetoright = $('.active').prev();

			//process in dot bottom
			var vitri = $('.xanh').index() + 1;
			$('.sliderdot ul li').removeClass('xanh');
			if(vitri == 1 ){
				vitri = $('.sliderdot ul li').length + 1;
			}
			$('.sliderdot ul li:nth-child('+(vitri - 1)+')').addClass('xanh');

			//process for left arrow
			if(slidetoright.length == 1){
				$('.active').addClass('to-Right').one('webkitAnimationEnd', function(event) {
					$('.to-Right').removeClass('to-Right')
				});
				slidetoright.addClass('next-to-right').one('webkitAnimationEnd', function(event) {
					$('.active').removeClass('active');
					$('.next-to-right').addClass('active').removeClass('next-to-right');
				});
			}else{
				$('.active').addClass('to-Right').one('webkitAnimationEnd', function(event) {
					$('.to-Right').removeClass('to-Right')
				});
				$('._1slider:last-child()').addClass('next-to-right').one('webkitAnimationEnd', function(event) {
					$('.active').removeClass('active');
					$('.next-to-right').addClass('active').removeClass('next-to-right');
				});
			}
		});

		$('.sliderdot ul li').click(function(event) {
			$('.sliderdot ul li').removeClass('xanh');
			$(this).addClass('xanh');

			//remove current active
			$('.active').addClass('to-Left').one('webkitAnimationEnd', function(event) {
					$('.to-Left').removeClass('to-Left')
			});

			
			$('._1slider:nth-child('+($(this).index()+1)+')').addClass('next-to-left').one('webkitAnimationEnd', function(event) {
					$('.active').removeClass('active');
					$('.next-to-left').addClass('active').removeClass('next-to-left');
			});
		});
	});