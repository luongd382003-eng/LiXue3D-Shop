import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="flex-1">
      <section
        className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center"
        id="home"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          LiXue 3D Shop
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Biến ý tưởng thành <span className="text-cyan-300">sản phẩm 3D</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
          Khám phá những thiết kế sáng tạo và tìm cảm hứng cho dự án tiếp theo
          của bạn.
        </p>
        <Link
          className="mt-8 rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          to="/shop"
        >
          Khám phá cửa hàng
        </Link>
      </section>

      <section
        className="border-y border-white/10 bg-white/[0.03] px-6 py-16"
        id="about"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Sáng tạo không giới hạn
          </h2>
          <p className="mt-4 leading-7 text-slate-300">
            LiXue 3D Shop là nơi bắt đầu cho những ý tưởng được tạo nên bằng
            công nghệ 3D. Nội dung và danh mục sản phẩm có thể được bổ sung tại
            đây khi cửa hàng phát triển.
          </p>
        </div>
      </section>
    </main>
  )
}

export default HomePage
