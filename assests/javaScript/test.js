// Prettify the employee start
var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

// Calculate the months worked using hardcore math
// To calculate the months worked
var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
console.log(empMonths);

// Calculate the total billed rate
var empBilled = empMonths * empRate;
console.log(empBilled);
