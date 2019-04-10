//Function to refresh the list (used for Update button and executed on login/logout) -->
function updateList(user) {
    if (user) {
        let listRef = firebase.database().ref("users/" + user.uid + '/list');
        listRef.once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let jsonItem = childSnapshot.val();
                let retreivedName = jsonItem['itemName'];
                let retreivedDate = jsonItem['actualExpiry'];
                var retreivedExpire = jsonItem['isExpired'];
                let itemId = childSnapshot.key;
                dateCompare(retreivedDate, itemId, user.uid, retreivedName, retreivedExpire);
                addItemElement(itemId, retreivedName, retreivedDate);
            });
        });
    }
}

//Function that appends a new list item based on the #template (must generate unique id before using)
function addItemElement(uniqueId, itemName, expiryDate) {
    $("#template").clone().css("display", "flex").attr('id', uniqueId).prependTo("#item-container");
    $("#" + uniqueId + " .list-item-name").append(itemName);
    $("#" + uniqueId + " .list-item-date").append(expiryDate);
    $("#" + uniqueId + " .remove-button").attr("id", uniqueId);
    $("#anchorbottom").focus().val('');
    //Event handler for remove item button
    $(".remove-button").click(function () {
        let id = $(this).attr('id');
        $("#" + id).remove();
        let user = firebase.auth().currentUser;
        firebase.database().ref("users/" + user.uid + "/list/").child(id).remove();
    });
}

//Function that calculates the expiry date of a given item
function updateExpiry(itemId, itemName, callback) {
    let itemObj = createItem(itemName);
    let expiryDate;
    let dbRef = firebase.database().ref("static/" + itemName).child("expires");
    dbRef.once("value").then(function (snap) {
        console.log(snap.val());
        expiryDate = addDays(itemObj.date, parseInt(snap.val()))
        expiryDate = (expiryDate.getMonth() + 1) + '/' + expiryDate.getDate() + "/" + expiryDate.getFullYear();
        console.log("The added items expiry Date: " + expiryDate);
        callback(itemId, itemName, expiryDate);
    });
    return expiryDate;
}

//Function that adds a new list item div and updates the firebase list with a new item
function addNewItem(itemId, itemName, itemExpiry) {
    //Add the visual div component to the page
    addItemElement(itemId, itemName, itemExpiry);

    //Add item information to the database
    let user = firebase.auth().currentUser;
    if (user) {
        firebase.database().ref("users/" + user.uid + "/list/" + itemId).update({
            "itemName": itemName,
            "actualExpiry": itemExpiry
        });
    }
}

//Event handler for item choices that uses addItemElement function
$(".choice").click(function () {
    let newId = 'id' + Date.now();
    let pulledName = $(this).text();

    //Using callback to make sure updateExpiry is called before addNewItem
    updateExpiry(newId, pulledName, addNewItem);
});

//Function that calculates if food is expired... Now adds expiring of fb for inbetween step-->
function dateCompare(itemExpiryDate, itemId, user, itemName, retIsExpired) {
    let today = new Date().setHours(0, 0, 0, 0);
    let expiry = new Date(itemExpiryDate);
    let item = "#" + itemId;
    let datePast = today >= expiry;
    if (datePast) {
        $(document).ready(function () {
            $(item + " .list-item-entry").attr('class', 'list-item-entry expired-list-item-entry');
        });
    }
    if (datePast && retIsExpired != "expired") {
        firebase.database().ref("users/" + user + "/list/" + itemId).update({
            "isExpired": "expired"
        });
        var databaseRef = firebase.database().ref('users').child(user).child('expiredList').child(itemName);
        databaseRef.transaction(function (numExpired) {
            return (numExpired || 0) + 1;
        });
    }
}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        updateList(user);
    }
});