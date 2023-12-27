# product spec

## insert product
endpoint : post product

authrization : token with role admin

request body : 
```json
    {
        "nama_product" : "okky",
        "price" : 76843,
        "deks" : "minuman yg sangat mengenyangkan",
        "category" : "minuman"
    }
```

response if succes : 
```json
    {
        "msg" : "insert succes",
        "data" :{
                    "nama_product" : "okky",
                    "price" : 76843,
                    "deks" : "minuman yg sangat mengenyangkan",
                    "category" : "minuman"
                }
    }
```
response if erro/failed : 
```json
    {
        "msg" : "nama_product is required"
    }
```


## getAll product
endpoint : get product

authrization : token with role admin/regular

response if succes : 
```json
    {
        "data" :[
            {
                        "nama_product" : "okky",
                        "price" : 76843,
                        "deks" : "minuman yg sangat mengenyangkan",
                        "category" : "minuman"
            },
            {
                        "nama_product" : "okky",
                        "price" : 76843,
                        "deks" : "minuman yg sangat mengenyangkan",
                        "category" : "minuman"
            },
        ]
    }
```
response if erro/failed : 
```json
    {
        "msg" : "token is not valid/unauthorize"
    }
```

## update product
endpoint : put product/:productId

authrization : token with role admin

request body : 
```json
    {
        "nama_product" : "okky update",
        "price" : 76843,
        "deks" : "minuman yg sangat mengenyangkan update",
        "category" : "minuman"
    }
```

response if succes : 
```json
    {
        "msg" : "update succes",
        "data" :{
                    "nama_product" : "okky",
                    "price" : 76843,
                    "deks" : "minuman yg sangat mengenyangkan",
                    "category" : "minuman"
                }
    }
```
response if erro/failed : 
```json
    {
        "msg" : "product not found"
    }
```

## delete product
endpoint : get product

authrization : token with role admin

response if succes : 
```json
    {
        "msg" : "delete succes",
        "data" : {
                    "nama_product" : "okky",
                    "price" : 76843,
                    "deks" : "minuman yg sangat mengenyangkan",
                    "category" : "minuman"
                }
    }
```
response if erro/failed : 
```json
    {
        "msg" : "product not found"
    }
```

## search product
endpoint : get product/:product/:productIdentify

identify : 
    byId : search product by id product
    byName : search product by name product
    byCategory : search product by Category product

authrization : token with role admin/regular

response if succes : 
```json
    {
        "data" :[
            {
                        "nama_product" : "okky",
                        "price" : 76843,
                        "deks" : "minuman yg sangat mengenyangkan",
                        "category" : "minuman"
            },
            {
                        "nama_product" : "okky",
                        "price" : 76843,
                        "deks" : "minuman yg sangat mengenyangkan",
                        "category" : "minuman"
            },
        ]
    }
```
response if erro/failed : 
```json
    {
        "msg" : "product is not found"
    }
```
