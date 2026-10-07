import { describe, expect, it } from "vitest";
import { approximateMegapixels, estimateProxyCost, formatUsd } from "./pricing";

describe("fal list price estimates", () => {
  it("multiplies per-image prices by the requested count", () => {
    const estimate = estimateProxyCost({ usd: 0.0398, unit: "image" }, { count: 3 });
    expect(estimate?.usd).toBeCloseTo(0.1194);
    expect(estimate?.basis).toBe("3 images at $0.04 per image");
  });

  it("uses output seconds for per-second video pricing and stays open-ended without a duration", () => {
    expect(estimateProxyCost({ usd: 0.07, unit: "second" }, { seconds: 10 })?.usd).toBeCloseTo(0.7);
    const open = estimateProxyCost({ usd: 0.07, unit: "second" }, {});
    expect(open?.usd).toBeUndefined();
    expect(open?.basis).toContain("per second");
  });

  it("approximates megapixels from the aspect ratio for per-megapixel models", () => {
    expect(approximateMegapixels("wide_sixteen_by_nine")).toBe(0.6);
    expect(estimateProxyCost({ usd: 0.003, unit: "megapixel" }, { count: 4, megapixels: 1 })?.usd).toBeCloseTo(0.012);
  });

  it("never invents a total for compute-time billing", () => {
    const estimate = estimateProxyCost({ usd: 0.00125, unit: "compute_second" });
    expect(estimate?.usd).toBeUndefined();
    expect(estimate?.unitUsd).toBe(0.00125);
    expect(estimateProxyCost(undefined)).toBeUndefined();
  });

  it("formats small dollar amounts without rounding them to zero", () => {
    expect(formatUsd(0.003)).toBe("$0.003");
    expect(formatUsd(0.0008)).toBe("$0.0008");
    expect(formatUsd(0.15)).toBe("$0.15");
    expect(formatUsd(3.2)).toBe("$3.20");
  });
});
