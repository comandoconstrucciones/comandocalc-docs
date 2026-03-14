---
id: placa-base
title: Placa Base
sidebar_position: 8
---

# Placa Base

Diseño de placas base de columnas de acero sobre concreto según **AISC Design Guide 1** y verificación de pernos de anclaje bajo carga axial y momento.

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `Pu` | kg | Carga axial última | 15,000 |
| `Mux` | kg·m | Momento eje X (si aplica) | 0 |
| `column_depth` | cm | Peralte d de la columna | 10 |
| `column_bf` | cm | Ancho ala bf de la columna | 10 |
| `concrete_fc` | kg/cm² | Resistencia del concreto del pedestal | 210 |
| `pedestal_width` | cm | Ancho del pedestal de concreto | 40 |
| `pedestal_length` | cm | Largo del pedestal de concreto | 40 |
| `plate_steel` | — | Acero de la placa: `A36` o `A572-50` | `A36` |
| `bolt_size` | pulg | Tamaño del perno de anclaje | `3/4` |
| `num_bolts` | — | Número de pernos (4 u 8) | 4 |

### Pernos de anclaje disponibles

Los pernos son **ASTM F1554** (acero para anclaje en concreto):

| Diámetro | Área Ab (cm²) | Fu (kg/cm²) |
|----------|---------------|-------------|
| 1/2" | 0.92 | 4,220 |
| 5/8" | 1.43 | 4,220 |
| 3/4" | 2.07 | 4,220 |
| 7/8" | 2.85 | 4,220 |
| 1" | 3.88 | 4,220 |
| 1-1/4" | 6.41 | 4,220 |

## Diseño (AISC DG-1)

### Dimensiones de la placa

Las dimensiones N y B se calculan con un voladizo mínimo de 7.5 cm desde el perfil y se redondean al múltiplo de 5 cm superior:

```
N = d + 2 × c_min     (dirección del peralte)
B = bf + 2 × c_min    (dirección del ala)
```

### Aplastamiento sobre concreto

```
φc·Pp = 0.65 · 0.85 · f'c · A1 · √(A2/A1) ≤ 2 · φc · 0.85 · f'c · A1
```

### Espesor de la placa

```
tp = max(m, n) · √(2·fp / (φb·Fy))     φb = 0.90
```

### Pernos de anclaje (tensión)

Cuando hay momento, los pernos del lado en tensión se verifican:

```
φt·Rn = 0.75 · Fu · Ab ≥ T_perno
```

## Visualización

El módulo incluye una **vista en planta 2D** de la placa base con:

- Placa achurada a escala con cotas N × B
- Sección del perfil de la columna (alas + alma) en verde
- Pernos de anclaje en amarillo con marcas cruzadas
- Pedestal de concreto como fondo gris
- Estado OK / FALLA visible en la vista

## Resultados

| Campo | Descripción |
|-------|-------------|
| `N` | Largo de la placa (cm) |
| `B` | Ancho de la placa (cm) |
| `t_req` | Espesor requerido (cm) |
| `t_recommended` | Espesor comercial recomendado (cm) |
| `phi_Pp` | Capacidad de aplastamiento del concreto (kg) |
| `bearing_ratio` | Pu / φPp |
| `bolt_tension` | Tensión en pernos más solicitados (kg) |
| `phi_Rn_bolt` | Capacidad de tensión del perno (kg) |
| `bolt_ratio` | T_perno / φRn |
| `status` | `OK` o `FALLA` |

## Endpoint API

```
POST /api/calc/baseplate
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/baseplate \
  -H "Content-Type: application/json" \
  -d '{
    "Pu": 30000,
    "column_depth": 20.0,
    "column_bf": 20.0,
    "concrete_fc": 210,
    "pedestal_width": 50,
    "pedestal_length": 50,
    "plate_steel": "A36",
    "bolt_size": "3/4",
    "num_bolts": 4
  }'
```

:::note Voladizo mínimo
AISC recomienda un mínimo de 7.5 cm de vuelo entre el perfil y el borde de la placa. El módulo lo aplica automáticamente y ajusta las dimensiones al múltiplo de 5 cm más cercano.
:::
