# Docker-Exploration

![logo](./sourceImages/logo.png)

We are using here Docker CE (Community edition)

### Installation Steps

### Some Basic Commands

1. docker version --> Get the version information of docker.
1. docker info --> Get info
1. docker images --> Get all available images in local repo.
1. docker container ps / docker container ps -a --> get running containers (-a all stopped & running)
1. docker container run --publish 80:80 --detach --name test_container nginx --> <p>Run a container with nginx at port 80. All the traffic is routing from host IP port 80 to container IP port 80 serving on nginx.</p>
