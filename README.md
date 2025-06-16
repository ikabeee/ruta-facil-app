# Ruta Fácil App

## Estructura del Proyecto

```
ruta-facil-app/
├── app/                      # Directorio principal de la aplicación (Expo Router)
│   ├── (tabs)/              # Rutas con navegación por pestañas
│   ├── auth/                # Rutas relacionadas con autenticación
│   └── forgot-password/     # Rutas para recuperación de contraseña
├── assets/                  # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── fonts/              # Fuentes personalizadas
│   ├── icons/              # Iconos de la aplicación
│   └── images/             # Imágenes de la aplicación
├── components/             # Componentes reutilizables
│   ├── ui/                # Componentes de interfaz de usuario básicos
│   └── ...                # Otros componentes reutilizables
├── config/                # Configuraciones de la aplicación
├── constants/             # Constantes y valores predefinidos
├── hooks/                 # Hooks personalizados de React
├── modules/               # Módulos de la aplicación
│   ├── auth/             # Módulo de autenticación
│   │   ├── components/   # Componentes específicos de autenticación
│   │   ├── hooks/       # Hooks específicos de autenticación
│   │   └── services/    # Servicios de autenticación
│   └── forgot-password/  # Módulo de recuperación de contraseña
├── scripts/              # Scripts de utilidad
└── utils/               # Funciones y utilidades comunes
    └── constants/       # Constantes específicas de utilidades
```

## Descripción de Carpetas

- **app/**: Contiene la estructura de rutas de la aplicación usando Expo Router.
- **assets/**: Almacena todos los recursos estáticos como imágenes, fuentes e iconos.
- **components/**: Componentes React reutilizables en toda la aplicación.
- **config/**: Archivos de configuración del proyecto.
- **constants/**: Definición de constantes globales.
- **hooks/**: Custom hooks de React para lógica reutilizable.
- **modules/**: Módulos de la aplicación organizados por funcionalidad.
  - Cada módulo puede contener sus propios componentes, hooks y servicios.
- **scripts/**: Scripts de utilidad para el desarrollo.
- **utils/**: Funciones de utilidad y helpers.
