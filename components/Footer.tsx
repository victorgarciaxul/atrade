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
    href: "https://www.instagram.com/andaluciatrade/",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" /></svg>,
  },
  {
    label: "Twitter / X",
    href: "https://x.com/trade_andalucia",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/andaluciatrade",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/andaluciatrade/posts/?feedView=all",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/extendajunta",
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#001E78"/></svg>,
  },
];

const legalLinks = [
  { label: "Aviso Legal", href: "https://www.andaluciatrade.es/aviso-legal/" },
  { label: "Tratamiento de datos personales", href: "https://www.andaluciatrade.es/tratamiento-datos-personales/" },
  { label: "Accesibilidad", href: "https://www.andaluciatrade.es/accesibilidad/" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Top bar */}
      <div className="max-w-[1512px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Social icons */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {socialIcons.map((icon) => (
              <a
                key={icon.label}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.label}
                className="w-[34px] h-[34px] rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                {icon.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white font-[400]">Suscríbete a nuestra newsletter</label>
          <div className="flex items-center border border-white/40 rounded-lg overflow-hidden">
            <input
              type="email"
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

      {/* Bottom bar: EU logos + legal */}
      <div className="bg-[#001654]">
        <div className="max-w-[1512px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          {/* EU logos */}
          <div className="flex items-center gap-8">
            <Image
              src="/cofinanciado.svg"
              alt="Cofinanciado por la Unión Europea"
              width={180}
              height={40}
            />
            <Image
              src="/fondoseuropeos.svg"
              alt="Ministerio de Hacienda — Fondos Europeos"
              width={260}
              height={32}
            />
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 text-xs hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
