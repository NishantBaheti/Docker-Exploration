# Docker-Exploration

![logo](./sourceImages/logo.png)

We are using here Docker CE (Community edition)

### Installation Steps

### Some Basic Commands

**_docker version_** <p>Get the version information of docker.</p>

**_docker info_** <p>Get info.</p>

**_docker images_** <p>Get all available images in local repo.</p>

**_docker container ps / docker container ps -a_** <p>get running containers (-a all stopped & running).</p>

**_docker container run --publish 80:80 --detach --name test_container nginx_** <p>Run a container with nginx at port 80. All the traffic is routing from host IP port 80 to container IP port 80 serving on nginx.</p>

**_docker container logs test_container_** <p>get logs for mentioned container.</p>

**_docker container top test_container_** <p>Get process/daemons running in the container.</p>
