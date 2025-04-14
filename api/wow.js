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
    const endpoint = req.query.endpoint;

    let apiUrl = "";
    // Por ejemplo, configuramos el endpoint "guild"
    if (endpoint === "guild") {
      apiUrl =
        "https://eu.api.blizzard.com/data/wow/guild/zuljin/breakdown/roster?namespace=profile-eu&locale=es_ES";
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

    const rosterData = await apiResponse.json();

    const guildData = await getGuildData(rosterData);

    res.status(200).json(guildData);
  } catch (error) {
    console.error("Error en handler:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getGuildData(rosterData) {
  const filteredMembers = await Promise.all(
    rosterData.members
      .filter((member) => member.rank === 1 || member.rank === 2)
      .map(async (member) => {
        const extraInfo = await processAdditionalData(member);
        return {
          name: member.character.name,
          ...extraInfo,
        };
      }),
  );

  return filteredMembers;
}

async function processAdditionalData(member) {
  const aditionalData = await Promise.all([
    getCharacterData(member.character.name, member.character.realm.slug),
    getMScoreData(member.character.name, member.character.realm.slug),
    getMedia(member.character.name, member.character.realm.slug),
  ]);
  const [characterData, mScoreData, mediaData] = await Promise.all(
    aditionalData.map((res) => res.json()),
  );
  return {
    realm: characterData.realm.name,
    class: characterData.character_class.name,
    spec: characterData.active_spec.name,
    title: characterData.active_title?.name,
    faction: characterData.faction.name,
    ilvl: Math.round(parseFloat(characterData.average_item_level)),
    mScore: Math.round(parseFloat(mScoreData.current_mythic_rating?.rating)),
    avatar: mediaData.assets[0].value,
    inset: mediaData.assets[1].value,
    mainRaw: mediaData.assets[2].value,
  };
}

function getCharacterData(characterName, realmId) {
  try {
    const apiUrl = `https://eu.api.blizzard.com/profile/wow/character/${realmId}/${characterName.toLowerCase()}?namespace=profile-eu&locale=es_ES`;

    const apiResponse = fetch(apiUrl, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + cachedToken,
        "Content-Type": "application/json",
      }),
    });
    return apiResponse;
  } catch {
    throw new Error("Error al obtener personaje");
  }
}

function getMScoreData(characterName, realmId) {
  try {
    const apiUrl = `https://eu.api.blizzard.com/profile/wow/character/${realmId}/${characterName.toLowerCase()}/mythic-keystone-profile?namespace=profile-eu&locale=es_ES`;
    const apiResponse = fetch(apiUrl, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + cachedToken,
        "Content-Type": "application/json",
      }),
    });
    return apiResponse;
  } catch {
    throw new Error("Error al obtener Puntuación");
  }
}

function getMedia(characterName, realmId) {
  try {
    const apiUrl = `https://eu.api.blizzard.com/profile/wow/character/${realmId}/${characterName.toLowerCase()}/character-media?namespace=profile-eu&locale=es_ES`;
    const apiResponse = fetch(apiUrl, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + cachedToken,
        "Content-Type": "application/json",
      }),
    });
    return apiResponse;
  } catch {
    throw new Error("Error al obtener media");
  }
}
