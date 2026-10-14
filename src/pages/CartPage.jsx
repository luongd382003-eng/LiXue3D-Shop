import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart.js'
import { orderZaloPhone } from '../config/contact.js'
import formatPrice from '../utils/formatPrice.js'

function CartPage() {
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [addressStep, setAddressStep] = useState('form')
  const [shippingInfo, setShippingInfo] = useState(null)
  const [addressMessage, setAddressMessage] = useState('')
  const [orderMessage, setOrderMessage] = useState('')
  const addressDialogRef = useRef(null)
  const orderMessageRef = useRef(null)
  const {
    cartItems,
    removeFromCart,
    returnToPath,
    total,
    updateQuantity,
  } = useCart()

  useEffect(() => {
    const dialog = addressDialogRef.current

    if (!dialog) {
      return
    }

    if (isAddressDialogOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isAddressDialogOpen && dialog.open) {
      dialog.close()
    }
  }, [isAddressDialogOpen])

  function handleAddressSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setShippingInfo(Object.fromEntries(formData.entries()))
    setAddressStep('review')
  }

  function handleAddressConfirm() {
    const orderDetails = cartItems.map(
      (item) =>
        `- ${item.name} x ${item.quantity} — ${formatPrice(item.price * item.quantity)}`,
    )
    const message = [
      'ĐƠN HÀNG MỚI - LiXue 3D Shop',
      '',
      `Người nhận: ${shippingInfo.recipientName}`,
      `Số điện thoại: ${shippingInfo.recipientPhone}`,
      `Địa chỉ: ${shippingInfo.shippingAddress}`,
      `Ghi chú: ${shippingInfo.deliveryNote || 'Không có'}`,
      '',
      'Sản phẩm:',
      ...orderDetails,
      '',
      `Tổng tiền: ${formatPrice(total)}`,
    ].join('\n')

    setOrderMessage(message)
    setAddressStep('send')
    setAddressMessage(
      'Mẫu đơn hàng đã sẵn sàng. Sao chép nội dung bên dưới, mở Zalo, dán vào cuộc trò chuyện và gửi cho cửa hàng.',
    )
  }

  async function handleCopyOrder() {
    try {
      await navigator.clipboard.writeText(orderMessage)
      setAddressMessage('Đã sao chép đơn hàng. Mở Zalo và dán để gửi cho cửa hàng.')
    } catch {
      orderMessageRef.current?.select()
      setAddressMessage(
        'Không thể sao chép tự động. Mẫu đơn đã được chọn; hãy nhấn Ctrl+C (hoặc Cmd+C), sau đó dán vào Zalo.',
      )
    }
  }

  if (cartItems.length > 0) {
    return (
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight">Giỏ hàng</h1>
          <p className="mt-3 text-slate-300">
            Kiểm tra sản phẩm và số lượng trước khi tiếp tục.
          </p>

          <div className="mt-10 space-y-4">
            {cartItems.map((item) => (
              <article
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between"
                key={item.id}
              >
                <div>
                  <h2 className="font-semibold text-white">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {formatPrice(item.price)} / sản phẩm
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    aria-label={`Số lượng ${item.name}`}
                    className="flex items-center gap-3 rounded-lg border border-white/10 px-2 py-1"
                  >
                    <button
                      aria-label={`Giảm số lượng ${item.name}`}
                      className="flex size-8 items-center justify-center rounded text-lg hover:bg-white/10"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      type="button"
                    >
                      −
                    </button>
                    <span className="min-w-5 text-center">{item.quantity}</span>
                    <button
                      aria-label={`Tăng số lượng ${item.name}`}
                      className="flex size-8 items-center justify-center rounded text-lg hover:bg-white/10"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <p className="min-w-24 font-semibold text-cyan-300">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    className="text-sm text-slate-400 underline-offset-4 hover:text-red-300 hover:underline"
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
              to={returnToPath}
            >
              ← Tiếp tục mua sắm
            </Link>
            <div className="flex flex-col gap-4 sm:items-end">
              <p className="text-xl font-bold text-white">
                Tổng cộng:{' '}
                <span className="text-cyan-300">{formatPrice(total)}</span>
              </p>
              <button
                className="rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                onClick={() => {
                  setAddressMessage('')
                  setOrderMessage('')
                  setAddressStep('form')
                  setIsAddressDialogOpen(true)
                }}
                type="button"
              >
                Thanh toán
              </button>
              {addressMessage && (
                <p
                  aria-live="polite"
                  className="mt-3 text-sm leading-6 text-amber-300"
                  role="status"
                >
                  {addressMessage}
                </p>
              )}
            </div>
          </div>

          <dialog
            aria-labelledby="shipping-address-title"
            className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/80"
            onCancel={() => setIsAddressDialogOpen(false)}
            onClick={(event) => {
              if (event.target === addressDialogRef.current) {
                setIsAddressDialogOpen(false)
              }
            }}
            ref={addressDialogRef}
          >
            {addressStep === 'form' ? (
              <form className="space-y-5 p-6 sm:p-8" onSubmit={handleAddressSubmit}>
                <div>
                  <h2
                    className="text-2xl font-bold tracking-tight"
                    id="shipping-address-title"
                  >
                    Thông tin nhận hàng
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Nhập thông tin để chuẩn bị cho đơn hàng của bạn.
                  </p>
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-200"
                    htmlFor="recipient-name"
                  >
                    Tên người nhận
                  </label>
                  <input
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
                    defaultValue={shippingInfo?.recipientName ?? ''}
                    id="recipient-name"
                    maxLength={100}
                    name="recipientName"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-200"
                    htmlFor="recipient-phone"
                  >
                    Số điện thoại
                  </label>
                  <input
                    autoComplete="tel"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
                    defaultValue={shippingInfo?.recipientPhone ?? ''}
                    id="recipient-phone"
                    maxLength={15}
                    minLength={9}
                    name="recipientPhone"
                    pattern="[0-9+() -]{9,15}"
                    placeholder="0912345678"
                    required
                    title="Nhập số điện thoại từ 9 đến 15 ký tự."
                    type="tel"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-200"
                    htmlFor="shipping-address"
                  >
                    Địa chỉ nhận hàng
                  </label>
                  <textarea
                    autoComplete="street-address"
                    className="min-h-24 w-full resize-y rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
                    defaultValue={shippingInfo?.shippingAddress ?? ''}
                    id="shipping-address"
                    maxLength={300}
                    name="shippingAddress"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-200"
                    htmlFor="delivery-note"
                  >
                    Ghi chú <span className="text-slate-500">(không bắt buộc)</span>
                  </label>
                  <textarea
                    className="min-h-20 w-full resize-y rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
                    defaultValue={shippingInfo?.deliveryNote ?? ''}
                    id="delivery-note"
                    maxLength={300}
                    name="deliveryNote"
                    placeholder="Lưu ý khi giao hàng"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsAddressDialogOpen(false)}
                    type="button"
                  >
                    Hủy
                  </button>
                  <button
                    className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    type="submit"
                  >
                    Xác nhận thông tin
                  </button>
                </div>
              </form>
            ) : addressStep === 'review' ? (
              <section className="space-y-5 p-6 sm:p-8">
                <div>
                  <h2
                    className="text-2xl font-bold tracking-tight"
                    id="shipping-address-title"
                  >
                    Xác nhận thông tin nhận hàng
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Bạn chắc chắn muốn sử dụng thông tin này chứ?
                  </p>
                </div>

                <dl className="space-y-4 rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <div>
                    <dt className="text-sm text-slate-400">Tên người nhận</dt>
                    <dd className="mt-1 break-words font-medium text-white">
                      {shippingInfo?.recipientName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-400">Số điện thoại</dt>
                    <dd className="mt-1 break-words font-medium text-white">
                      {shippingInfo?.recipientPhone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-400">Địa chỉ nhận hàng</dt>
                    <dd className="mt-1 whitespace-pre-wrap break-words font-medium text-white">
                      {shippingInfo?.shippingAddress}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-400">Ghi chú</dt>
                    <dd className="mt-1 whitespace-pre-wrap break-words font-medium text-white">
                      {shippingInfo?.deliveryNote || 'Không có'}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                  <button
                    className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setAddressStep('form')}
                    type="button"
                  >
                    Quay lại chỉnh sửa
                  </button>
                  <button
                    className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    onClick={handleAddressConfirm}
                    type="button"
                  >
                    Xác nhận thông tin
                  </button>
                </div>
              </section>
            ) : (
              <section className="space-y-5 p-6 sm:p-8">
                <div>
                  <h2
                    className="text-2xl font-bold tracking-tight"
                    id="shipping-address-title"
                  >
                    Gửi đơn hàng qua Zalo
                  </h2>
                  <p
                    aria-live="polite"
                    className="mt-2 text-sm leading-6 text-slate-300"
                    role="status"
                  >
                    {addressMessage}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Zalo không tự điền nội dung từ liên kết. Hãy sao chép mẫu đơn
                    rồi dán vào cuộc trò chuyện.
                  </p>
                </div>

                <label
                  className="block text-sm font-medium text-slate-200"
                  htmlFor="zalo-order-message"
                >
                  Nội dung đơn hàng
                </label>
                <textarea
                  className="min-h-56 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm leading-6 text-slate-200 outline-none focus:border-cyan-300"
                  id="zalo-order-message"
                  onFocus={(event) => event.currentTarget.select()}
                  ref={orderMessageRef}
                  readOnly
                  value={orderMessage}
                />

                <div className="flex flex-wrap justify-end gap-3">
                  <button
                    className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsAddressDialogOpen(false)}
                    type="button"
                  >
                    Đóng
                  </button>
                  <button
                    className="rounded-xl border border-cyan-300 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-300/10"
                    onClick={handleCopyOrder}
                    type="button"
                  >
                    Sao chép đơn hàng
                  </button>
                  <a
                    className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    href={`https://zalo.me/${orderZaloPhone}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Mở Zalo
                  </a>
                </div>
              </section>
            )}
          </dialog>
        </section>
      </main>
    )
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
          <svg
            aria-hidden="true"
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6" />
            <circle cx="10" cy="21" r="1" />
            <circle cx="18" cy="21" r="1" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Giỏ hàng</h1>
        <p className="mt-3 leading-7 text-slate-300">
          Giỏ hàng hiện chưa có sản phẩm. Hãy khám phá cửa hàng và thêm sản phẩm
          bạn yêu thích.
        </p>
        <Link
          className="mt-7 inline-flex rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          to={returnToPath}
        >
          Tiếp tục khám phá
        </Link>
      </section>
    </main>
  )
}

export default CartPage
