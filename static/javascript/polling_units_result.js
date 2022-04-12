// Debug
console.log('Working')

// Declaring some necessary variables
let polling_unit;
let search_box = document.getElementById("search_box");
let search_button = document.getElementById("search");
let flash_message_div = document.getElementById("flash_message_div");
let summed_total_results_min_btn = document.getElementById("summed_total_results")

// Adding an event listener to the summed total results
summed_total_results_min_btn.addEventListener("click", (event) => {
    // Execute the block of code below
    location.href = "/summed_total_results";
});


// Creating a function to create html elements
let create_element = (element) => {
    // Creating an element
    element = document.createElement(element)

    // Return the element
    return element;
}

// Adding an event listener to listen for click
search_box.addEventListener("click", (event) => {
    // Remove the flash message
    flash_message_div.style.display = "";

   // Using ajax
     $.ajax({
         // Setting ajax configurations
         type: "POST",
         url: "/polling_units_results",
         crossDomain: true,
         contentType: "application/json",
     })
     // On successful connection, execute the code block below
     .done((data, textStatus, request) =>
     {
         // Save the polling unit data
         polling_unit = data['data'];

         // Access the table tag element dom
         table = document.getElementById("my_table");
         table.class = "my_table";
         table.id = "my_table";
         table.style.height = "fit-content";

         // Create a new table row, and header
         table.innerHTML = `
           <tr>
               <th>ID</th>
               <th> <b> POLLING UNIT </b> </th>
               <th> <b> WARD </b> </th>
               <th> <b> LGA ID </b></th>
               <th> <b> UNIQUE WARD ID </b> </th>
               <th> <b> POLLING UNIT NUMBER </b> </th>
               <th> <b> POLLING UNIT NAME </b> </th>
               <th> <b> POLLING UNIT DESCRIPTION </b> </th>
               <th> <b> LATITUDE </b> </th>
               <th> <b> LONGITUDE </b> </th>
               <th> <b> ENTERED BY USER </b> </th>
               <th> <b> DATE ENTERED </b> </th>
               <th> <b> USER IP ADDRESS </b> </th>
           </tr>
         `;

         // Loop, and append the values into the table tag 
         for (let i = 0; i < polling_unit.length; i++ ) {
             // console.log(polling_unit[i])

             // Create table data
             tr = create_element("tr")
             tr.innerHTML = `
                 <td> ${polling_unit[i][0]} </td>
                 <td> ${polling_unit[i][1]} </td>
                 <td> ${polling_unit[i][2]} </td>
                 <td> ${polling_unit[i][3]} </td>
                 <td> ${polling_unit[i][4]} </td>
                 <td> ${polling_unit[i][5]} </td>
                 <td> ${polling_unit[i][6]} </td>
                 <td> ${polling_unit[i][7]} </td>
                 <td> ${polling_unit[i][8]} </td>
                 <td> ${polling_unit[i][9]} </td>
                 <td> ${polling_unit[i][10]} </td>
                 <td> ${polling_unit[i][11]} </td>
                 <td> ${polling_unit[i][12]} </td>`;

             // Append
             table.appendChild(tr);
         }
     });
})

// Using ajax
$.ajax({
    // Setting ajax configurations
    type: "POST",
    url: "/polling_units_results",
    crossDomain: true,
    contentType: "application/json",
})
// On successful connection, execute the code block below
.done((data, textStatus, request) =>
{
    //
    polling_unit = data['data'];

    // Access the table element dom properties
    table = document.getElementById("my_table")

    //
    for (let i = 0; i < polling_unit.length; i++ ) {
        //
        // console.log(polling_unit[i])

        // Create table data
        tr = create_element("tr")
        tr.innerHTML = `
            <td> ${polling_unit[i][0]} </td>
            <td> ${polling_unit[i][1]} </td>
            <td> ${polling_unit[i][2]} </td>
            <td> ${polling_unit[i][3]} </td>
            <td> ${polling_unit[i][4]} </td>
            <td> ${polling_unit[i][5]} </td>
            <td> ${polling_unit[i][6]} </td>
            <td> ${polling_unit[i][7]} </td>
            <td> ${polling_unit[i][8]} </td>
            <td> ${polling_unit[i][9]} </td>
            <td> ${polling_unit[i][10]} </td>
            <td> ${polling_unit[i][11]} </td>
            <td> ${polling_unit[i][12]} </td>`;

        // Append
        table.appendChild(tr);
    }
});

