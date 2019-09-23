# JWT-test

This express.js project shows how Json Web Token works. It doesn't include user authentication. For an even more trivial example, go to "simple example" commit.

## Scenario

You can find all http requests in *./request.rest*. VS Code users can use *REST CLIENT* extentension to run it easily. 

### 1. Run servers
`npm run dev` - port 3000

`npm run devAuth` - port 4000


### 2. Get tokens
There are 2 hardcoded users: *vaso* and *palino*. To get their data you have to generate an *Access Token*. It expires after a few seconds (25) so we can use a *Refresh Token* to get new *Access token*.

**POST http://localhost:4000/login**
Content-Type: application/json
```
{
    "username": "palino | vaso"
}
```
This should return both the *Access Token* and the *Refresh Token*.


### 3. Get user's data
Now you can get Palino's data with the *Access Token* in the header of the request message.

**GET http://localhost:3000/posts**
header: `Authorization: Bearer <your access token>`

This should return data until the *Access Token* won't expire. You should see status 403 after that. 


### 4. Refresh the Access Token
You can refresh your expired *Access Token* with *Refresh Token*.

**POST http://localhost:4000/token**
Content-Type: application/json
```
{
    "token": "<refresh token>"
}
```

This should return new *Access Token*.


### 5. Logout
You can log out by deleting the *Refresh Token*.

**DELETE http://localhost:4000/logout**
Content-Type: application/json
```
{
    "token": "<refresh token>"
}
```
This should remove your *Refresh Token* so you won't be able to refresh the *Access Token* again.


### EXCEPTIONAL STORING OF APP'S SECRETS

This project is just a sample. Storing app's secrets (*.env* file) in a repository is wrong!
