const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");
const mongoose = require("mongoose").set("debug", true);
const { MongoMemoryServer } = require("mongodb-memory-server");

const dbPath = path.join(__dirname, "./mongodb-data");
const binaryPath = path.join(__dirname, "./mongodb-binaries");
process.env.MONGOMS_SYSTEM_BINARY = path.join(binaryPath, "mongod.exe");

const mongod = new MongoMemoryServer({
  instance: {
    dbName: "Test-Database",
    dbPath: dbPath,
    storageEngine: "wiredTiger",
    port: 27017,
  },
  binary: {
    version: "4.0.28",
    downloadDir: binaryPath,
    mongodBinaryPath: path.join(binaryPath, "mongod.exe"),
    skipMD5: true,
    debug: false,
    autoDownload: false,
  },
  autoStart: false,
});

const User = require("./model/user.js");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/add_users", async (req, res) => {
  try {
    const { user_name, user_age, user_gender } = req.body;

    const newUser = new User({
      user_name,
      user_age,
      user_gender,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
});

app.get("/api/get_users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

async function startServer() {
  try {
    // Start MongoMemoryServer and get the connection URI
    await mongod.start();
    const mongoUri = await mongod.getUri();

    console.log("MongoDB In-Memory URI:", mongoUri);

    // Connect mongoose to the in-memory instance
    await mongoose.connect(mongoUri, {
      // Remove useNewUrlParser and useUnifiedTopology
      // These options are deprecated and have no effect
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // Use new options supported by Mongoose and the MongoDB Node.js driver
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds of waiting for connection
      dbName: "Test-Database", // Specify the database name
    });

    // Listen for server shutdown
    const server = app.listen(2000, () => {
      console.log("Server is running on port 2000");
    });

    // Handle server shutdown to cleanup
    process.on("SIGINT", async () => {
      console.log("Shutting down server...");
      await mongoose.disconnect();
      await mongod.stop();
      server.close();
      console.log("Server shut down.");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error starting server or MongoMemoryServer:", err);
  }
}
startServer();
