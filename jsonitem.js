
function createItem(addName, exnum){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var year = today.getFullYear();
  var exday = dd + exnum;
  var myItem = {
    "name": addName,
    "number": 1,
    "date": year + mm + '-' + '-' + dd,
    "added": true,
    "expdate": year + mm + '-' + '-' + exday,
    "expired": false,
    "deleted": false
  }
  return myItem;
}

function changeExpDate(myItem, expirydate){
  myItem.expdate = expirydate;
}

function showCategories(){
  var sideBar = document.getElementbyId("buttonArea");
  sideBar.setAttribute("class", "buttonCatagory");
  var closeButton = document.createElement("div");
  closeButton.setAttribute("id", "closeIcon");
  closeButton.innerHTML = "<img src = \"Images/close_button.png\" alt = \"close\">";
}

function hideCategories(){
  var sideBar = document.getElementbyId("buttonArea");
  sideBar.setAttribute("class", "hiddenCategory");
  var openButton = document.createElement("div");
  openButton.setAttribute("id", "openIcon");
  openButton.innerHTML = "<img src = \"Images/add_button.png\" alt = \"add\">";
}

function calcExpDays(myItem){
  var today = new Date();
  var expDay = new Date(myItem.expdate);
  var diff = new Date(expDay - today);
  var millsec = 1000;
  var seconds = 60;
  var minutes = 60;
  var hours = 24;
  var numdays = Math.ceil(diff/millsec/seconds/minutes/hours);
  return numdays;
}