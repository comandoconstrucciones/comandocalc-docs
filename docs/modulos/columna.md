---
id: columna
title: Columna
sidebar_position: 2
---

# Columna

Diseño de columnas de acero bajo **carga axial de compresión** según AISC 360-16 Capítulo E.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `axial_load` | kg | Carga axial total (CM + CV mayorada) | 10,000 |
| `height` | m | Altura libre de la columna | 3.5 |
| `Kx` | — | Factor de longitud efectiva eje X | 1.0 |
| `Ky` | — | Factor de longitud efectiva eje Y | 1.0 |
| `profile_id` | — | ID del perfil a verificar | — |

### Factores K típicos

| Condición de apoyo | K |
|-------------------|---|
| Ambos extremos articulados | 1.0 |
| Empotrado-articulado | 0.7 |
| Ambos extremos empotrados | 0.65 |
| Ménsula (empotrado-libre) | 2.0 |

## Verificaciones realizadas

### Esbeltez máxima (AISC E2)

```
KL/r ≤ 200
```

### Compresión (AISC E3/E7)

```
φPn ≥ Pu     donde φ = 0.90
```

La tensión crítica Fcr depende de la esbeltez:

**Pandeo inelástico** (KL/r ≤ 4.71·√(E/Fy)):
```
Fcr = [0.658^(Fy/Fe)] · Fy
```

**Pandeo elástico** (KL/r > 4.71·√(E/Fy)):
```
Fcr = 0.877 · Fe
Fe = π²·E / (KL/r)²
```

## Endpoint API

```
POST /api/calc/column
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/column \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "HEA-200",
    "axial_load": 25000,
    "height": 4.0,
    "Kx": 1.0,
    "Ky": 1.0
  }'
```
