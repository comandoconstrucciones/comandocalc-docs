---
id: perfiles
title: Perfiles de Acero
sidebar_position: 4
---

# Endpoint: Perfiles de Acero

La base de datos contiene **160 perfiles** de acero laminado en caliente y tubos estructurales.

## Listar perfiles

```
GET /api/profiles
```

### Parámetros de query

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `type` | string | Familia de perfiles | `ipe`, `hea`, `w`, `tr` |
| `limit` | int | Máximo de resultados (default 50) | 20 |
| `offset` | int | Paginación | 0 |

### Ejemplo

```bash
# Todos los IPE
curl "https://api.comandoconstrucciones.com/api/profiles?type=ipe"

# Primeros 10 perfiles W
curl "https://api.comandoconstrucciones.com/api/profiles?type=w&limit=10"
```

### Respuesta

```json
[
  {
    "id": "IPE-160",
    "designation": "IPE 160",
    "type": "ipe",
    "weight": 15.8,
    "height_mm": 160,
    "flange_width_mm": 82,
    "A_cm2": 20.1,
    "Ix_cm4": 869,
    "Sx_cm3": 123,
    "Zx_cm3": 123,
    "Iy_cm4": 68.3,
    "Sy_cm3": 16.7,
    "Zy_cm3": 26.1,
    "J_cm4": 3.6,
    "Cw_cm6": 3990
  }
]
```

## Obtener un perfil por ID

```
GET /api/profiles/{id}
```

```bash
curl "https://api.comandoconstrucciones.com/api/profiles/HEA-200"
```

## Familias disponibles

| Familia | Descripción | Cantidad |
|---------|-------------|----------|
| `ipe` | IPE — Perfiles europeos de ala estrecha | 13 |
| `hea` | HEA — Perfiles europeos de ala ancha (serie A) | 12 |
| `heb` | HEB — Perfiles europeos de ala ancha (serie B) | 12 |
| `w` | W — Perfiles americanos de ala ancha | 28 |
| `c` | C — Canales (U) | 14 |
| `l` | L — Ángulos | 24 |
| `tr` | TR — Tubos estructurales cuadrados | 31 |
| `rhs` | RHS — Tubos rectangulares | 26 |

## Propiedades retornadas

| Propiedad | Unidad | Descripción |
|-----------|--------|-------------|
| `id` | — | Identificador único (ej: `IPE-200`) |
| `designation` | — | Nombre comercial (ej: `IPE 200`) |
| `type` | — | Familia del perfil |
| `weight` | kg/m | Peso lineal |
| `A_cm2` | cm² | Área de la sección |
| `Ix_cm4` | cm⁴ | Inercia eje fuerte X |
| `Sx_cm3` | cm³ | Módulo elástico eje X |
| `Zx_cm3` | cm³ | Módulo plástico eje X |
| `Iy_cm4` | cm⁴ | Inercia eje débil Y |
| `Sy_cm3` | cm³ | Módulo elástico eje Y |
| `Zy_cm3` | cm³ | Módulo plástico eje Y |
| `J_cm4` | cm⁴ | Constante de torsión Saint-Venant |
| `Cw_cm6` | cm⁶ | Constante de alabeo |
| `ry_cm` | cm | Radio de giro eje Y |
| `rts_cm` | cm | Radio de giro efectivo (LTB) |
| `ho_cm` | cm | Distancia entre centroides de alas |
