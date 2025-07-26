# Backend API Documentation

---

## **POST /users/register** Endpoint

---

#### Description

---

Registers a new user in the system. The endpoint validates the input data, hashes the password, and returns the created user object along with a JWT authentication token.

#### Request

---

##### Headers

- `Content-Type: application/json`

##### Body

```json
{
  "fullname": {
    "firstname": "string, required, min length 2",
    "lastname": "string, optional, min length 2"
  },
  "email": "string, required, valid email format",
  "password": "string, required, min length 6"
}
```

#### Responses

---

##### Success (201 Created)

```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null
  },
  "token": "<JWT token string>"
}
```

##### Errors

###### 400 Bad Request

Validation errors in the request body.

**Body:**

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 2 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

###### 500 Internal Server Error

Unexpected server error.

**Body:**

```json
{
  "error": "Internal server error"
}
```
