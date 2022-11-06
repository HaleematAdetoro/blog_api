# Blog App
This is an api for a blog app

---

## Requirements
1. User should be able to register with first_name, last_name, username, email, password.
2. User should be able to login with Passport using JWT and token should expire in 1hr
3. logged in and not logged in users should be able to get all published blogs
4. Logged in and not logged in users should be able to to get a published blog
5. A blog can be in two state; draft and published.
6. Logged in user should be able to create a blog.
7. Created blogs should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
8. Each blog should be created in draft state.
9. The owner of the blog should be able to update the state of the blog to published.
10. The owner of a blog should be able to edit the blog in draft or published state.
11. The owner of the blog should be able to delete the blog in draft or published state.
12. The owner of the blog should be able to get a list of their blogs, with the endpoint paginated and it should be filtered by state.
13. The list of blogs endpoint that can be accessed by both logged in and not logged in users 
    -   should be paginated, 
    -   default it to 20 blogs per page. 
    -   It should also be searchable by author, title and tags.
    -   It should also be orderable by read_count, reading_time and timestamp
14.    When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1.
15. Test application.
---
## Setup
-   Install NodeJS, mongodb
-   pull this repo
-   update env with example.env
-   run `npm run start:dev`

---
## Base URL


## Models
---

### User
|   field   |    data_type  |   constraints |
|---|---|---|
|   id  |    string  |   required    |
|   username    |   string  |   optional    |
|   first_name  |   string  |   required    |
|   last_name   |   string  |   required    |
|   email   |   string  |   required    |
|   password    |   string  |   required    | 


### Blogs
|   field   |   data_type   |   constraints |
|---|---|---|
|   title   |   string  |   required, unique    |
|   description |   string  |   required    |
|   author  |   ObjectId    |   required    |
|   state   |   string  |   required    |
|   read_count  |   Number  |   required,default:0  |
|   reading_time    |   Number  |   required    |
|   tags    |   array   |   required    |
|   body    |   string  |   required    |
|   timestamp   |   true    |   required    |

## APIs
---
### Signup User

-   Route: /signup
-   Method: POST
-   Body:
```
{
    "first_name": "Titi",
    "last_name": "Layo",
    "email": "titi@gmail.com",
    "username": "pancake",
    "password": "qwerty",
}
```

-   Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "first_name": "Titi",
        "last_name": "Layo",
        "email": "titi@gmail.com",
        "username": "pancake",
        "password": "qwerty",
    }
}
```

---
### Login User

-   Route: /login
-   Method: POST
-   Body:
```
{
    "email": "titi@gmail.com",
    "password": "qwerty",
}
```

-   Responses

Success
```
{
    message: 'Login successful',
    token: 'sjfhfyujsnmzn'
}
```

---
### Create Blog

-   Route: /blog
-   Method: POST
-   Query params:
    -   secret_token: {token}
-   Body:
```
{
    title:    "My first Blog",
    description: "The first chapter",
    tags: [eat, pray, love]
    body: "Travelling is good for the soul"
}
```

-   Responses

Success
```
{
  title:    "My first Blog",
  description: "The first chapter",
  author:
  state:    "draft",
  read_count:   0,
  reading_time: 1,
  tags: Array,
  Body: "Travelling is good for the soul"  
}
```

---
### Get all published blogs with authentication

-   Route:  /blog
-   Method: GET
-   Query params
    -   secret_token: {token}
    -   author,
    -   title,
    -   tags,
    -   order (options: asc | desc, default: asc),
    -   order_by(default: read_time)
    -   per_page (default: 20)

-   Responses

Success
```
{
    title:    "My first Blog",
    description: "The first chapter",
    author:
    state:    "published",
    read_count:   0,
    reading_time: 1,
    tags: Array,
    Body: "Travelling is good for the soul" 
}
```

---
### Get all published blogs without authentication

-   Route:  /blogs
-   Method: GET
-   Query params
    -   author,
    -   title,
    -   tags,
    -   order (options: asc | desc, default: asc),
    -   order_by(default: read_time)
    -   per_page (default: 20)

-   Responses

Success
```
{
    title:    "My first Blog",
    description: "The first chapter",
    author:
    state:    "Published",
    read_count:   0,
    reading_time: 1,
    tags: Array,
    Body: "Travelling is good for the soul" 
}
```

---
### Get one published blog without authentication

-   Route:  /blogs/:blogId
-   Method: GET
-   Query params
    -   blogId

-   Responses

Success
```
{
    title:    "My first Blog",
    description: "The first chapter",
    author:
    state:    "published",
    read_count:   1,
    reading_time: 1,
    tags: Array,
    Body: "Travelling is good for the soul" 
}
```

---
### Get one published blog with authentication

-   Route:  /blog/:blogId
-   Method: GET
-   Query params
    -   secret_token: {token}
    -   blogId

-   Responses

Success
```
{
    title:    "My first Blog",
    description: "The first chapter",
    author:
    state:    "published",
    read_count:   1,
    reading_time: 1,
    tags: Array,
    Body: "Travelling is good for the soul" 
}
```

---
### Get all User blogs

-   Route:  /blog/:id
-   Method: GET
-   Query params
    -   secret_token: {token}
    -   id

-   Responses

Success
```
{
    title:    "My first Blog",
    description: "The first chapter",
    author:
    state:    "published",
    read_count:   1,
    reading_time: 1,
    tags: Array,
    Body: "Travelling is good for the soul" 
}
```

---
### Update one blog draft state to published

-   Route: /blog/blogId
-   Method: PATCH
-   Query params:
    -   blogId
    -   secret_token: {token}

-   Body:
```
{
    state: "published"
}
```

-   Responses

Success
```
{
  title:    "My first Blog",
  description: "The first chapter",
  author:
  state:    "published",
  read_count:   0,
  reading_time: 1,
  tags: Array,
  Body: "Travelling is good for the soul"  
}
```

---
### Update one blog 
-   Route: /blog/blogId
-   Method: PUT
-   Query params:
    -   blogId
    -   secret_token: {token}

-   Body:
```
{
    title:    "My second Blog",
    description: "The chapter continues",
    tags: [live, love, learn]
    body: "Vacations can help you find yourself"
}
```

-   Responses

Success
```
{
  title:    "My second Blog",
  description: "The chapter continues",
  author:
  state:    "published",
  read_count:   0,
  reading_time: 1,
  tags: Array,
  Body: "Vacations can help you find yourself"  
}
```

---
### Delete one blog
-   Route:  /blog/:blogId
-   Method: DELETE
-   Query params
    -   secret_token: {token}
    -   blogId

-   Responses

Success
```
{
    message: "Blog deleted successfully
}
```

---

...

## Contributor
-   Haleemat Adetoro









 





