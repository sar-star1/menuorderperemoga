import { uploadedPhotos } from "@/assets/uploads";

/**
 * Infinite horizontal marquee showing all 20 uploaded product photos.
 * Duplicates the list once and animates -50% to loop seamlessly.
 */

interface PhotoMarqueeProps {
  /** Animation direction. */
  direction?: "left" | "right";
  /** Seconds per loop. Lower = faster. */
  speed?: number;
  /** Extra classes for the outer wrapper. */
  className?: string;
}

const PhotoMarquee = ({
  direction = "left",
  speed = 60,
  className = "",
}: PhotoMarqueeProps) => {
  const items = [...uploadedPhotos, ...uploadedPhotos];
  const animation = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden bg-background py-4 md:py-6 border-y border-border ${className}`}
    >
      <div
        className="flex gap-3 md:gap-5 w-max"
        style={{
          animation: `${animation} ${speed}s linear infinite`,
        }}
      >
        {items.map((photo, idx) => (
          <img
            key={`${photo.id}-${idx}`}
            src={photo.url}
            alt=""
            loading="lazy"
            className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 object-cover flex-shrink-0 shadow-sm rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoMarquee;
