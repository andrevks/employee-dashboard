#!/bin/bash

# Verificar Node.js
if ! command -v node &> /dev/null
then
    echo "Node.js não encontrado. Por favor, instale Node.js versão 20 ou superior."
    exit
fi

# Verificar Yarn ou npm
if command -v yarn &> /dev/null
then
    PACKAGE_MANAGER="yarn"
elif command -v npm &> /dev/null
then
    echo "Yarn ou npm não encontrado. Por favor, instale um deles."
    exit
fi

# Configurar backend
echo "Configurando backend..."
cd api
$PACKAGE_MANAGER install

# Copiar .env.example para .env se não existir
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Iniciar backend temporariamente para verificação
echo "Iniciando backend temporariamente para verificação..."
$PACKAGE_MANAGER dev &
BACKEND_PID=$!

# Aguardar o backend iniciar
echo "Aguardando backend iniciar..."
sleep 10

# Verificar a conexão com o MongoDB do cluster
echo "Verificando conexão com o MongoDB do cluster..."
curl -s http://localhost:3333/api/employees > /dev/null

if [ $? -ne 0 ]; 
then
    echo "MongoDB do cluster não está acessível. Usando Docker Compose para configurar MongoDB localmente."
    kill $BACKEND_PID

    # Verificar se o Docker está em execução
    if ! docker info &> /dev/null
    then
        echo "Docker não está em execução. Por favor, inicie o Docker."
        exit
    fi
    # Executar Docker Compose
    echo "Iniciando MongoDB com Docker Compose..."
    docker-compose up -d

    # Aguardar o MongoDB iniciar
    echo "Aguardando MongoDB iniciar..."
    sleep 10

    # Atualizar o .env com a URI do MongoDB local
    echo "Atualizando o .env com a URI do MongoDB local..."
    if grep -q '^MONGO_URI=' .env; then
        sed -i '' 's|^MONGO_URI=.*|MONGO_URI=mongodb://root:example@localhost:27017|' .env
    else
        echo 'MONGO_URI=mongodb://root:example@localhost:27017' >> .env
    fi

    # Iniciar o backend novamente
    echo "Reiniciando backend..."
    $PACKAGE_MANAGER dev &
    BACKEND_PID=$!

    # Aguardar o backend iniciar
    echo "Aguardando backend iniciar..."
    sleep 10
else
    echo "MongoDB do cluster está acessível."
fi

# Executar testes do backend
echo "Executando testes do backend..."
$PACKAGE_MANAGER test

# Configurar frontend
echo "Configurando frontend..."
cd ../frontend
$PACKAGE_MANAGER install

# Copiar .env.example para .env se não existir
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Iniciar frontend
echo "Iniciando frontend..."
$PACKAGE_MANAGER dev &

# Esperar que ambos os processos terminem
wait
