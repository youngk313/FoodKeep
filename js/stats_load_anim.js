var myVar;

function waitToLoad() {
    myVar = setTimeout(showGraph, 600);
}

function showGraph() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("graphTitle").style.display = "block";
}