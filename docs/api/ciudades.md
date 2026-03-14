---
id: ciudades
title: Ciudades (Viento)
sidebar_position: 5
---

# Endpoint: Ciudades Colombianas

Base de datos de **916 ciudades** colombianas con velocidad básica de viento según NSR-10 Tabla B.6.3.1.

## Listar ciudades

```
GET /api/cities
```

### Parámetros de query

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `q` | string | Búsqueda por nombre (parcial, insensible a mayúsculas) |
| `department` | string | Filtrar por departamento |
| `limit` | int | Máximo de resultados (default 20) |

### Ejemplos

```bash
# Buscar por nombre
curl "https://api.comandoconstrucciones.com/api/cities?q=bogota"

# Todas las ciudades de Antioquia
curl "https://api.comandoconstrucciones.com/api/cities?department=Antioquia&limit=50"

# Primeras 5 ciudades
curl "https://api.comandoconstrucciones.com/api/cities?limit=5"
```

### Respuesta

```json
[
  {
    "id": 150,
    "name": "Bogotá D.C.",
    "department": "Cundinamarca",
    "Vb_ms": 27.0,
    "altitude_m": 2600,
    "latitude": 4.711,
    "longitude": -74.072
  }
]
```

## Obtener ciudad por ID

```
GET /api/cities/{id}
```

```bash
curl "https://api.comandoconstrucciones.com/api/cities/150"
```

## Propiedades

| Propiedad | Unidad | Descripción |
|-----------|--------|-------------|
| `id` | — | Identificador numérico |
| `name` | — | Nombre del municipio |
| `department` | — | Departamento |
| `Vb_ms` | m/s | Velocidad básica de viento (NSR-10) |
| `altitude_m` | m | Altitud sobre el nivel del mar |

## Ciudades principales

| ID | Ciudad | Vb (m/s) |
|----|--------|----------|
| 150 | Bogotá D.C. | 27.0 |
| 380 | Medellín | 30.0 |
| 760 | Cali | 32.0 |
| 8001 | Barranquilla | 45.0 |
| 13001 | Cartagena | 40.0 |
| 17001 | Manizales | 27.0 |
| 18001 | Florencia | 28.0 |
| 19001 | Popayán | 27.0 |
| 52001 | Pasto | 27.0 |
| 54001 | Cúcuta | 30.0 |
| 63001 | Armenia | 28.0 |
| 66001 | Pereira | 28.0 |
| 68001 | Bucaramanga | 27.0 |
| 70001 | Sincelejo | 35.0 |
| 73001 | Ibagué | 30.0 |
| 76520 | Palmira | 32.0 |
