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

---

## **GET /users/profile** Endpoint

---

#### Description

Retrieves the authenticated user's profile. Requires a valid JWT token via `Authorization` header or `token` cookie.

#### Request

##### Headers

- `Authorization: Bearer <token>`
- `Cookie: token=<token>`

#### Responses

---

##### Success (200 OK)

```json
{
  "_id": "string",
  "fullname": { "firstname": "string", "lastname": "string" },
  "email": "string",
  "socketId": "string"
}
```

##### Errors

###### 401 Unauthorized

```json
{ "message": "Unauthorized" }
```

###### 500 Internal Server Error

```json
{ "error": "Internal server error" }
```

---

## **POST /users/logout** Endpoint

---

#### Description

Invalidates the current user's session by storing the token in the invalid tokens store and clearing the authentication cookie.

#### Request

##### Headers

- `Authorization: Bearer <token>`
- `Cookie: token=<token>`

#### Responses

---

##### Success (200 OK)

```json
{ "message": "Logged out successfully" }
```

##### Errors

###### 401 Unauthorized

```json
{ "message": "Unauthorized" }
```

###### 500 Internal Server Error

```json
{ "error": "Internal server error" }
```

---

## **POST /users/login** Endpoint

---

#### Description

---

Authenticates an existing user. Verifies provided email and password, and returns the user details along with a JWT authentication token.

#### Request

---

##### Headers

- `Content-Type: application/json`

##### Body

```json
{
  "email": "string, required, valid email format",
  "password": "string, required, min length 6"
}
```

#### Responses

##### Response Headers

- `Set-Cookie: token=<JWT token>; HttpOnly`

---

##### Success (200 OK)

```json
{
  "user": {
    "_id": "string",
    "fullname": { "firstname": "string", "lastname": "string" },
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
    { "msg": "Invalid email", "param": "email", "location": "body" },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

###### 401 Unauthorized

Invalid email or password.

**Body:**

```json
{
  "message": "Invalid email or password"
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

---

## **POST /genies/register** Endpoint

---

#### Description

---

Registers a new genie (service provider). Validates input fields, hashes the password, and returns the created genie object along with a JWT authentication token.

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
  "password": "string, required, min length 6",
  "vehicle": {
    "color": "string, required, min length 3",
    "id": "string, required, min length 3",
    "capacity": "string, required, one of [xs, sm, md, lg, xl]",
    "type": "string, required, one of [bicycle, bike, rikshaw, car, van, pickup, truck]"
  }
}
```

#### Responses

---

##### Success (201 Created)

```json
{
  "genie": {
    "_id": "string",
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "string",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "string",
      "id": "string",
      "capacity": "string",
      "type": "string"
    }
  },
  "token": "<JWT token string>"
}
```

##### Errors

###### 400 Bad Request

```json
{
  "errors": [
    /* validation error details */
  ]
}
```

###### 400 Bad Request (Already exists)

```json
{ "message": "Genie already exists" }
```

###### 500 Internal Server Error

```json
{ "error": "Internal server error" }
```

---

## **POST /genies/login** Endpoint

---

#### Description

---

Authenticates an existing genie. Verifies provided email and password, sets an HttpOnly token cookie, and returns the genie object with a JWT token.

#### Request

---

##### Headers

- `Content-Type: application/json`

##### Body

```json
{
  "email": "string, required, valid email format",
  "password": "string, required, min length 6"
}
```

#### Responses

---

##### Response Headers

- `Set-Cookie: token=<JWT token>; HttpOnly`

---

##### Success (200 OK)

```json
{
  "genie": {
    "_id": "string",
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "string",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "string",
      "id": "string",
      "capacity": "string",
      "type": "string"
    }
  },
  "token": "<JWT token string>"
}
```

##### Errors

###### 400 Bad Request

```json
{
  "errors": [
    /* validation error details */
  ]
}
```

###### 401 Unauthorized

Invalid email or password.
**Body:**

```json
{ "message": "Invalid email or password" }
```

###### 500 Internal Server Error

**Body:**

```json
{ "error": "Internal server error" }
```

---

## **GET /genies/profile** Endpoint

---

#### Description

Retrieves the authenticated genie's profile. Requires a valid JWT token via `Authorization` header or `token` cookie.

#### Request

##### Headers

- `Authorization: Bearer <token>`
- `Cookie: token=<token>`

#### Responses

---

##### Success (200 OK)

```json
{
  "_id": "string",
  "fullname": { "firstname": "string", "lastname": "string" },
  "email": "string",
  "socketId": "string",
  "status": "string",
  "vehicle": {
    "color": "string",
    "id": "string",
    "capacity": "string",
    "type": "string"
  },
  "location": { "lat": number, "lng": number }
}
```

##### Errors

###### 401 Unauthorized

```json
{ "message": "Unauthorized" }
```

###### 500 Internal Server Error

```json
{ "error": "Internal server error" }
```

---

## **POST /genies/logout** Endpoint

---

#### Description

Invalidates the current genie's session by adding the token to the invalid tokens store and clearing the authentication cookie.

#### Request

##### Headers

- `Authorization: Bearer <token>`
- `Cookie: token=<token>`

#### Responses

---

##### Success (200 OK)

```json
{ "message": "Logged out successfully" }
```

##### Errors

###### 401 Unauthorized

```json
{ "message": "Unauthorized" }
```

###### 500 Internal Server Error

```json
{ "error": "Internal server error" }
```
