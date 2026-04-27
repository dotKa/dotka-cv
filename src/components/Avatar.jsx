import { useState } from "react";
import { profilePhoto } from "../data/profile";

export function Avatar({ size = "md" }) {
  const [hasImageError, setHasImageError] = useState(false);
  const sizeClass = size === "lg" ? "h-28 w-28 md:h-36 md:w-36" : "h-10 w-10";

  return (
    <div className={`${sizeClass} overflow-hidden border border-cyan-300/50 bg-cyan-300/10`}>
      {hasImageError ? (
        <div className="flex h-full w-full items-center justify-center font-mono text-cyan-200">YK</div>
      ) : (
        <img
          src={profilePhoto}
          alt="Yasin Karadeniz"
          className="h-full w-full object-cover grayscale contrast-125"
          onError={() => setHasImageError(true)}
        />
      )}
    </div>
  );
}
