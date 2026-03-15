---
sidebar_position: 15
title: Nave Industrial
---

# Nave Industrial

El módulo de **Nave Industrial** realiza el diseño paramétrico completo de una estructura metálica tipo nave, desde la geometría hasta el presupuesto.

![Nave Industrial](/img/screenshots/industrial-building.png)

## Parámetros de entrada

### Geometría
| Parámetro | Descripción |
|-----------|-------------|
| Luz | Ancho libre entre columnas (m) |
| Longitud | Largo total de la nave (m) |
| Altura de columna | Altura libre interior (m) |
| Pendiente de cubierta | Inclinación del rafter (°) |
| Separación entre pórticos | Modulación longitudinal (m) |

### Cargas
| Parámetro | Descripción |
|-----------|-------------|
| Carga muerta cubierta | Peso propio de lámina + correas (kN/m²) |
| Carga viva cubierta | Carga de mantenimiento según NSR-10 (kN/m²) |
| Zona de viento | Zona A, B o C según NSR-10 Título B |
| Uso del edificio | Define grupo de uso (I, II, III, IV) |

### Materiales
- Acero ASTM A36 (Fy = 2530 kg/cm²) o A572 Gr.50 (Fy = 3515 kg/cm²)
- Precio mínimo de acero instalado: $15,000 COP/kg

## Elementos diseñados

### Columna (perfil W)
- Compresión axial + flexión (interacción H1-1a/H1-1b AISC 360)
- Verificación de esbeltez (KL/r ≤ 200)
- Longitud efectiva según condición de apoyo

### Rafter (viga inclinada, perfil W)
- Flexión pura + cortante
- Verificación de pandeo lateral-torsional (capítulo F AISC 360)
- Deflexión máxima L/300 bajo carga de servicio

### Correas de cubierta (perlín C)
- Carga de viento NSR-10 componentes y revestimientos
- Deflexión máxima L/240 bajo carga de viento

### Viento NSR-10
- Presión de diseño por zona geográfica
- Coeficientes de forma para cubierta a dos aguas
- Carga de succión y presión simultáneas

## Salidas del módulo

- Tabla de resultados por elemento (relación D/C, perfil adoptado, peso)
- Peso total de acero (ton)
- **Presupuesto estimado** (materiales + fabricación + instalación)
- **Exportar PDF** con memoria de cálculo completa
- Visualizador 3D del pórtico

## Exportar PDF

El PDF incluye:
- Datos del proyecto
- Resumen de cargas aplicadas
- Verificación AISC para cada elemento
- Diagrama del pórtico
- Presupuesto desglosado por ítem

```
GET /api/export/pdf/industrial-building
```

Body: mismo JSON del cálculo principal.

## Precio del acero instalado

El módulo usa un precio base de **$15,000 COP/kg** que incluye:
- Material (acero laminado en caliente)
- Fabricación en taller (corte, soldadura, pintura)
- Transporte y montaje en sitio

Este valor refleja el costo mínimo en el mercado colombiano (2024–2025). Ajustar según región y complejidad.
