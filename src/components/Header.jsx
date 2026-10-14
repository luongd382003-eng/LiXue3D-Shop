import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart.js'

const navigation = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Về cửa hàng', to: '/#about' },
  { label: 'Liên hệ', to: '/shop/contact' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 text-slate-100 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          aria-label="LiXue 3D Shop - Trang chủ"
          className="flex items-center gap-3"
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            alt=""
            className="size-10 rounded-full border border-cyan-300/50 object-cover"
            height="40"
            src="/images/lixue-3d-shop.png"
            width="40"
          />
          <span className="text-lg font-bold tracking-tight">
            LiXue <span className="text-cyan-300">3D Shop</span>
          </span>
        </Link>

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
          className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-xl hover:bg-white/10 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? '×' : '☰'}
        </button>

        <nav
          aria-label="Điều hướng chính"
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-white/10 bg-slate-950 p-4 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          {navigation.map((item) => (
            <Link
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-cyan-300 md:px-0 md:py-1"
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            aria-label={`Giỏ hàng, ${itemCount} sản phẩm`}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 md:mt-0"
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
            <span>Giỏ hàng</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-slate-950/15 text-xs">
              {itemCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
