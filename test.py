import os 
import sqlite3 
from modules.modules import DatabaseFunctions


# db = DatabaseFunctions() 

# data = db.polling_units_result()
# print(data); 


# 
dbPath = os.path.sep.join(["modules", "mydb.db"])
conn = sqlite3.connect(dbPath) 



search_tag = "Bomadi"

search_tag = search_tag.lower() 

list_items = []

# 
# cursor = conn.execute("select * from lga where lga_name=?", (search_tag,))
cursor = conn.execute("select * from lga")
data = cursor.fetchall() 

for data in data:
    #
    if search_tag in data[2].lower():
        # 
        list_items.append(data)
    
    else:
        continue


print(list_items)
