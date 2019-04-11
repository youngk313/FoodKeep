firebase.auth().onAuthStateChanged(function (user) {
    var keysSorted = [];

    if (user) {

        let listRef = firebase.database().ref("users/" + user.uid + '/expiredList');
        listRef.once('value').then(function (snapshot) {
            var list = snapshot.val();
            try {
                keysSorted = Object.keys(list).sort(function (a, b) {
                    return list[b] - list[a]
                });
            } catch (err) {
                console.log("Not enough data");
            }
            if (keysSorted.length >= 5) {

                var ctx = document.getElementById('chart-0').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: [keysSorted[0], keysSorted[1], keysSorted[2], keysSorted[3], keysSorted[4]],
                        datasets: [{
                            data: [list[keysSorted[0]], list[keysSorted[1]], list[keysSorted[2]], list[keysSorted[
                                3]], list[keysSorted[4]]],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)'
                            ],
                            borderWidth: 3
                        }]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                          title: {
                            display: true,
                            fontSize: 18,
                            text: 'Your 5 most expired Items so far:'
                         },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                myChart.canvas.parentNode.style.height = '300px';
                myChart.canvas.parentNode.style.width = '600px';
                myChart.canvas.parentNode.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, .5)';
                myChart.canvas.parentNode.style.backgroundColor = 'rgba(255, 255, 255, .90)';
                document.getElementById('graphTitle').innerHTML = "MY <span id='greenWord'>FOOD</span> ACTIVITY";
            } else {
                document.getElementById('graphTitle').innerHTML = "<span id=\"greenWord\">PLEASE</span> TRY AGAIN LATER<br><small>Not enough data</small>";
            }
        });
    } else {
        document.getElementById('graphTitle').innerHTML = "<h1 style=\"color: grey; font-size:1.8em;\" id =\"page-heading\">Please Log In!</h1></br>";
    }
});