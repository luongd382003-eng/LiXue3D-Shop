import CategoryCard from '../components/CategoryCard.jsx'
import shopCategories from '../data/shopCategories.js'

function ShopPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          LiXue 3D Shop
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Khám phá cửa hàng
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">
          Khám phá các sản phẩm 3D được thiết kế để thể hiện cá tính và làm
          không gian của bạn thêm đặc biệt.
        </p>

        <section aria-labelledby="shop-categories-title" className="mt-14">
          <div className="mb-6">
            <h2
              className="text-2xl font-bold tracking-tight text-white"
              id="shop-categories-title"
            >
              Danh mục sản phẩm
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Các danh mục hiện có trong cửa hàng.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shopCategories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default ShopPage
