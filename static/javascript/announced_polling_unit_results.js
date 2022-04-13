// // DEBUG:
console.log('Working!');

// Get some necesary dom elements
let result_id = document.getElementById("result_id");
let polling_unit_uniqueid = document.getElementById("polling_unit_uniqueid");
let party_abbreviation = document.getElementById("party_abbreviation");
let party_score = document.getElementById("party_score");
let entered_by_user = document.getElementById("entered_by_user");
let date_entered = document.getElementById("date_entered");
let user_ip_address = document.getElementById("user_ip_address");
let flash_message_value = document.getElementById("flash_message_value");
let flash_message_div = document.getElementById("flash_message_div");

result_id.addEventListener("click", (event) => {
    // If the user moves the mouse
    flash_message_div.style.display = "none";
});

// Getting the dom element for the submit button
let submit_btn = document.getElementById("submit_btn");

// Adding an event listener to listen for click event by the submit button
submit_btn.addEventListener("click", (event) => {
    // Execute the block of code below if the user click on the submit button
    result_id_value = result_id.value || "null" ;
    polling_unit_uniqueid_value = polling_unit_uniqueid.value || "null";
    party_abbreviation_value = party_abbreviation.value || "null";
    party_score_value = party_score.value || "null";
    entered_by_user_value = entered_by_user.value || "null";
    date_entered_value = date_entered.value || "null";
    user_ip_address_value = user_ip_address.value || "null";

    // Converting the data gotten from the user into to an input field
    dataValue = {
      result_id: result_id_value, polling_unit_uniqueid: polling_unit_uniqueid_value,
      party_abbreviation: party_abbreviation_value, party_score: party_score_value,
      entered_by_user: entered_by_user_value, date_entered: date_entered_value,
      user_ip_address: user_ip_address_value
    }

    dataValue = JSON.stringify(dataValue);

    // Using ajax to send the data into the database
    $.ajax({
        // Setting the configurations
        type: "POST",
        url: "/store_all_result_for_polling_units_parties",
        crossDomain: true,
        contentType: "application/json",
        data: dataValue
    })
    // On success, or error, execute the code block below
    .done((data, textStatus, request) => {
        // Getting the respond status from the json data
        let respond_status = data["data"]["data"];
        let respond_message = data["data"]["message"];

        // If the responded status was success, execute the block of
        // code below
        if (respond_status === "success") {
            // Reload the page
            flash_message_div.className = "success_message_div";
            flash_message_div.style.display = "grid";
            flash_message_value.innerText = respond_message;

        }

        // If the responded status was an error, execute the block of
        // code below
        else if (respond_status === "error") {
            //
            flash_message_div.className = "flash_message_div";
            flash_message_div.style.display = "grid";
            flash_message_value.innerText = respond_message;

        }
    })


})
