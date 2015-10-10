# team_alpha
Meteor Hackathon

#Objects

##User
* email - String
* password - String
* firstName - String
* lastName - String

##Location
* name - String
* address - String
* logitude - Number
* latitute - Number
* tags - Array of Strings

#API
##/register
* email - String
* password - String
* firstName - String
* lastName - String

###returns
* status - success / fail - String
* error_message? - String

##/login
* email - String
* password - String

###returns
* status - success / fail - String
* error_message? - String

##/addLocation
* name - String
* address - String
* tags - String

###returns
* status - success / fail - String
* error_message? - String

##/getLocations
* user_id

###returns
* locations - Array of locations
