---
id: perfiles
title: Perfiles de Acero
sidebar_position: 4
---

# Endpoint: Perfiles de Acero

La base de datos contiene **393 perfiles** de acero en **13 familias**, incluyendo perfiles laminados en caliente (hot-rolled) y conformados en frío (cold-formed).

## Listar perfiles

```
GET /api/profiles
```

### Parámetros de query

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `type` | string | Familia de perfiles | `ipe`, `hea`, `w`, `perlin_c` |
| `limit` | int | Máximo de resultados (default 50) | 20 |
| `offset` | int | Paginación | 0 |

### Ejemplo

```bash
# Todos los IPE
curl "https://api.comandoconstrucciones.com/api/profiles?type=ipe"

# Primeros 10 perfiles W americanos
curl "https://api.comandoconstrucciones.com/api/profiles?type=w&limit=10"

# Tubos cuadrados
curl "https://api.comandoconstrucciones.com/api/profiles?type=tubular_square"

# Correas C de lámina delgada
curl "https://api.comandoconstrucciones.com/api/profiles?type=perlin_c"
```

### Respuesta

```json
[
  {
    "id": "IPE-160",
    "designation": "IPE 160",
    "type": "ipe",
    "standard": "S275",
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
    "Cw_cm6": 3990,
    "Fy_MPa": 275,
    "Fu_MPa": 430
  }
]
```

## Obtener un perfil por ID

```
GET /api/profiles/{id}
```

```bash
curl "https://api.comandoconstrucciones.com/api/profiles/HEA-200"
curl "https://api.comandoconstrucciones.com/api/profiles/W14X30"
curl "https://api.comandoconstrucciones.com/api/profiles/COL-TR-100X100X4"
```

## Familias disponibles (13 familias, 393 perfiles)

| Familia | Descripción | Cantidad | Estándar |
|---------|-------------|----------|----------|
| `w` | W — Vigas americanas de ala ancha (wide flange) | 134 | ASTM A572-50 |
| `perlin_c` | C — Correas de lámina delgada (cold-formed) | 43 | ASTM A36 |
| `angle_unequal` | L — Ángulos desiguales | 31 | ASTM A36 |
| `c_channel` | C — Canales (U) | 28 | ASTM A36 |
| `tubular_square` | HSS — Tubos cuadrados | 20 | ASTM A500-C |
| `tubular_rect` | HSS — Tubos rectangulares | 15 | ASTM A500-C |
| `ipn` | IPN — Perfiles europeos I de alas inclinadas | 21 | S275 (EN) |
| `hem` | HEM — Perfiles europeos de ala ancha (serie M) | 19 | S275 (EN) |
| `hea` | HEA — Perfiles europeos de ala ancha (serie A) | 18 | S275 (EN) |
| `heb` | HEB — Perfiles europeos de ala ancha (serie B) | 18 | S275 (EN) |
| `ipe` | IPE — Perfiles europeos de ala paralela | 17 | S275 (EN) |
| `angle` | L — Ángulos iguales | 17 | ASTM A36 |
| `upn` | UPN — Perfiles U europeos | 12 | S275 (EN) |

## Estándares de acero

Cada perfil incluye el campo `standard` que indica la norma de acero:

| Estándar | Fy (MPa) | Fu (MPa) | Aplicación |
|----------|----------|----------|------------|
| ASTM A36 | 250 | 400 | Perfiles laminados, ángulos, canales |
| ASTM A500-A | 228 | 310 | Tubos HSS (grado A) |
| ASTM A500-B | 290 | 400 | Tubos HSS (grado B) |
| ASTM A500-C | 317 | 427 | Tubos HSS (grado C) — más común |
| ASTM A572-50 | 345 | 450 | Vigas W de alta resistencia |
| S235 | 235 | 360 | Perfiles europeos (EN 10025) |
| S275 | 275 | 430 | Perfiles europeos (EN 10025) |
| S355 | 355 | 510 | Perfiles europeos alta resistencia |

## Propiedades retornadas

| Propiedad | Unidad | Descripción |
|-----------|--------|-------------|
| `id` | — | Identificador único (ej: `IPE-200`, `W14X30`) |
| `designation` | — | Nombre comercial (ej: `IPE 200`) |
| `type` | — | Familia del perfil |
| `standard` | — | Norma de acero (A36, A500-C, S275, etc.) |
| `weight` | kg/m | Peso lineal |
| `Fy_MPa` | MPa | Esfuerzo de fluencia |
| `Fu_MPa` | MPa | Esfuerzo último |
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
