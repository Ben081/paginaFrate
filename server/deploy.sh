#!/bin/bash
# ════════════════════════════════════════════════════════════
# deploy.sh — Desplegar API de Donaciones Frate en el VPS
# Ejecutar desde el VPS: bash deploy.sh
# ════════════════════════════════════════════════════════════

set -e

API_DIR="/home/frate/frate-api"
SERVICE_NAME="frate-api"

echo "═══ [1/5] Verificando Node.js ═══"
if ! command -v node &> /dev/null; then
  echo "Instalando Node.js 20.x..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "Node $(node -v) | npm $(npm -v)"

echo ""
echo "═══ [2/5] Instalando dependencias del backend ═══"
cd "$API_DIR"
npm install

echo ""
echo "═══ [3/5] Configurando variables de entorno ═══"
if [ ! -f "$API_DIR/.env" ]; then
  echo "Creando .env desde .env.example..."
  cp "$API_DIR/.env.example" "$API_DIR/.env"
  echo ""
  echo "⚠️  EDITA EL ARCHIVO $API_DIR/.env CON TUS CREDENCIALES"
  echo "   Especialmente: SMTP_PASS, ADMIN_TOKEN y CULQI_SECRET_KEY"
  echo ""
fi

echo ""
echo "═══ [4/5] Configurando PM2 ═══"
if ! command -v pm2 &> /dev/null; then
  echo "Instalando PM2 globally..."
  npm install -g pm2
fi

# Detener instancia previa si existe
pm2 stop "$SERVICE_NAME" 2>/dev/null || true
pm2 delete "$SERVICE_NAME" 2>/dev/null || true

# Iniciar API
cd "$API_DIR"
pm2 start server.js --name "$SERVICE_NAME" --cwd "$API_DIR"
pm2 save

# Configurar PM2 para iniciar con el sistema
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo ""
echo "═══ [5/5] Configurando Nginx ═══"
if ! command -v nginx &> /dev/null; then
  echo "Instalando Nginx..."
  sudo apt-get install -y nginx
fi

# Copiar configuración
sudo cp "$API_DIR/nginx.conf" /etc/nginx/sites-available/frate-lat
sudo ln -sf /etc/nginx/sites-available/frate-lat /etc/nginx/sites-enabled/frate-lat

# Eliminar default si existe
sudo rm -f /etc/nginx/sites-enabled/default

# Test y reload
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅  Despliegue completado!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📡  API:       https://frate.lat/api/health"
echo "🔒  Admin:     https://frate.lat/admin/donaciones/TU_TOKEN"
echo ""
echo "📋  Próximos pasos:"
echo "   1. Editar $API_DIR/.env con tus credenciales"
echo "   2. Configurar HTTPS con Let's Encrypt (certbot)"
echo "   3. Verificar: curl https://frate.lat/api/health"
echo ""
echo "📋  Comandos útiles:"
echo "   pm2 logs frate-api      — ver logs"
echo "   pm2 restart frate-api   — reiniciar API"
echo "   pm2 status              — estado de procesos"
echo ""