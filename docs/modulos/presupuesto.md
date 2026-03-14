---
id: presupuesto
title: Presupuesto de Estructura Metálica
sidebar_position: 13
---

# Presupuesto de Estructura Metálica

![Módulo de presupuesto en ComandoCalc](/img/screenshots/budget.png)

Generación de presupuesto detallado para estructuras de acero. Calcula peso total, costos de material, fabricación, soldadura, pintura y transporte.

## Estructura del presupuesto

Un presupuesto se compone de:
- **Ítems de estructura** — cada elemento con perfil, cantidad y longitud
- **Costos de proceso** — soldadura, pernos de anclaje, pintura, transporte

## Parámetros principales

### Encabezado del proyecto

| Parámetro | Descripción |
|-----------|-------------|
| `project_name` | Nombre del proyecto |
| `project_area_m2` | Área cubierta del proyecto (m²) |

### Ítems de estructura (lista)

Cada ítem tiene:

| Campo | Unidad | Descripción |
|-------|--------|-------------|
| `description` | — | Nombre del elemento |
| `profile_id` | — | ID del perfil en la base de datos |
| `quantity` | — | Número de piezas iguales |
| `length_m` | m | Longitud de cada pieza |
| `finish` | — | `raw` (sin pintura) o `painted` |
| `category` | — | `estructura`, `cubierta`, `fachada`, `mezzanine` |

### Costos adicionales

| Parámetro | Unidad | Descripción |
|-----------|--------|-------------|
| `num_anchor_bolts` | — | Cantidad de pernos de anclaje |
| `welding_length_m` | m | Metros de soldadura de filete 3/16" |
| `painting_area_m2` | m² | Área a pintar (si diferente del calculado) |
| `transport_ton_km` | — | Toneladas × km de transporte |

## Desglose de costos

| Rubro | Base de cálculo |
|-------|----------------|
| Material acero | Peso total × precio/kg (A-36) |
| Habilitación y corte | Peso total × tarifa/kg |
| Soldadura | Metros lineales × tarifa/m |
| Pintura anticorrosiva | Área m² × tarifa/m² |
| Pernos de anclaje | Cantidad × precio unitario |
| Transporte | Ton·km × tarifa |

## Resultados

| Campo | Descripción |
|-------|-------------|
| `total_weight_kg` | Peso total de la estructura (kg) |
| `total_weight_ton` | Peso en toneladas |
| `weight_per_m2` | Indicador: kg/m² de área cubierta |
| `subtotals` | Desglose por categoría |
| `total` | Total del presupuesto en COP |

## Exportación PDF

La memoria de cálculo incluye:
- Tabla de ítems con pesos unitarios y totales
- Desglose de costos por rubro
- Total en COP con IVA desglosado
- Indicadores por m² para verificar razonabilidad

## Endpoint API

```
POST /api/calc/budget
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/budget \
  -H "Content-Type: application/json" \
  -d '{
    "project_name": "Nave Industrial 400 m²",
    "project_area_m2": 400,
    "num_anchor_bolts": 16,
    "welding_length_m": 80,
    "painting_area_m2": 0,
    "transport_ton_km": 50,
    "items": [
      {
        "description": "Columnas principales HEA 200",
        "profile_id": "HEA-200",
        "quantity": 8,
        "length_m": 6.0,
        "finish": "painted",
        "category": "estructura"
      },
      {
        "description": "Vigas de cubierta IPE 270",
        "profile_id": "IPE-270",
        "quantity": 5,
        "length_m": 12.0,
        "finish": "painted",
        "category": "cubierta"
      }
    ]
  }'
```

:::tip Indicador de referencia
Estructuras metálicas industriales en Colombia: **25–45 kg/m²**. Una nave simple suele estar en 30–38 kg/m². Si el indicador es muy alto, revisar perfiles sobredimensionados.
:::
