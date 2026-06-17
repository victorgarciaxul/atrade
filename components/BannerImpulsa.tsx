import Image from "next/image";

export default function BannerImpulsa() {
  return (
    <>
      {/* ── DESKTOP (sm+) ─────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden hidden sm:block"
        style={{ aspectRatio: "1921 / 500" }}
      >
        <Image
          src="/banner-fondo.png"
          alt="Andalucía TRADE IMPULSA"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1512px] mx-auto px-6 h-full relative">
            {/* Solo texto 1 — izquierda */}
            <div className="absolute left-6 top-[28%] w-[34%] lg:w-[32%]">
              <Image
                src="/banner-texto1.png"
                alt="Andalucía TRADE IMPULSA"
                width={647}
                height={208}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── MÓVIL (< sm) ──────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden sm:hidden" style={{ aspectRatio: "4 / 3" }}>
        <Image
          src="/banner-fondo.png"
          alt="Andalucía TRADE IMPULSA"
          fill
          className="object-cover object-[60%_center]"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-primary/40" />

        <div className="absolute left-6 top-[20%] w-[70%]">
          <Image
            src="/banner-texto1.png"
            alt="Andalucía TRADE IMPULSA"
            width={647}
            height={208}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </>
  );
}
