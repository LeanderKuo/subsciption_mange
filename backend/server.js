const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createSupabaseClient } = require("./lib/supabase");
const { createSubscriptionService } = require("./services/subscriptions");
const { findIconUrl } = require("./services/icons");

const app = express();
app.use(cors());
app.use(express.json());

let supabase;
try {
  supabase = createSupabaseClient();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const subscriptions = createSubscriptionService(supabase);

app.get("/api/subscriptions", async (_req, res) => {
  try {
    const data = await subscriptions.list();
    res.json(data);
  } catch (error) {
    console.error("Failed to fetch subscriptions", error);
    res.status(500).json({ message: "Failed to fetch subscriptions" });
  }
});

app.post("/api/subscriptions", async (req, res) => {
  try {
    const record = await subscriptions.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    console.error("Failed to create subscription", error);
    res.status(500).json({ message: "Failed to create subscription" });
  }
});

app.put("/api/subscriptions/:id", async (req, res) => {
  try {
    const record = await subscriptions.update(req.params.id, req.body);
    res.json(record);
  } catch (error) {
    console.error("Failed to update subscription", error);
    res.status(500).json({ message: "Failed to update subscription" });
  }
});

app.delete("/api/subscriptions/:id", async (req, res) => {
  try {
    await subscriptions.destroy(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete subscription", error);
    res.status(500).json({ message: "Failed to delete subscription" });
  }
});

app.get("/api/icons/:brand", (req, res) => {
  const iconUrl = findIconUrl(req.params.brand);
  res.json({ icon_url: iconUrl });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
