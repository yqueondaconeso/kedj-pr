"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard, CheckCircle, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  // Tu número de WhatsApp real
  const WHATSAPP_NUMBER = "5491127879534" // Tu número: +54 9 11 2787-9534

  const songId = searchParams.get("songId")
  const title = searchParams.get("title")
  const artist = searchParams.get("artist")
  const price = searchParams.get("price")
  const imageUrl = searchParams.get("imageUrl") || "/placeholder.svg?height=120&width=120"

  const handleMercadoPagoPayment = async () => {
    setIsProcessing(true)

    // Simulamos el proceso de pago con Mercado Pago
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentComplete(true)
    }, 2000)
  }

  const goBackToHome = () => {
    window.location.href = "/"
  }

  const sendGreetingToWhatsApp = () => {
    const message = `¡Hola! 👋

Acabo de pedir una canción en Ke DJ:
🎵 "${title}" - ${artist}

¡Saludos desde la feria! 💥
Y que onda con eso? 🚀
Fecha: ${new Date().toLocaleString("es-AR")}`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8">
        <div className="bg-gray-100 rounded-xl p-8 w-full max-w-md text-center border-2 border-green-400">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>

          <div className="bg-white rounded-lg p-6 mb-6 border-2 border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title || "Portada del álbum"}
                width={120}
                height={120}
                className="rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-xl font-semibold text-purple-600 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{artist}</p>
            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4">
              <p className="text-green-700 font-bold text-lg">🎵 Canción en cola</p>
              <p className="text-green-600 text-sm mt-1">Tu tema se reproducirá pronto</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={sendGreetingToWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Mandar un saludo</span>
            </button>

            <button
              onClick={goBackToHome}
              className="w-full bg-[#ff7b00] hover:bg-[#e76b00] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Pedir otra canción
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start p-8">
      <header className="w-full max-w-md mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>

        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-xl object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-purple-600 mb-2">Confirmar Pedido</h1>
        </div>
      </header>

      <div className="bg-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-gray-200">
        {/* Detalles de la canción */}
        <div className="bg-white rounded-lg p-4 mb-6 border-2 border-gray-200">
          <div className="flex items-center space-x-4 mb-3">
            <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title || "Portada del álbum"}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600">{artist}</p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Precio:</span>
              <span className="text-[#ff7b00] font-bold text-xl">${price} ARS</span>
            </div>
          </div>
        </div>

        {/* Botón de pago con Mercado Pago */}
        <button
          onClick={handleMercadoPagoPayment}
          disabled={isProcessing}
          className="w-full bg-[#009ee3] hover:bg-[#0084c7] disabled:bg-gray-400 text-white font-bold py-4 px-4 rounded-lg transition-colors duration-300 text-base focus:outline-none focus:ring-[#009ee3] shadow-lg flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Pagar con Mercado Pago</span>
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">Pago seguro con Mercado Pago</p>
          <p className="text-xs text-gray-500 mt-1">Tu canción entrará en cola automáticamente</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-700 text-sm">
        <p className="font-semibold">💥 Pago 100% seguro 💥</p>
      </div>
    </div>
  )
}
