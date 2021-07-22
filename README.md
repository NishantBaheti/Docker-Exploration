# Docker-Exploration

### Docker used for documentation : Docker CE (Community Edition)

![logo](./sourceImages/logo.png)

![concept1](./sourceImages/architecture.svg)

- go to https://get.docker.com/
- take the script 
- install it- easy-peasy
- curl -sSL https://get.docker.com/ | sh

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

  or

- docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
- mysql -uroot -p my-secret-pw -h127.0.0.1 -P3306

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

| Keyword    | Description                                                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FROM       | All dockerfile must have to minimal distribution. want to go completely from scratch use "FROM scratch"                                                       |
| ENV        | Setting up environment variables. inject main key/values for image.                                                                                           |
| RUN        | Run shell commads                                                                                                                                             |
| EXPOSE     | Expose ports on docker virtual network still need to use -p / -P on host os                                                                                   |
| CMD        | Final command to be run every time container is launched/started                                                                                              |
| COPY       | Copy from local(host) os to docker(guest/virtual) os                                                                                                          |
| ENTRYPOINT | Entrypoint for a container at runtime                                                                                                                         |
| WORKDIR    | is prefered to using "RUN cd /some/path"                                                                                                                      |
| VOLUME     | Create a new volume location and assign it to the directory in the container will outlive the container when container is updated. (requires manual deletion) |
| ADD        |                                                                                                                                                               |

        It is adviced to keep least changing things in the
        docker images to keep on top(initial steps) and more
        variable things in later steps so that whenver any step changes or updates till that step cache will help to
        speed up the process of building the image.

## PRUNE

| Command             | Description                 |
| ------------------- | --------------------------- |
| docker image prune  | removbe all dangling images |
| docker system prune | remobe everything           |

## Container lifetime and persistent data

1. immutable (unchanging) and ephemeral (temporary/ disposable).
1. "immutable infrastructure" : only re-deploy containers, never change.
1. But if there is some data that has to be present (like database or unique data).
1. data can be preserved when container is getting updated with latest version.
   docker gives us feature to ensure "separation of concerns".
1. This is called as "Presistent data".
1. 2 solutions for this - Volumns and Bind Mounts.
1. <b> VOLUMES </b> : make special location outside of container UFS(union file system).
1. <b> BIND MOUNT </b> : link container path to host path.

## PERSISTENT DATA

- ### DATA VOLUMES

1. Create a new volume location and assign it to the directory in the container
1. will outlive the container when container is updated.
1. requires manual deletion

![volumeInfo](./sourceImages/volumeInfo.png)

| Command                           | Description              |
| --------------------------------- | ------------------------ |
| docker volume ls                  | list of volumes          |
| docker volume inspect volume_name | information about volume |
| docker volume create volumne_name | create volume            |

![volumes1](./sourceImages/volumes1.png)

        docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql:latest

- if name is provided then it will register by name otherwise by default a random name would be generated. (Named volumes)
- -v [name]:[path/to/volume]

![volumes2](./sourceImages/volumes2.png)

- ### BIND MOUNTING

1.  Maps a host file or dir to container file or directory.
1.  basically two locations pointing to same file.
1.  Skips UFS, host files overwrite any in container.
1.  Cant use Dockerfile, has to be mentioned in docker container run command.
1.  -v [/host/fs/path]:[/container/fs/path]

1.  Try

        docker container run -it -d -p 3000:80 --name nginx -v /home/nishant/Desktop/Docker-Exploration/htmlexample:/usr/share/nginx/html nginx:latest

# Docker Compose

- Configure relationships between containers.
- Save docker container run settings in easy-to-read file
- One liner developer env setup.
- 1. YAML file - containers, networks, volumes, env.(default docker-compose.yml/yaml)
  1. CLI tool - docker-compose

## docker-compose CLI

- CLI tool is not a production grade tool but ideal for development and test.

| Command                        | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| docker-compose up              | setup volumes,networks and start all containers                         |
| docker-compose up -f file_name | setup volumes,networks and start all containers with a custom file_name |
| docker-compose down            | stop all containers and remove containers/vols/nets                     |
| docker-compose up -d           | setup volumes,networks and start all containers and detach              |
| docker-compose ps              | get services running                                                    |
| docker-compose run             |                                                                         |
| docker-compose stop            |                                                                         |

