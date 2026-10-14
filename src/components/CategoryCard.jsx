import { Link } from 'react-router-dom'

function CategoryIllustration({ icon }) {
  if (icon === 'keychain') {
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
        <circle cx="48" cy="23" r="11" />
        <path d="M48 34v8" />
        <path d="M34 42h28l-3 34H37l-3-34Z" />
        <path d="M43 53h10M43 61h10" />
      </svg>
    )
  }

  if (icon === 'decoration') {
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
        <path d="M39 18c-1 13 2 19 9 24 7-5 10-11 9-24-8 1-13 1-18 0Z" />
        <path d="M48 42v13" />
        <path d="M35 51h26l-3 28H38l-3-28Z" />
        <path d="M32 79h32" />
        <path d="M48 36c-8-9-16-7-17-1 5 5 10 6 17 6M48 32c7-9 14-8 17-3-4 5-9 7-17 8" />
      </svg>
    )
  }

  if (icon === 'custom-design') {
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
        <path d="m57 23 16 16M24 72l5-18 37-37a8 8 0 0 1 11 11L40 75l-16 5Z" />
        <path d="m29 54 16 16M21 84h54" />
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
      <path d="m48 14 27 15v38L48 82 21 67V29l27-15Z" />
      <path d="m21 29 27 16 27-16M48 45v37M35 22l27 16" />
    </svg>
  )
}

function CategoryCard({ category }) {
  return (
    <Link
      aria-label={`Xem danh mục ${category.title}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
      to={`/shop/${category.id}`}
    >
      <div
        className={`flex h-52 items-center justify-center bg-gradient-to-br ${category.accent}`}
      >
        {category.image ? (
          <img
            alt=""
            className="size-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
            src={category.image}
          />
        ) : (
          <div className={`${category.iconColor} transition duration-300 group-hover:scale-110`}>
            <CategoryIllustration icon={category.icon} />
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Danh mục sản phẩm
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {category.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {category.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
          Xem sản phẩm <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard
