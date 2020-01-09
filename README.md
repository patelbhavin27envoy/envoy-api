# visitor/entries API - Node/Mongodb 

## Documentation

A brief introduction of visitor api server.

## Installation Prerequisite


####### Follow steps here to install mongodb on Mac  https://zellwk.com/blog/install-mongodb/
####### Steps to connect to mongodb on local nodeJs Server https://zellwk.com/blog/local-mongodb/

** you need to run mongod process to successfully connect with the DB.

snv-bpatel:envoy bpatel$ node -v 
v6.16.0

## How to run unit test? 
snv-bpatel:envoy bpatel$ npm test 

============  Coverage summary =====================

Statements   : 79.35% ( 73/92 )

Branches     : 57.69% ( 15/26 )

Functions    : 75% ( 12/16 )

Lines        : 81.11% ( 73/90 )

===================================================== 

## How to start server?

snv-bpatel:envoy bpatel$ npm start 

## To run integration test 
The server need to be up and running to run integration tests.

snv-bpatel:envoy bpatel$ grunt integrationTest 

```$xslt

Running "env:test" (env) task

Running "simplemocha:integrationTest" (simplemocha) task
 ...
 ..
 ...
  4 passing (136ms)

Done, without errors.
snv-bpatel:envoy bpatel$ 
```


## API Endpoints

### Get all Visitors:

url -  /api/visitors 200 14.979 ms - 2655   
method - GET

```javascript
Success Response:

{
  "status": true,
  "visitor": [
    {
      "_id": "5e1386ec003a370da81e6be3",
      "signedOut": false,
      "signedIn": true,
      "name": "John Doe",
      "notes": "This is Creating new visitor.",
      "__v": 0,
      "created_by": "2020-01-06T19:13:48.263Z",
      "completed": false,
      "signOutTime": null
    },
    {
      "_id": "5e1386ec003a370da81e6be4",
      "signedOut": false,
      "signedIn": true,
      "name": "JohnDelete DoeDelete",
      "notes": "This is Delete.",
      "__v": 0,
      "created_by": "2020-01-06T19:13:48.281Z",
      "completed": false,
      "signOutTime": null
    }]

Error Response: [ This info is not upto date ]

{status: false, error: "Message"}
```

### Post a todo

url - http://localhost:8080/api/visitors

method - POST

params: 

         { "name":"tada tada",
          "notes":"This is John Doe..."
        }


```javascript

Success Response:

{
    "status": true,
    "visitor":{
        "__v": 0,
        "signedOut": false,
        "signedIn": true,
        "name": "tada tada",
        "notes": "This is John Doe...",
        "_id": "5e142c2bec512c43df61b7ce",
        "created_by": "2020-01-07T06:58:51.728Z",
        "completed": false,
        "signOutTime": null
    }
}

Error Response:

{status: false, error: "Message"}


```

### Update status

url: http://apitodo.herokuapp.com/api/todos/_id

method - put

params: {completed: status }

status - boolean value

```javascript

Success Response:

{status: true, message: "Status updated successfully"}

Error Response:
{status: false, error: "Status not updated"}

```
### Deleting a visitor entry. This is not allowed through API.

url: /api/visitors/id 

method: DELETE

```javascript

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot DELETE /api/visitors/5e1386ec003a370da81e6be3</pre>
</body>
</html> 
```


