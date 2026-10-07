import { Tooltip } from "@storyteller/ui-tooltip";
import { ModelCreator, getCreatorIconPath } from "@storyteller/model-list";
import { twMerge } from "tailwind-merge";
import { useProxyModel } from "./catalog";
import { approximateMegapixels, estimateProxyCost, formatUsd } from "./pricing";

interface FalCostTagProps {
  /** Proxy model id, e.g. `flux_1_schnell`. */
  model?: string | null;
  /** Outputs requested; multiplies per-image and per-generation prices. */
  count?: number;
  /** Output length for per-second video and audio models. */
  seconds?: number;
  /** Aspect ratio key used to approximate megapixels for per-megapixel models. */
  aspect?: string;
  className?: string;
}

/**
 * Dollar anchor for a fal generation. Sits in the slot where ArtCraft shows a
 * coin and a credit count: same size, same weight, the fal mark in place of
 * the coin and a list price in place of credits.
 */
export function FalCostTag({ model, count, seconds, aspect, className }: FalCostTagProps) {
  const cap = useProxyModel(model);
  const iconPath = getCreatorIconPath(ModelCreator.Fal);
  const estimate = estimateProxyCost(cap?.price, { count, seconds, megapixels: approximateMegapixels(aspect) });
  const label = estimate?.usd != null ? formatUsd(estimate.usd) : "metered";
  const headline = estimate?.usd != null ? `About ${formatUsd(estimate.usd)} at fal list price` : "Metered by fal";
  const detail = estimate ? `${estimate.basis}. Team fal account, not ArtCraft credits.` : "No list price published. Team fal account, not ArtCraft credits.";
  return (
    <Tooltip
      position="top"
      className="z-50"
      content={
        <div className="flex w-[220px] flex-col gap-1 text-left font-sans normal-case tracking-normal">
          <span className="text-sm font-medium text-base-fg">{headline}</span>
          <span className="text-xs leading-relaxed text-base-fg/70">{detail}</span>
        </div>
      }
    >
      <span
        data-testid="fal-cost"
        // Inherits the surrounding text color so it reads on dark controls and
        // on the white primary button alike; the mark is a currentColor mask.
        className={twMerge("flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold tabular-nums text-current opacity-80", className)}
      >
        <span
          aria-hidden
          className="h-3.5 w-3.5 shrink-0 bg-current"
          style={{ WebkitMaskImage: `url(${iconPath})`, maskImage: `url(${iconPath})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }}
        />
        <span className="sr-only">fal</span>
        {label}
      </span>
    </Tooltip>
  );
}
