# hackerbay-back-end

## Prerequisites

Kindly ensure you install the following softwares

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/)
3. Node Package Manager (npm), this comes pre-installed with Node.js

## Getting Started

In order to get a copy of the project up and running on your local computer for development and testing purposes.
Do the following

1. Clone the repo.
2. Switch to project directory
3. Create a local `.env` file using the `.env.example` file on the root folder
4. Type `npm install` to install dependencies
5. Type `npm run dev` to start development server or `npm start` to run in production
6. To run test Type `npm test` to get test coverage type `npm run coverage`
7. To test endpoints use Postman and the swagger documentation and test the endpoints

## API Spec
The preferred JSON object to be returned by the API should be structured as follows:

### (for authentication)

Endpoints:
----------

### Authentication:

`POST /api/v1/login`

Example request body:

```source-json
{
    "username": "frank",
    "password": "ree88584"
}
```

No authentication required, returns a Token

Required fields: `username`, `password`

## patch request 
`PATCH /api/v1/patch`

request body
```
{
    json: {},
    patch:[{}]
}
```

requires authentication Token

Required fields: `json`, `patch`

## thumbnail request
`POST /api/v1/thumbnail`

request body
```
{
    image_url: "valid image url"
}
```
requires authentication Token

Required fields: `image_url`
returns a thumbnail