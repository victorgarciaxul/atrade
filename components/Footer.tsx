import Image from "next/image";

const footerLinks = [
  {
    heading: "Quiénes somos",
    links: ["Historia", "Equipo", "Consejo", "Memorias anuales", "Noticias", "Contacto"],
  },
  {
    heading: "Empresas",
    links: ["Internacionalización", "Financiación", "Formación", "Asesoramiento", "Ferias", "Misiones comerciales"],
  },
  {
    heading: "Inversión",
    links: ["Por qué Andalucía", "Sectores", "Oportunidades", "Incentivos", "Trámites", "Contacto inversores"],
  },
  {
    heading: "Innovación",
    links: ["I+D+i", "Tecnología", "Ecosistema startup", "Transferencia tecnológica", "Proyectos europeos", "Redes"],
  },
  {
    heading: "Formación",
    links: ["Máster", "Cursos", "Becas", "Online", "Presencial", "Empresas"],
  },
  {
    heading: "Nuestros podcasts",
    links: ["Todo sobre Andalucía", "Conviértete en exportador", "¿Hay vida fuera?", "Nuestros barrios", "Desde el Sur", "El futuro es hoy"],
  },
];

const socialIcons = [
  {
    label: "Instagram",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" /></svg>,
  },
  {
    label: "Twitter / X",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "Facebook",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    label: "Threads",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.476l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.166 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.378-.887h-.018c-.852 0-1.563.253-2.109.75l-1.357-1.536C11.01 3.815 12.098 3.43 13.44 3.43h.03c3.61.012 5.807 2.22 5.885 5.939l.004.177-.168.061c.79.466 1.437 1.07 1.878 1.867.877 1.59.893 3.651-.813 5.331-1.889 1.857-4.017 2.746-7.07 2.748zm.351-8.647c-.096 0-.191.003-.284.009-1.016.06-1.851.354-2.36.825-.455.393-.684.94-.652 1.539.033.595.34 1.107.864 1.443.616.399 1.457.573 2.289.528 1.096-.06 1.965-.476 2.586-1.237.621-.762.983-1.908 1.073-3.397a11.715 11.715 0 0 0-3.516-.71z" /></svg>,
  },
  {
    label: "TikTok",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.32a8.16 8.16 0 0 0 4.77 1.52V7.4a4.85 4.85 0 0 1-1-.71z" /></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="bg-green text-white">
      {/* Top bar */}
      <div className="max-w-[1512px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Logo + social */}
        <div className="flex flex-col gap-4">
          <div>
            <Image
              src="/logo.svg"
              alt="Andalucía TRADE — Junta de Andalucía"
              width={220}
              height={36}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map((icon) => (
              <button
                key={icon.label}
                aria-label={icon.label}
                className="w-[34px] h-[34px] rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                {icon.svg}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white font-[400]">Subscribe to our newsletter</label>
          <div className="flex items-center border border-white/40 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Email"
              className="bg-transparent text-sm text-white placeholder:text-white/60 px-4 py-2 focus:outline-none w-[240px]"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1512px] mx-auto px-6">
        <div className="h-[0.5px] bg-white/20" />
      </div>

      {/* Links grid */}
      <div className="max-w-[1512px] mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {footerLinks.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h4 className="font-brand text-white text-sm font-[500]">{col.heading}</h4>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 text-xs hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar: EU logos */}
      <div className="bg-[#408b58]">
        <div className="max-w-[1512px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-6">
          {/* EU logos left */}
          <div className="flex items-center gap-8">
            <Image
              src="/cofinanciado.svg"
              alt="Cofinanciado por la Unión Europea"
              width={143}
              height={32}
            />
            <Image
              src="/fondoseuropeos.svg"
              alt="Ministerio de Hacienda — Fondos Europeos"
              width={200}
              height={24}
            />
          </div>

          {/* Logos right */}
          <div>
            <Image
              src="/logo.svg"
              alt="Andalucía TRADE — Junta de Andalucía"
              width={180}
              height={30}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
