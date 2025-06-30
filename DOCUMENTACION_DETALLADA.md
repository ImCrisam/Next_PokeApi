# DOCUMENTACION_DETALLADA.md

## 1. Introducción

**Pokémon Explorer** es una Pokédex interactiva desarrollada como desafío técnico para Litsight. Permite explorar los 151 Pokémon de la primera generación, ver sus detalles, filtrar por tipo y alternar entre vista de tabla y cuadrícula. El proyecto está construido con Next.js, React, TypeScript y Material UI. Todos los datos se obtienen en tiempo real desde la PokéAPI y la aplicación se exporta de forma estática para su despliegue en GitHub Pages.

---

## 2. Estructura del Proyecto

```
/src/app/
  |_ (home)/           # Página principal y componentes de inicio
  |_ grid/             # Vista en cuadrícula (Grid)
  |_ table/            # Vista en tabla (Table)
  |_ _context/         # Contextos globales (React Context)
  |_ _details/         # Componentes de detalle de Pokémon
  |_ _common/          # Componentes, hooks, utilidades y servicios reutilizables
  |_ _theme/           # Temas y registro de temas
  |_ _types/           # Tipos TypeScript
  |_ layout.tsx        # Layout general de la app
  |_ globals.css       # Estilos globales
```

---

## 3. Arquitectura y Principales Módulos

### 3.1 Vistas: Grid y Table

- **Grid (`/src/app/grid/`)**
  - `PokemonCard.tsx`: Tarjeta individual de Pokémon.
  - `MasonryGrid.tsx`: Disposición responsiva de tarjetas.
  - `page.tsx`: Página principal de la vista Grid.

- **Table (`/src/app/table/`)**
  - `PokemonTable.tsx`: Tabla principal con DataGrid.
  - `PokemonTableHead.tsx`, `PokemonTableBody.tsx`: Encabezado y cuerpo de la tabla.
  - `PickerTypesTable.tsx`: Filtro de tipos en la tabla.
  - `TableHeaderWithFilter.tsx`: Encabezado con filtros adicionales.
  - `page.tsx`: Página principal de la vista Table.

Ambas vistas permiten filtrar, ordenar y explorar los Pokémon, y abren un modal de detalles al seleccionar un Pokémon.

---

### 3.2 Componentes Reutilizables (`_common/component/`)

- **Chips y Filtros**
  - `AllChipTypes.tsx`, `ChipType.tsx`: Chips visuales para tipos de Pokémon.
  - `TypeFilterAutocomplete.tsx`: Autocompletado para filtrar por tipo.
- **UI y Utilidades**
  - `SortButtons.tsx`: Botones para ordenar.
  - `DebouncedSlider.tsx`: Slider con debounce para filtros numéricos.
  - `PokemonCryPlayer.tsx`: Reproductor de sonidos de Pokémon.
- **Layers**
  - `Modal.tsx`, `BottomDrawer.tsx`, `TypePopper.tsx`: Capas y modales reutilizables.

---

### 3.3 Contextos y Providers (`_context/`)

- **`PokemonContext.tsx`**: Contexto global para el estado de los Pokémon, filtros, selección y detalles.
- **`ThemeContext.tsx`**: Contexto para el tema (oscuro/claro).
- **`ClientProvider.tsx`**: Proveedor de contexto para el cliente.

---

### 3.4 Hooks Personalizados (`_common/hooks/`)

- **`usePokemonTypes.ts`**: Hook para obtener y manipular los tipos de Pokémon, útil para filtros y visualización.

---

### 3.5 Servicios y Adaptadores

- **Servicios (`_common/services/`)**
  - `pokemonService.ts`: Lógica para obtener datos de Pokémon (desde la API).
- **Adaptadores (`_common/adapters/`)**
  - `pokemonAdapter.ts`: Transforma los datos de la API al formato usado en la app.

---

### 3.6 Tipos TypeScript (`_types/`)

- **`Pokemon.ts`**: Define los tipos y estructuras de datos principales para los Pokémon y sus atributos.

---

## 4. Flujo de Datos y Funcionamiento

1. **Carga de datos**: Al iniciar, se obtienen los datos de los 151 Pokémon directamente desde la PokéAPI.
2. **Contexto global**: El estado de los Pokémon, filtros y selección se maneja en `PokemonContext`.
3. **Filtrado y ordenamiento**: Los componentes de filtro y orden usan el contexto y hooks personalizados para modificar la vista.
4. **Renderizado**: Según la ruta, se muestra la vista Grid o Table, ambas consumen el estado global.
5. **Detalles**: Al seleccionar un Pokémon, se abre un modal con información detallada, usando los componentes de `_details/`.

**Diagrama de flujo simplificado:**

```
[Inicio] 
   ↓
[PokemonService] → [PokemonAdapter] → [PokemonContext]
   ↓                                 ↘
[Grid/Table View] ← [Filtros/Orden] ← [Hooks]
   ↓
[Modal de Detalles]
```

---

## 5. Exportación Estática y Despliegue

La aplicación utiliza la funcionalidad de exportación estática de Next.js (`next export`) para generar archivos HTML y JS estáticos. Esto permite desplegar la aplicación fácilmente en GitHub Pages, asegurando alta velocidad y disponibilidad sin necesidad de servidor backend.

---

## 6. Ejemplo de Extensión/Modificación

**Agregar un nuevo filtro por estadística:**

1. Crear un nuevo componente de filtro en `_common/component/`.
2. Usar o extender el contexto (`PokemonContext`) para añadir el nuevo filtro al estado global.
3. Modificar los hooks y la lógica de filtrado en `usePokemonTypes.ts` o en los componentes de vista.
4. Añadir el nuevo filtro a la UI de Grid y Table.

---

## 7. Tecnologías y Dependencias

- **React** y **Next.js**: Framework principal.
- **Material UI**: Componentes de UI modernos y responsivos.
- **TypeScript**: Tipado estático y robustez.
- **PokéAPI**: Fuente de datos de Pokémon.
- **Otros**: Herramientas de desarrollo y utilidades de React.

---

## 8. Guía de Desarrollo y Buenas Prácticas

- **Componentización**: Usa componentes pequeños y reutilizables.
- **Tipado estricto**: Define y usa tipos en `/src/app/_types/`.
- **Contextos**: Centraliza el estado global en contextos.
- **Hooks personalizados**: Extrae lógica repetida en hooks.
- **Estilos**: Usa temas y estilos globales para coherencia visual.
- **Extensibilidad**: Sigue la estructura modular para facilitar nuevas vistas, filtros o funcionalidades.

---

## 9. Créditos

Desarrollado por [ImCrisam](https://github.com/ImCrisam) para Litsight.

--- 