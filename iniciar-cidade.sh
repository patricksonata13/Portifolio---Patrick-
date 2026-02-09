#!/bin/bash
echo "🚀 INICIANDO PROJETO CIDADE DE DEUS"
echo "==================================="

# Parar servidor anterior
echo "🛑 Parando servidores anteriores..."
pkill -f "http.server" 2>/dev/null || true

# Iniciar servidor
echo "🌐 Iniciando servidor web..."
cd ~/site-patrick
python3 -m http.server 8000 &
SERVER_PID=$!

echo "⏳ Aguardando inicialização..."
sleep 2

echo ""
echo "✅ SERVIDOR INICIADO!"
echo ""
echo "📱 ACESSE EM:"
echo "   http://localhost:8000/cidade/"
echo ""
echo "🎯 SEÇÕES PRINCIPAIS:"
echo "   • Visão Geral"
echo "   • Mapa Interativo"
echo "   • Histórias da Comunidade"
echo "   • Produções de Mídia"
echo "   • Raiz Cultural"
echo "   • Projetos em Games"
echo ""
echo "🔧 TECNOLOGIAS:"
echo "   • Leaflet.js (Mapas)"
echo "   • CSS Grid + Flexbox"
echo "   • JavaScript ES6+"
echo "   • Design Mobile-First"
echo ""
echo "🛑 Para parar o servidor: kill $SERVER_PID"
echo ""
echo "📁 Estrutura criada em: ~/site-patrick/cidade"
