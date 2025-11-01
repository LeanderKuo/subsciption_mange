const { resolveIconUrl } = require("./icons");

const TABLE_NAME = "subscriptions";

const withIconUrl = (record) => ({
  ...record,
  icon_url: resolveIconUrl(record.brand, record.icon_url),
});

const toDatabasePayload = (payload) => ({
  name: payload.name,
  brand: payload.brand,
  price: payload.price,
  currency: payload.currency,
  start_date: payload.start_date,
  end_date: payload.end_date,
  cycle: payload.cycle,
  icon_url: resolveIconUrl(payload.brand, payload.icon_url),
});

const createSubscriptionService = (supabase) => {
  const list = async () => {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("end_date", { ascending: true });

    if (error) {
      throw error;
    }

    return data.map(withIconUrl);
  };

  const create = async (payload) => {
    const record = toDatabasePayload(payload);
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(record)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return withIconUrl(data);
  };

  const update = async (id, payload) => {
    const record = toDatabasePayload(payload);
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(record)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return withIconUrl(data);
  };

  const destroy = async (id) => {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

    if (error) {
      throw error;
    }
  };

  return {
    list,
    create,
    update,
    destroy,
  };
};

module.exports = { createSubscriptionService };
