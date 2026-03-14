---
id: unidades
title: Unidades y normas
sidebar_position: 3
---

# Unidades y normas de referencia

## Sistema de unidades

ComandoCalc usa el sistema **CGS adaptado** para ingeniería estructural colombiana:

| Magnitud | Unidad | Símbolo |
|----------|--------|---------|
| Fuerza / Carga | kilogramo-fuerza | kg |
| Longitud | centímetro | cm |
| Tensión / Esfuerzo | kilogramo por centímetro cuadrado | kg/cm² |
| Masa lineal | kilogramo por metro | kg/m |
| Carga distribuida | kilogramo por metro cuadrado | kg/m² |
| Momento flector | kilogramo-metro | kg·m |
| Cortante | kilogramo | kg |
| Deflexión | centímetro | cm |

### Conversiones útiles

| De | A | Factor |
|----|---|--------|
| kN | kg | × 101.97 |
| kN/m² (kPa) | kg/m² | × 101.97 |
| MPa (N/mm²) | kg/cm² | × 10.197 |
| kg/cm² | MPa | × 0.0981 |
| m | cm | × 100 |

## Materiales (valores por defecto)

### Acero estructural

| Propiedad | Valor |
|-----------|-------|
| Módulo de elasticidad E | 2,039,000 kg/cm² |
| Módulo de corte G | 785,000 kg/cm² |
| Relación de Poisson ν | 0.30 |
| Coeficiente de expansión térmica | 1.17 × 10⁻⁵ /°C |
| Peso unitario | 7,850 kg/m³ |

### Grados de acero soportados

| Grado | Fy (kg/cm²) | Fu (kg/cm²) | Norma |
|-------|-------------|-------------|-------|
| A-36 | 2,530 | 4,080 | ASTM A36 |
| A-572 Gr.50 | 3,515 | 4,570 | ASTM A572 |
| A-992 | 3,515 | 4,570 | ASTM A992 |
| ASTM A500 Gr.B | 3,165 | 4,000 | ASTM A500 (HSS) |
| ASTM A500 Gr.C | 3,515 | 4,320 | ASTM A500 (HSS) |

:::info
El valor por defecto en todos los módulos es **A-36 (Fy = 2,530 kg/cm²)**, que es el acero más común en Colombia.
:::

## Normas aplicadas

### AISC 360-16

La **Especificación para Construcciones de Acero** del American Institute of Steel Construction, edición 2016. Es la norma de diseño estructural de acero de referencia en Colombia.

Capítulos aplicados por módulo:

| Capítulo | Contenido | Módulos |
|----------|-----------|---------|
| B | Diseño general | Todos |
| D | Tensión | — |
| E | Compresión | Columna, Pórtico |
| F | Flexión | Viga, Correas, Pórtico |
| G | Cortante | Viga, Pórtico |
| H | Flexo-compresión | Flexo-compresión, Pórtico |
| I | Miembros compuestos | Columna Compuesta, Steel Deck |
| J | Conexiones | — (versión futura) |

### NSR-10

La **Norma Sismo Resistente Colombiana 2010** (Decreto 926 de 2010 y actualizaciones).

| Título | Contenido | Módulos |
|--------|-----------|---------|
| Título A | Requisitos sísmicos generales | Viento, Viga, Columna |
| Título B | Cargas | Viento, Vibraciones |
| Título F | Estructuras metálicas | Todos |

### AISC Design Guide 11

Guía de diseño para **vibraciones de piso** en estructuras de acero. Usada en el módulo de Vibraciones.

### AWS D1.1

Código de soldadura estructural de acero. Referencia para el módulo de Presupuesto (cálculo de soldadura).
