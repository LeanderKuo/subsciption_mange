import { BillingCycle, CycleUnit } from "../types/subscription";

export type BillingPeriod = "monthly" | "yearly" | "half-yearly" | "custom";

export const computeMonthlyCost = (
  price: number,
  billingPeriod?: BillingPeriod,
  customDuration?: { years: number; months: number },
  legacyCycle?: BillingCycle
): number => {
  if (billingPeriod) {
    switch (billingPeriod) {
      case "monthly":
        return price;
      case "yearly":
        return price / 12;
      case "half-yearly":
        return price / 6;
      case "custom":
        if (customDuration) {
          const totalMonths = customDuration.years * 12 + customDuration.months;
          return totalMonths > 0 ? price / totalMonths : price;
        }
        break;
    }
  }

  // Fallback to legacy cycle parsing if new fields are missing
  if (legacyCycle) {
    if (legacyCycle === "30days") return price; // Approx
    if (legacyCycle === "6months") return price / 6;
    if (legacyCycle === "1year") return price / 12;

    if (legacyCycle.startsWith("custom:")) {
      const parts = legacyCycle.split(":");
      if (parts.length === 3) {
        const unit = parts[1] as CycleUnit;
        const amount = Number(parts[2]);
        if (unit === "months") return price / amount;
        if (unit === "years") return price / (amount * 12);
        if (unit === "days") return (price / amount) * 30; // Approx
      }
    }
  }

  return price;
};

export const serializeBillingCycle = (
  billingPeriod: BillingPeriod,
  customDuration?: { years: number; months: number }
): BillingCycle => {
  switch (billingPeriod) {
    case "monthly":
      return "30days"; // Or maybe we should use 'custom:months:1' for strict monthly? '30days' is legacy preset.
    case "yearly":
      return "1year";
    case "half-yearly":
      return "6months";
    case "custom":
      if (customDuration) {
        const totalMonths = customDuration.years * 12 + customDuration.months;
        return `custom:months:${totalMonths}`;
      }
      return "30days"; // Fallback
    default:
      return "30days";
  }
};

export const parseBillingCycle = (
  cycle: BillingCycle
): {
  billingPeriod: BillingPeriod;
  customDuration: { years: number; months: number };
} => {
  if (cycle === "30days")
    return {
      billingPeriod: "monthly",
      customDuration: { years: 0, months: 1 },
    };
  if (cycle === "1year")
    return { billingPeriod: "yearly", customDuration: { years: 1, months: 0 } };
  if (cycle === "6months")
    return {
      billingPeriod: "half-yearly",
      customDuration: { years: 0, months: 6 },
    };

  if (cycle.startsWith("custom:")) {
    const parts = cycle.split(":");
    if (parts.length === 3) {
      const unit = parts[1] as CycleUnit;
      const amount = Number(parts[2]);

      if (unit === "months") {
        if (amount === 1)
          return {
            billingPeriod: "monthly",
            customDuration: { years: 0, months: 1 },
          };
        if (amount === 6)
          return {
            billingPeriod: "half-yearly",
            customDuration: { years: 0, months: 6 },
          };
        if (amount === 12)
          return {
            billingPeriod: "yearly",
            customDuration: { years: 1, months: 0 },
          };

        const years = Math.floor(amount / 12);
        const months = amount % 12;
        return { billingPeriod: "custom", customDuration: { years, months } };
      }

      if (unit === "years") {
        if (amount === 1)
          return {
            billingPeriod: "yearly",
            customDuration: { years: 1, months: 0 },
          };
        return {
          billingPeriod: "custom",
          customDuration: { years: amount, months: 0 },
        };
      }
    }
  }

  // Default fallback
  return { billingPeriod: "monthly", customDuration: { years: 0, months: 1 } };
};
