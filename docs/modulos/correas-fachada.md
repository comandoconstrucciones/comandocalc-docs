---
id: correas-fachada
title: Correas de Fachada
sidebar_position: 4
---

# Correas de Fachada

Diseño de correas secundarias para **fachadas metálicas** (cerramientos verticales). Verifica flexión, cortante y deflexión bajo peso propio + presión/succión de viento.

## Diferencias con correas de cubierta

| Aspecto | Cubierta | Fachada |
|---------|----------|---------|
| Orientación | Inclinada | Vertical |
| Carga principal | Gravedad + viento | Viento |
| Eje crítico | Eje fuerte (Y) | Eje fuerte (X) |
| Sobrecarga | Mantenimiento | No aplica |

## Parámetros de entrada

| Parámetro | Unidad | Descripción | Por defecto |
|-----------|--------|-------------|-------------|
| `profile_id` | — | Perfil a verificar (ej: `COL-C-150X60X15X2.5`) | — |
| `span` | m | Longitud de la correa (altura de fachada) | 5.0 |
| `spacing` | m | Separación entre correas | 1.2 |
| `facade_type` | — | Tipo de fachada (`metalica`, `fibrocemento`, `vidrio`) | `metalica` |
| `city_id` | — | ID de ciudad para presión de viento | — |
| `height_above_ground` | m | Altura del punto medio sobre el terreno | 8.0 |
| `dead_load` | kg/m² | Carga muerta de revestimiento | 12 |

## Endpoint API

```
POST /api/calc/facade-purlin
```

### Ejemplo cURL

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/facade-purlin \
  -H "Content-Type: application/json" \
  -d '{
    "profile_id": "COL-C-150X60X15X2.5",
    "span": 5.0,
    "spacing": 1.2,
    "facade_type": "metalica",
    "city_id": 50,
    "height_above_ground": 8.0,
    "dead_load": 12
  }'
```

### Respuesta

```json
{
  "profile_id": "COL-C-150X60X15X2.5",
  "profile_designation": "C 150x60x15x2.5",
  "weight_kg_m": 4.12,
  "loads": {
    "dead_total": 19.44,
    "wind_pressure": 52.8,
    "wind_suction": -68.4
  },
  "results": {
    "Mux_kgm": 142.5,
    "phi_Mnx_kgm": 198.2,
    "moment_ratio": 0.72,
    "shear_ratio": 0.18,
    "deflection_mm": 12.4,
    "deflection_limit_mm": 16.7
  },
  "status": "OK",
  "governing": "Flexión (succión viento)"
}
```

## Selección óptima automática

```
POST /api/calc/facade-purlin/optimal
```

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/facade-purlin/optimal \
  -H "Content-Type: application/json" \
  -d '{
    "span": 5.0,
    "spacing": 1.2,
    "facade_type": "metalica",
    "city_id": 50,
    "height_above_ground": 8.0,
    "dead_load": 12
  }'
```

## Tipos de fachada

| Tipo | Peso (kg/m²) | Descripción |
|------|--------------|-------------|
| `metalica` | 8-15 | Lámina galvanizada o aluzinc |
| `fibrocemento` | 18-25 | Superboard, Eterboard |
| `vidrio` | 25-35 | Fachada flotante de vidrio |

## Presión de viento en fachadas

La presión de viento en fachadas depende de:
- **Vb**: Velocidad básica de la ciudad
- **Kz**: Factor de altura (aumenta con la altura)
- **Kd**: Factor direccional
- **Cp**: Coeficiente de presión (barlovento vs sotavento)

Para fachadas, generalmente la **succión** (Cp negativo) es más crítica que la presión.
