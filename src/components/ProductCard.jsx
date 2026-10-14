import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useCart from '../hooks/useCart.js'
import formatPrice from '../utils/formatPrice.js'

function ProductArtwork({ artwork }) {
  if (artwork === 'star') {
    return (
      <svg aria-hidden="true" className="size-24" fill="currentColor" viewBox="0 0 96 96">
        <path d="m48 12 10.8 22 24.2 3.5-17.5 17 4.1 24L48 67.2 26.4 78.5l4.1-24L13 37.5 37.2 34 48 12Z" />
      </svg>
    )
  }

  if (artwork === 'name') {
    return (
      <span className="rounded-2xl border-2 border-current px-5 py-3 text-2xl font-bold tracking-widest">
        NAME
      </span>
    )
  }

  if (artwork === 'vase') {
    return (
      <svg
        aria-hidden="true"
        className="size-24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 96 96"
      >
        <path d="M38 17h20M40 17c1 12-2 17-8 25l5 36h22l5-36c-6-8-9-13-8-25M35 51h26" />
      </svg>
    )
  }

  if (artwork === 'sculpture') {
    return (
      <svg
        aria-hidden="true"
        className="size-24"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 96 96"
      >
        <path d="m48 13 29 17v36L48 83 19 66V30l29-17Z" />
        <path d="m19 30 29 17 29-17M48 47v36M34 22l29 17" />
      </svg>
    )
  }

  if (artwork === 'planter') {
    return (
      <svg
        aria-hidden="true"
        className="size-24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 96 96"
      >
        <path d="M48 51V27M48 40c-12-15-24-8-20 2 5 7 12 6 20 5M48 34c9-16 22-10 19 0-4 8-11 9-19 8" />
        <path d="M31 52h34l-4 29H35l-4-29ZM28 52h40" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="size-24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 96 96"
    >
      <path d="M48 15c-9 0-15 7-15 15 0 6 3 10 7 13l-5 4-3 31h32l-3-31-5-4c4-3 7-7 7-13 0-8-6-15-15-15Z" />
      <path d="M40 35c2-2 4-2 6 0M52 35c2-2 4-2 6 0M44 44c2 2 6 2 8 0M37 57h22" />
    </svg>
  )
}

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const location = useLocation()
  const [added, setAdded] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const imageDialogRef = useRef(null)

  useEffect(() => {
    const dialog = imageDialogRef.current

    if (!dialog) {
      return
    }

    if (isImageOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isImageOpen && dialog.open) {
      dialog.close()
    }
  }, [isImageOpen])

  function handleAddToCart() {
    addToCart(
      product.id,
      `${location.pathname}${location.search}${location.hash}`,
    )
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20">
      <button
        aria-label={`Xem ảnh lớn của ${product.name}`}
        className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-300"
        onClick={() => setIsImageOpen(true)}
        type="button"
      >
        <div className={`flex h-52 items-center justify-center bg-gradient-to-br ${product.accent} text-white`}>
          {product.image ? (
            <img
              alt=""
              className="size-full object-cover transition duration-300 hover:scale-105"
              loading="lazy"
              src={product.image}
            />
          ) : (
            <ProductArtwork artwork={product.artwork} />
          )}
        </div>
      </button>
      <div className="p-5">
        <h2 className="text-lg font-semibold text-white">{product.name}</h2>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
          {product.description}
        </p>
      </div>
      <div className="px-5 pb-5">
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-semibold text-cyan-300">
            {formatPrice(product.price)}
          </p>
          <button
            className="rounded-lg bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            onClick={handleAddToCart}
            type="button"
          >
            {added ? 'Đã thêm!' : 'Thêm vào giỏ'}
          </button>
        </div>
      </div>
      <dialog
        aria-label={`Ảnh sản phẩm ${product.name}`}
        className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/85"
        onCancel={() => setIsImageOpen(false)}
        onClick={(event) => {
          if (event.target === imageDialogRef.current) {
            setIsImageOpen(false)
          }
        }}
        ref={imageDialogRef}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <h3 className="font-semibold">{product.name}</h3>
          <button
            aria-label="Đóng ảnh"
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
            onClick={() => setIsImageOpen(false)}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="flex max-h-[calc(90vh-4.5rem)] items-center justify-center bg-black/30 p-3 sm:p-6">
          {product.image ? (
            <img
              alt={product.imageAlt || product.name}
              className="max-h-[calc(90vh-7rem)] max-w-full object-contain"
              src={product.image}
            />
          ) : (
            <div className="flex min-h-64 items-center justify-center p-8 text-white">
              <ProductArtwork artwork={product.artwork} />
            </div>
          )}
        </div>
      </dialog>
    </article>
  )
}

export default ProductCard
