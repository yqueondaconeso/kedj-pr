// Reemplaza estos valores con los tuyos
const CLIENT_ID = "4b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b"
const CLIENT_SECRET = "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1"
const REDIRECT_URI = "https://example.com/callback"
const AUTHORIZATION_CODE =
  "AQCb5LaieJPgf52apDskT2AyX8WmsYqI7rfCM_mMNRFqdC1B8JwYfV0RDNJw9LxJJd5UVl3-vuhz59JwZbIEpJM954OyGPTy1bJ_WD9toDWvXYaWRD2DiP30CImhrJUEEHNhSuHyA1ZZiSS4p7Vy4UttNWoLvuBblRymrYPyxCUjm0C0lRHXuPilAfXV4iT2RtX5a7yasz_ju97llGeJT59nDnu9oWAMXiU"

async function getSpotifyTokens() {
  try {
    console.log("🎵 Obteniendo tokens de Spotify...\n")

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: AUTHORIZATION_CODE,
        redirect_uri: REDIRECT_URI,
      }),
    })

    const data = await response.json()

    if (data.error) {
      console.error("❌ Error:", data.error_description)
      console.log("\n🔍 Detalles del error:")
      console.log("- Verifica que el CLIENT_ID y CLIENT_SECRET sean correctos")
      console.log("- Asegúrate de que el código de autorización no haya expirado")
      console.log("- El código de autorización solo se puede usar una vez")
      return
    }

    console.log("✅ ¡Tokens obtenidos exitosamente!\n")
    console.log("📋 Copia estos valores a tus variables de entorno:\n")
    console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`)
    console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`)
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`)
    console.log(`SPOTIFY_ACCESS_TOKEN=${data.access_token}`)
    console.log("\n🔄 El refresh_token no expira, úsalo en tu app")
    console.log("⏰ El access_token expira en 1 hora")
    console.log("\n🎯 Próximo paso: Agregar estas variables a tu proyecto Next.js")
  } catch (error) {
    console.error("❌ Error al obtener tokens:", error.message)
  }
}

// Ejecutar la función
getSpotifyTokens()
