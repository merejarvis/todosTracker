About:
API endpoints which:
1. allows user to enter todo tasks in freetext form
2. allows user to retrieve task based on date, time or location


Instructions:

1. create todosTracker db in postgres
2. run migrations: 'sequelize db:migrate'
3. (optional) seed db:
In main directory, run: 'node seeders/seedUser' followed by 'node seeders/seedUser'

Run the following 2 API endpoints in Postman:
1. (GET) http://localhost:5000
Sample query for GET request: http://localhost:5000?date=2018-04-15&time=07:00&location=home
(min 1 parameter required)

2. (POST) http://localhost:5000/add 
Sample body for POST request:
{
	"input" : "kungfu fighting at home 6pm"
}

Challenges
Main challenge was in developing the algorithm to break down the freetext user entry into specific data to be enter into the db

Highlights

Limitations
Can only enter by hour eg 9pm. Not possible to enter for eg. 9.30pm.
Largely dependent on user entry. 

Improvements
More features, ie. signin, signout, login, tasks clashing, multiple event entries
Testing or TDD approach which will lead to a more robust algorithm in breaking down the user input string


