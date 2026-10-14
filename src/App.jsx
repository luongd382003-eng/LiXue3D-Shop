import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import CartPage from './pages/CartPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'

function App() {
  return (
    <div
      className="flex min-h-screen flex-col bg-slate-950 text-slate-100"
      style={{
        backgroundImage:
          'linear-gradient(rgba(2, 6, 23, 0.84), rgba(2, 6, 23, 0.92)), url("/images/lixue-3d-shop.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ShopPage />} path="/shop" />
        <Route element={<CategoryPage />} path="/shop/:categoryId" />
        <Route element={<CartPage />} path="/cart" />
        <Route
          element={
            <main className="flex flex-1 items-center justify-center px-6 py-20 text-center">
              <div>
                <h1 className="text-3xl font-bold">Không tìm thấy trang</h1>
                <p className="mt-3 text-slate-300">
                  Địa chỉ bạn truy cập không tồn tại.
                </p>
              </div>
            </main>
          }
          path="*"
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
