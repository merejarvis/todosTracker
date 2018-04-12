About:
1. API endpoint 1 allows user to enter todo tasks in freetext form
2. API endpoint 2 allows user to retrieve task based on date, time or location through query strings


Directions:

1. create todosTracker db in postgres
2. run migrations: 'sequelize db:migrate'
3. (optional) seed db:
In main directory, run: 'node seeders/seedUser' followed by 'node seeders/seedUser'

2 API endpoints:
1. (GET) http://localhost:5000
Sample query for GET request: http://localhost:5000?date=2018-04-15&time=07:00&location=home
(format of parameters as specified. min 1 parameter required)

2. (POST) http://localhost:5000/add 
Sample body for POST request:
{
	"input" : "kungfu fighting at home 6pm"
}

Challenges:
Main challenge was in developing the algorithm to break down the freetext user entry into specific data to be enter into the db. There were 4 main data to be extracted: time, date, activity and location.

Method used here was to extract time first by searching for am/pm


Date extraction in particular was tough as I tried to make it as exhaustive as possible. supported formats for date entry: dd-mm-yyyy, dd-mm-yy, dd/mm/yy, dd/mm/yyyy, DD MONTH, DD MONTH YYYY & special keywords such as today, tomorrow, mon- sun, monday-sunday are all supported. Not specifying any date in the task will assume the date as today's date. 

Highlights:
Algorithm to extract freetext is quite malleable. For eg. "kungfu fighting at home 6pm" & "6pm kungfu fighting at home" yields the same correct results and sets the date as today without even specifying. Even without location eg. "kungfu fighting 6pm", it will extract the info correctly.

Also, for eg if year is unspecified, eg "have dinner 1 apr 7pm" it will check against the current date. If the date has lapsed, it will save as 2019-04-01, which will make more sense as you are saving tasks near the end of the year.

Limitations:
Can only enter in am/pm format by hour eg 9pm. Not possible to enter for eg. 21:00h, 9.30pm etc.

Largely dependent on user entry. use of words other than 'at' or 'on' in specifying locations/ activities will result in incorrect entries. Also large strings and handling locations with words at or on in them (eg 21 on rajah) will be incorrect.

Improvements:
More features, ie. signin, signout, login, tasks clashing, multiple event entries
Testing or TDD approach due to user entry being in freetext form, which will lead to a more robust algorithm in breaking down the user input string


