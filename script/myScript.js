function myData()
{
	var xhrURL = 'json/data.json';
	var request = new XMLHttpRequest();
	request.open('GET', xhrURL);
	request.responseType = 'text';
	request.send();

	request.onload = function(){
		var dataText = request.response;
		var data = JSON.parse(dataText);
		sPark(data);
		mavicPro(data);
		phantomPro(data);
		pro1(data);
	}
	
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

	function mavicPro(data){
		var mavic = document.querySelectorAll('h2.mavic');
		for(var i=0; i<mavic.length ; i++){
			mavic[i].textContent = data.products[1].productname;
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
			spn1.textContent = data.products[1].function[0];
			spn2.textContent = data.products[1].function[1];
			spn3.textContent = data.products[1].function[2];
			spec[i].appendChild(spn1);
			spec[i].appendChild(spn2);
			spec[i].appendChild(spn3);
		}

		var des = document.querySelectorAll('.mdesc');
		for(var i=0; i<des.length; i++){
			des[i].textContent = data.products[1].description + '.';
		}

		var price = document.querySelectorAll('.mprice');
		for(var i=0;i<price.length; i++){
			price[i].textContent = 'USD $' + data.products[1].price;
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
	function pro1(data){
		var div = document.querySelectorAll('.productinfo');
		var spn1 = document.createElement('span');
		var spn2 = document.createElement('span');
		var att1 = document.createAttribute('class');
		att1.value = 'namepd';
		spn1.setAttributeNode(att1);
		var att2 = document.createAttribute('class');
		att2.value = 'pricepd';
		spn2.setAttributeNode(att2);

		spn1.textContent = data.products[3].productname;
		spn2.textContent = 'USD $' + data.products[3].price;

		div[0].appendChild(spn1);
		div[0].appendChild(spn2);

	}
}