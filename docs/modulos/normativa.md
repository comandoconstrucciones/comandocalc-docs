---
sidebar_position: 17
title: Consulta Normativa IA
---

# Consulta Normativa IA

El módulo de **Consulta Normativa** permite hacer preguntas en lenguaje natural sobre normas de diseño estructural. Usa búsqueda semántica sobre una base de 57,000+ fragmentos de documentos técnicos.

![Consulta Normativa IA](/img/screenshots/normativa.png)

## Base de conocimiento

| Documento | Cobertura |
|-----------|-----------|
| **NSR-10** | Títulos A, B, C, D, E, F, G, H, I, J, K |
| **AISC 360-16** | Specification for Structural Steel Buildings (completo) |
| **AISC 341-16** | Seismic Provisions for Structural Steel Buildings |
| **AWS D1.1** | Structural Welding Code — Steel |
| **AISC Design Guides** | 36 Design Guides (DG1–DG36) |
| **Catálogos** | Corpacero, Colmena, Acesco |

**Total:** 107 documentos · 57,287 fragmentos indexados

## Tecnología

El sistema usa **HyDE dual-search + RRF**:

1. **HyDE (Hypothetical Document Embedding):** Gemini genera un fragmento de norma hipotético con el vocabulario técnico exacto de la respuesta esperada.
2. **Dual-search:** Se generan embeddings tanto del documento HyDE como de la pregunta original, produciendo dos búsquedas vectoriales independientes.
3. **RRF (Reciprocal Rank Fusion):** Los resultados se fusionan para maximizar el recall.
4. **GPT-4o-mini:** Los fragmentos recuperados se envían como contexto al modelo para generar una respuesta coherente con citas precisas.

**Costo por consulta:** ~$0.006 USD

## Cómo usar

1. Escribe tu pregunta en lenguaje natural
2. Opcionalmente filtra por norma específica (NSR-10, AISC, Design Guides)
3. La respuesta incluye la fuente exacta (documento y página)
4. Haz clic en "X fuentes consultadas" para ver los fragmentos relevantes

## Ejemplos de consultas

```
¿Cuál es la deriva máxima permitida en pórticos de acero según NSR-10?

¿Cómo se calcula la resistencia a flexión de una viga W según AISC 360 capítulo F?

¿Qué tamaño mínimo de soldadura en filete exige AWS D1.1 para material de 12mm?

¿Cuáles son las combinaciones de carga LRFD según NSR-10 título B?

¿Cuál es la resistencia de diseño de un perno A325 en cortante según AISC 360?
```

## API

```bash
POST /api/ask
Content-Type: application/json

{
  "question": "¿Cuál es la deriva máxima en NSR-10?",
  "folder_filter": "NSR-10",  // opcional: "NSR-10", "Normas técnicas", "Manuales", "Catálogos"
  "top_k": 5
}
```

Respuesta:
```json
{
  "answer": "Según NSR-10 Título A, la deriva máxima...",
  "sources": [
    {
      "filename": "NSR-10 Titulo A.pdf",
      "folder": "NSR-10",
      "page": 42,
      "excerpt": "La deriva de piso máxima...",
      "similarity": 0.87
    }
  ],
  "chunks_searched": 5
}
```

```bash
# Estado del servicio
GET /api/ask/status
```
