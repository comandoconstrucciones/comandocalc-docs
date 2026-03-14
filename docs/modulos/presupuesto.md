---
id: presupuesto
title: Presupuesto de Estructura Metálica
sidebar_position: 13
---

# Presupuesto de Estructura Metálica

Estimativo de costos de estructuras metálicas basado en peso real de perfiles, acabados, y costos de instalación. Ideal para cotizaciones preliminares y comparación de alternativas estructurales.

## Parámetros de entrada

### Por ítem de estructura

| Parámetro | Descripción |
|-----------|-------------|
| `description` | Descripción del elemento |
| `profile_id` | ID del perfil (ej: `IPE-200`, `TR-100x100x4`) |
| `quantity` | Número de elementos |
| `length_m` | Longitud por elemento (m) |
| `finish` | Acabado: `painted` (pintado) o `galvanized` (galvanizado) |
| `category` | Categoría: `estructura`, `cubierta`, `conexiones`, etc. |

### Parámetros globales

| Parámetro | Descripción | Por defecto |
|-----------|-------------|-------------|
| `project_name` | Nombre del proyecto | — |
| `area_m2` | Área cubierta del proyecto (m²) | — |
| `include_connections` | Incluir costo estimado de conexiones | `true` |
| `include_welding` | Incluir costo de soldadura | `true` |
| `include_painting` | Incluir costo de pintura/galvanizado | `true` |
| `include_transport` | Incluir flete | `true` |
| `include_installation` | Incluir montaje | `true` |

## Costos unitarios aplicados

| Ítem | Costo unitario |
|------|---------------|
| Material acero (pintado) | Precio de mercado por kg |
| Material acero (galvanizado) | +30% sobre pintado |
| Conexiones | ~12% del costo de material |
| Soldadura | ~8% del costo de material |
| Transporte | ~5% del subtotal |
| Instalación/montaje | ~18% del subtotal |
| IVA | 19% sobre utilidad |

## Visualización

El módulo incluye **gráfico de desglose** con:

- **Barras horizontales** por categoría y costo adicional (escala relativa)
- Porcentaje de cada ítem sobre el total
- **Tarjetas de resumen**: Subtotal, IVA, Total y Costo/m²
- Peso total y relación kg/m²

## Resultados

| Campo | Descripción |
|-------|-------------|
| `total_weight_kg` | Peso total de la estructura (kg) |
| `total_material_cost` | Costo de material (COP) |
| `connection_cost` | Costo estimado de conexiones (COP) |
| `welding_cost` | Costo de soldadura (COP) |
| `painting_cost` | Costo de pintura/galvanizado (COP) |
| `transport_cost` | Costo de transporte (COP) |
| `installation_cost` | Costo de instalación (COP) |
| `subtotal` | Subtotal antes de IVA (COP) |
| `iva` | IVA (COP) |
| `total` | Total del presupuesto (COP) |
| `cost_per_m2` | Costo por m² de área cubierta (COP/m²) |
| `categories` | Desglose por categoría de material |

## Endpoint API

```
POST /api/calc/budget
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/budget \
  -H "Content-Type: application/json" \
  -d '{
    "project_name": "Nave Industrial 500m²",
    "area_m2": 500,
    "items": [
      {
        "description": "Columnas principales",
        "profile_id": "HEA-200",
        "quantity": 12,
        "length_m": 6.0,
        "finish": "painted",
        "category": "estructura"
      },
      {
        "description": "Vigas de cubierta",
        "profile_id": "IPE-300",
        "quantity": 20,
        "length_m": 8.0,
        "finish": "painted",
        "category": "estructura"
      }
    ]
  }'
```

:::tip Perfiles de tubo rectangular (RHS/TR)
Para estructuras de canchas de pádel y naves industriales, los perfiles tubulares `TR-100x100x4` y `TR-120x60x4` suelen ser más económicos que IPE/HEA para luces menores a 8 m.
:::
