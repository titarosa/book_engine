# Book Engine

A full-stack web application for managing and searching books. The project integrates a React frontend with a Node.js backend using Express, Apollo Server, and MongoDB.

## Features

- **User Authentication**: Users can sign up, log in, and access a personalized book collection.
- **Book Search**: Users can search for books via the Google Books API.
- **Book Collection**: Users can save books to their collection, and view details of each book.
- **GraphQL API**: The backend uses GraphQL to query and manipulate data.
- **MongoDB**: MongoDB is used to store user data and saved books.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express, Apollo Server (GraphQL)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API**: Google Books API
- **State Management**: Apollo Client (for interacting with GraphQL API)

## Setup

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local or remote instance, e.g., MongoDB Atlas)
- Git

### Clone the Repository

```bash
git clone https://github.com/titarosa/book_engine.git
cd book_engine 
```
### Folder Structure
- client/: Contains the React frontend code.
- server/: Contains the Node.js backend code, including Express, GraphQL schema, and resolvers.
- server/config/: Database connection setup.
- server/schemas/: GraphQL type definitions and resolvers.
- server/utils/: Helper functions, such as authentication middleware.


### Application Link

### License
This project is licensed under the MIT License - see the LICENSE file for details.