# Containers Everywhere

### Some major tasks

- automate container lifecycle
- easily scale up/down/out/in
- container recreation upon failing
- replace container without downtime (blue/green deploy)
- control/track container started
- create cross-node virtual network
- only trusted servers run containers
- store secrets, keys, passwords and access them in right containers

# Docker Swarm - container orchestration

![swarm5](./sourceImages/swarm5.png)

- Swarm mode is a clustering solution built inside Docker
- docker swarm, docker node, docker service, docker stack, docker secret

![swarm1](./sourceImages/swarm1.png)
![swarm2](./sourceImages/swarm2.png)
![swarm3](./sourceImages/swarm3.png)
![swarm4](./sourceImages/swarm4.png)

## docker swarm init

- PKI and security automation
  1. Root signing certificate created for swarm
  1. certificate is issued for first manager node
  1. join tokens are created
- RAFT database created to store root CA, configs and secrets
  1. no additional key value storage system
  1. replicates logs amongs managers.

| Command                                            | Description                                         |
| -------------------------------------------------- | --------------------------------------------------- |
| docker swarm init                                  | initialize                                          |
| docker node ls                                     | list down nodes                                     |
| docker service create                              | creating a container service                        |
| docker service ls                                  | list down services                                  |
| docker service ps service_name                     | process information                                 |
| docker service update service_id --replicas number | update replicas                                     |
| docker service rm service_name                     | remove service and delete all containers one by one |


![docker-service1](./sourceImages/dockerService1.png)


* if a service is running and we stop one of its replicas by running "docker container rm -f some_id/name" then it will show in the results of "docker service ls" (one less replica) but within seconds it will again start it and it will show in the result if "docker service ps service_name" that one service was stopped.

![docker-service2](./sourceImages/dockerService2.png)


## PLAYGROUND

* https://labs.play-with-docker.com 
* use above link to create instances and play with them 


## Steps

- get 3 instances 
- in one instance run 

        docker swarm  init --advertise-addr <public_ip>

- this will give a url like 
        
        docker swarm join --token <some token>

- run this command in other two instances to join them in this cluster
- now docker swarm commands cant be run in these worker nodes
- Run in the leader instance 

        docker node ls

![dokcer-swarm1](./sourceImages/dockerSwarm1.png)

- change the role of a node

![docker-swarm2](./sourceImages/dockerSwarm2.png)

- get the manager token to join anytime and add instance with predefined manager role

![docker-swarm3](./sourceImages/dockerSwarm3.png)

- get the worker token to join anytime 

![docker-swarm4](./sourceImages/dockerSwarm4.png)

- now create a service with 3 replicas

![docker-swarm5](./sourceImages/dockerSwarm5.png)
![docker-swarm6](./sourceImages/dockerSwarm6.png)


# Overlay Multi Host Networking

- choose --driver overlay when creating network
- for container to container traffic inside a Single Swarm
- Optional IPSec (AES) encryption on network creation
- Each service can connect to multiple networks

| Command                                               | Description                                         |
| ----------------------------------------------------- | --------------------------------------------------- |
| docker network create --driver overlay network_name   | create a overlay network                            |
| ![docker-network1](./sourceImages/dockerNetwork1.png) | creating a network                                  |
| ![docker-network3](./sourceImages/dockerNetwork3.png) | creating two services on one network                |
| ![docker-network2](./sourceImages/dockerNetwork2.png) | accessing them by their service name (look at host) |


## Routing Mesh (Internal Load Balancer)

- Routes/distributes ingress (incoming) packets for a service to a proper task 
- spans all the nodes
- Uses IPVS from linux kernel (kernel primitives)
- Load balances swarm services across their tasks
- ways to work
  - container to container overlay network (talking to virtual IP/VIP)
  - external traffic incoming to publishing ports (all nodes listen)
- stateless load balancing

# docker stack 

## Production Grade Compose
- New layer of abstraction to swarms called stacks
- accepts compose files
- `docker stack deploy`

                 services  task and container
                     ^          ^
                || service1 -| node 1  |  
                ||          -| node 2  |  || Volumes ||
                ||-------------------- |
        Stack ->|| service2 -| node 1  |
                ||          -| node 2  |
                ||-------------------- | || Overlay Networks ||
                || service3 -| node 1  |
                ||          -| node 2  |


