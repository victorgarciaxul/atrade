import Script from "next/script";

export default function NewsletterBanner() {
  return (
    <>
      <section className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="max-w-[1512px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-primary font-brand font-[600] text-lg">Suscríbete a nuestra newsletter</p>
            <p className="text-secondary text-sm mt-1">Recibe las últimas noticias de Andalucía TRADE en tu correo.</p>
          </div>
          <div className="w-full md:w-[420px]">
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
