# todosTracker API

**About- 2 API Endpoints**

1. API endpoint 1 allows user to enter todo tasks via freetext input
2. API endpoint 2 allows user to retrieve tasks based on date, time or location through query strings


**Directions:**

1. create todosTracker db in postgres
2. run migrations: 'sequelize db:migrate'
3. (optional) seed the db:
In main directory, run: 'node seeders/seedUser' followed by 'node seeders/seedUser'

**API endpoints:**
1. (GET) http://localhost:5000
* Sample query for GET request: http://localhost:5000?date=2018-04-15&time=07:00&location=home
(format of parameters as specified. min 1 parameter required)

2. (POST) http://localhost:5000/add 
* Sample body for POST request:
{
	"input" : "kungfu fighting at home 6pm"
}

**Challenges:**
* Main challenge was in developing the algorithm to break down the freetext user entry into specific data for db input. There were 4 main pieces of data to be extracted: time, date, activity and location.

* Method used here was to firstly extract time data by searching for am/pm. Secondly, date data by looking for date formats as explained in the following paragraphs. At each step of the search, once entities are found in the user string, they will be purged out from the string.

* After time and date, activity data was extracted via splitting across the 'at' or 'on' keywords and finally location data was derived from what remains of the purged string. 

* Date extraction in particular was tough as I tried to make it exhaustive so that it can accept a large number of possible user inputs. Supported formats for date entry include: dd-mm-yyyy, dd-mm-yy, dd/mm/yy, dd/mm/yyyy, dd month, dd month yyyy (month can be in full or shortened form eg jan/ january) & special keywords such as today, tomorrow, mon- sun, monday-sunday. Not specifying any date in the task will assume the date as today's date. 

**Highlights:**
* Algorithm to extract data from user freetext input is quite malleable. For eg. "kungfu fighting at home 6pm" & "6pm kungfu fighting at home" yields the same results and sets the date as today without even specifying. Even without location information eg. "kungfu fighting 6pm", the correct data will be extracted.

* Also, for cases where year is unspecified, eg "have dinner 1 apr 7pm" it will check against the current date. If the date has lapsed, it will save as 2019-04-01, which will make more sense when user is saving tasks near the end of the year.

**Limitations:**
* Currently possible to work only on user time input in am/pm format by whole hours eg. 9pm. Not possible to enter for eg. 21:00h, 9.30pm etc. User time input is currently required.

* Largely dependent on user entry. Usage of words other than 'at' or 'on' in specifying locations/ activities will result in incorrect entries. Also large strings and handling locations with words 'at' or 'on' in them (eg 21 on rajah) will be incorrect.

**Improvements:**
* More features, ie. signin, signout, login, tasks clashing, sequential task entries

* Testing or TDD approach due to user entry being in freetext form, which will lead to a more robust algorithm in breaking down the user input string

* Data validations via model or schema methods

* Enhanced error handling methods


