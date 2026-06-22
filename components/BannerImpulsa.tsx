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
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1512px] mx-auto px-6">
            <p className="text-white/80 text-sm font-[500] uppercase tracking-widest mb-2">
              Revista Andalucía TRADE
            </p>
            <h1 className="font-brand text-white font-[700] text-[72px] lg:text-[96px] leading-none">
              IMPULSA
            </h1>
            <div className="mt-3 h-1 w-16 bg-green rounded-full" />
          </div>
        </div>
      </div>

      {/* ── MÓVIL (< sm) ──────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden sm:hidden" style={{ aspectRatio: "4 / 3" }}>
        <Image
          src="/banner-fondo.png"
          alt=""
          fill
          className="object-cover object-[60%_center]"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-primary/40" />

        <div className="absolute left-6 top-[20%]">
          <p className="text-white/80 text-xs font-[500] uppercase tracking-widest mb-2">
            Revista Andalucía TRADE
          </p>
          <h1 className="font-brand text-white font-[700] text-[52px] leading-none">
            IMPULSA
          </h1>
          <div className="mt-3 h-1 w-12 bg-green rounded-full" />
        </div>
      </div>
    </>
  );
}
