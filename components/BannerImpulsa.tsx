import Image from "next/image";

export default function BannerImpulsa() {
  return (
    <>
      {/* ── DESKTOP (sm+) ─────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden hidden sm:block"
        style={{ aspectRatio: "1921 / 681" }}
      >
        <Image
          src="/banner-fondo.png"
          alt="Andalucía TRADE IMPULSA"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Contenedor con mismo margen que el resto de la app */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1512px] mx-auto px-6 h-full relative">

            {/* Texto 1 — izquierda */}
            <div className="absolute left-6 top-[30%] w-[34%] lg:w-[32%]">
              <Image
                src="/banner-texto1.png"
                alt="Andalucía TRADE IMPULSA"
                width={647}
                height={208}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Texto 2 — derecha */}
            <div className="absolute right-6 top-[35%] w-[18%] lg:w-[16%]">
              <Image
                src="/banner-texto2.png"
                alt="Apoyamos tu empresa, financiamos tu proyecto"
                width={274}
                height={210}
                className="w-full h-auto"
                priority
              />
            </div>

          </div>
        </div>

        {/* Logos — ancho completo con mismo padding */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-[1512px] mx-auto px-6 pb-[1.2%]">
            <Image
              src="/banner-logos.png"
              alt="Logos institucionales"
              width={2042}
              height={90}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* ── MÓVIL (< sm) ──────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden sm:hidden" style={{ aspectRatio: "9 / 10" }}>
        <Image
          src="/banner-fondo.png"
          alt="Andalucía TRADE IMPULSA"
          fill
          className="object-cover object-[60%_center]"
          priority
          sizes="100vw"
        />

        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-primary/40" />

        {/* Texto 1 */}
        <div className="absolute left-6 top-[10%] w-[70%]">
          <Image
            src="/banner-texto1.png"
            alt="Andalucía TRADE IMPULSA"
            width={647}
            height={208}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Texto 2 */}
        <div className="absolute left-6 top-[42%] w-[50%]">
          <Image
            src="/banner-texto2.png"
            alt="Apoyamos tu empresa, financiamos tu proyecto"
            width={274}
            height={210}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Logos */}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-[3%]">
          <Image
            src="/banner-logos.png"
            alt="Logos institucionales"
            width={2042}
            height={90}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </>
  );
}
