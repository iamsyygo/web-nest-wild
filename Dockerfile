# nestjs 项目的 Dockerfile

# 使用 node 18，操作系统为 alpine 3.15(Linux 的轻量级发行版)
FROM node:18-alpine3.15

# 工作目录
WORKDIR /app

# package.json copy to /app
COPY package.json .

# npm 镜像源
RUN npm config set registry https://registry.npm.taobao.org

# Install dependencies
RUN npx pnpm install

# Copy source code
## .dockerignore 没有忽略 package.json，所以这里进行两次 copy，这样是考虑性能问题的。
## docker 是自上而下的构建，并且会缓存每一层(行)，如果 package.json 没有变化，那么就不会重新安装依赖(执行 RUN npx pnpm install)
## 如果没有第一次 copy package.json，而是 COPY . .，那么每次源码改变，都会重新安装依赖，这样就会很慢。
COPY . .


# Container expose port 容器暴露的端口，不是宿主机的端口(这里只起到了文档的作用，有可能不是暴露的端口)
EXPOSE 3000

# Run the app
# RUN 与 CMD 的区别：
# RUN 是在"构建镜像"时执行的命令，而 CMD 是在"容器启动时执行"的命令。
CMD ["npm", "run", "dev"]
