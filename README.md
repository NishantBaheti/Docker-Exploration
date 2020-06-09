# Docker-Exploration

![logo](./sourceImages/logo.png)

We are using here Docker CE (Community edition)

### Installation Steps

### Some Basic Commands

***docker version***
<p>Get the version information of docker.</p>

***docker info***
<p>Get info.</p>

***docker images***
<p>Get all available images in local repo.</p>

***docker container ps / docker container ps -a***
<p>get running containers (-a all stopped & running).</p>

***docker container run --publish 80:80 --detach --name test_container nginx***
<p>Run a container with nginx at port 80. All the traffic is routing from host IP port 80 to container IP port 80 serving on nginx.</p>

***docker logs <container_name>***
<p>get logs for mentioned container.</p>
