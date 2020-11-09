# Docker-Exploration

### Docker used for documentation : Docker CE (Community Edition)

![logo](./sourceImages/logo.png)

![concept1](https://docs.docker.com/engine/images/architecture.svg)

### Some Basic Docker Commands

| Command                                                      | Description                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| docker version                                               | Get the version information of docker.                                                            |
| docker info                                                  | Get info.                                                                                         |
| docker images                                                | Get all available images in local repo.                                                           |
| docker container ps / docker container ps -a                 | get running containers (-a all stopped & running)                                                 |
| docker container run -p 80:80 -d --name test_container nginx | Run a container with nginx at port 80. bridge host IP 80 and container IP 80.                     |
| docker container run --rm -it image_name                     | run container and automatically remove upon close                                                 |
| docker container logs test_container                         | get logs for mentioned container                                                                  |
| docker container top test_container                          | Get process/daemons running in the container                                                      |
| docker container rm <container_id1> ...                      | Remove stopped container. Containers to be removed should be stopped.                             |
| docker container rm -f <c_id>                                | Remove forcefully.                                                                                |
| docker container inspect test_container                      | details of container config                                                                       |
| docker container stats                                       | show stats mem usage, cpu usage etc.                                                              |
| docker container run -it --name test_name image_name bash    | run container (-i --> interactive,-t --> pseudo tty/ssh) and opens bash(changed default commands) |
| docker container start -ai container_name                    | starts existing (-ai start with given starting command) container                                 |
| docker container stop container_name                         | stops existing container                                                                          |
| docker container exec -it container_name bash                | open bash in already running container                                                            |
| docker history image_name:tag                                | layer information of the image                                                                    |

### Port

        -p 8080:8080

        [host_os_port : docker_container_port]

### What happens behind docker run

![Image](./sourceImages/imageProcessing1.png)

### Points to Notice

- containers aren't mini VM's, they are just processes(binary files) running on HOST Operating Systems.
- Limited to what resource they can access.
- Exit when process is stopped

![concept2](./sourceImages/dockerVsVM.png)

### Examples

#### nginx

- docker pull nginx:latest
- docker run -p 80:80 --name nginx -d nginx:latest
- curl localhost

#### mongo

- docker pull mongo:latest
- docker run -p 27017:27017 --name mongo -d mongo:latest
- mongo --host localhost --port 27017

#### mysql

- docker pull mysql:latest
- docker run -p 3306:3306 --name mysql -e MYSQL_RANDOM_ROOT_PASSWORD=yes -d mysql:latest
- get first random password from docker container logs mysql (GENERATED ROOT PASSWORD)
- mysql -uroot -p[password from previous step] -h127.0.0.1 -P3306

### Docker Networks

![concept3](./sourceImages/networking.png)

| Command                                                                             | Description                                                                                                            |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| docker container port container_name                                                | get port info                                                                                                          |
| docker container inspect --format "{{ .NetworkSettings.IPAddress }}" container_name | get IP                                                                                                                 |
| docker network ls                                                                   | show networks                                                                                                          |
| docker network inspect net_name                                                     | inspect a network                                                                                                      |
| docker network create --driver                                                      | create a network                                                                                                       |
| docker network connect net_id container_id                                          | attach                                                                                                                 |
| docker network disconnect net_id container_id                                       | detach                                                                                                                 |
| docker container run --name c_name --network net_name image_name                    | specifying network name in container while starting                                                                    |
| docker container run --name c_name --net net_name --net-alias alias_name image_name | specifying network name and alias in container while starting (same alias containers can be called with same DNS name) |

### DNS Naming (inter container communication)

- containers cant rely on IP's for inter-communication.
- bridge (default) doesnt have this option.
- one container can communicate with another in same network with container name(instead of IP).
- it is easier in docker compose.

#### try this

- docker pull nginx:latest
- docker network create custom_network
- docker network ls
- docker run -it -d -p 8081:80 --network custom_network --name nginx2 nginx:latest
- docker run -it -d -p 8080:80 --network custom_network --name nginx1 nginx:latest
- docker container ls
- docker container exec -it nginx1 curl http://nginx2

## IMAGE

- app binaries and dependencies
- metadata about image data or how to run the image
- An image is an ordered collection of root filesystem changes and corresponding execution parameters for use within a container runtime.
- Not a complete OS. No kerel ,kernel modules etc.

### Image Layers

| image  |
| ------ |
| env    |
| apt    |
| ubuntu |

| image1        | image2          |                                         |
| ------------- | --------------- | --------------------------------------- |
| port          | other operation | only diff is added in runtime container |
| copy          | copy            | common till here                        |
| apt           | apt             |                                         |
| Debian jessie | Debain jessie   |                                         |

example of layers:

![imagelayers](./sourceImages/imagelayers.png)

### Image representation

        <user>/<repo>:<tag>

## DOCKERFILE

Dockerfile is a recipe for creating image.

| Command                               | Description                                                             |
| ------------------------------------- | ----------------------------------------------------------------------- |
| docker image build -f some-dockerfile | build image from a dockerfile                                           |
| docker image build -t custom_nginx .  | build docker image with tag custom_nginx from current working directory |

| Keyword    | Description                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| FROM       | All dockerfile must have to minimal distribution. want to go completely from scratch use "FROM scratch" |
| ENV        | Setting up environment variables. inject main key/values for image.                                     |
| RUN        | Run shell commads                                                                                       |
| EXPOSE     | Expose ports on docker virtual network still need to use -p / -P on host os                             |
| CMD        | Final command to be run every time container is launched/started                                        |
| COPY       | Copy from local(host) os to docker(guest/virtual) os                                                    |
| ENTRYPOINT | Entrypoint for a container at runtime                                                                   |
| WORKDIR    | is prefered to using "RUN cd /some/path"                                                                |

        It is adviced to keep least changing things in the
        docker images to keep on top(initial steps) and more
        variable things in later steps so that whenver any step changes or updates till that step cache will help to
        speed up the process of building the image.
