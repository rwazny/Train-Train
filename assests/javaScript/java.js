// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWPGsLQ9Z40uzpxHHr3PPy0u6-CE642x8",
  authDomain: "trainx2-a0f0e.firebaseapp.com",
  databaseURL: "https://trainx2-a0f0e.firebaseio.com",
  projectId: "trainx2-a0f0e",
  storageBucket: "trainx2-a0f0e.appspot.com",
  messagingSenderId: "834443592998"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = "";

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  //prevent page from refreshing
  event.preventDefault();

  // Grabs Train input
  trainName = $("#train-name-input")
    .val()
    .trim();
  trainDestination = $("#destination-input")
    .val()
    .trim();
  // Using Military Time
  firstTrain = moment(
    $("#frequency-input")
      .val()
      .trim(),
    "DD/MM/YY"
  ).format("X");
  trainFrequency = $("#frequency-min-input")
    .val()
    .trim();

  database.ref().set({
    trainName: name,
    trainDestination: trainDestination,
    firstTrain: firstTrain,
    trainFrequency: trainFrequency
  });
});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {
  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().train);
  console.log(snapshot.val().frequency);

  // Change the HTML to reflect entered
  $("#train-name-display").html(snapshot.val().name);
  $("#destination-display").html(snapshot.val().destination);
  $("#frequency-display").html(snapshot.val().train);
  $("#frequency-min-display").html(snapshot.val().frequency);

  // Store everything into a variable for next Train.
  var trainName = snapshot.val().name;
  var trainDestination = snapshot.val().destination;
  var firstTrain = snapshot.val().train;
  var trainFrequency = snapshot.val().frequency;

  // Uploads train data to the database
  database.ref().push(trainName);

  // Logs everything to console
  console.log(trainName.name);
  console.log(trainDestination.destination);
  console.log(firstTrain.train);
  console.log(trainFrequency.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#frequency-min-input").val("");
});

// Store everything into a variable.
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().train;
var trainFrequency = childSnapshot.val().frequency;

// Creates local "temporary" object for holding  data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  train: firstTrain,
  frequency: trainFrequency
};
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Employee Info
  // console.log(trainName);
  // console.log(trainDestination);
  // console.log(firstTrain);
  //console.log(trainFrequency);

  // Add each train's data into the table
  $("#add-train-table > tbody").append(
    "<tr><td>" +
      trainName +
      "</td><td>" +
      trainDestination +
      "</td><td>" +
      firstTrain +
      "</td><td>" +
      trainFrequency +
      "</td><td>"
  );
});
