import type { SVGProps } from "react";

export const PixelCart16Bit = ({
  className = "w-10 h-10",
  ...props
}: Omit<SVGProps<SVGSVGElement>, "className"> & { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      shapeRendering="crispEdges"
      className={`transition-transform duration-75 hover:-translate-y-1 active:translate-y-0 ${className}`}
      {...props}
    >
      {/* --- POIGNÉE (Accent Cyan) --- */}
      <rect x="1" y="3" width="4" height="1" fill="#67e8f9" /> {/* Reflet */}
      <rect x="1" y="4" width="4" height="1" fill="#06b6d4" /> {/* Base */}
      <rect x="1" y="5" width="4" height="1" fill="#0891b2" /> {/* Ombre */}

      {/* --- MONTANT VERTICAL (Métal) --- */}
      <rect x="4" y="6" width="1" height="11" fill="#e2e8f0" /> {/* Reflet */}
      <rect x="5" y="6" width="1" height="11" fill="#94a3b8" /> {/* Base */}
      <rect x="6" y="6" width="1" height="11" fill="#64748b" /> {/* Ombre */}

      {/* --- CHÂSSIS DU BAS --- */}
      <rect x="4" y="17" width="15" height="1" fill="#e2e8f0" />
      <rect x="4" y="18" width="15" height="1" fill="#94a3b8" />
      <rect x="4" y="19" width="15" height="1" fill="#64748b" />

      {/* --- BORDURE HAUTE DU PANIER --- */}
      <rect x="7" y="5" width="13" height="1" fill="#e2e8f0" />
      <rect x="7" y="6" width="13" height="1" fill="#94a3b8" />
      <rect x="7" y="7" width="13" height="1" fill="#64748b" />

      {/* --- BORDURE AVANT DU PANIER --- */}
      <rect x="18" y="8" width="1" height="6" fill="#e2e8f0" />
      <rect x="19" y="8" width="1" height="6" fill="#64748b" />

      {/* --- BORDURE BASSE DU PANIER --- */}
      <rect x="7" y="14" width="13" height="1" fill="#e2e8f0" />
      <rect x="7" y="15" width="13" height="1" fill="#94a3b8" />
      <rect x="7" y="16" width="13" height="1" fill="#64748b" />

      {/* --- GRILLAGE INTÉRIEUR (Wireframe avec profondeur) --- */}
      {/* Lignes verticales */}
      <g fill="#94a3b8">
        <rect x="9" y="8" width="1" height="6" />
        <rect x="12" y="8" width="1" height="6" />
        <rect x="15" y="8" width="1" height="6" />
      </g>
      <g fill="#64748b">
        <rect x="10" y="8" width="1" height="6" />
        <rect x="13" y="8" width="1" height="6" />
        <rect x="16" y="8" width="1" height="6" />
      </g>
      {/* Lignes horizontales */}
      <g fill="#94a3b8">
        <rect x="7" y="9" width="11" height="1" />
        <rect x="7" y="12" width="11" height="1" />
      </g>
      <g fill="#64748b">
        <rect x="7" y="10" width="11" height="1" />
        <rect x="7" y="13" width="11" height="1" />
      </g>

      {/* --- ROUES --- */}
      {/* Roue Gauche */}
      <rect x="5" y="20" width="3" height="3" fill="#1e293b" /> {/* Pneu Noir */}
      <rect x="6" y="21" width="1" height="1" fill="#06b6d4" /> {/* Jante Cyan */}

      {/* Roue Droite */}
      <rect x="14" y="20" width="3" height="3" fill="#1e293b" />
      <rect x="15" y="21" width="1" height="1" fill="#06b6d4" />
    </svg>
  );
};

export type PixelCartIconProps = {
  count: number;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "className">;

export const PixelCartIcon = ({
  count,
  className = "w-10 h-10",
  ...props
}: PixelCartIconProps) => {
  const safeCount = Number.isFinite(count) ? Math.max(0, count) : 0;

  return (
    <span className="relative inline-flex">
      <PixelCart16Bit className={className} {...props} />

      {/* Bulle de quantité */}
      <span className="pointer-events-none absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-600 text-[10px] font-bold leading-none text-white">
        {safeCount}
      </span>
    </span>
  );
};

