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
```sh
  cd Embedding-MongoDB
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
```sh
   ├── mongodb-binaries
   ├── mongodb-data
   ├── node_binaries
```
## Folder Structure
```sh
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
```
## Configuration
  ![Download]

- Download Mongodb Version 4.0.28 binary file and paste in `mongodb-binaries` folder
- Download Node js Version 13.13 binary file and paste in `node_binaries` folder




## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
