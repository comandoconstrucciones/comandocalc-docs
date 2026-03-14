---
id: viento
title: Cargas de Viento
sidebar_position: 5
---

# Cargas de Viento (NSR-10 Título B)

Cálculo de cargas de viento sobre edificaciones cerradas, usando la **velocidad básica de viento por ciudad colombiana** de la tabla B.6.3.1 de la NSR-10.

## Parámetros de entrada

| Parámetro | Tipo | Descripción | Por defecto |
|-----------|------|-------------|-------------|
| `city_id` | int | ID de la ciudad en la base de datos | 150 |
| `building_height` | m | Altura total de la edificación | 8.0 |
| `building_width` | m | Dimensión en la dirección del viento | 20.0 |
| `building_length` | m | Dimensión perpendicular al viento | 40.0 |
| `roof_angle` | ° | Ángulo de la cubierta | 15.0 |
| `roof_type` | — | Tipo de cubierta: `dos_aguas` o `plana` | `dos_aguas` |
| `exposure` | — | Categoría de exposición: `B`, `C` o `D` | `C` |
| `enclosure` | — | Tipo de cerramiento: `closed`, `open`, `partially_open` | `closed` |
| `use_group` | — | Grupo de uso NSR-10: `1`, `2`, `3`, `4` | `2` |
| `topography` | — | Topografía: `flat`, `hill`, `ridge`, `escarpment` | `flat` |

### Categorías de exposición

| Categoría | Descripción |
|-----------|-------------|
| **B** | Terreno urbano, suburbano, bosques — edificios de más de 10 m en la mayoría |
| **C** | Terreno abierto con obstáculos dispersos (la mayoría de zonas industriales) |
| **D** | Costa, riberas de ríos amplios — viento sin obstáculos |

### Grupos de uso (NSR-10 A.2.5)

| Grupo | Descripción | Factor I |
|-------|-------------|----------|
| 1 | Edificaciones de bajo riesgo | 0.87 |
| 2 | Edificaciones comunes (vivienda, comercio) | 1.00 |
| 3 | Edificaciones de alta ocupación (más de 300 personas) | 1.15 |
| 4 | Edificaciones esenciales (hospitales, bomberos) | 1.15 |

## Metodología de cálculo

La presión de diseño sigue el procedimiento **analítico simplificado** de NSR-10 Título B:

```
Vd = Vb · S1 · S2 · S3 · I
q  = 0.613 · Kz · Vd²    (Pa)
p  = q · G · Cp - qi · GCpi
```

Donde:
- **Vb** — velocidad básica de viento de la ciudad (m/s)
- **S1, S2, S3** — factores de topografía, exposición y altura
- **Kz** — coeficiente de presión de velocidad
- **G** — factor de ráfaga (0.85 edificios rígidos)
- **Cp** — coeficiente de presión exterior
- **GCpi** — coeficiente de presión interior

## Resultados

| Campo | Descripción |
|-------|-------------|
| `city_name` | Nombre de la ciudad |
| `Vb` | Velocidad básica de viento (m/s) |
| `Vd` | Velocidad de diseño (m/s) |
| `S1`, `S2`, `S3` | Factores de corrección |
| `qh` | Presión dinámica a la altura h (kg/m²) |
| `p_windward` | Presión barlovento (kg/m²) |
| `p_leeward` | Presión sotavento (kg/m²) |
| `p_roof` | Presión sobre cubierta (kg/m²) |
| `p_sidewall` | Presión en muros laterales (kg/m²) |

## Endpoint API

```
POST /api/calc/wind
```

### Ejemplo

```bash
curl -X POST https://api.comandoconstrucciones.com/api/calc/wind \
  -H "Content-Type: application/json" \
  -d '{
    "city_id": 150,
    "building_height": 8.0,
    "building_width": 20.0,
    "building_length": 40.0,
    "roof_angle": 15.0,
    "roof_type": "dos_aguas",
    "exposure": "C",
    "enclosure": "closed",
    "use_group": 2,
    "topography": "flat"
  }'
```

### Buscar ciudad por nombre

```bash
curl "https://api.comandoconstrucciones.com/api/cities?q=bogota"
```

## Ciudades con mayor velocidad de viento

| Ciudad | Vb (m/s) | Departamento |
|--------|----------|--------------|
| Riohacha | 55.0 | La Guajira |
| Santa Marta | 50.0 | Magdalena |
| Barranquilla | 45.0 | Atlántico |
| Cartagena | 40.0 | Bolívar |
| Bogotá | 27.0 | Cundinamarca |
| Medellín | 30.0 | Antioquia |
| Cali | 32.0 | Valle del Cauca |
