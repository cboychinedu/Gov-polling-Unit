// Debug
console.log("Working")

// Getting all the dom elements
let view_polling_unit_btn = document.getElementById("view_polling_unit");
let summed_total_results_main_btn = document.getElementById("summed_total_results_main");
let summed_total_results_min_btn = document.getElementById("summed_total_results");
let view_announced_polling_units_btn = document.getElementById("view_announced_polling_units_result");
let store_all_result_for_parties_btn = document.getElementById("store_all_result_for_parties");


// Adding an event listener to listen for click
view_polling_unit_btn.addEventListener("click", (event) => {
    // Execute this block of code if the user clicked on the "view_polling_unit" button
    // Using ajax
    location.href = "/polling_units_results"
});

// Adding an event listener to listen for clicking the summed_total_results main btn
summed_total_results_main_btn.addEventListener("click", (event) => {
    // Execute this block of code if the user clicked on the summed total result
    location.href = "/summed_total_results"
});

// Adding an event listener to listen for clicking the summed_total_results min btn
summed_total_results_min_btn.addEventListener("click", (event) => {
    // Execute this block of code if the user clicked on the summed total result
    location.href = "/summed_total_results"
});

// Adding an event listener to listen for click events
view_announced_polling_units_btn.addEventListener("click", (event) => {
    // Execute this block of code if the user clicked on the view announced polling UNITS
    // Button
    location.href = "/announced_polling_unit_results";
});
