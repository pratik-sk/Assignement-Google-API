function initMap() {
  //Map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 18.5204,lng:73.8567},
    gestureHandling: 'greedy',
    zoomControl: false
  });
  //Geocode
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit-input-txt').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
    document.getElementById('submit-input-txt').disabled = 'true';
  });
}

//Create array of enterpruner object
var enterpreunerArray=[];   
var latLang=["Latitude","Longitude"];   
var markerArray=[];

//create Enterpreuner object

function createArrayObject(){
  var csvtxt = (document.getElementById('enterpreuner').value).split(",");
  for (var i = 0; i < csvtxt.length; i++) {
      var enterpreuner={};
      enterpreuner.Id=csvtxt[i];i++;
      enterpreuner.Company=csvtxt[i];i++;
      enterpreuner.Name=csvtxt[i];i++;
      enterpreuner.City=csvtxt[i];
      enterpreuner.Longitude='';
      enterpreuner.Latitude='';
      enterpreunerArray.push(enterpreuner);
  }
  console.log(enterpreunerArray);
}

function geocodeAddress(geocoder, resultsMap) {
  createArrayObject();
  var j=0;
  for (var i = 1; i < enterpreunerArray.length; i++) {
  	geocoder.geocode({'address': enterpreunerArray[i].City}, function(results, status) {
      if (status === 'OK') {
        console.log(i);
      	console.log("Longitude: "+results[0].geometry.viewport.b.b);
      	console.log("Latitude: "+results[0].geometry.viewport.f.b);
        resultsMap.setCenter(results[0].geometry.location);

        // latLang.push(results[0].geometry.viewport.f.b);
        // latLang.push(results[0].geometry.viewport.b.b);
        //console.log(latLang);
        //Place Marker on Map
        var marker = new google.maps.Marker({
          id:j,
          map: resultsMap,
          position: results[0].geometry.location,
          // label: {
          //     color: 'black',
          //     fontWeight: 'bold',
          //     text: "("+results[0].geometry.viewport.f.b.toFixed(2)+","+results[0].geometry.viewport.b.b.toFixed(2)+")"
          //   }
        });
        j++;

        // var infowindow = new google.maps.InfoWindow({
        //   content: "("+enterpreunerArray[j].Name+", Lat: "+results[0].geometry.viewport.f.b.toFixed(2)+" ,Long: "+results[0].geometry.viewport.b.b.toFixed(2)+")"
        // });
        // j++;
        // infowindow.open(map,marker);
        markerArray.push(marker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  } 
  createOptions();
}

//create lables for marker and show on map

function showLabels(){
  //document.getElementById('show-label-button').disabled = 'true';
  var checkboxes = document.getElementsByName('checkedvalues');
  var selected = [];
  for (var i=0; i<checkboxes.length; i++) {
      if (checkboxes[i].checked) {
          selected.push(checkboxes[i].value);
      }
  }

  for (var i = 1; i < enterpreunerArray.length; i++) {
    var labelContent="";
    for (var j = 0; j < selected.length; j++) {
       labelContent += enterpreunerArray[i][selected[j]];
       if(j!=selected.length-1){
        labelContent +=', ';
       }
    }
    var infowindow = new google.maps.InfoWindow({
        content: "("+labelContent+")"
      });
      infowindow.open(map,markerArray[i-1]);
  }
  createTable();
}

//create checkbos=x options for label dynamically

function createOptions(){
  var container= document.getElementById("show-label-container");
  var form=document.createElement("form");
  form.name="myform";

  var csvtxt = (document.getElementById('enterpreuner').value).split(",");
  for (var i = 0; i < 4; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.class="checkedvalues";
    checkbox.name = "checkedvalues";
    checkbox.value = csvtxt[i];
    checkbox.id = csvtxt[i];

    var label = document.createElement('label')
    label.htmlFor = "id";
    label.appendChild(document.createTextNode(csvtxt[i]));

    form.appendChild(checkbox);
    form.appendChild(label);
  }
  var input=document.createElement("input");
  input.setAttribute("type","button");
  input.setAttribute("id","show-label-button");
  input.setAttribute("class","submit-button");
  input.setAttribute("onclick","showLabels()");
  input.setAttribute("value","Show Lable");
  form.appendChild(input);
  container.appendChild(form);
}

//create Enterpreuner table dynamically

function createTable(){
  var p=document.createElement("p");
  p.setAttribute("class","enterpruner-table-title");
  p.appendChild(document.createTextNode("Enterpreuner Details: "));
  document.getElementById("enterpreuner-table-container").appendChild(p);
  var table = document.createElement("table");
  table.setAttribute("id","enterpreunerTable");
  var tr=document.createElement("tr");
  table.appendChild(tr);

  var csvtxt = (document.getElementById('enterpreuner').value).split(",");
  for (var i = 0; i < 4; i++) {
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(csvtxt[i]));
    tr.appendChild(th);
  }
  var th = document.createElement('th');
  th.appendChild(document.createTextNode("Remove Marker"));
  tr.appendChild(th);

  // var th=document.createElement("th");
  // th.appendChild(document.createTextNode(enterpreunerArray[0].Id));
  // tr.appendChild(th);
  // var th=document.createElement("th");
  // th.appendChild(document.createTextNode(enterpreunerArray[0].Company));
  // tr.appendChild(th);
  // var th=document.createElement("th");
  // th.appendChild(document.createTextNode(enterpreunerArray[0].Name));
  // tr.appendChild(th);
  // var th=document.createElement("th");
  // th.appendChild(document.createTextNode(enterpreunerArray[0].City));
  // tr.appendChild(th);

  for (var i = 1; i < enterpreunerArray.length; i++) {
    var tr=document.createElement("tr");
    table.appendChild(tr);
    var td=document.createElement("td");
    td.appendChild(document.createTextNode(enterpreunerArray[i].Id));
    tr.appendChild(td);
    var td=document.createElement("td");
    td.appendChild(document.createTextNode(enterpreunerArray[i].Company));
    tr.appendChild(td);
    var td=document.createElement("td");
    td.appendChild(document.createTextNode(enterpreunerArray[i].Name));
    tr.appendChild(td);
    var td=document.createElement("td");
    td.appendChild(document.createTextNode(enterpreunerArray[i].City));
    tr.appendChild(td);
    var td=document.createElement("td");
    var a=document.createElement("a");
    a.href="#";
    a.id=enterpreunerArray[i].Id;
    a.setAttribute("onclick","deleteMarkers("+enterpreunerArray[i].Id+")");
    a.appendChild(document.createTextNode("Remove"));
    td.appendChild(a);
    tr.appendChild(td);
  }
  document.getElementById("enterpreuner-table-container").appendChild(table);
}

//Remove marker from map 

 function deleteMarkers(id) {
    var marker = markerArray[id-1]; // find the marker by given id
    marker.setMap(null);
}