// Creating a variable to hold the search results
let search_value;

// Adding an event listener to the search button to listen for
// click events
search_button.addEventListener("click", (event) => {
    // Execute the block of code below for click events
    search_value = search_box.value;

    // Using ajax to interact with the browser
    $.ajax({
      // Setting ajax configurations
      type: "POST",
      url: `/search_polling_units_results/${search_value}`,
      crossDomain: true,
      contentType: "application/json",
      crossDomain: true,
    })
    // On success
    .done((data, textStatus, req) => {
        // If the data was not found, execute the block of code
        // below
        if (data["data"] === "null") {
          // Access the table tag element dom
          table = document.getElementById("my_table");
          table.class = "my_table";
          table.id = "my_table";
          table.style.height = "fit-content";

          // Create a new table row, and header
          table.innerHTML = `
            <tr>
                <th>ID</th>
                <th> <b> POLLING UNIT </b> </th>
                <th> <b> WARD </b> </th>
                <th> <b> LGA ID </b></th>
                <th> <b> UNIQUE WARD ID </b> </th>
                <th> <b> POLLING UNIT NUMBER </b> </th>
                <th> <b> POLLING UNIT NAME </b> </th>
                <th> <b> POLLING UNIT DESCRIPTION </b> </th>
                <th> <b> LATITUDE </b> </th>
                <th> <b> LONGITUDE </b> </th>
                <th> <b> ENTERED BY USER </b> </th>
                <th> <b> DATE ENTERED </b> </th>
                <th> <b> USER IP ADDRESS </b> </th>
            </tr>`;

          // Displalying the flash message and closing up.
          flash_message_div.style.display = "grid";
          return;
        }

        // Access the table tag element dom properties
        table = document.getElementById("my_table");
        table.class = "my_table";
        table.id = "my_table";
        table.style.height = "fit-content";

        // Create a new table row, and header
        table.innerHTML = `
          <tr>
              <th>ID</th>
              <th> <b> POLLING UNIT </b> </th>
              <th> <b> WARD </b> </th>
              <th> <b> LGA ID </b></th>
              <th> <b> UNIQUE WARD ID </b> </th>
              <th> <b> POLLING UNIT NUMBER </b> </th>
              <th> <b> POLLING UNIT NAME </b> </th>
              <th> <b> POLLING UNIT DESCRIPTION </b> </th>
              <th> <b> LATITUDE </b> </th>
              <th> <b> LONGITUDE </b> </th>
              <th> <b> ENTERED BY USER </b> </th>
              <th> <b> DATE ENTERED </b> </th>
              <th> <b> USER IP ADDRESS </b> </th>
          </tr>
        `;

        // Working with the data gotten from the server
        search_value = data["data"];

        // Looping through
        for (let i = 0; i < search_value.length; i++ ) {
            // Loop, and execute the code below
            // Create a table, row, and data, then save the created table data inside
            // the table element
            tr = create_element("tr");
            tr.innerHTML = `
              <td> ${search_value[i][0]} </td>
              <td> ${search_value[i][1]} </td>
              <td> ${search_value[i][2]} </td>
              <td> ${search_value[i][3]} </td>
              <td> ${search_value[i][4]} </td>
              <td> ${search_value[i][5]} </td>
              <td> ${search_value[i][6]} </td>
              <td> ${search_value[i][7]} </td>
              <td> ${search_value[i][8]} </td>
              <td> ${search_value[i][9]} </td>
              <td> ${search_value[i][10]} </td>
              <td> ${search_value[i][11]} </td>
              <td> ${search_value[i][12]} </td>
            `;

            // Append the data into the the table element
            table.appendChild(tr);
        }

    })
})

// // Using ajax
// $.ajax({
//     // Setting ajax configurations
//     type: "POST",
//     url: "/notifications",
//     crossDomain: true,
//     contentType: "application/json",
// })
// // On successful connection, execute the code block below
// .done((data, textStatus, request) =>
// {
//     // Execute this block of code below if the server responded with
//     console.log(data)

// })
