
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4Uzj52XM6nl-qytOAwidlIs7SeCv9yv4",
    authDomain: "train-scheduler-bcfdc.firebaseapp.com",
    databaseURL: "https://train-scheduler-bcfdc.firebaseio.com",
    projectId: "train-scheduler-bcfdc",
    storageBucket: "train-scheduler-bcfdc.appspot.com",
    messagingSenderId: "359553864010"
  };
  
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  //initial values
  var name = "";
  var dest = "";
  var time = "";
  var freq = "";

  $("#add-info").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = $("#time-input").val().trim();
    freq = $("#freq-input").val().trim();

    dataRef.ref().push({
      name: name,
      dest: dest,
      time: time,
      freq: freq,

    });
  });

  dataRef.ref().on("child_added", function(childSnapshot){

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    var start = moment(firstTrain, "hh:mm");

    var current = moment();

    var difference = moment().diff(moment(start), "minutes");

    var remainder = difference % frequency;

    var minutesAway = frequency - remainder;

    var nextTrain = moment().add(minutesAway, "minutes");

    $(".train-info").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" 
      + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");

  }, function(errorObject){
    console.log("Errors handled: " +errorObject.code);
  });


