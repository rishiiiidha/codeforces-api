# Codeforces API 

This Codeforces API provides access to user data from Codeforces, a popular competitive programming platform. You can retrieve user data by making HTTP requests to the provided endpoint.

## Endpoint
Once the server is running, you can access the API at the following endpoint:

- [https://codeforces-apiii.vercel.app/](https://codeforces-apiii.vercel.app/)

- **GET /api/{username}**

  This endpoint allows you to retrieve user data by providing the Codeforces username as a parameter. Replace `{username}` with the Codeforces username of the user you want to retrieve data for.

- Example:
   - [https://codeforces-apiii.vercel.app/api/tourist](https://codeforces-apiii.vercel.app/api/tourist)

## Technologies Used
- Node.js
- Express.js
- JSDOM (for web scraping)



## Example Response
A successful request to the endpoint will return a JSON response with the following structure:

```json
{
"username": "tourist",
"userRank": "legendarygrandmaster",
"currentContestRating": "3572(max.legendarygrandmaster,3979)",
"numberOfFriends": "63,144 users",
"contribution": "+114"
}
```

## Disclaimer
This project isn't connected to or supported by Codeforces. It's just for learning how to make a RESTful API using Node.js, Express.js, and JSDOM for web scraping.
