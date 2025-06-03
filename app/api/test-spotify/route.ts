import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🔍 Verificando variables de entorno...")

    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

    console.log("Client ID:", clientId ? "✅ Presente" : "❌ Faltante")
    console.log("Client Secret:", clientSecret ? "✅ Presente" : "❌ Faltante")
    console.log("Refresh Token:", refreshToken ? "✅ Presente" : "❌ Faltante")

    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json(
        {
          error: "Faltan variables de entorno",
          details: {
            clientId: !!clientId,
            clientSecret: !!clientSecret,
            refreshToken: !!refreshToken,
          },
        },
        { status: 500 },
      )
    }

    console.log("🎵 Obteniendo token de acceso...")

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

    const tokenData = await response.json()
    console.log("Token response:", tokenData)

    if (tokenData.error) {
      return NextResponse.json(
        {
          error: "Error al obtener token",
          details: tokenData,
        },
        { status: 500 },
      )
    }

    console.log("✅ Token obtenido, probando búsqueda...")

    // Probar búsqueda
    const searchResponse = await fetch("https://api.spotify.com/v1/search?q=despacito&type=track&limit=5", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const searchData = await searchResponse.json()
    console.log("Search response:", searchData)

    return NextResponse.json({
      success: true,
      tokenObtained: true,
      searchResults: searchData.tracks?.items?.length || 0,
      sampleTrack: searchData.tracks?.items?.[0]?.name || "No encontrado",
    })
  } catch (error: any) {
    console.error("Error en test:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
