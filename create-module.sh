#!/bin/bash

# Usage: ./create-module.sh <app-name> <module-name>
if [ $# -lt 2 ]; then
    echo "Usage: $0 <app-name> <module-name>"
    echo "Available apps: gateway, inventory, orders, payment, users"
    exit 1
fi

APP_NAME=$1
MODULE_NAME=$2

# Validate app name
VALID_APPS=("gateway" "inventory" "orders" "payment" "users")
if [[ ! " ${VALID_APPS[@]} " =~ " ${APP_NAME} " ]]; then
    echo "Error: Invalid app name. Must be one of: ${VALID_APPS[*]}"
    exit 1
fi

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_PATH="$SCRIPT_DIR/apps/$APP_NAME/src/modules/$MODULE_NAME"

# Create directory structure
echo "Creating module structure for $MODULE_NAME in $APP_NAME..."

# Create main directories
mkdir -p "$BASE_PATH"/{domain,application,infrastructure,interfaces}

# Create domain layer
mkdir -p "$BASE_PATH"/domain/{aggregates,entities,value-objects,repositories,constants,exceptions,factories,policies}

# Create application layer
mkdir -p "$BASE_PATH"/application/{services,commands,queries,events,subscribers}
mkdir -p "$BASE_PATH"/application/{commands,queries,events}/handlers

# Create infrastructure layer
mkdir -p "$BASE_PATH"/infrastructure/{repositories,persistence/typeorm/entities}

# Create interfaces layer
mkdir -p "$BASE_PATH"/interfaces/{controllers,dto,facades,validators}

# Create empty base files
touch "$BASE_PATH/$MODULE_NAME.module.ts"
touch "$BASE_PATH/interfaces/controllers/$MODULE_NAME.controller.ts"
touch "$BASE_PATH/application/services/$MODULE_NAME.service.ts"

# Create empty index files for easier imports
touch "$BASE_PATH/domain/index.ts"
touch "$BASE_PATH/application/index.ts"
touch "$BASE_PATH/infrastructure/index.ts"
touch "$BASE_PATH/interfaces/index.ts"

# Create empty files for the module
touch "$BASE_PATH/interfaces/dto/$MODULE_NAME.dto.ts"
touch "$BASE_PATH/domain/entities/$MODULE_NAME.entity.ts"
touch "$BASE_PATH/domain/repositories/i-$MODULE_NAME.repository.ts"
touch "$BASE_PATH/infrastructure/repositories/$MODULE_NAME.repository.ts"
touch "$BASE_PATH/application/commands/create-$MODULE_NAME.command.ts"
touch "$BASE_PATH/application/queries/get-$MODULE_NAME.query.ts"
touch "$BASE_PATH/application/events/$MODULE_NAME.events.ts"
touch "$BASE_PATH/interfaces/facades/$MODULE_NAME.facade.ts"
touch "$BASE_PATH/domain/value-objects/$MODULE_NAME-id.value-object.ts"

# Set appropriate permissions
chmod -R 755 "$BASE_PATH"

echo "✅ Generated module structure for: $MODULE_NAME"
echo "📁 Location: $BASE_PATH"