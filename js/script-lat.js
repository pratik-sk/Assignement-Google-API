function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 18.5204,lng:73.8567},
    disableDefaultUI: true
  });
  var marker = new google.maps.Marker();

  document.getElementById('submitloc').addEventListener('click', function() {
    addMarker(marker, map);
  });
}

var enterpreunerArray=[];
var markerArray=[];

//create Enterpreuner object

function createArrayObject(){
  var csvtxt = (document.getElementById('enterpreuner').value).split(",");
  for (var i = 0; i < csvtxt.length; i++) {
      var enterpreuner={};
      enterpreuner.Id=csvtxt[i];i++;
      enterpreuner.Company=csvtxt[i];i++;
      enterpreuner.Name=csvtxt[i];i++;
      enterpreuner.City=csvtxt[i];i++;
      enterpreuner.Latitude=csvtxt[i];i++;
      enterpreuner.Longitude=csvtxt[i];
      enterpreunerArray.push(enterpreuner);
  }
  console.log(enterpreunerArray);
  createArrayObject=function(){};
}

function addMarker(marker, resultsMap) {
  createArrayObject();
  for (var i = 1; i < enterpreunerArray.length; i++) {
    var lati=parseInt(enterpreunerArray[i].Latitude);
    var long=parseInt(enterpreunerArray[i].Longitude);
    
    marker=new google.maps.Marker({
      position:{lat:lati,lng:long},
      map:resultsMap
    })
    markerArray.push(marker);
  }
   createOptions();
}

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
  showLabels=function(){};
}

function createOptions(){
  var container= document.getElementById("show-label-container");
  var txtpara=document.createElement("p");
  txtpara.appendChild(document.createTextNode("Select option show on Label:"));
  txtpara.setAttribute("class","selct-option-txt");
  container.appendChild(txtpara);
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

  createOptions=function(){};
}

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
  for (var i = 0; i < 6; i++) {
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
    td.appendChild(document.createTextNode(enterpreunerArray[i].Latitude));
    tr.appendChild(td);
    var td=document.createElement("td");
    td.appendChild(document.createTextNode(enterpreunerArray[i].Longitude));
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

  createTable=function(){};
}

//Remove marker from map 

 function deleteMarkers(id) {
    var marker = markerArray[id-1]; // find the marker by given id
    marker.setMap(null);
}