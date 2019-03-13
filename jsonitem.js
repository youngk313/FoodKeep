
function createItem(addName){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var year = today.getFullYear();
  var exday = dd + 14;
  var myItem = {
    "name": addName,
    "number": 1,
    "date": dd + '/' + mm + '/' + year,
    "added": true,
    "expdate": exday + '/' + mm + '/' + year,
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