# team_alpha
Meteor Hackathon

#Objects

##User
* email - String
* password - String
* profile.fullName - String
* username - String

##Location
* address - String
* name - String
* loc {type: "Point", coordinates: [long, lat]} - Object
* tags - Array of Strings
* userId - String

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
* error? - Meteor.Error
* result - {message, status}
