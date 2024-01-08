# BUILD FOR DEV
FROM node:20-alpine As development

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .
USER node

# BUILD FOR PRODUCTION
FROM node:20-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN pnpm build
ENV NODE_ENV production
RUN pnpm install --frozen-lockfile --only=production

USER node


# PRODUCTION
FROM node:20-alpine AS production

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG PORT=3003
ENV PORT=$PORT

ARG CORS_WHITELIST_ORIGINS="*"
ENV CORS_WHITELIST_ORIGINS=$CORS_WHITELIST_ORIGINS

ARG ENCRYPT_SECRET_KEY="SECRET_KEY$"
ENV ENCRYPT_SECRET_KEY=$ENCRYPT_SECRET_KEY

ARG ENCRYPT_SECRET_IV="SECRET_IV$"
ENV ENCRYPT_SECRET_IV=$ENCRYPT_SECRET_IV

ARG KINDE_CLIENT_ID="KINDE_CLIENT_ID$"
ENV KINDE_CLIENT_ID=$KINDE_CLIENT_ID

ARG KINDE_CLIENT_SECRET="KINDE_CLIENT_SECRET$"
ENV KINDE_CLIENT_SECRET=$KINDE_CLIENT_SECRET

ARG KINDE_DOMAIN="KINDE_DOMAIN$"
ENV KINDE_DOMAIN=$KINDE_DOMAIN

ARG KINDE_REDIRECT_URI="KINDE_REDIRECT_URI$"
ENV KINDE_REDIRECT_URI=$KINDE_REDIRECT_URI

ARG KINDE_LOGOUT_REDIRECT_URI="KINDE_LOGOUT_REDIRECT_URI$"
ENV KINDE_LOGOUT_REDIRECT_URI=$KINDE_LOGOUT_REDIRECT_URI

ARG KINDE_JWK_URL="KINDE_JWK_URL$"
ENV KINDE_JWK_URL=$KINDE_JWK_URL

ARG MONGO_URL="mongodb://mongo/daily_planner"
ENV MONGO_URL=$MONGO_URL

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

USER node

CMD [ "node", "dist/main.js" ]
