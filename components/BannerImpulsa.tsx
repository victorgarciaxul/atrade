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
            <p style={{ fontFamily: "TTFirsNeue, sans-serif" }} className="text-white font-[600] text-[32px] lg:text-[42px] leading-tight">
              Andalucía TRADE
            </p>
            <h1 style={{ fontFamily: "TTFirsNeue, sans-serif" }} className="text-white font-[600] text-[90px] lg:text-[120px] leading-none">
              IMPULSA
            </h1>
            <p style={{ fontFamily: "TTFirsNeue, sans-serif" }} className="text-white font-[400] text-[20px] lg:text-[26px] leading-tight mt-3 tracking-wide">
              Proyectos andaluces cofinanciados por Europa
            </p>
          </div>
        </div>
      </div>

      {/* ── MÓVIL (< sm) ──────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden sm:hidden" style={{ aspectRatio: "16 / 9" }}>
        <Image
          src="/banner-fondo.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        <div className="absolute left-6 top-[20%]">
          <p style={{ fontFamily: "TTFirsNeue, sans-serif" }} className="text-white font-[600] text-[22px] leading-tight">
            Andalucía TRADE
          </p>
          <h1 style={{ fontFamily: "TTFirsNeue, sans-serif" }} className="text-white font-[600] text-[64px] leading-none">
            IMPULSA
          </h1>
          <p style={{ fontFamily: "TTFirsNeue, sans-serif" }} className="text-white font-[400] text-[13px] leading-tight mt-1">
            Proyectos andaluces cofinanciados por Europa
          </p>
        </div>
      </div>
    </>
  );
}
