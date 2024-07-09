# Embedded DB Project

This project demonstrates how to use an in-memory MongoDB instance with Node.js and Express.

## Features

- Provides API endpoints to manage users in an in-memory MongoDB database.
- Uses mongoose for MongoDB interaction.
- Demonstrates handling server shutdown gracefully.

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (for development, not required for in-memory)

## Getting Started

1. Clone the repository

```sh
  git clone git@github.com:MohammadAtikurRahman/Embedding-MongoDB.git
```

2. Install dependencies

```sh
  npm install
```

3. Start the server
```sh
  npm start
```
4. Create this Folder
   ├── mongodb-binaries/
   ├── mongodb-data/
   ├── node_binaries/

## Folder Structure

Embedding-MongoDB/
├── model
│ └── user.js
├── mongodb-binaries
├── mongodb-data
├── node_binaries
├── node_modules
├── .gitignore
├── connection.js
├── index.js
├── package-lock.json
├── package.json
└── README.md

## Configuration

- The MongoDB in-memory database instance is managed using `mongodb-memory-server`.
- Connection settings for MongoDB are configured in `connection.js`.



- `model/`: Contains Mongoose schema definitions.
  - `user.js`: Defines the User mongoose schema.
- `mongodb-binaries/`: Directory for MongoDB binaries.
- `mongodb-data/`: Directory for MongoDB data.
- `node_binaries/`: Directory for Node binaries (if used).
- `node_modules/`: Directory for Node.js modules.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `connection.js`: Handles MongoDB connection setup.
- `index.js`: Entry point of the application.
- `package-lock.json`: Automatically generated for locking the version of installed npm dependencies.
- `package.json`: Contains metadata about the project and its dependencies.
- `README.md`: Project documentation.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
