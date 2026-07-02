import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "Aviso Legal — Andalucía TRADE IMPULSA",
};

export default function AvisoLegalPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 py-12">
      <Breadcrumb crumbs={[{ label: "Inicio", href: "/" }, { label: "Aviso Legal" }]} />

      <h1 className="font-brand text-primary text-3xl font-[600] mb-10">Aviso Legal</h1>

      <div className="flex flex-col gap-8 text-secondary text-[15px] leading-relaxed">

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Datos identificativos del titular de la web</h2>
          <p><strong>Andalucía TRADE</strong> — Agencia Empresarial para la Transformación y el Desarrollo Económico gestiona el portal www.andaluciatrade.es. Se dedica al desarrollo, planificación y ejecución de acciones de promoción de empresas y productos andaluces.</p>
          <ul className="mt-3 flex flex-col gap-1 list-disc list-inside">
            <li>Domicilio: Calle Leonardo Da Vinci, número 17a, 41092 Sevilla</li>
            <li>CIF: Q4101007E</li>
            <li>Email: <a href="mailto:info@andaluciatrade.es" className="text-primary hover:underline">info@andaluciatrade.es</a></li>
          </ul>
          <p className="mt-3">Conforme a la Ley 34/2002 sobre Servicios de la Sociedad de la Información, la entidad comunica que el español prevalecerá sobre cualquier interpretación en otro idioma que pudiera causar confusión.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Definiciones</h2>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            <li><strong>Página:</strong> Dominio www.andaluciatrade.es</li>
            <li><strong>Usuario:</strong> Personas físicas o jurídicas que utilizan la web</li>
            <li><strong>Contenido:</strong> Páginas, mensajes, textos, fotografías, gráficos, software y cualquier clase de material contenido en la Página</li>
            <li><strong>Web:</strong> Sistema de acceso informativo mediante HTML y lenguajes de programación</li>
            <li><strong>Hiperenlace:</strong> Técnica de navegación mediante clicks sobre elementos vinculados</li>
            <li><strong>Cookies:</strong> Pequeños ficheros de texto que se escriben en el ordenador del Usuario para rastreo</li>
          </ul>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Condiciones de uso</h2>
          <p>El mero uso implica aceptación completa del aviso legal. Los usuarios se comprometen a cumplir con legislación vigente y normas de convivencia.</p>
          <p className="mt-3 font-[500]">Prohibiciones específicas:</p>
          <ul className="mt-2 flex flex-col gap-1 list-disc list-inside">
            <li>Utilizar contenidos con fines o efectos ilícitos</li>
            <li>Reproducir, copiar o distribuir sin autorización escrita</li>
            <li>Manipular identificadores de derechos de autor</li>
            <li>Obtener contenido mediante procedimientos no autorizados</li>
          </ul>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Propiedad intelectual</h2>
          <p>Todas las marcas, nombres comerciales o signos distintivos pertenecen a Andalucía TRADE o a terceros autorizados. Los usuarios no adquieren derechos sobre estos elementos mediante el acceso.</p>
          <p className="mt-3">Los contenidos constituyen propiedad intelectual de la entidad o terceros, correspondiendo exclusivamente a estos los derechos de reproducción, distribución, comunicación pública y transformación.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Hiperenlaces</h2>
          <p>Requieren autorización expresa excepto para enlaces a página de inicio. Se prohíben:</p>
          <ul className="mt-2 flex flex-col gap-1 list-disc list-inside">
            <li>Crear marcos (frames) con páginas de la entidad</li>
            <li>Manifestaciones falsas u ofensivas</li>
            <li>Declarar autorización cuando no existe</li>
            <li>Incluir contenidos ilícitos en la página de origen</li>
          </ul>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Disponibilidad de la página</h2>
          <p>Andalucía TRADE no garantiza la inexistencia de interrupciones o errores en acceso o contenidos y excluye cualquier responsabilidad por daños derivados de falta de disponibilidad.</p>
          <p className="mt-3">No responde por:</p>
          <ul className="mt-2 flex flex-col gap-1 list-disc list-inside">
            <li>Contenidos de páginas enlazadas</li>
            <li>Funcionamiento de hiperenlaces</li>
            <li>Virus u elementos dañinos</li>
            <li>Errores de seguridad durante la prestación</li>
          </ul>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Calidad de la página</h2>
          <p>Andalucía TRADE realiza los mejores esfuerzos pero no garantiza la completa veracidad, exactitud, fiabilidad, utilidad y/o actualidad de los contenidos. La información tiene carácter informativo, consultivo, divulgativo y publicitario, sin ser vinculante contractualmente.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Limitación de responsabilidad</h2>
          <p>La entidad excluye toda responsabilidad por las decisiones que el usuario pueda tomar basado en esta información. Procede al borrado inmediato de contenidos que infrinjan derechos fundamentales en un plazo nunca superior a 72 horas desde conocimiento efectivo.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Notificaciones</h2>
          <p>Todas las notificaciones por cualquier medio, incluyendo correo electrónico, se consideran eficaces a todos los efectos.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Disponibilidad de contenidos</h2>
          <p>La prestación tiene duración indefinida, pero Andalucía TRADE puede terminar o suspender la prestación en cualquier momento, advirtiendo previamente cuando sea razonablemente posible.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Protección de datos de carácter personal</h2>
          <p>La entidad implementa una política de tratamiento de datos orientada a proporcionar la máxima seguridad, garantizando el cumplimiento normativo.</p>
          <p className="mt-3 font-[500]">Responsable del tratamiento:</p>
          <ul className="mt-1 flex flex-col gap-1 list-disc list-inside">
            <li>Andalucía TRADE, Calle Leonardo Da Vinci 17 A, 41092 Sevilla</li>
            <li>Email: <a href="mailto:privacidad@andaluciatrade.es" className="text-primary hover:underline">privacidad@andaluciatrade.es</a></li>
          </ul>
          <p className="mt-3 font-[500]">Finalidades del tratamiento:</p>
          <ol className="mt-1 flex flex-col gap-1 list-decimal list-inside">
            <li>Inscripción en actividades organizadas</li>
            <li>Gestión de cursos, actividades y eventos</li>
            <li>Envío de comunicaciones comerciales</li>
          </ol>
          <p className="mt-3"><strong>Legitimación:</strong> RGPD 6.1.e) (misión de interés público) y 6.1.b) (ejecución contractual).</p>
          <p className="mt-2"><strong>Datos recabados:</strong> Nombre, apellidos, DNI/NIF, dirección, firma, teléfono, sector de actividad. Para empresas: datos bancarios. Para alumnos/profesores: datos académicos.</p>
          <p className="mt-2"><strong>Destinatarios:</strong> Entidades y formadores que colaboren en actividades específicas.</p>
          <p className="mt-2"><strong>Derechos ejercibles:</strong> Acceso, rectificación, supresión, limitación, portabilidad y oposición.</p>
          <p className="mt-2"><strong>Plazo de conservación:</strong> Indefinido mientras no se solicite la supresión; se mantiene el tiempo necesario para cumplir la finalidad y determinar responsabilidades.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Cookies</h2>
          <p>Las cookies son ficheros enviados a un navegador por medio de un servidor web para registrar las actividades del usuario. Se utilizan para facilitar un acceso más rápido y personalizar los servicios según preferencias. No recaban datos de carácter personal per se.</p>
          <p className="mt-3"><strong>Google Analytics:</strong> La web utiliza Google Analytics para análisis estadístico. La información generada por la cookie acerca del uso del sitio (incluyendo la dirección IP) será directamente gestionada y archivada por Google. Los usuarios pueden configurar su navegador para rechazar el uso de cookies.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Redes sociales</h2>
          <p>Existen enlaces a plataformas de redes sociales gestionadas conforme a los términos propios de cada plataforma, que constituyen entidades jurídicas ajenas al titular de la presente web. Para asistencia: <a href="mailto:info@andaluciatrade.es" className="text-primary hover:underline">info@andaluciatrade.es</a></p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Acceso a través del móvil</h2>
          <p>El acceso es gratuito. La entidad no se responsabiliza de que el operador de telefonía móvil pudiera realizar cualquier tipo de cobro.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Portal de transparencia</h2>
          <p>Atiende la Ley 19/2013 sobre transparencia y la Ley 1/2014 de Transparencia Pública de Andalucía, publicando información relevante mediante mecanismos adecuados para facilitar la accesibilidad, interoperabilidad, calidad y reutilización.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Jurisdicción</h2>
          <p>Para cuestiones sobre interpretación y cumplimiento, las partes acuerdan someterse a procedimiento de mediación online con mediador acreditado. En defecto: jueces y tribunales de Sevilla.</p>
        </section>

        <section>
          <h2 className="font-brand text-primary text-xl font-[600] mb-3">Legislación aplicable</h2>
          <p>El Aviso Legal se rige por la ley española.</p>
        </section>

      </div>
    </main>
  );
}
