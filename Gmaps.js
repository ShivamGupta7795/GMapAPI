 


// function initMap() {
//   map = new google.maps.Map(document.getElementById('map_canvas'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }

var marker;
var markerone; //markers for pointing nearby locations
var map;
var defaultLoc= {lat: 21.0000 , lng: 78.0000};


// function disableCheck(){

// if(document.getElementById('country').value=='- Select category -'){

//     document.getElementById('AL1').disabled=true;
//     document.getElementById('city').disabled=true;
//     document.getElementById('state').disabled=true;
//     document.getElementById('AL2').disabled=true;
//     alert('please select country first');
//     return;
    
//   }
// }

// document.getElementById('country').addEventListener('change', enable);
//   function enable(){
//     document.getElementById('AL2').disabled=false;
//     document.getElementById('city').disabled=false;
//     document.getElementById('state').disabled=false;
//     document.getElementById('AL1').disabled=false;
    
//   }

//for locating nearby places
 function place_api(map, location){

  if(markerone){markerone.setVisible(false);}
  
  
  infowindow = new google.maps.InfoWindow();

  var request={location: location, radius: 2000, types: ['natural_feature', 'atm', 'airport', 'amusement_park', 'bank', 'casino', 'church', 'embassy', 'hindu_temple', 'train_station']};
  // var request1= request.prototype.types=['bank'];
  

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  return;
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
  	// var place_array="<ul>";
  	// var check=0;
    var i=0;
    for (i = 0; i < results.length; i++) {
    	// place_array += "<li>"+results[i].geometry.location+"</li>";
    	console.log(results[i]);

    	var arrAdd= results[i].address_components;

      if(results[i].types[0]=="atm"){
        document.getElementById('atm').innerHTML="atm available";
      }
     
    	if(results[i].types[0]=="bank"){
    		document.getElementById('bank').innerHTML="bank available";
    	}
    	

    	if(results[i].types[0]=="church"){
    		document.getElementById('church').innerHTML="church available";
    	}
    	

    	if(results[i].types[0]=="natural_feature"){
    		document.getElementById('natural_feature').innerHTML="beach available";
    	}
    	
      
      if(results[i].types[0]=="casino"){
        document.getElementById('casino').innerHTML="casino available";
      }
      

      if(results[i].types[0]=="embassy"){
        document.getElementById("embassy").innerHTML="embassy available";
      }
      // else{
      //   document.getElementById('embassy').innerHTML="embassy not available";
      // }

      if(results[i].types[0]=="airport"){
        document.getElementById("airport").innerHTML="airport available";
      }
      
      if(results[i].types[0]=="hindu_temple"){
        document.getElementById("hindu_temple").innerHTML="hindu temple available";
      }
      

      

      createMarker(results[i]);

    }
  }

  // place_array+="</ul>"
  // if(check==1){
  // document.getElementById('placeList').innerHTML="places available";
  // }

  // else{
  // 	document.getElementById('placeList').innerHTML="place not available";
  // }
}

function createMarker(place) {
	
  var placeLoc = place.geometry.location;
   markerone = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(markerone, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
 

function initMap(){
 window.map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: defaultLoc,
    zoom: 6
  });

 window.marker = new google.maps.Marker({
        map: window.map,
        position: defaultLoc,
        draggable:true,
        animation: google.maps.Animation.DROP
      });

 loadMap();

}





function loadMap() {
   
   var infoWindow = new google.maps.InfoWindow({map: window.map});
   var geocoder = new google.maps.Geocoder();
  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent(pos);
      // infoWindow.open();
      window.map.setCenter(pos);
      window.marker.setPosition(pos);

      place_api(window.map, pos);

      google.maps.event.addListener(window.marker, "dragend", function(){
      	var loc= this.position;
      	geocodeLatLng(geocoder, window.map, infoWindow, loc); 
      })

    }, function() {
      handleLocationError(true, infoWindow, window.map.getCenter());
    });
  } 

  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, window.map.getCenter());
  }

  

  document.getElementById('search').addEventListener('click', function(){
     // window.marker.setVisible(false);
       infoWindow.close();
	   geocodeAddress(geocoder, window.map);
  });

  

  

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
  
// function get_location(){

  	
//   	var al1=document.getElementById('AL1').value;
//     var al2=document.getElementById('AL2').value;
//     var city=document.getElementById('city').value;
//     var country=document.getElementById('country').value;

//   	if(al1&&al2&&city&&country||country&&city){
//    		geocodeAddress(geocoder, map);
//  }

//   else{
//   	document.getElementById("warning").innnerHTML="Please Enter correct location";
//   }

// }



