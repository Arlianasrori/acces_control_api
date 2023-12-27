# user spec

## register api
endpoint :post user/register

request body : 
```json
    {
        "name" : "habil",
        "email" : "abiljr@gmail.com",
        "password" : "habil123",
        "role" : "admin" 
    }
```

response if succes :
```json
    {
        "name" : "habil",
        "email" : "aabiljr@gmail.com",
        "role" : "admin"
    }
```
response if error/fail : 
```json
    {
        "msg" : "email is required"
    }
```

## login api
endpoint : user/login 

request body : 
```json
    {
        "email" : "aabiljr@gmail.com",
        "password" : "habil12"
    }
```
response if succes : 

send a token generate from jwt

```json
    {
        "token" : "hbjf74ry"
    }
```

response if error/failed :
```json
    {
        "msg" : "email or password wrong"
    }
```