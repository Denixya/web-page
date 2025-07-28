export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const endpoint = req.query.endpoint;

    if (endpoint !== "pokemon") {
      return res.status(400).json({ error: "Endpoint no soportado." });
    }

    // Array con los números del 1 al 151
    const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1);

    const results = await Promise.all(
      pokemonIds.map(async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);

        if (!res.ok) {
          console.warn(`Error al obtener datos del Pokémon #${id}`);
          return null;
        }

        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((t) => ({
            slot: t.slot,
            type: {
              name: t.type.name,
              url: t.type.url,
            },
          })),
          sprites: {
            front_default: data.sprites.front_default,
          },
        };
      }),
    );

    const cleanResults = results.filter(Boolean); // Elimina nulls

    res.status(200).json(cleanResults);
  } catch (error) {
    console.error("Error en handler:", error);
    res.status(500).json({ error: error.message });
  }
}
