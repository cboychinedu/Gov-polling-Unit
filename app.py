#!/usr/bin/env python3

# Author: Mbonu Chinedum
# Desc: Government Polling Unit Analysis
# Date: 13/04/2022

# Importing the necessary modules
import os
import logging
from modules.modules import DatabaseFunctions
from flask import Flask, url_for, render_template
from flask import request
import sqlite3

# Creating an instance of the database module
# Connecting to the database
dbPath = os.path.sep.join(["modules", "mydb.db"])

# Setting the logging parameters
logging.basicConfig(filename="requests.log", level=logging.DEBUG,
                        format='%(asctime)s %(message)s',
                        datefmt='%m/%d/%Y %I:%M:%S %p')

# Creating an instance of the database classes
db = DatabaseFunctions()

# Creating the flask application
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Adding functions for updating the web application on reload
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

# Creating a function called dated url for tracking the changes made
def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                 endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

# First route
@app.route("/", methods=["GET", "POST"])
def home():
    # If the request is home
    return render_template("index.html");

# Creating a GET ROUTE for the polling units results
@app.route("/polling_units_results", methods=["GET"])
def polling_units_results_get():
    # Returning the "polling units results" template file
    return render_template("polling_units_results.html")

# Creating a POST route for displaying all the polling units results
@app.route("/polling_units_results", methods=["POST"])
def polling_units_results_post():
    # Connect to the data base, and extract all the polling units
    conn = sqlite3.connect(dbPath)
    data = db.polling_units_result(conn)

    # Sending the polling units data back to the client
    return {"data": data}


# Creating a POST route for searching for the polling units results
@app.route("/search_polling_units_results/<string:search_tag>", methods=["POST"])
def search_polling_units_results(search_tag):
    # Execute the block of code below for searching for an individual
    # polling units result
    # Connect to the sqlite3 database, and search for the specified polling
    # unit found in the "search_tag"
    conn = sqlite3.connect(dbPath)
    data = db.search_polling_units_result(conn, search_tag=search_tag)

    # Checking for validation
    if len(data) == 0:
        # The data was not found
        return { "data": "null", "message": "Data not found!"};
        # return { "data": "null", "message": "Data not found!"}

    # Else, the data was found on the server
    return { "data": data, "message": "Data found!"};


# Creating a GET route for the summed total results for polling units
@app.route("/summed_total_results", methods=["GET"])
def summed_total_results_get():

    # Returning the summed total results html template file
    return render_template("summed_total_results.html")

# Creating a search route
@app.route("/search_summed_total_results/<string:search_tag>", methods=["POST"])
def search_summed_total_results(search_tag):

    # Connect to the sqlite3 database, and search for the value
    # in the search tag
    conn = sqlite3.connect(dbPath)
    data = db.search_total_results(conn, search_tag=search_tag)

    # Checking to validate the data
    if len(data) == 0:
        # Return data not present
        return { "data": "null", "message": "Data not found!"};

    # Else the data was found on the server
    return {"data": data};

# Creating a post route for the summed total results for each polling units
@app.route("/summed_total_results", methods=["POST"])
def summed_total_results_post():
    # Connect to the sqlite3 database,and extract all the data under
    # the summed total results for every polling units under local government
    conn = sqlite3.connect(dbPath)
    data = db.summed_total_results_for_polling_units_under_lga(conn)

    # Return the extracted data back to the user(client)
    return { "data": data }

# Creating a route for displaying the ANNOUNCED POLLING UNITS RESULTS
@app.route("/announced_polling_unit_results", methods=["GET", "POST"])
def announced_polling_unit_results():
    # If the request method was a get request, execute the block of
    # code below
    if request.method == "GET":
        # Return the "announced_polling_unit_results.html" template file
        # back to the client
        return render_template("announced_polling_unit_results.html")

    # If the request was a post request, execute the block of code
    # below
    # to display all announced polling unit parties
    if request.method == 'POST':
        # Connect to the sqlilte3 database, and extract all the
        # data for the announced polling units.
        conn = sqlite3.connect(dbPath)
        data = db.display_announced_polling_units_results(conn)

        # Return the extracted data back to the user
        return { "data": data, "message": "Data found!"};



# Creating a route for storing the results for polling units
@app.route("/store_all_result_for_polling_units_parties", methods=["POST"])
def store_all_result_for_polling_units_parties():
    # Getting the users data
    request_data = request.get_json()

    # Extracting the data
    result_id = request_data["result_id"];
    polling_unit_uniqueid = request_data["polling_unit_uniqueid"];
    party_abbreviation = request_data["party_abbreviation"];
    party_score = request_data["party_score"];
    entered_by_user = request_data["entered_by_user"];
    date_entered = request_data["date_entered"];
    user_ip_address = request_data["user_ip_address"];

    # Making connections into the database server, then store the polling
    # units information
    conn = sqlite3.connect(dbPath)
    data = db.store_result_for_all_polling_unit_parties(conn, result_id, polling_unit_uniqueid,
                                party_abbreviation, party_score, entered_by_user,
                                date_entered, user_ip_address);

    # Return the results for the updated polling unit
    return { "data": data};


# Running the application
if __name__ == "__main__":
    app.run(debug=True)
