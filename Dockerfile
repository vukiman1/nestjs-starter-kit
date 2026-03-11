FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
# Sử dụng install với --frozen-lockfile và --ignore-scripts để tránh lỗi Husky
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm build
# Loại bỏ devDependencies để giảm kích thước image
RUN pnpm prune --prod --ignore-scripts

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
# Chạy trực tiếp bằng node để không phụ thuộc vào pnpm ở runner stage
CMD ["node", "dist/main"]
