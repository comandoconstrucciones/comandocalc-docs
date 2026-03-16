---
id: ciudades
title: Ciudades (Viento y Sismo)
sidebar_position: 5
---

# Endpoint: Ciudades Colombianas

Base de datos de **916 ciudades** colombianas con parámetros NSR-10 para **viento** (Título B) y **sismo** (Título A).

## Listar ciudades

```
GET /api/cities
```

### Parámetros de query

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `q` | string | Búsqueda por nombre (parcial, insensible a mayúsculas) |
| `department` | string | Filtrar por departamento |
| `region` | int | Filtrar por región de viento (1-5) |
| `limit` | int | Máximo de resultados (default 20) |

### Ejemplos

```bash
# Buscar por nombre
curl "https://api.comandoconstrucciones.com/api/cities?q=bogota"

# Todas las ciudades de Antioquia
curl "https://api.comandoconstrucciones.com/api/cities?department=Antioquia&limit=50"

# Ciudades en zona de viento fuerte (región 1)
curl "https://api.comandoconstrucciones.com/api/cities?region=1"

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
    "region_id": 3,
    "Vb": 55,
    "altitude": 2600,
    "Aa": 0.15,
    "Av": 0.20,
    "Fa": 1.35,
    "Fv": 1.30,
    "I": 1.0
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

### Datos generales

| Propiedad | Unidad | Descripción |
|-----------|--------|-------------|
| `id` | — | Identificador numérico |
| `name` | — | Nombre del municipio |
| `department` | — | Departamento |
| `altitude` | msnm | Altitud sobre el nivel del mar |

### Datos de viento (NSR-10 Título B)

| Propiedad | Unidad | Descripción |
|-----------|--------|-------------|
| `region_id` | — | Región de viento (1-5) |
| `Vb` | m/s | Velocidad básica del viento |

### Datos de sismo (NSR-10 Título A)

| Propiedad | Unidad | Descripción |
|-----------|--------|-------------|
| `Aa` | g | Aceleración pico efectiva horizontal |
| `Av` | g | Velocidad pico efectiva horizontal |
| `Fa` | — | Factor de amplificación del suelo (período corto) |
| `Fv` | — | Factor de amplificación del suelo (período largo) |
| `I` | — | Coeficiente de importancia |

## Regiones de viento NSR-10

| Región | Vb (m/s) | Descripción |
|--------|----------|-------------|
| 1 | 80 | Costa Atlántica e islas (San Andrés, Providencia) |
| 2 | 70 | Zona costera interior, llanos orientales |
| 3 | 55 | Valles interandinos, altiplano cundiboyacense |
| 4 | 45 | Zonas montañosas protegidas |
| 5 | 40 | Zona cafetera, valles cerrados |

## Ciudades principales

| Ciudad | Depto. | Región | Vb (m/s) | Aa (g) | Av (g) |
|--------|--------|--------|----------|--------|--------|
| Bogotá D.C. | Cundinamarca | 3 | 55 | 0.15 | 0.20 |
| Medellín | Antioquia | 4 | 45 | 0.15 | 0.20 |
| Cali | Valle del Cauca | 3 | 55 | 0.25 | 0.25 |
| Barranquilla | Atlántico | 1 | 80 | 0.10 | 0.10 |
| Cartagena | Bolívar | 1 | 80 | 0.10 | 0.10 |
| Bucaramanga | Santander | 3 | 55 | 0.25 | 0.25 |
| Pereira | Risaralda | 5 | 40 | 0.25 | 0.25 |
| Manizales | Caldas | 4 | 45 | 0.25 | 0.25 |
| Cúcuta | Norte de Santander | 2 | 70 | 0.35 | 0.30 |
| Santa Marta | Magdalena | 1 | 80 | 0.10 | 0.10 |
| Ibagué | Tolima | 3 | 55 | 0.20 | 0.20 |
| Villavicencio | Meta | 2 | 70 | 0.30 | 0.25 |
| Pasto | Nariño | 3 | 55 | 0.30 | 0.30 |
| Neiva | Huila | 3 | 55 | 0.25 | 0.25 |

## Uso en otros módulos

El ID de ciudad se utiliza en los siguientes endpoints para obtener automáticamente los parámetros de viento y sismo:

- `/api/calc/wind` — Cálculo de presiones de viento
- `/api/calc/purlin` — Diseño de correas (carga de viento)
- `/api/calc/facade-purlin` — Diseño de correas de fachada
- `/api/calc/frame` — Diseño de pórticos (cargas sísmicas y viento)
- `/api/calc/nave` — Diseño de nave industrial
