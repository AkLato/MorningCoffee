// Init Storage
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();
// Initialize weather object
const weather = new Weather(weatherLocation.city, weatherLocation.country);
// Init UI
const ui = new UI();



// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    // Change location
    weather.changeLocation(city, country);

    // Set location in LS
    storage.setLocationData(city, country);

    //  Get and display weather
    getWeather();
});

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
weather.getWeather()
    .then(results => {
        ui.paint(results);
    })
    .catch(err => console.log(err));
}

// Get price
const lblBtcPrice = document.querySelector('.BTCprice');
const lblEthPrice = document.querySelector('.ETHprice');
const lblZrxPrice = document.querySelector('.ZRXprice');
const lblBatPrice = document.querySelector('.BATprice');
const lblDaiPrice = document.querySelector('.DAIprice');



function getPrice(currentBtcPrice, currentEthPrice, currentBatPrice, currentZrxPrice, currentDaiPrice){
var currentBtcPrice = new XMLHttpRequest();
var currentEthPrice = new XMLHttpRequest();
var currentZrxPrice = new XMLHttpRequest();
var currentBatPrice = new XMLHttpRequest();
var currentDaiPrice = new XMLHttpRequest();

currentBtcPrice.open('GET', 'https://api.gdax.com/products/BTC-USD/book', true);
currentEthPrice.open('GET', 'https://api.gdax.com/products/ETH-USD/book', true);
currentBatPrice.open('GET', 'https://api.gdax.com/products/BAT-USDC/book', true);
currentZrxPrice.open('GET', 'https://api.gdax.com/products/ZRX-USD/book', true);
currentDaiPrice.open('GET', 'https://api.gdax.com/products/DAI-USDC/book', true);

currentBtcPrice.onreadystatechange = function(){
  if(currentBtcPrice.readyState == 4){
    var ticker = JSON.parse(currentBtcPrice.responseText);
    var price = ticker.bids[0][0];
	  price = toInteger(price);
    lblBtcPrice.innerHTML = "BTC - " + numberWithCommas(price) + " $";
  };
};
currentBtcPrice.send();

currentEthPrice.onreadystatechange = function(){
    if(currentEthPrice.readyState == 4){
      var ticker = JSON.parse(currentEthPrice.responseText);
      var price = ticker.bids[0][0];
        price = toInteger(price);
      lblEthPrice.innerHTML = "ETH - " + numberWithCommas(price) + " $";
    };
  };
currentEthPrice.send();

currentBatPrice.onreadystatechange = function(){
    if(currentBatPrice.readyState == 4){
      var ticker = JSON.parse(currentBatPrice.responseText);
      var price = ticker.bids[0][0];
      price = parseFloat(price).toFixed(3);
      lblBatPrice.innerHTML = "BAT - " + price + " $";
    };
  };
currentBatPrice.send();

currentZrxPrice.onreadystatechange = function(){
    if(currentZrxPrice.readyState == 4){
      var ticker = JSON.parse(currentZrxPrice.responseText);
      var price = ticker.bids[0][0];
      price = parseFloat(price).toFixed(3);
      lblZrxPrice.innerHTML = "ZRX - " + price + " $";
    };
  };
currentZrxPrice.send();

currentDaiPrice.onreadystatechange = function(){
    if(currentDaiPrice.readyState == 4){
      var ticker = JSON.parse(currentDaiPrice.responseText);
      var price = ticker.bids[0][0];
      price = parseFloat(price).toFixed(3);
      lblDaiPrice.innerHTML = "DAI - " + price + " $";
    };
  };
  
currentDaiPrice.send();

}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toInteger(number){ 
  return Math.round(  // round to nearest integer
    Number(number)    // type cast your input
  ); 
};

setInterval(getPrice, 2000);



// Reddit browser
$( "#submit" ).click(function()  {  
  formatTiles('#searchReddit');
});

function submit() {
  formatTiles('#searchReddit');
}

function formatTiles (id) {
    
    //get search term
    var value = '';
    if (id == '#searchReddit') {
      value = $('#searchReddit').val();
    } else {
      value = $(this).val();
    }
  
  //put URL together based on url
  var redditURL = "https://www.reddit.com/r/" + value + ".json?limit=50";

  //get the data
  $.ajax({
  url: redditURL,
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
    $('#thumbnails').html('<h2 class="loading">Loading <i class="fa fa-spinner" id="spin" aria-hidden="true"></i></h2>');
  }
})
  .done(function( data ) {
      
      let reddit = JSON.parse( data ),
          thumbnail = '',
          endDiv = '',
          thumbnailImage = '',
          url ='',
          lengthOfData = reddit.data.children.length;
      
      for (var i = 0; i < lengthOfData; i++) {
        //build url
        url = reddit.data.children[i].data.url;
        
        //if no thumbnail - we need a default image
        if (reddit.data.children[i].data.thumbnail.length < 8) {
          thumbnailImage = 'img/capture.png';
        } else {
          thumbnailImage = reddit.data.children[i].data.thumbnail;
        }
          
        //this builds the tiles
        thumbnail += '<a class="has-text-grey-lighter" href="' + url + '" target="_blank"><div class="post"></a>';
        thumbnail += '<img class="postImg" src="' + thumbnailImage+ '"/><div class="post-content"><a class="is-pulled-right" href="#"><i class="fas fa-comments fa-lg"></i></a><a class="has-text-grey-lighter" href="' + url + '><h2 class="post-title">' + reddit.data.children[i].data.title + '</h2></a><a class="" href="#"><i id="images" class="fas fa-chevron-up"></i></a></div></div></a>';
        thumbnail += endDiv;
      } 
      
     //display tiles 
      $('#thumbnails').html(thumbnail);
      
  }).fail(function () {
    $('#thumbnails').html("<h2>No Results. Try Again</h2>");
});
  
}

// Default set to F1 subreddit
$(function() {
  $('.default').click()
});

$('.redditExample').click(formatTiles);

$( "#searchReddit" ).keydown(function(event) {
  if (event.keyCode == 13) {
      submit();
  }
});