| Command                                      | Description                                                 |
| -------------------------------------------- | ----------------------------------------------------------- |
| docker stack deploy -c compose_file app_name | queue deploy services from a compose file                   |
| docker stack ls                              | list all the apps in the stack                              |
| docker stack ps app_name                     | list down services in the app                               |
| docker stack services app_name               | gives important info about services like replicas,mode etc. |

# docker secrets 

- key value store in docker run time 
- attach it to services only those can use it 

| Command                                                        | Description                                                            |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| docker secret create secret_name secret_file.txt               | put value in secret by a file                                          |
| echo "some_value" \| docker secret create secret_name -        | put value in secret by echoing                                         |
| docker secret ls                                               | list down secrets                                                      |
| --------                                                       | --------                                                               |
| with service                                                   |                                                                        |
| docker service create --name service_name --secret secret_name | create a service with a secret mentioned that can be used by container |
| docker service update --secret-rm secret_name                  | remove secret                                                          |

# Swarm App LifeCycle 
        TODO

# Kubernetes

- container orchestration
- runs on top of docker (usually)
- provides api/cli to manage containers across servers


### sandbox

- https://labs.play-with-k8s.com/
- katacoda

### Other flavours

- minikube
- MicroK8s

### Cloud providers

- Azure Kubernetes Services (AKS)
- AWS (EKS)
- Google Cloud


## Terminologies
- kubectl - cube control (cli)
- node - single server inside the cluster
- kubelet - Kubernetes agent running on nodes
        
        In swarm in build docker swarm agent is available for workers to talk back to the master nodes kubernetes needs one explicitly

- control plane - set of containers that manages the clusters
  - includes api server , scheduler, control manager, etcd and more 
  - sometimes called the master 

                MASTER
        |=======================|
        | etcd                  |
        | api                   |
        | scheduler             |
        | controller manager    |
        | core dns              |
        | .                     |
        | .                     |
        | based on need         |
        |                       |
        | Docker                |
        |=======================|

                NODE
        |=======================|
        | kubelet               |
        | kube-proxy            |
        | .                     |
        | .                     |
        | based on need         |
        |                       |
        |                       |
        |                       |
        | Docker                |
        |=======================|

- pod - one or more containers running together on one Node 
  - basic unit of deployment, containers are always in pods
- controller - for creating /updating pods and other objects
  - Deployment
  - ReplicaSet
  - StatefulSet
  - DaemonSet
  - Job
  - CronJob
- service - network endpoint to connect to a pod
- namespace - filter group
- secrets, ConfigMaps ...


## in play with k8s 

- I created 3 instances
- I am going to make node1 as master/ manager node
- Rest of the nodes will be worker nodes
- Main goal is to create deplotyments



| Snaps                                                                                                                  | Description                                                         |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| kubectl get nodes                                                                                                      | get nodes connected to the cluster                                  |
| ![kube1](./sourceImages/kube1.png)                                                                                     | starting master node (command already provided with k8s playground) |
| ![kube2](./sourceImages/kube2.png)                                                                                     | getting version (one client and one server )                        |
| kubectl run my_nginx --image nginx ![kube3](./sourceImages/kube3.png)                                                  | run a pod                                                           |
| kubectl get pods ![kube4](./sourceImages/kube4.png)                                                                    | get pods                                                            |
| kubectl create deployment my-nginx --image nginx ![kube6](./sourceImages/kube7.png) ![kube7](./sourceImages/kube8.png) | create deployment                                                   |
| ![kube5](./sourceImages/kube5.png)                                                                                     | get all contents                                                    |
| kubectl delete deployment my-nginx                                                                                     | delete the deployment                                               |
        
        Pods --> ReplicaSet --> Deployment


![kube6](./sourceImages/kube6.png)

## Scaling ReplicaSets

![kube9](./sourceImages/kube9.png)
![kube10](./sourceImages/kube10.png)



| Snaps                                | Description                                   |
| ------------------------------------ | --------------------------------------------- |
| ![kube11](./sourceImages/kube11.png) | logs                                          |
| ![kube12](./sourceImages/kube12.png) | logs follow changes and tail last 1 line logs |
| ![kube13](./sourceImages/kube13.png) | describe pod/deployments etc                  |
| ![kube14](./sourceImages/kube14.png) | watch                                         |


