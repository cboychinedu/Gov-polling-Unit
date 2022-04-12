#!/usr/bin/env python3

# Creating a class for performing the database functions.
class DatabaseFunctions:
    # The init method
    def __init__(self):
        pass

    # Getting all the polling units
    def polling_units_result(self, conn):
        # Connect to the database, and execute the following sql
        # statements
        cursor = conn.execute("select * from polling_unit")
        polling_unit = cursor.fetchall()
        return polling_unit

    # Creating a method for searching the polling units
    def search_polling_units_result(self, conn, search_tag):
        # Convert the search tag into lower alphabets, and create an
        # array for storing the searched words
        search_tag = search_tag.lower()
        search_list = [];

        # Connect into the sqlite3 database, and execute the sql statement
        cursor = conn.execute("select * from polling_unit")
        polling_unit = cursor.fetchall()

        # Peform the search, and compare the results
        for data in polling_unit:
            # if the search value is present, append the results into
            # the polling unit array, then save
            if search_tag in data[6].lower():
                # Execute the block of code below if the data is found
                # in the search tag
                search_list.append(data)

            # Else if the data, not found, return an empty list
            else:
                # Continue
                continue;

        # Return the result back to the user
        return search_list;

    # Creating a method to check for the summed total results for the
    # polling units under local government area.
    def summed_total_results_for_polling_units_under_lga(self, conn):
        #
        cursor = conn.execute("select * from lga")
        summed_total_results = cursor.fetchall()
        return summed_total_results

    # Search for specific local governments
    def search_total_results(self, conn, search_tag):
        # Convert the search tag into lower alphabets, and create an
        # array for storing the words
        search_tag = search_tag.lower()
        search_list = [];

        # Connect into the sqlite3 database, and execute the sql statement
        # cursor = conn.execute("select * from lga where lga_name=?", (search_tag,))
        cursor = conn.execute("select * from lga")
        searched_results = cursor.fetchall()

        # Perform the search, and compare the results
        for data in searched_results:
            # If the search value is present, append the results into the
            # search list array
            if search_tag in data[2].lower():
                # Appending
                search_list.append(data)

            # If the words or query are not present, continure the
            # for loop until it finishes.
            else:
                # Continue the looping process
                continue;

        # Return the result back to the user
        return search_list;

    # Creating a method to store the parties into the database 
    def store_result_for_parties(self, conn):
        #
        pass
