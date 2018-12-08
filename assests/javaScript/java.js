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
var trainName, trainDestination, firstTrain, trainFrequency;

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
  firstTrain = $("#frequency-input")
    .val()
    .trim();
  trainFrequency = $("#frequency-min-input")
    .val()
    .trim();
  console.log(trainName);

  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    firstTrain: firstTrain,
    trainFrequency: trainFrequency
  });
});

// Firebase watcher + initial loader HINT: .on("value")
firebase
  .database()
  .ref()
  .on("value", function(snapshot) {
    // Log everything that's coming out of snapshot
    //console.log(snapshot.val());
    //console.log(snapshot.val().name);
    //console.log(snapshot.val().destination);
    //console.log(snapshot.val().train);
    //console.log(snapshot.val().frequency);

    // Change the HTML to reflect entered
    $("#train-name-display").text(snapshot.val().trainName);
    $("#destination-display").text(snapshot.val().trainDestination);
    $("#frequency-display").text(snapshot.val().firstTrain);
    $("#frequency-min-display").text(snapshot.val().trainFrequency);

    // Store everything into a variable for next Train.
    trainName = snapshot.val().trainName;
    trainDestination = snapshot.val().trainDestination;
    firstTrain = snapshot.val().firstTrain;
    trainFrequency = snapshot.val().trainFrequency;

    // Add each train's data into the table

    var body = $("tbody");
    var row = $("<tr>");
    var name = $("<td>").text(trainName);
    var destination = $("<td>").text(trainDestination);
    var dateAdded = $("<td>").text(dateAdded);

    row.append(name, destination);
    body.append(row);
  });

// Logs everything to console
//console.log(trainName.name);
//console.log(trainDestination.destination);
//console.log(firstTrain.train);
//console.log(trainFrequency.frequency);

// Alert
alert("Train successfully added");
{
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#frequency-min-input").val("");
}

// Child Values
var childtrainName = "";
var childtrainDestination = "";
var firstTrain = "";
var trainFrequency = "";

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
firebase
  .database()
  .ref()
  .on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Creates local "temporary" object for holding  data
    childTrain = {
      name: trainName,
      destination: trainDestination,
      train: firstTrain,
      frequency: trainFrequency
    };

    // Store everything into a variable.
    childtrainName = childSnapshot.val().name;
    childtrainDestination = childSnapshot.val().destination;
    childfirstTrain = childSnapshot.val().train;
    childtrainFrequency = childSnapshot.val().frequency;

    // Employee Info
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(firstTrain);
    //console.log(trainFrequency);
  });
