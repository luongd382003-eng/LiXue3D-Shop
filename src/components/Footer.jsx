import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Về cửa hàng', to: '/#about' },
  { label: 'Liên hệ', to: '/#contact' },
]
const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer
      className="border-t border-white/10 bg-slate-950 text-slate-300"
      id="contact"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2">
        <div>
          <Link className="text-lg font-bold text-white" to="/">
            LiXue <span className="text-cyan-300">3D Shop</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Không gian dành cho những ý tưởng và sản phẩm sáng tạo với công nghệ 3D.
          </p>
        </div>

        <nav aria-label="Liên kết cuối trang" className="sm:justify-self-end">
          <h2 className="mb-3 text-sm font-semibold text-white">Khám phá</h2>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-sm text-slate-400 transition hover:text-cyan-300"
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-slate-500">
          © {currentYear} LiXue 3D Shop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
