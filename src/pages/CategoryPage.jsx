import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { customDesignContacts } from '../config/contact.js'
import shopCategories from '../data/shopCategories.js'
import shopProducts from '../data/shopProducts.js'

function CategoryPage() {
  const { categoryId } = useParams()
  const category = shopCategories.find((item) => item.id === categoryId)

  if (!category) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Không tìm thấy danh mục</h1>
        <p className="mt-3 text-slate-300">
          Danh mục này không tồn tại hoặc đã được gỡ khỏi cửa hàng.
        </p>
        <Link
          className="mt-6 rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          to="/shop"
        >
          Xem tất cả danh mục
        </Link>
      </main>
    )
  }

  const products = shopProducts.filter(
    (product) => product.categoryId === category.id,
  )

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <Link
          className="text-sm font-medium text-slate-400 transition hover:text-cyan-300"
          to="/shop"
        >
          ← Tất cả danh mục
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          LiXue 3D Shop
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {category.title}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">
          {category.description}
        </p>

        {category.id === 'contact' ? (
          <section aria-labelledby="custom-design-contact-title" className="mt-14">
            <div className="max-w-2xl">
              <h2
                className="text-2xl font-bold tracking-tight text-white"
                id="custom-design-contact-title"
              >
                Cùng trao đổi ý tưởng
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                Nhắn tin cho cửa hàng về ý tưởng, kích thước, màu sắc hoặc gửi
                hình tham khảo. Chúng tôi sẽ trao đổi thêm để tư vấn thiết kế
                phù hợp với yêu cầu của bạn.
              </p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {customDesignContacts.map((contact) => (
                <article
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  key={contact.id}
                >
                  <p className={`text-sm font-semibold ${contact.accent}`}>
                    {contact.name}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {contact.description}
                  </p>
                  <a
                    className="mt-6 inline-flex rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                    href={contact.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {contact.actionLabel}
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section aria-labelledby="category-products-title" className="mt-14">
            <h2
              className="mb-6 text-2xl font-bold tracking-tight text-white"
              id="category-products-title"
            >
              Sản phẩm
            </h2>
            {products.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center text-slate-400">
                Danh mục này chưa có sản phẩm.
              </p>
            )}
          </section>
        )}
      </section>
    </main>
  )
}

export default CategoryPage