## Service Types

- kubectl expose creates a service for exisiting pods 
- Service is a stable address for pod
- it we want to connect to pod, we need a service 
- CoreDNS allows us to resolve `services` by name 
- Types of services :
  1. ClusterIP
  2. NodePort
  3. LoadBalancer
  4. ExternalName 


## ClusterIP (default)

- Single, Internal Virtual IP allocation 
- Reachable within the cluster
- pods can reach service on port number 

## NodePort

- High port on each node 
- Outside the cluster 
- port is open for every node's IP 
- Anyone can reach node can connect 

## LoadBalancer 

- Controls a Load Balancer external to the cluster
- Only available when infrastructure providers gives it (AWS ELB etc)
- Create NodePort+ClusterIP, connect LB to NodePort to send 

## ExternalName 

- Add CNAME DNS record to CoreDNS only 
- Not used for pods , but for giving pods a DNS name that can be used outside Kubernetes cluster.

| Snaps                                | Description                                                                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| ![kube15](./sourceImages/kube15.png) | create service expose port with cluster IP                                                                                  |
| ![kube16](./sourceImages/kube16.png) | create service NodePort. different than docker as left port if internal port and right one is node port for outside cluster |
| ![kube17](./sourceImages/kube17.png) | create service with LoadBalancer                                                                                            |
| ![kube18](./sourceImages/kube18.png) | namespaces                                                                                                                  |


# Kubernetes Management Techniques

## Generators (Automation behind commands)
 
- Helper templates 
- Every resource in kubernetes has a 'spec' or specification 

        > kubectl create deployment smaple --iamge nginx --dry-run -o yaml

- output those templates `--dry-run -o yaml`
- these yaml defaults can be a starting points to create new ones


| Snaps                                | Description                       |
| ------------------------------------ | --------------------------------- |
| ![kube19](./sourceImages/kube19.png) | Get Generator info for deployemnt |
| ![kube20](./sourceImages/kube20.png) | Get Generator info for job        |
| ![kube21](./sourceImages/kube21.png) | Get Generator info for expose     |


| Imperative                  | Decalarative                                        |
| --------------------------- | --------------------------------------------------- |
| how program operates        | what a program should accomplish                    |
| ex.- making your own coffee | ex.- give instructions to a barista                 |
| not easy to automate        | automation is good                                  |
| know every step             | dont know current state, only final result is known |
| -                           | requires to know all yaml keys                      |

## Management approaches

- Imperative commands 
  - create, expose, edit, scale etc
- Imperative objects 
  - create -f file.yml , replace -f file.yml
- Declarative objects 
  - apply -f file.yml


## Kubernetes Configuration YAML

- Each file contains one or more configuration files
- Each manifest describes an API object (deployment, job, secret)
- Each mainfest needs these four parts-
  - apiVersion:
  - kind:
  - metadata:
  - spec:
- `kubectl apply -f <directory>/`
- selectors is used for patternmatching for different services 


| info                            | Snaps                                | Description                                       |
| ------------------------------- | ------------------------------------ | ------------------------------------------------- |
| cluster                         | ![kube22](./sourceImages/kube22.png) | cluster info                                      |
| `kind`                          | ![kube23](./sourceImages/kube23.png) | api resources (kind will give info for yaml file) |
| `apiVersion`                    | ![kube24](./sourceImages/kube24.png) | api versions                                      |
| `metadata`                      | -                                    | only `name` of the service is required            |
| `spec`                          | -                                    | all the action                                    |
| explain services recursively    | ![kube25](./sourceImages/kube25.png) | explain services get keywords                     |
| explain services description    | ![kube26](./sourceImages/kube26.png) | explain services get keywords                     |
| explain deployments description | ![kube27](./sourceImages/kube27.png) | explain services get keywords                     |

- https://kubernetes.io/docs/reference/#api-reference

| Snaps                                | Description                                                 |
| ------------------------------------ | ----------------------------------------------------------- |
| ![kube28](./sourceImages/kube28.png) | find the difference between running service and updated yml |


## Labels and Annotations

- labels under metadata 
- for grouping, filtering etc.
- examples - tier: frontend, app: api, env: prod etc.
- 















