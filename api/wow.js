// Variables globales para almacenar el token y su expiración (cache)
let cachedToken = null;
let tokenExpiresAt = null;

/**
 * Función para obtener (o reutilizar) el token de acceso.
 * Se realiza la solicitud al endpoint OAuth2 de Blizzard usando las variables de entorno.
 */
async function getAccessToken() {
  // Si ya tenemos un token válido en caché, lo retornamos
  if (cachedToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  // Obtenemos las credenciales desde las variables de entorno
  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Client ID o Client Secret no están definidos en las variables de entorno.",
    );
  }

  // Codificamos las credenciales en base64 para el header de autorización
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  // Realizamos la petición para obtener el token
  const tokenResponse = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!tokenResponse.ok) {
    const errorData = await tokenResponse.json();
    throw new Error(
      `Error al obtener el token: ${errorData.error_description || "Error desconocido"}`,
    );
  }

  const tokenData = await tokenResponse.json();
  cachedToken = tokenData.access_token;
  // Establecemos la expiración, restando 60 segundos como margen de seguridad
  tokenExpiresAt = Date.now() + tokenData.expires_in * 1000 - 60000;

  return cachedToken;
}

/**
 * Función _handler_ para la función serverless.
 * Recibe la petición, obtiene el token y realiza la llamada a la API de Blizzard.
 */
export default async function handler(req, res) {
  try {
    // Obtenemos un token de acceso válido
    const token = await getAccessToken();

    // Determinamos el endpoint solicitado a partir del parámetro "endpoint"
    const endpoint = req.query.endpoint || "guild";

    let apiUrl = "";
    // Por ejemplo, configuramos el endpoint "guild"
    if (endpoint === "guild") {
      apiUrl =
        "https://eu.api.blizzard.com/data/wow/guild/zuljin/breakdown?namespace=profile-eu&locale=es_ES";
    } else {
      // Si el endpoint no está soportado, respondemos con error
      res.status(400).json({ error: "Endpoint no soportado." });
      return;
    }

    // Llamamos a la API de Blizzard agregando el parámetro "access_token"
    const apiResponse = await fetch(apiUrl, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      res.status(apiResponse.status).json({ error: errorData });
      return;
    }

    const apiData = await apiResponse.json();
    // Devolvemos la respuesta al cliente Angular
    res.status(200).json(apiData);
  } catch (error) {
    console.error("Error en handler:", error);
    res.status(500).json({ error: error.message });
  }
}
