var exday;
function createItem(addName){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var year = today.getFullYear();
  var myItem = {
    "name": addName,
    "number": 1,
    "date": mm + '/' + dd + '/' + year,
    "added": true,
    "expired": false,
    "deleted": false
  }
  return myItem;
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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