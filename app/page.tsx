"use client"

import { useState, useEffect } from "react"
import { Search, Loader2, Music, CheckCircle, MessageCircle, Instagram } from "lucide-react"
import Image from "next/image"

// Tipos para Spotify
interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  duration_ms: number
  external_urls: {
    spotify: string
  }
}

export default function KeDJPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addedSongs, setAddedSongs] = useState<Set<string>>(new Set())
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null)

  // Tu número de WhatsApp real
  const WHATSAPP_NUMBER = "5491127879534"

  // Cambiar el useEffect para buscar automáticamente
  const searchSpotify = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowResults(false)
      return []
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/spotify?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.error) {
        console.error("Error en la búsqueda:", data.error)
        setError("Error al buscar en Spotify: " + data.error)
        setSearchResults([])
        return []
      } else {
        setSearchResults(data.tracks)
        setShowResults(true)
        return data.tracks
      }
    } catch (err) {
      console.error("Error buscando en Spotify:", err)
      setError("No se pudo conectar con Spotify. Intenta de nuevo.")
      setSearchResults([])
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Agregar useEffect para búsqueda automática
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchSpotify(searchQuery)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Modificar la función handleAddToPlaylist para que no abra WhatsApp automáticamente
  // Reemplazar la función actual con esta versión:

  const handleAddToPlaylist = (track: SpotifyTrack) => {
    // Agregar la canción a la lista de agregadas
    setAddedSongs((prev) => new Set([...prev, track.id]))

    // Mostrar mensaje de éxito
    setShowSuccessMessage(`"${track.name}" agregada a la playlist`)

    // Ya NO enviamos mensaje a WhatsApp automáticamente
    // Eliminamos: sendGreetingToWhatsApp(track.name)

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setShowSuccessMessage(null)
    }, 3000)
  }

  const sendGreetingToWhatsApp = (songTitle?: string) => {
    const message = `¡Hola! 👋

Acabo de pedir un tema en #KeDJ!${
      songTitle
        ? `
🎶 "${songTitle}"`
        : ""
    }

Saludos de la plaza! 💥
Fecha: ${new Date().toLocaleString("es-AR")}`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const openInstagram = () => {
    window.open("https://www.instagram.com/yqueondaenlaferia", "_blank")
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
    setError(null)
  }

  // Formatea la duración de ms a formato mm:ss
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex flex-col items-center justify-start p-4 relative overflow-hidden max-w-md mx-auto">
      {/* Elementos decorativos espaciales y musicales - centrados */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        {/* Cohetes */}
        <div className="absolute top-20 text-3xl animate-bounce" style={{ animationDelay: "0s" }}>
          🚀
        </div>
        <div className="absolute top-32 left-16 text-2xl animate-bounce" style={{ animationDelay: "1s" }}>
          🚀
        </div>
        <div className="absolute top-32 right-16 text-2xl animate-bounce" style={{ animationDelay: "2s" }}>
          🚀
        </div>

        {/* Naves espaciales */}
        <div className="absolute top-48 text-4xl animate-pulse" style={{ animationDelay: "0.5s" }}>
          🛸
        </div>
        <div className="absolute top-64 left-12 text-3xl animate-pulse" style={{ animationDelay: "1.5s" }}>
          🛸
        </div>
        <div className="absolute top-64 right-12 text-3xl animate-pulse" style={{ animationDelay: "2.5s" }}>
          🛸
        </div>

        {/* Notas musicales */}
        <div className="absolute top-80 text-3xl animate-ping" style={{ animationDelay: "0.3s" }}>
          🎵
        </div>
        <div className="absolute top-96 left-8 text-2xl animate-ping" style={{ animationDelay: "1.3s" }}>
          🎶
        </div>
        <div className="absolute top-96 right-8 text-2xl animate-ping" style={{ animationDelay: "2.3s" }}>
          🎵
        </div>
        <div className="absolute bottom-32 text-3xl animate-ping" style={{ animationDelay: "3.3s" }}>
          🎶
        </div>

        {/* Estrellas y planetas */}
        <div className="absolute top-12 text-xl animate-pulse" style={{ animationDelay: "0.7s" }}>
          ⭐
        </div>
        <div className="absolute top-36 left-20 text-lg animate-pulse" style={{ animationDelay: "1.7s" }}>
          🌟
        </div>
        <div className="absolute top-36 right-20 text-lg animate-pulse" style={{ animationDelay: "2.7s" }}>
          ⭐
        </div>
        <div className="absolute top-56 left-4 text-2xl animate-pulse" style={{ animationDelay: "1.2s" }}>
          🪐
        </div>
        <div className="absolute top-56 right-4 text-2xl animate-pulse" style={{ animationDelay: "2.2s" }}>
          🌙
        </div>

        {/* Efectos de partículas */}
        <div
          className="absolute top-44 left-8 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"
          style={{ animationDelay: "0.8s" }}
        ></div>
        <div
          className="absolute top-44 right-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: "1.8s" }}
        ></div>
        <div
          className="absolute top-72 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
          style={{ animationDelay: "2.8s" }}
        ></div>
      </div>

      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 mx-4">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm">{showSuccessMessage}</span>
        </div>
      )}

      <header className="text-center mb-6 relative z-10 w-full">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src="/logo.png"
            alt="Y Que Onda Con Eso? - Logo de #KeDJ!"
            width={128}
            height={128}
            className="rounded-2xl object-contain mx-auto drop-shadow-2xl"
            priority
          />
        </div>

        <div className="relative">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-2 tracking-wider transform rotate-1 font-sans">
            #KeDJ!
          </h1>
          <div className="absolute -top-2 -right-2 text-2xl animate-spin">🎧</div>
          <div className="absolute -top-1 -left-2 text-xl animate-bounce">🎤</div>
        </div>

        <p className="text-gray-200 text-base font-semibold px-4 mt-4">¡Pedí tu tema y hacé vibrar la plaza!</p>
      </header>

      <section className="bg-white/10 backdrop-blur-md rounded-xl p-4 w-full shadow-2xl relative z-10 border border-white/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
          )}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar canción o artista..."
            className="w-full pl-12 pr-12 py-3 text-gray-900 bg-white rounded-lg border-2 border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
          />
        </div>

        {/* Resultados de búsqueda */}
        {showResults && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Resultados:</h3>
              <button onClick={clearSearch} className="text-gray-300 hover:text-white text-sm">
                Limpiar
              </button>
            </div>

            {error ? (
              <div className="text-center py-8">
                <p className="text-red-400">{error}</p>
                <p className="text-sm text-gray-300 mt-2">Intenta de nuevo más tarde</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {searchResults.map((track) => (
                  <div
                    key={track.id}
                    className={`bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-colors cursor-pointer border ${
                      addedSongs.has(track.id)
                        ? "border-green-400 bg-green-400/20"
                        : "border-white/30 hover:border-yellow-400/50 hover:bg-white/30"
                    }`}
                    onClick={() => !addedSongs.has(track.id) && handleAddToPlaylist(track)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-800 rounded overflow-hidden">
                        <Image
                          src={track.album.images[0]?.url || "/placeholder.svg?height=48&width=48"}
                          alt={track.album.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{track.name}</h4>
                        <p className="text-sm text-gray-300 truncate">{track.artists.map((a) => a.name).join(", ")}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-400">{formatDuration(track.duration_ms)}</p>
                          {addedSongs.has(track.id) ? (
                            <div className="flex items-center text-green-400">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span className="text-xs font-semibold">Agregada</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-[#1DB954]">
                              <Music className="w-4 h-4 mr-1" />
                              <span className="text-xs font-semibold">Agregar</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-300">No se encontraron canciones</p>
                <p className="text-sm text-gray-400 mt-2">Probá con otro término de búsqueda</p>
              </div>
            )}
          </div>
        )}
      </section>

      <div className="mt-6 text-center text-gray-200 text-sm relative z-10 w-full">
        <p className="font-semibold text-yellow-300">💥 La feria de tu barrio 💥</p>

        {/* Botones de redes sociales */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => sendGreetingToWhatsApp()}
            className="bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 w-full"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Mandar un saludo</span>
          </button>

          <button
            onClick={openInstagram}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 w-full"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguinos en Instagram</span>
          </button>
        </div>

        <p className="mt-4 text-xs opacity-75">Y que onda con eso? 🚀</p>
      </div>
    </div>
  )
}
