import Breadcrumb from "@/components/Breadcrumb";

export default function CategoriesPage() {
  return (
    <main className="max-w-[1512px] mx-auto px-6 py-12">
      <Breadcrumb crumbs={[{ label: "Inicio", href: "/" }, { label: "Quiénes somos" }]} />
      <h1 className="font-brand text-primary text-3xl font-[600] mb-10">Quiénes somos</h1>

      <div className="max-w-[860px] mx-auto flex flex-col gap-8 text-secondary text-[16px] leading-relaxed text-justify">

        {/* Bloque 1: Qué es IMPULSA */}
        <div className="flex flex-col gap-4">
          <p>
            <span className="font-brand text-primary font-[600]">Andalucía TRADE IMPULSA</span> es una publicación online de Andalucía TRADE para la difusión de las actuaciones desarrolladas en el ámbito del{" "}
            <span className="font-[500] text-primary">Programa de Andalucía FEDER 2021-2027</span>, orientadas al impulso de la competitividad, la innovación y el crecimiento sostenible del tejido empresarial andaluz.
          </p>
          <p>
            Con un contenido eminentemente audiovisual y conectado con todos los canales de difusión de Andalucía TRADE, esta publicación digital no solo es un escaparate virtual de los servicios e incentivos de la Agencia, sino un medio para dar a conocer los proyectos y logros del tejido empresarial andaluz en España y en todo el mundo. Proyectos que son posibles gracias al impulso del Programa de Andalucía FEDER 2021-2027 y que sirven de ejemplo a otras empresas para recorrer el camino de su desarrollo.
          </p>
          <p>
            En este camino, <span className="font-brand font-[600] text-primary">Andalucía TRADE IMPULSA</span> pretende ser un medio de comunicación e interacción entre las empresas y la Administración que ayude a alcanzar los objetivos comunes.
          </p>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gray-100 w-full" />

        {/* Bloque 2: Qué es Andalucía TRADE */}
        <div className="flex flex-col gap-4">
          <p>
            <span className="font-brand text-primary font-[600]">Andalucía TRADE</span> es la Agencia Empresarial para la Transformación y el Desarrollo Económico de la Junta de Andalucía. Adscrita a la Consejería de Universidad, Industria, Energía e Innovación, ejerce como ventanilla única para las empresas andaluzas y el inversor internacional.
          </p>
          <p>
            Andalucía TRADE desarrolla una labor integral de acompañamiento al tejido empresarial andaluz, ofreciendo servicios 360º que abarcan desde la financiación empresarial y el impulso a la innovación, hasta la internacionalización, en su doble vertiente de apoyo al comercio exterior y a la atracción de inversiones. Todo ello con el objetivo de mejorar la competitividad de las empresas y favorecer su crecimiento en un entorno global.
          </p>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gray-100 w-full" />

        {/* Bloque 3: Programa FEDER */}
        <div className="flex flex-col gap-4">
          <p>
            En este marco, Andalucía TRADE gestiona y ejecuta actuaciones cofinanciadas por el{" "}
            <span className="font-[500] text-primary">Programa de Andalucía FEDER 2021-2027</span>, un instrumento clave de la política de cohesión de la Unión Europea, destinado a reducir desequilibrios territoriales y reforzar el desarrollo económico de las regiones. Estas actuaciones se orientan a apoyar la modernización del tejido productivo, promoviendo la innovación, la digitalización y la incorporación de nuevas tecnologías en las empresas andaluzas.
          </p>
          <p>
            Asimismo, el programa FEDER impulsa la mejora de la competitividad de las pymes, el fortalecimiento de la investigación y el desarrollo tecnológico, y la transición hacia un modelo económico más sostenible y eficiente en el uso de los recursos. A través de estos fondos, Andalucía TRADE canaliza ayudas, servicios y proyectos que favorecen la creación de empleo cualificado, el crecimiento empresarial y la apertura a nuevos mercados.
          </p>
          <p>
            De este modo, Andalucía TRADE contribuye a consolidar un ecosistema empresarial más dinámico e innovador, alineado con los grandes retos de la Unión Europea y comprometido con el desarrollo económico sostenible de Andalucía.
          </p>
        </div>

      </div>
    </main>
  );
}
