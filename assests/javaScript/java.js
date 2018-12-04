// Initialize Firebase
var config = {
  apiKey: "AIzaSyBG57R51kKeWdsawz1gUtvBRMeYCrmWJiA",
  authDomain: "train-train-4fd7f.firebaseapp.com",
  databaseURL: "https://train-train-4fd7f.firebaseio.com",
  projectId: "train-train-4fd7f",
  storageBucket: "train-train-4fd7f.appspot.com",
  messagingSenderId: "55476399185"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  //prevent page from refreshing
  event.preventDefault();

  // Grabs Train input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var trainDestination = $("#trainDestination-input")
    .val()
    .trim();
  // Using Military Time
  var firstTrain = moment(
    $("#trainFrequency-input")
      .val()
      .trim(),
    "DD/MM/YY"
  ).format("X");
  var trainFrequency = $("#trainFrequency-input")
    .val()
    .trim();
  console.log(trainFrequency);
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    train: firstTrain,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
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
  $("#train-destination-input").val("");
  $("#first-train-input").val("");
  $("#train-frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().train;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);

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
