import { NextResponse } from "next/server"

// Función para obtener un token de acceso usando el refresh token
async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Faltan credenciales de Spotify en las variables de entorno")
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  })

  const data = await response.json()
  if (data.error) {
    throw new Error(`Error al obtener token de acceso: ${data.error_description}`)
  }

  return data.access_token
}

// Endpoint para buscar canciones en Spotify
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Falta el parámetro de búsqueda 'q'" }, { status: 400 })
    }

    // Obtener token de acceso
    const accessToken = await getAccessToken()

    // Realizar búsqueda en Spotify
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const searchData = await searchResponse.json()

    if (searchData.error) {
      return NextResponse.json({ error: searchData.error.message }, { status: searchData.error.status })
    }

    // Transformar los resultados para que coincidan con nuestro formato
    const tracks = searchData.tracks.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artists: track.artists,
      album: {
        name: track.album.name,
        images: track.album.images,
      },
      duration_ms: track.duration_ms,
      external_urls: track.external_urls,
    }))

    return NextResponse.json({ tracks })
  } catch (error: any) {
    console.error("Error en la API de Spotify:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
