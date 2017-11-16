var products;

// use fetch to retrieve it, and report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch('json/products.json').then(function(response) {
    if(response.ok) {
      response.json().then(function(json) {
        products = json;
        initialize();
      });
    } else {
      console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    }
});

// sets up the app logic, declares required variables, contains all the other functions
function initialize() {
  // grab the UI elements that we need to manipulate
    var category = document.querySelector('#category');
    var brand = document.querySelector('#brand');
    var searchTerm = document.querySelector('#searchTerm');
    var searchBtn = document.querySelector('.find');
    var mainDiv = document.querySelector('.mainproduct');

  // keep a record of what the last category and search term entered were
  var lastCategory = category.value;
  var lastSearch = searchTerm.value;
  var lastBrand = brand.value;

  // these contain the results of filtering by category, and search term
  // finalGroup will contain the products that need to be displayed after
  // the searching has been done. Each will be an array containing objects.
  // Each object will represent a product
  var brandGroup;
  var categoryGroup;
  var finalGroup;

  // To start with, set finalGroup to equal the entire products database
  // then run updateDisplay(), so ALL products are displayed initially.
  finalGroup = products;
  updateDisplay();

  // Set both to equal an empty array, in time for searches to be run
  brandGroup = [];
  categoryGroup = [];
  finalGroup = [];

  // when the search button is clicked, invoke selectCategory() to start
  // a search running to select the category of products we want to display
  category.onchange = selectCategory;
  searchBtn.onclick = selectCategory;
  brand.onchange = selectCategory;

  function selectCategory(e) {
    // Use preventDefault() to stop the form submitting — that would ruin
    // the experience
    e.preventDefault();

    // Set these back to empty arrays, to clear out the previous search
    brandGroup = [];
    categoryGroup = [];
    finalGroup = [];

    // if the category and search term are the same as they were the last time a
    // search was run, the results will be the same, so there is no point running
    // it again — just return out of the function
    if(category.value === lastCategory && searchTerm.value === lastSearch) {
      return;
    } else {
      // update the record of last category and search term
      lastCategory = category.value;
      lastSearch = searchTerm.value;
      // In this case we want to select all products, then filter them by the search
      // term, so we just set categoryGroup to the entire JSON object, then run selectProducts()
      if(category.value === 'All') {
        categoryGroup = products;
        selectProducts();
      // If a specific category is chosen, we need to filter out the products not in that
      // category, then put the remaining products inside categoryGroup, before running
      // selectProducts()
      } else {
        // the values in the <option> elements are uppercase, whereas the categories
        // store in the JSON (under "type") are lowercase. We therefore need to convert
        // to lower case before we do a comparison
        var lowerCaseType = category.value.toLowerCase();
        for(var i = 0; i < products.length ; i++) {
          // If a product's type property is the same as the chosen category, we want to
          // dispay it, so we push it onto the categoryGroup array
          if(products[i].type === lowerCaseType) {
            categoryGroup.push(products[i]);
          }
        }
        // Run selectProducts() after the filtering has bene done
        selectProducts();
      }
    }

    if (brand.value === lastBrand) {
      return;
    }else{
      lastBrand = brand.value;
      if(brand.value === 'All brands'){
        brandGroup = products;
        selectProducts();
      }else{
        var lowercaseBrand = brand.value.toLowerCase();
        for(var i=0; i< products.length; i++){
          if(products[i].brand === lowercaseBrand){
            brandGroup.push(products[i]);
          }
        }
        selectCategory();
      }
    }
  }

  // selectProducts() Takes the group of products selected by selectCategory(), and further
  // filters them by the tnered search term (if one has bene entered)
  function selectProducts() {
    // If no search term has been entered, just make the finalGroup array equal to the categoryGroup
    // array — we don't want to filter the products further — then run updateDisplay().
    if(searchTerm.value === '') {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      // Make sure the search term is converted to lower case before comparison. We've kept the
      // product names all lower case to keep things simple
      var lowerCaseSearchTerm = searchTerm.value.toLowerCase();
      // For each product in categoryGroup, see if the search term is contained inside the product name
      // (if the indexOf() result doesn't return -1, it means it is) — if it is, then push the product
      // onto the finalGroup array
      for(var i = 0; i < categoryGroup.length ; i++) {
        if(categoryGroup[i].productname.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }

      // run updateDisplay() after this second round of filtering has been done
      updateDisplay();
    }

  }

  // start the process of updating the display with the new set of products
  function updateDisplay() {
    // remove the previous contents of the <main div> element
    while (mainDiv.firstChild) {
      mainDiv.removeChild(mainDiv.firstChild);
    }

    // if no products match the search term, display a "No results to display" message
    if(finalGroup.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No product to display!';
      para.style.display = 'red';
      mainDiv.appendChild(para);
    // for each product we want to display, pass its product object to fetchBlob()
    } else {
      for(var i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]); 
      }
    }
  }

  // fetchBlob uses fetch to retrieve the image for that product, and then sends the
  // resulting image display URL and product object on to showProduct() to finally
  // display it
  function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    var url = 'images/' + product.image;
    // Use fetch to fetch the image, and convert the resulting response to a blob
    // Again, if any errors occur we report them in the console.
    fetch(url).then(function(response) {
      if(response.ok) {
        response.blob().then(function(blob) {
          // Convert the blob to an object URL — this is basically an temporary internal URL
          // that points to an object stored inside the browser
          objectURL = URL.createObjectURL(blob);
          // invoke showProduct
          showProduct(objectURL, product);
        });
      } else {
        console.log('Network request for "' + product.productname + '" image failed with response ' + response.status + ': ' + response.statusText);
      }
    });
  }

  // Display a product inside the <main> element
  function showProduct(objectURL, product) {
    var section = document.createElement('section');
      var link = document.createElement('a');
      var divimg = document.createElement('div');
      var divinfo = document.createElement('div');
      var image = document.createElement('img');
      var spn1 = document.createElement('span');
      var spn2 = document.createElement('span');
      var br = document.createElement('br');
      spn1.setAttribute('class','namepd');
      spn1.textContent = product.productname.replace(product.productname.charAt(0), product.productname.charAt(0).toUpperCase());
      spn2.setAttribute('class','pricepd');
      spn2.textContent = 'USD $' + product.price;
      section.setAttribute('class','product8');
      divinfo.setAttribute('class','productinfo');
      divimg.setAttribute('class','pic');
      link.setAttribute('href','#');

      image.src = objectURL;
      image.alt = product.productname;

      mainDiv.appendChild(section);
      section.appendChild(link);
      link.appendChild(divimg);
      link.appendChild(divinfo);
      divimg.appendChild(image);
      divinfo.appendChild(spn1);
      divinfo.appendChild(br);
      divinfo.appendChild(spn2);
  }
}