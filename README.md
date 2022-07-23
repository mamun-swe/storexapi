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


## Available routes:
  - Auth
      - [POST] (Login) https://storexapi.herokuapp.com/api/v1/auth/login
      - [POST] (Register) https://storexapi.herokuapp.com/api/v1/auth/register
      - [POST] (Reset) https://storexapi.herokuapp.com/api/v1/auth/reset
  - Store
      - [GET] (Store) info https://storexapi.herokuapp.com/api/v1/store
      - [PUT] (Update) https://storexapi.herokuapp.com/api/v1/store
      - [POST] (Add profile image) https://storexapi.herokuapp.com/api/v1/store/add-profile-image
      - [POST] (Add cover image) https://storexapi.herokuapp.com/api/v1/store/add-cover-image
  - Category
      - [GET] (All) https://storexapi.herokuapp.com/api/v1/category?page=1&limit=10
      - [POST] (Create) https://storexapi.herokuapp.com/api/v1/category
      - [GET] (Show) https://storexapi.herokuapp.com/api/v1/category/:id
      - [PUT] (Update) https://storexapi.herokuapp.com/api/v1/category/:id
  - Product
      - [GET] (All) https://storexapi.herokuapp.com/api/v1/product?page=1&limit=10
      - [POST] (Create) https://storexapi.herokuapp.com/api/v1/product
      - [GET] (Show) https://storexapi.herokuapp.com/api/v1/product/:id
      - [PUT] (Update) https://storexapi.herokuapp.com/api/v1/product/:id
      - [DELETE] (Destroy) https://storexapi.herokuapp.com/api/v1/product/:id
      - [POST] (Search) https://storexapi.herokuapp.com/api/v1/product/search
  - Cart
      - [GET] (All) https://storexapi.herokuapp.com/api/v1/cart
      - [POST] (Create) https://storexapi.herokuapp.com/api/v1/cart
      - [PUT] (Update) https://storexapi.herokuapp.com/api/v1/cart/:id
      - [DELETE] (Destroy) https://storexapi.herokuapp.com/api/v1/cart/:id
  - User
      - [GET] (All) https://storexapi.herokuapp.com/api/v1/user?page=1&limit=10
      - [POST] (Create) https://storexapi.herokuapp.com/api/v1/user
      - [GET] (Show) https://storexapi.herokuapp.com/api/v1/user/:id
      - [PUT] (Update) https://storexapi.herokuapp.com/api/v1/user/:id
      - [POST] (Search) https://storexapi.herokuapp.com/api/v1/user/search
  - Order
      - [GET] (All) https://storexapi.herokuapp.com/api/v1/order?page=1&limit=10
      - [POST] (Create) https://storexapi.herokuapp.com/api/v1/order
      - [GET] (Show) https://storexapi.herokuapp.com/api/v1/order/:id
      - [PUT] (Update) https://storexapi.herokuapp.com/api/v1/order/:id
      - [POST] (Search) https://storexapi.herokuapp.com/api/v1/order/search