function geocodeAddress(geocoder, resultsMap) {

  
	
	var al1=document.getElementById('AL1').value;
    var al2=document.getElementById('AL2').value;
    var city=document.getElementById('city').value;
    var state=document.getElementById('state').value;
    var country=document.getElementById('country').value;

	if(!al2){
		al2=" ";
	}
	if(!al1){
		al1=" ";
	}
	if(!state){
		state=" ";
	}

	var infoWindow = new google.maps.InfoWindow({map: resultsMap});
  
 
  var address = al1+","+al2+","+city+","+state+","+country;
  
  geocoder.geocode({'address': address}, function(results, status) {
    
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
       
       
       window.marker.setPosition(results[0].geometry.location);
       map.setZoom(15);
       infoWindow.setContent(results[0].formatted_address);
       infoWindow.open(resultsMap, marker);
      

      google.maps.event.addListener(window.marker,'dragend', function(){
      	infoWindow.close();
      	var loc=this.position;
  	  	geocodeLatLng(geocoder, resultsMap, infoWindow, loc);
 	 });

      place_api(resultsMap, results[0].geometry.location);
    } 

    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  

  
}

function geocodeLatLng(geocoder, map, infoWindow, loc) {
  
  // var latlngStr = latLng.split(',', 2);
  // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

  // if(document.getElementById('country').value=='Select Country'){

  //   document.getElementById('AL1').disabled=true;
  //   document.getElementById('city').disabled=true;
  //   document.getElementById('state').disabled=true;
  //   document.getElementById('AL2').disabled=true;
  //   alert('please select country first');
  //   return;
  // }
  // document.getElementById('country').addEventListener('change', enable);


  var latlng ={lat: loc.lat(), lng: loc.lng()};

  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
      	console.log(results[1]);
        map.setZoom(15);
        
        infoWindow.setContent(results[1].formatted_address);
        infoWindow.open(map, marker);

        var arrAddress = results[1].address_components;

        $.each(arrAddress, function (i, address_component) {
    	console.log('address_component:'+i);

    	if (address_component.types[0] == "sublocality_level_1"){
        console.log(i+": locality:"+address_component.long_name);
        document.getElementById('AL1').value = address_component.long_name;
    	}


    	if (address_component.types[0] == "locality"){
        console.log(i+": locality:"+address_component.long_name);
        document.getElementById('AL2').value = address_component.long_name;
    	}

    	if (address_component.types[0] == "administrative_area_level_2"){
        console.log("city:"+address_component.long_name);
        document.getElementById('city').value = address_component.long_name;
    	}

    	if (address_component.types[0] == "administrative_area_level_1"){ 
        console.log("state:"+address_component.long_name); 
        document.getElementById('state').value = address_component.long_name;
    	}

    	if (address_component.types[0] == "country"){ 
        console.log("country:"+address_component.long_name); 
        document.getElementById('country').value = address_component.long_name;
    	}

    	
    	//return false; // break the loop   
	});

        

 		place_api(map, latlng);

        google.maps.event.addListener(window.marker,'dragend', function(){
        	var loc= window.marker.position;
  	        geocodeLatLng(geocoder, map, infoWindow,loc);
 	    });

      } 

      else {
        window.alert('No results found');
      }
    }

     else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });

}

function changeValue(){
  // if(document.getElementById('AL1').value==" "||document.getElementById('AL1').value!=undefined){
  //   document.getElementById('one').value=document.getElementById('AL1').value;
  // }

  // if(document.getElementById('AL2').value==" "||document.getElementById('AL2').value!=undefined){
  //   document.getElementById('two').value=document.getElementById('AL2').value;
  // }

  // if(document.getElementById('city').value==" "||document.getElementById('city').value!=undefined){
  //   document.getElementById('three').value=document.getElementById('city').value;
  // }

  // if(document.getElementById('state').value==" "||document.getElementById('state').value!=undefined){
  //   document.getElementById('four').value=document.getElementById('state').value;
  // }

  // if(document.getElementById('country').value==" "||document.getElementById('country').value!=undefined){
  //   document.getElementById('five').value=document.getElementById('country').value;
  // }

  if(document.getElementById('AL1').value){
    document.getElementById('one').value=document.getElementById('AL1').value;
  }
if(document.getElementById('AL2').value){
    document.getElementById('two').value=document.getElementById('AL2').value;
  }

if(document.getElementById('city').value){
    document.getElementById('three').value=document.getElementById('city').value;
  }
 
 if(document.getElementById('state').value){
    document.getElementById('four').value=document.getElementById('state').value;
  }

if(document.getElementById('country').value){
    document.getElementById('five').value=document.getElementById('country').value;
  }

}