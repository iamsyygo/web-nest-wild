重命名 docker 镜像

```bash
# docker tag [imageid] [userName][imageName]:[tag]
# imageid 可以省略只写前几位(需要保证唯一) 1e5db27c9726 -> 1e5db
docker tag 1e5db27c9726  iamsyygo/squirrel:0.5.0

```

打包时指定镜像名

```bash
# docker build -t [userName][imageName]:[tag] .
```

移除镜像

```bash
# docker rmi [imageId]
# -f 强制删除，即使有容器在使用
# -f 也可以使用 --force
docker rmi [userName][imageName]:[tag]
```

运行镜像

```bash
# docker run -d -p [宿主机端口]:[容器端口] [镜像名] --name [容器名]
# -d 后台运行，daemon 模式(守护进程)
# -i 交互模式，interactive
# -t 终端模式，terminal
# -it 交互终端模式
# -p 端口映射
docker run -d -p 8080:8080 iamsyygo/squirrel --name squirrel
```

查看运行中的容器

```bash
# docker ps
# -a 查看所有容器
docker ps -a
```

查看容器日志

```bash
# docker logs [容器名]
docker logs squirrel
```

进入容器

```bash
# docker exec -it [容器名] /bin/bash
# exec 执行命令
# /bin/bash 进入容器后执行的命令，这里是进入 bash
docker exec -it squirrel /bin/bash
```

停止容器

```bash
# docker stop [容器名]
docker stop squirrel
```

> 镜像是静态的，容器是动态的
> 镜像是容器的模板，容器是镜像的实例
> 镜像是只读的，容器是可读写的
> 镜像是一张照片，当源码编译成镜像后，就像照片一样，不可修改，只能重新生成一张新的照片

同步源码，让容器中的代码和本地代码保持一致
需要注意的是，运行的脚本需要通过监测文件变化来重启服务，否则代码更新后，服务不会重启，导致代码更新不生效。即使容器目录是同步的

```bash
# docker run -v [宿主机目录]:[容器目录] [镜像名]
# -v 挂载目录，volume，将宿主机目录挂载到容器目录，这样容器中的代码就和宿主机中的代码保持一致(同步)
# -v 也可以使用 --volume
# -v [宿主机目录]:[容器目录]:[权限]
# 权限：ro 只读，rw 读写，默认是 rw
# example -v /Volumes/aoe/web-design/meta/web-nest-squirrel:/app:ro
# 路径需要绝对路径
docker run -v /Volumes/aoe/web-design/meta/web-nest-squirrel:/app -d -p 8080:8080 iamsyygo/squirrel --name squirrel
```

> 虽然使用 .dockerignore 忽略了 node_modules，但是在使用 -v 挂载目录时(同步)，会将宿主机的 node_modules 挂载到容器中，导致容器中的 node_modules 被覆盖。本地的 node_modules 如果被删除或者修改，容器中的 node_modules 也会被删除或者修改
> zai 次使用 -v 对容器进行声明，忽略同步 node_modules

```bash
# docker run -v [宿主机目录]:[容器目录] -v [容器目录]/node_modules [镜像名]
# -v [容器目录]/node_modules 告诉 docker 不要同步本地宿主机的 node_modules
docker run -v /Volumes/aoe/web-design/meta/web-nest-squirrel:/app -v /app/node_modules -d -p 8080:8080 iamsyygo/squirrel --name squirrel
```

另外的，假如容器有新增文件时，因为通过 -v 挂载的目录是宿主机的目录(同步)，所以宿主机的目录也会新增文件。需要在使用 -v 挂载目录时，对容器进行声明：

- -v [宿主机目录]:[容器目录]:ro 宿主机目录只读，容器新增文件时，宿主机不会新增文件
- -v [宿主机目录]:[容器目录]:rw 宿主机目录可读写，容器新增文件时，宿主机也会新增文件

```bash
docker run -v /Volumes/aoe/web-design/meta/web-nest-squirrel:/app:ro -v /app/node_modules -d -p 8080:8080 iamsyygo/squirrel --name squirrel
```

删除容器

```bash
# docker rm [容器名]
# -f 强制删除，即使容器在运行
docker rm squirrel
```

如果使用 -v(volumn) 挂载目录，需要先删除挂载目录，再删除容器。防止 volumn 变的越来越多

```bash
# docker rm -v [容器名]
docker rm -v squirrel
```

查看容器的 volumn

```bash
# docker inspect [容器名]
# inspect 检查，查看容器的详细信息
docker inspect squirrel
```

检查容器问题

1. 查看容器日志

   ```bash
   docker logs [容器名|容器id]
   ```

### 安装 MySQL

```bash
docker pull mysql

docker search mysql

docker run
-itd
--name=mysql
-p 3306:3306
-v /etc/mysql/conf:/etc/mysql/conf.d
-v /etc/mysql/logs:/logs
-v /etc/mysql/data:/var/lib/mysql
# mysql 需要变量
-e MYSQL_ROOT_PASSWORD=123456
mysql

# -itd 交互模式，终端模式，后台运行

docker exec -it mysql bash
# docker exec -it mysql /bin/bash

# 进入 mysql
mysql -u root -p

# 查看数据库
show databases;

# 新建数据库
create database [数据库名];

exit

# 日志
docker logs mysql
```

> 报错：load metadata for docker.io/library/node:18-alpine3.15
> 解决：尝试进行 docker login，然后再次执行 docker-compose up

```bash
docker login

docker-compose up
```
