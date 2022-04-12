// Debug
console.log(
    "working!"
)

// Declaring some necessary variables
let summed_total;
let search_value;
let search_box = document.getElementById("search_box");
let search_button = document.getElementById("search");
let flash_message_div = document.getElementById("flash_message_div");


// Creating a function to create an html element
let create_element = (element) => {
    // Execute the block of code below to create html element
    element = document.createElement(element)

    // Return the element
    return element;
};

// Adding an event listener to listen for click
search_box.addEventListener("click", (event) => {
    // Remove the flash message
    flash_message_div.style.display = "";

    // Using ajax
    $.ajax({
        // Setting ajax configurations
        type: "POST",
        url: "/summed_total_results",
        crossDomain: true,
    })
    // On successful connection, execute the code block below
    .done((data, textStatus, req) => {
        // Save the summed total result
        summed_total = data["data"];

        // Access the table tag element dom
        table = document.getElementById("my_table");
        table.class = "my_table";
        table.id = "my_table";
        table.style.height = "fit-content";

        // Create a new table row, and header
        table.innerHTML = `
          <tr class="table_nav">
            <th> <b> UNIQUE ID</b> </th>
            <th> <b> LOCAL GOVERNMENT ID </b> </th>
            <th> <b> LOCAL GOVERNMENT NAME </b> </th>
            <th> <b> STATE ID </b> </th>
            <th> <b> LOCAL GOVERNMENT DESCRIPTION </b> </th>
            <th> <b> ENTERED BY USER </b> </th>
            <th> <b> DATE ENTERED </b> </th>
            <th> <b> USER IP ADDRESS </b> </th>
          </tr>
        `;

        // Loop, and append the values into the table tag
        for (let i = 0; i < summed_total.length; i++) {
            // Loop, and execute the code block below
            // Create table, row, and data, then save the created
            // table data into the table element
            tr = create_element("tr");
            tr.innerHTML = `
              <td> ${summed_total[i][0]}</td>
              <td> ${summed_total[i][1]}</td>
              <td> ${summed_total[i][2]}</td>
              <td> ${summed_total[i][3]}</td>
              <td> ${summed_total[i][4]}</td>
              <td> ${summed_total[i][5]}</td>
              <td> ${summed_total[i][6]}</td>
              <td> ${summed_total[i][7]}</td>
            `;

            // Append the data into the table element
            table.appendChild(tr);
        }
    })


});

// Using ajax
$.ajax({
    // Setting ajax configurations
    type: "POST",
    url: "/summed_total_results",
    crossDomain: true,
    contentType: "application/json",

})
// On successful connection, execute the code block below
.done((data, textStatus, request) => {
    // working with the data gotten from the server
    summed_total = data["data"]

    // Acess the table tag element dom properties
    table = document.getElementById("my_table");

    // Loop, and append the values into the table tag
    for (let i = 0; i < summed_total.length; i++ ) {
        // Loop, and execute the code block below
        // Create table, row, and data, then save the created table data into
        // the table element
        tr = create_element("tr");
        tr.innerHTML = `
            <td> ${summed_total[i][0]}</td>
            <td> ${summed_total[i][1]}</td>
            <td> ${summed_total[i][2]}</td>
            <td> ${summed_total[i][3]}</td>
            <td> ${summed_total[i][4]}</td>
            <td> ${summed_total[i][5]}</td>
            <td> ${summed_total[i][6]}</td>
            <td> ${summed_total[i][7]}</td>
        `;

        // Append the data into the table element
        table.appendChild(tr);
    }

}); 

// Adding an event listener for the search button
search_button.addEventListener("click", (event) => {
    // Grabbing the searched results
    // search_data = JSON.stringify({
    //     "data": search_value

    //   });
    search_value = search_box.value;

    // Sending the search results to the server by
    // using ajax
    // Using ajax
    $.ajax({
        // Setting ajax configurations
        type: "POST",
        url: `/search_summed_total_results/${search_value}`,
        crossDomain: true,
        contentType: "application/json",
        crossDomain: true,
    })
    // On success
    .done((data, textStatus, req) => {
        // if the dat was not found, execute the block of code
        // below
        // console.log(data);
        if (data["data"] === "null") {
          // Access the table tag element dom
          table = document.getElementById("my_table");
          table.class = "my_table";
          table.id = "my_table";
          table.style.height = "fit-content";

          // Create a new table row, and header
          table.innerHTML = `
            <tr class="table_nav">
                <th> <b> UNIQUE ID</b> </th>
                <th> <b> LOCAL GOVERNMENT ID </b> </th>
                <th> <b> LOCAL GOVERNMENT NAME </b> </th>
                <th> <b> STATE ID </b> </th>
                <th> <b> LOCAL GOVERNMENT DESCRIPTION </b> </th>
                <th> <b> ENTERED BY USER </b> </th>
                <th> <b> DATE ENTERED </b> </th>
                <th> <b> USER IP ADDRESS </b> </th>
            </tr> `;

            // Displaying a flash message, then stop.
            flash_message_div.style.display = "grid";
            return;
        }

        // Access the table tag element dom properties
        table = document.getElementById("my_table");

        //
        table.innerHTML = `
            <tr class="table_nav">
                <th> <b> UNIQUE ID</b> </th>
                <th> <b> LOCAL GOVERNMENT ID </b> </th>
                <th> <b> LOCAL GOVERNMENT NAME </b> </th>
                <th> <b> STATE ID </b> </th>
                <th> <b> LOCAL GOVERNMENT DESCRIPTION </b> </th>
                <th> <b> ENTERED BY USER </b> </th>
                <th> <b> DATE ENTERED </b> </th>
                <th> <b> USER IP ADDRESS </b> </th>
            </tr>`;

        // working with the data gotten from the server
        search_value = data["data"]

        // looping through
        for (let i = 0; i < search_value.length; i++ ) {
            // Loop, and execute the code block below
            // Create table, row, and data, then save the created table data into
            // the table element
            tr = create_element("tr")
            tr.innerHTML = `
                <td> ${search_value[i][0]}</td>
                <td> ${search_value[i][1]}</td>
                <td> ${search_value[i][2]}</td>
                <td> ${search_value[i][3]}</td>
                <td> ${search_value[i][4]}</td>
                <td> ${search_value[i][5]}</td>
                <td> ${search_value[i][6]}</td>
                <td> ${search_value[i][7]}</td>
            `;

            // Append the data into the table element
            table.appendChild(tr);
        }
    })

})
