
# Portable MongoDB Setup in Node.js

A step-by-step guide to creating a portable MongoDB database for Node.js applications without requiring a full MongoDB installation. This setup combines `mongodb-memory-server` with `mongodb-binaries` to offer a solution that is both embedded and persistent across restarts, perfect for Electron apps and other portable applications.

## Why Use Portable MongoDB?

1. **Easy Setup**: No need to install MongoDB on the system, which simplifies deployment and sharing.
2. **Persistent Storage**: Data remains intact across restarts using defined directories.
3. **Ideal for Portable Apps**: Essential for applications that need portability and simplicity, such as Electron apps.

## Prerequisites

- **Node.js version**: 18
- **MongoDB Binary version**: 4.0.28

---

## Installation

Install the necessary packages:

```bash
npm install mongoose mongodb-memory-server path
```

## Setting Up the Portable MongoDB Solution

In this setup, `mongodb-memory-server` provides an embedded MongoDB instance, and we specify custom paths for binaries and data storage, enabling persistence.

### Step 1: Configure Database Connection with Persistent Storage

Create a file named `connectToDatabase.js`:

```javascript
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const path = require("path");

async function connectToDatabase() {
  try {
    const binaryPath = path.join(__dirname, "./mongodb-binaries");
    const dbPath = path.join(__dirname, "./mongodb-data");

    process.env.MONGOMS_SYSTEM_BINARY = path.join(binaryPath, "mongod.exe");

    const mongod = new MongoMemoryServer({
      instance: {
        dbName: "PortableDatabase",
        dbPath: dbPath,
        storageEngine: "wiredTiger",
        port: 27017,
      },
      binary: {
        version: "4.0.28",
        downloadDir: binaryPath,
        mongodBinaryPath: path.join(binaryPath, "mongod.exe"),
        skipMD5: true,
        autoDownload: false,
      },
      autoStart: false,
    });

    await mongod.start();
    const mongoUri = await mongod.getUri();
    console.log("MongoDB Portable URI:", mongoUri);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      dbName: "PortableDatabase",
    });

    console.log("MongoDB connected with portable, persistent storage.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = connectToDatabase;
```

### Step 2: Create an Express Server

Create a `server.js` file to initialize Express and define routes:

```javascript
const express = require("express");
const app = express();
const connectToDatabase = require("./connectToDatabase");
const mongoose = require("mongoose");

app.use(express.json());

const UserSchema = new mongoose.Schema({
  user_name: String,
  user_age: Number,
  user_gender: String,
});
const User = mongoose.model("User", UserSchema);

app.post("/api/add_user", async (req, res) => {
  try {
    const { user_name, user_age, user_gender } = req.body;
    const newUser = new User({ user_name, user_age, user_gender });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
});

app.get("/api/get_users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

async function startServer() {
  try {
    await connectToDatabase();
    const server = app.listen(2000, () => {
      console.log("Server running on http://localhost:2000");
    });

    process.on("SIGINT", async () => {
      console.log("Shutting down server...");
      await mongoose.disconnect();
      server.close();
      console.log("Server shut down.");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
```

### Step 3: Prepare MongoDB Binary

1. **Download MongoDB Binary**: [MongoDB Download Center](https://www.mongodb.com/try/download/community) - Select version 4.0.28 for your OS.
2. **Extract Files**: Unzip and locate the `mongod.exe` file.
3. **Add to Project Directory**: Move `mongod.exe` and any other necessary files to your `mongodb-binaries` directory.

### Step 4: Directory Structure

Organize your project like this:

```
portable-mongodb-setup/
├── model
│   └── user.js
├── mongodb-binaries # MongoDB binaries
├── mongodb-data # MongoDB data storage
├── node_modules
├── .gitignore
├── connectToDatabase.js
├── server.js
├── package.json
└── README.md
```

### Step 5: Running the App

Start the server:

```bash
node server.js
```

To test:

1. Send a POST request to `/api/add_user` with JSON data.
2. Restart the server.
3. Send a GET request to `/api/get_users` to confirm data persistence.

---

## Resources

- **GitHub Project Setup**: [portable-mongodb-setup](https://github.com/MohammadAtikurRahman/portable-mongodb-setup)
- **NPM Package**: [portable-mongodb](https://www.npmjs.com/package/portable-mongodb)

---

With this setup, enjoy the portability of MongoDB without a system installation. Perfect for Node.js apps requiring embedded and persistent storage!
