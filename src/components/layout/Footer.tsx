import Link from "next/link";
import { Twitter, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../../Fotos/PNG/Recurso 10@10x.png";

const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center">
                            <Image src={Logo} alt="GEDA" className="h-8 w-auto" />
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Streetwear exclusivo diseñado para destacar. Calidad premium y diseños únicos para quienes no siguen reglas.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Tienda</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/shop/hombre" className="hover:text-primary transition-colors">STREET HOMBRE</Link></li>
                            <li><Link href="/shop/mujer" className="hover:text-primary transition-colors">GIRL SHOP</Link></li>
                            <li><Link href="/shop/accesorios" className="hover:text-primary transition-colors">Accesorios</Link></li>
                            <li><Link href="/shop/new" className="hover:text-primary transition-colors">Novedades</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Ayuda</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="/envios" className="hover:text-primary transition-colors">Envíos y Devoluciones</Link></li>
                            <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
                            <li><Link href="/tallas" className="hover:text-primary transition-colors">Guía de Tallas</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-gray-400 mb-2">Recibe las últimas novedades y ofertas exclusivas.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Tu correo"
                                    className="bg-background border border-input rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <Button size="icon" variant="default">
                                    →
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} GEDA Unlimited. Todos los derechos reservados.
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
