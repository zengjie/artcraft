import { ArrowUpIcon, CoinsIcon, LoaderCircleIcon } from "lucide-react";
import { DynamicIcon } from "@storyteller/icons";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "@storyteller/ui-tooltip";

interface GenerateIconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  credits?: number | null;
  /** Replaces the credit readout, e.g. a provider's list-price tag. */
  costLabel?: ReactNode;
  loading?: boolean;
}

/**
 * Compact generate control: credit cost as plain text next to a circular
 * arrow-up button. Desktop promptboxes use this; the mobile form keeps the
 * labeled `GenerateButton` pill.
 */
export const GenerateIconButton = ({
  credits,
  costLabel,
  loading,
  className,
  disabled,
  ...rest
}: GenerateIconButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <div className={twMerge("flex shrink-0 items-center gap-2.5", className)}>
      {costLabel && (
        <span className={twMerge("flex items-center ms-1.5 transition-opacity", isDisabled && "opacity-50")}>{costLabel}</span>
      )}
      {!costLabel && credits != null && (
        <Tooltip
          content={`${credits} credit${credits !== 1 ? "s" : ""} cost`}
          position="top"
          className="z-50"
        >
          <span
            className={twMerge(
              "flex items-center gap-1.5 ms-1.5 text-[13px] font-semibold tabular-nums text-base-fg/80 transition-opacity",
              isDisabled && "opacity-50",
            )}
          >
            <CoinsIcon  className="text-xs" />
            {credits}
          </span>
        </Tooltip>
      )}

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-all duration-150 hover:bg-primary-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
        disabled={isDisabled}
        {...rest}
      >
        <DynamicIcon
          icon={loading ? LoaderCircleIcon : ArrowUpIcon}
          className={loading ? "animate-spin" : undefined}
        />
      </button>
    </div>
  );
};

export default GenerateIconButton;
