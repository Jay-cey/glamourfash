import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-serif tracking-wide">GlamourFash</h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Redefining modern style with elegance and confidence. Your destination for curated fashion that speaks volumes.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium tracking-wide">Shop</h4>
          <ul className="space-y-2 text-stone-400 text-sm">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link href="/shop/sale" className="hover:text-white transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium tracking-wide">Support</h4>
          <ul className="space-y-2 text-stone-400 text-sm">
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium tracking-wide">Stay Connected</h4>
          <p className="text-stone-400 text-sm">Subscribe for exclusive offers and style updates.</p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-stone-800 border border-stone-700 text-white px-4 py-2 rounded focus:outline-none focus:border-stone-500 text-sm transition-colors"
            />
            <button className="bg-white text-stone-900 px-4 py-2 rounded text-sm font-medium hover:bg-stone-200 transition-colors uppercase tracking-wider">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-stone-800 mt-16 pt-8 text-center text-stone-500 text-sm">
        <p>© {new Date().getFullYear()} GlamourFash. All rights reserved.</p>
        <p className="mt-2 opacity-75 text-xs">Built by Cxer</p>
      </div>
    </footer>
  )
}

export default Footer