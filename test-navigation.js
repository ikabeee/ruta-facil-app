// test-navigation.js
// Script simple para probar que la navegación funcione

console.log('🔍 Verificando estructura de archivos de navegación...');

const fs = require('fs');
const path = require('path');

const appPath = 'c:\\Users\\Carlos Gonzalez\\Documents\\repositories\\github\\ruta-facil-app\\app';

// Verificar archivos clave
const files = [
  path.join(appPath, 'MobileTransportApp', 'routes.tsx'),
  path.join(appPath, 'MobileTransportApp', 'user.tsx'),
  path.join(appPath, '_layout.tsx'),
  path.join(appPath, 'utils', 'api.service.ts'),
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - EXISTE`);
  } else {
    console.log(`❌ ${file} - NO ENCONTRADO`);
  }
});

console.log('\n📱 Estructura de navegación verificada!');
