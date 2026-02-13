import { MagicBento } from "@/components/ui/MagicBento";

export default function SobrePage() {
  return (
    <div className="pt-24 min-h-screen bg-black">
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">SOBRE <span className="text-primary">NOSOTROS</span></h1>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">GEDA Unlimited nace para elevar el estilo urbano con tecnología, diseño y detalle. Buscamos que cada pieza conecte con tu identidad.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <MagicBento className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Misión</h3>
              <p className="text-gray-400">Crear ropa y accesorios que combinen funcionalidad, comodidad y estética futurista para el día a día.</p>
            </MagicBento>
            <MagicBento className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Visión</h3>
              <p className="text-gray-400">Ser referencia del streetwear tecnológico en Latinoamérica con procesos responsables y experiencias únicas.</p>
            </MagicBento>
            <MagicBento className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Valores</h3>
              <ul className="text-gray-400 space-y-1">
                <li>Calidad</li>
                <li>Innovación</li>
                <li>Autenticidad</li>
              </ul>
            </MagicBento>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <MagicBento className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Contacto</h3>
              <p className="text-gray-400">Atención al cliente: L–S 9:00–18:00</p>
              <p className="text-gray-400">Envíos a todo Lima Metropolitana</p>
            </MagicBento>
            <MagicBento className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Sostenibilidad</h3>
              <p className="text-gray-400">Prendas duraderas y empaques optimizados. Trabajamos con proveedores responsables.</p>
            </MagicBento>
          </div>
        </div>
          
          {/* Equipo */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6">Nuestro Equipo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { nombre: "Dirección Creativa", desc: "Concepto, estética y campañas." },
                { nombre: "Diseño & Producto", desc: "Patrones, materiales y pruebas." },
                { nombre: "Operaciones", desc: "Logística, atención y envíos." },
              ].map((m, i) => (
                <MagicBento key={i} className="p-6">
                  <div className="h-24 bg-white/10 mb-4" />
                  <h3 className="text-lg font-bold text-white">{m.nombre}</h3>
                  <p className="text-gray-400">{m.desc}</p>
                </MagicBento>
              ))}
            </div>
          </div>
          {/* Sección de equipo mantiene responsividad sin timeline */}
      </section>
    </div>
  );
}
