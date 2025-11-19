import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function PoliticaDatos() {
  return (
    <GuestLayout className="bg-[#f5f5f5] max-w-6xl">
        
        <h1 className="text-3xl font-bold text-center text-[#2B1F1F] mb-6">
        Políticas de Tratamiento de Datos Personales - CraftRoute
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Introducción</h2>
          <p className="text-justify leading-relaxed">
            En este apartado se establecen las políticas de tratamientos de datos personales
            de <strong>CraftRoute</strong>, la cual utiliza inteligencia artificial para la
            recomendación y comercialización de productos artesanales en los municipios de
            Morroa y Sampués, Sucre.
          </p>
          <p className="text-justify leading-relaxed mt-3">
            CraftRoute reconoce la importancia de proteger la privacidad y los datos personales
            de los usuarios que interactúan con nuestra plataforma. Estas políticas se basan en
            el respeto a la dignidad humana y el derecho fundamental a la intimidad, garantizando
            transparencia, seguridad y cumplimiento con la legislación colombiana vigente.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Marco Normativo</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Constitución Política de Colombia (1991), Artículo 15.</li>
            <li>Ley 1581 de 2012: Protección de datos personales.</li>
            <li>Decreto 1377 de 2013: Reglamenta parcialmente la Ley 1581.</li>
            <li>Ley 1266 de 2008: Regula el manejo de bases de datos personales.</li>
            <li>
              Decisión 486 de 2000: Protege la propiedad intelectual y el patrimonio cultural y
              biológico.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Finalidades del Tratamiento</h2>
          <h3 className="font-medium mt-3 mb-1">Para usuarios compradores:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gestión contractual: pedidos, facturación, envíos y soporte postventa.</li>
            <li>
              Personalización mediante IA: recomendaciones basadas en historial y preferencias.
            </li>
            <li>
              Geolocalización: sugerir rutas artesanales y calcular costos de envío según
              distancia.
            </li>
            <li>
              Comunicaciones: notificaciones sobre pedidos, confirmaciones y promociones.
            </li>
          </ul>

          <h3 className="font-medium mt-4 mb-1">Para usuarios artesanos:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Gestión de tienda virtual: creación de perfil, catálogo, inventario y precios.
            </li>
            <li>Procesamiento de transacciones y reportes fiscales.</li>
            <li>
              Análisis de desempeño: estadísticas de ventas y métricas de gestión artesanal.
            </li>
            <li>
              Promoción de tradición artesanal: documentación de técnicas, procesos y valor
              cultural de los productos.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Derechos de los Titulares y Revocatoria de Autorización
          </h2>
          <p className="text-justify leading-relaxed">
            Los titulares de los datos personales pueden conocer, actualizar, rectificar o
            solicitar la supresión de su información en cualquier momento. Así mismo, pueden
            revocar la autorización otorgada para el tratamiento de sus datos o presentar
            quejas ante la Superintendencia de Industria y Comercio cuando consideren que se ha
            vulnerado su derecho a la protección de datos personales.
          </p>
        </section>
    </GuestLayout>
  );
}
