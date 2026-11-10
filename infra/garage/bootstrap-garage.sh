#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="${1:-garage}"
BUCKET_NAME="${2:-estudio-11-12}"
KEY_NAME="${3:-estudio-11-12-key}"

echo "==> 1. Obteniendo Node ID de Garage ($CONTAINER_NAME)..."
NODE_ID=$(docker exec "$CONTAINER_NAME" /garage status | awk '/==== HEALTHY NODES ====/ {getline; getline; print $1}')

echo "==> 2. Asignando layout single-node (zona dc1, 50GB)..."
docker exec "$CONTAINER_NAME" /garage layout assign -z dc1 -c 50G "$NODE_ID"
LAYOUT_VER=$(docker exec "$CONTAINER_NAME" /garage layout show | awk '/Current cluster layout version:/ {print $5 + 1}')
docker exec "$CONTAINER_NAME" /garage layout apply --version "${LAYOUT_VER:-1}" || true

echo "==> 3. Creando bucket [$BUCKET_NAME] y habilitando modo Web estático (puerto 3902)..."
docker exec "$CONTAINER_NAME" /garage bucket create "$BUCKET_NAME" || true
docker exec "$CONTAINER_NAME" /garage bucket website --allow "$BUCKET_NAME"

echo "==> 4. Creando llave S3 [$KEY_NAME] y otorgando permisos..."
docker exec "$CONTAINER_NAME" /garage key create "$KEY_NAME" || true
docker exec "$CONTAINER_NAME" /garage bucket allow --read --write --owner "$BUCKET_NAME" --key "$KEY_NAME"

echo "==> 5. Credenciales generadas para tu .env:"
docker exec "$CONTAINER_NAME" /garage key info "$KEY_NAME" --show-secret
