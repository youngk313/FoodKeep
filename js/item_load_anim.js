var myVar;

function waitToLoad() {
    myVar = setTimeout(showItems, 400);
}

function showItems() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("item-container").style.display = "block";
}