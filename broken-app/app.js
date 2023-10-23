const express = require("express");
const axios = require("axios");
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Helper function to fetch developer info
const fetchDeveloperInfo = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return { name: response.data.name, bio: response.data.bio };
  } catch (error) {
    console.error(`Error fetching data for user ${username}: ${error.message}`);
    return null;
  }
};

// POST route to fetch developers' information
app.post("/", async (req, res, next) => {
  try {
    // Validate input
    if (!Array.isArray(req.body.developers)) {
      return res
        .status(400)
        .json({ error: "Invalid input: developers field must be an array." });
    }

    // Fetch developer info
    const developers = await Promise.all(
      req.body.developers.map(fetchDeveloperInfo)
    );

    // Filter out any null values (in case of errors)
    const validDevelopers = developers.filter(Boolean);

    return res.json(validDevelopers);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
