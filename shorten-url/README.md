# SHORTEN-URL
You can view the deployed version here https://backend-with-nodejs-8ncg.onrender.com

Also, you can run this app locally, by following these steps:

Make sure to install the dependencies:

### Running the Service
To run the service locally:
1. Install dependencies:
```bash
# npm
npm install
```
## Development Server

Start the development server on `http://localhost:8001`:

```bash
# npm
npm start
```
## System Design

### Overview
The URL shortener service is designed to convert long URLs into shorter, more manageable links. It consists of the following components:
- **Frontend**: A user interface where users can input long URLs and receive shortened links.
- **Backend**: A server that handles URL shortening requests, stores the mappings between long and short URLs, and redirects users from short URLs to the corresponding long URLs.
- **Database**: A storage system to keep track of URL mappings.

### Components

1. **Frontend**
   - Built with EJS templates.
   - Provides a simple form for users to input their long URLs.

2. **Backend**
   - Implemented using Node.js and Express.
   - Handles HTTP requests to shorten URLs and redirect users.
   - Provides RESTful API endpoints:
     - `POST /shorten`: Accepts a long URL and returns a shortened URL.
     - `GET /:shortUrl`: Redirects to the original long URL.

3. **Database**
   - Implemented using any MongoDB database.
   - Stores mappings between short URLs and long URLs.

### Workflow

1. **Shortening a URL**
   - User submits a long URL via the front end.
   - The frontend sends a POST request to the backend.
   - The backend generates a unique short URL and stores the mapping in the database.
   - The backend responds with the short URL displayed to the user.

2. **Redirecting to the Original URL**
   - User accesses a short URL.
   - The backend receives the request and looks up the original long URL in the database.
   - The backend redirects the user to the original long URL.
