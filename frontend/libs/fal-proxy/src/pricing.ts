// fal publishes list prices per endpoint. The Proxy forwards them so the UI can
// anchor a generation with a dollar figure in the same slot where ArtCraft
// shows credits. Figures are estimates against list price; the team's fal
// invoice is the only bill.

export type ProxyPriceUnit = "image" | "megapixel" | "second" | "request" | "compute_second" | "unit";

export interface ProxyPrice { usd: number; unit: ProxyPriceUnit }

export interface ProxyCostInput {
  /** Number of outputs requested (images, videos). */
  count?: number;
  /** Output duration in seconds for per-second models. */
  seconds?: number;
  /** Approximate output megapixels per image. Defaults to one megapixel. */
  megapixels?: number;
}

export interface ProxyCostEstimate {
  /** Estimated total in USD, or undefined when the unit cannot be predicted. */
  usd?: number;
  /** Unit price as published by fal. */
  unitUsd: number;
  unit: ProxyPriceUnit;
  /** Human readable basis, e.g. "2 images at $0.04 each". */
  basis: string;
}

const UNIT_LABEL: Record<ProxyPriceUnit, string> = {
  image: "image",
  megapixel: "megapixel",
  second: "second of output",
  request: "generation",
  compute_second: "compute second",
  unit: "unit",
};

export function estimateProxyCost(price: ProxyPrice | undefined, input: ProxyCostInput = {}): ProxyCostEstimate | undefined {
  if (!price || !(price.usd > 0)) return undefined;
  const count = Math.max(1, Math.floor(input.count ?? 1));
  const each = `${formatUsd(price.usd)} per ${UNIT_LABEL[price.unit]}`;
  switch (price.unit) {
    case "image":
      return { usd: price.usd * count, unitUsd: price.usd, unit: price.unit, basis: `${plural(count, "image")} at ${each}` };
    case "megapixel": {
      const megapixels = input.megapixels ?? 1;
      return { usd: price.usd * megapixels * count, unitUsd: price.usd, unit: price.unit, basis: `${plural(count, "image")} at about ${megapixels} MP, ${each}` };
    }
    case "second": {
      if (!(input.seconds! > 0)) return { unitUsd: price.usd, unit: price.unit, basis: each };
      return { usd: price.usd * input.seconds! * count, unitUsd: price.usd, unit: price.unit, basis: `${input.seconds} s at ${each}` };
    }
    case "request":
      return { usd: price.usd * count, unitUsd: price.usd, unit: price.unit, basis: `${plural(count, "generation")} at ${each}` };
    default:
      // Compute time and vendor units are only known after the run finishes.
      return { unitUsd: price.usd, unit: price.unit, basis: `${each}; actual usage decides the total` };
  }
}

export function formatUsd(value: number): string {
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(2)}`;
  if (value >= 0.001) return `$${value.toFixed(3)}`;
  return `$${value.toFixed(4)}`;
}

/** Megapixels of a 1K-class output for the aspect ratios the Proxy accepts. */
export function approximateMegapixels(aspect?: string): number {
  switch (aspect) {
    case "wide": case "wide_sixteen_by_nine": case "tall": case "tall_nine_by_sixteen": return 0.6;
    case "wide_four_by_three": case "tall_three_by_four": return 0.8;
    default: return 1;
  }
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
