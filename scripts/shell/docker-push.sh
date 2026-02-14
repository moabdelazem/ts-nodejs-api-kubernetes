#!/bin/env bash
set -euo pipefail

REGISTRY="moabdelazem"
IMAGE="ts-nodejs-api-kubernetes"
VERSION=$(node -p "require('./package.json').version")
COMMIT_SHA=$(git rev-parse --short HEAD)

TAGS=(
  "${REGISTRY}/${IMAGE}:latest"
  "${REGISTRY}/${IMAGE}:${VERSION}"
  "${REGISTRY}/${IMAGE}:${VERSION}-${COMMIT_SHA}"
)

echo "Building image with tags:"
for tag in "${TAGS[@]}"; do
  echo "  - ${tag}"
done

BUILD_ARGS=""
for tag in "${TAGS[@]}"; do
  BUILD_ARGS="${BUILD_ARGS} -t ${tag}"
done

docker build ${BUILD_ARGS} .

echo ""
echo "Pushing images..."
for tag in "${TAGS[@]}"; do
  docker push "${tag}"
done

echo ""
echo "Done. Pushed:"
for tag in "${TAGS[@]}"; do
  echo "  - ${tag}"
done
