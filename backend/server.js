const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Supabase credentials are missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

const addIconUrl = (subscription) => ({
  ...subscription,
  icon_url:
    subscription.icon_url ||
    `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${subscription.brand}.svg`,
});

app.get("/api/subscriptions", async (req, res) => {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("end_date", { ascending: true });

  if (error) {
    console.error("Failed to fetch subscriptions", error);
    return res.status(500).json({ message: "Failed to fetch subscriptions" });
  }

  res.json(data.map(addIconUrl));
});

app.post("/api/subscriptions", async (req, res) => {
  const payload = req.body;
  const newRecord = {
    name: payload.name,
    brand: payload.brand,
    price: payload.price,
    currency: payload.currency,
    start_date: payload.start_date,
    end_date: payload.end_date,
    cycle: payload.cycle,
    icon_url:
      payload.icon_url ||
      `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${payload.brand}.svg`,
  };

  const { data, error } = await supabase
    .from("subscriptions")
    .insert(newRecord)
    .select()
    .single();

  if (error) {
    console.error("Failed to create subscription", error);
    return res.status(500).json({ message: "Failed to create subscription" });
  }

  res.status(201).json(addIconUrl(data));
});

app.put("/api/subscriptions/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const updates = {
    name: payload.name,
    brand: payload.brand,
    price: payload.price,
    currency: payload.currency,
    start_date: payload.start_date,
    end_date: payload.end_date,
    cycle: payload.cycle,
    icon_url:
      payload.icon_url ||
      `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${payload.brand}.svg`,
  };

  const { data, error } = await supabase
    .from("subscriptions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update subscription", error);
    return res.status(500).json({ message: "Failed to update subscription" });
  }

  res.json(addIconUrl(data));
});

app.delete("/api/subscriptions/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("subscriptions").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete subscription", error);
    return res.status(500).json({ message: "Failed to delete subscription" });
  }

  res.status(204).send();
});

app.get("/api/icons/:brand", (req, res) => {
  const { brand } = req.params;
  const icons = {
    netflix: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg",
    spotify: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg",
    "youtube-premium":
      "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg",
    "hbo-max": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/hbo.svg",
    disney: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/disney.svg",
    duolingo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/duolingo.svg",
    chatgpt: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg",
    claude: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/anthropic.svg",
    gemini: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg",
    discord: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg",
    plurk: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/plurk.svg",
    notion: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg",
    github: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
    figma: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg",
    "tunnel-bear":
      "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tunnelbear.svg",
  };
  res.json({ icon_url: icons[brand.toLowerCase()] || null });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
