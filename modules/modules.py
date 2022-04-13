#!/usr/bin/env python3

# Author: Mbonu Chinedum
# Desc: Government Polling Unit Analysis
# Date: 13/04/2022

# Creating a class for performing the database functions.
class DatabaseFunctions:
    # The init method
    def __init__(self):
        pass

    # Getting all the polling units
    def polling_units_result(self, conn):
        # Connect to the database, and execute the following sql
        # statements
        sql_statement = """select * from polling_unit""";
        cursor = conn.execute(sql_statement);
        polling_unit = cursor.fetchall()
        return polling_unit

    # Creating a method for searching the polling units
    def search_polling_units_result(self, conn, search_tag):
        # Convert the search tag into lower alphabets, and create an
        # array for storing the searched words
        search_tag = search_tag.lower()
        search_list = [];

        # Connect into the sqlite3 database, and execute the sql statement
        sql_statement = """select * from polling_unit""";
        cursor = conn.execute(sql_statement)
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
        # Connect into the database with the specified sql statement
        sql_statement = """select * from lga""";
        cursor = conn.execute(sql_statement);
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
        sql_statement = """select * from lga""";
        cursor = conn.execute(sql_statement);
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

    # Creating a method to extract all the announced polling units results
    def display_announced_polling_units_results(self, conn):
        # Connect to the database, and execute the following sql statements
        sql_statement = """ select * from announced_pu_results""";
        cursor = conn.execute(sql_statement);
        announced_pu_results = cursor.fetchall()

        # Return the results
        return announced_pu_results;


    # Creating a method to store the parties into the database
    def store_result_for_all_polling_unit_parties(self, conn, result_id, polling_unit_uniqueid,
    party_abbreviation, party_score, entered_by_user, date_entered, user_ip_address):
        # Execute the block of code below to store new results for all polling
        # unit parties
        # Getting the values to be saved into the database
        values = (
            result_id, polling_unit_uniqueid, party_abbreviation,
            party_score, entered_by_user, date_entered, user_ip_address)

        # Write an sql statement for saving the new values, connect to the
        # database, and save the sql statement
        # On successful connection, execute the block of code below
        sql_statement = """insert into announced_pu_results values (?, ?, ?, ?, ?, ?, ?)"""

        # Using the try Exception block
        try:
            cursor = conn.execute(sql_statement, values)
            # Commiting the connections
            conn.commit()

            # Return a successful result
            return { "data": "success", "message": "Data Saved!"};

        # On error
        except Exception as e:
            # Return a successful result
            return { "data": "error", "message": "Error Saving The Polling Unit!"};
