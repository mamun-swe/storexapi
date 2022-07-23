# STOREXAPI

[STOREXAPI](https://storexapi.herokuapp.com) is a free online REST API that you can use whenever you need Pseudo-real data for
    your store management website, mobile application, or desktop application without running any server - side code.
    It's awesome for teaching purposes, sample codes, tests and etc.

## Why ?

When I wanted to design a store management website prototype and needed fake data, I had to
use lorem ipsum data or create a JSON file from the base.I didn't find any online free web service
to return semi - real store data instead of lorem ipsum data.
so I decided to create this simple web service with NodeJs(express), Typescript and MongoDB as a database.

## Resources

There are 7 main resources need in store prototypes:

- Auth https://storexapi.herokuapp.com/api/v1/auth
- Store https://storexapi.herokuapp.com/api/v1/store
- Category https://storexapi.herokuapp.com/api/v1/category
- Product https://storexapi.herokuapp.com/api/v1/product
- Cart https://storexapi.herokuapp.com/api/v1/cart
- User https://storexapi.herokuapp.com/api/v1/user
- Order https://storexapi.herokuapp.com/api/v1/order

## Available routes

### Auth 
    - [POST] Login (https://storexapi.herokuapp.com/api/v1/auth/login)
    - [POST] Register (https://storexapi.herokuapp.com/api/v1/auth/register)