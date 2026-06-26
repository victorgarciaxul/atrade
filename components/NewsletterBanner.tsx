import Script from "next/script";

export default function NewsletterBanner() {
  return (
    <>
      <section className="bg-white border-t border-gray-100 py-14">
        <div className="max-w-[640px] mx-auto px-6 flex flex-col items-center text-center gap-4">
          <p className="font-brand font-[700] text-[26px] text-secondary tracking-wide uppercase">
            Andalucía TRADE{" "}
            <span className="text-primary">Newsletter</span>
          </p>
          <p className="text-secondary text-[15px] leading-relaxed">
            Recibe las últimas noticias de Andalucía TRADE en tu correo.
          </p>
          <div className="w-full mt-2">
            <iframe
              src="https://andaluciatrade.ipzmarketing.com/f/FJjOKiW8Mfg"
              frameBorder={0}
              scrolling="no"
              width="100%"
              height={220}
              className="ipz-iframe block"
            />
          </div>
        </div>
      </section>
      <Script
        src="https://assets.ipzmarketing.com/assets/signup_form/iframe_v1.js"
        strategy="lazyOnload"
      />
    </>
  );
}
