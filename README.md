# Docker-Exploration

![logo](./sourceImages/logo.png)

We are using here Docker CE (Community edition)

### Installation Steps

### Some Basic Commands

1. docker version
<p>Get the version information of docker.</p>

1. docker info
<p>Get info.</p>

1. docker images
<p>Get all available images in local repo.</p>

1. docker container ps / docker container ps -a
<p>get running containers (-a all stopped & running).</p>

1. docker container run --publish 80:80 --detach --name test_container nginx
<p>Run a container with nginx at port 80. All the traffic is routing from host IP port 80 to container IP port 80 serving on nginx.</p>

1. docker logs <container_name>
<p>get logs for mentioned container.</p>
