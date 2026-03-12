# Dockerfile pour le développement local
FROM node:20-alpine

# Installer les dépendances système si nécessaire
RUN apk add --no-cache libc6-compat

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci

# Copier les fichiers Prisma nécessaires pour générer le client
COPY prisma ./prisma
COPY prisma.config.ts ./

# Générer le client Prisma
RUN npx prisma generate

# Copier le reste des fichiers
COPY . .

# Régénérer le client Prisma (output dans app/generated/prisma)
RUN npx prisma generate

# Exposer le port 3000
EXPOSE 3000

# Variable d'environnement pour le développement
ENV NODE_ENV=development

# Lancer Next.js en mode développement avec hot-reload
CMD ["npm", "run", "dev"]
