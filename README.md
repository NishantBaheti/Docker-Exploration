# Docker-Exploration

![logo](./sourceImages/logo.png)

Docker used for documentation : Docker CE (Community Edition)

![concept1](https://docs.docker.com/engine/images/architecture.svg)

### Installation Steps

### Some Basic Docker Commands

| Command                                                      | Description                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| docker version                                               | Get the version information of docker.                                                            |
| docker info                                                  | Get info.                                                                                         |
| docker images                                                | Get all available images in local repo.                                                           |
| docker container ps / docker container ps -a                 | get running containers (-a all stopped & running)                                                 |
| docker container run -p 80:80 -d --name test_container nginx | Run a container with nginx at port 80. bridge host IP 80 and container IP 80.                     |
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

| Command                                                                             | Description   |
| ----------------------------------------------------------------------------------- | ------------- |
| docker container port container_name                                                | get port info |
| docker container inspect --format "{{ .NetworkSettings.IPAddress }}" container_name | get IP        |
