# Kubernetes

**k8s**라고도 불려진다. CI/CD 도구중에 하나라고 볼 수 있으며, MSA Achitecture에서 빼놓을 수 없는 잦은 배포를 감당할 수 있는 CI/CD를 구성하기에 적합한 Service입니다.

> 2014년에 구글에서 제공한 오픈소스로 시작되었고 대규모 프로덕션을 다루기에 적합하다고 한다.

## 대표적인 기능

1. Service dicovery and load balancing - 서비스 검색 및 로드 벨런싱 DNS나 IP주소를 사용하여 컨테이너를 토출 할 수 있다.
2. Storage orchestration - 스토리지 시스템 탑재
3. Automated rollouts and rollbacks - 자동으로 배포의 속도 및 상태에 대한 조절이 이루어지도록 할 수 있다.
4. Automaic bin packing - node cluster를 제공받을 수 있다.
5. Self-healing - 실패한 컨테이너를 다시 시작하고, 교체학, 종료하고, 준비가 될 때까지 클라이언트에게 응답하지 않을 수 있다.
6. Secret and configuration management - 비밀번호 Oauth, SSH key 등등 민감함 정보를 저장 관리, 컨테이너 이미지 다시 빌드하지 않고 배포 업데이트 할 수 있다.

![kubernetes](./src/components-of-kubernetes.svg)

배포 과정에 `cluster`가 만들어 진다,

이러한 `cluster`의 경우에는 컨테이너화된 어플리케이션을 실행하는 `node`라는 작업자 머신 세트로 구성된다. 모든 cluster는 하나 이상의 node가 있다.

`node`라는 가상 컴퓨팅 환경에서 `Pod`라는 컨테이너를 실행 되게 된다.


## Cluster

![cluster](./src/module-cluster.svg)

- Control Plane
    cluster를 managing 한다. 어플리케이션 상태, 스케일 업, 업데이트 롤 아웃, 어플리케이션 예약 등의 cluster의 모든 활동을 조정하는 역활
- Nodes
    cluster의 작업자 역할을 하는 VM(Virtual Machine) 물리적 컴퓨터, `Kubelet`을 통해 Control Plane 과 통신하고 다른 노드를 관리할 수 있다.
    `containered` or `Docker` 같은 컨테이너 작업 처리 도구도 필요하다.
  
  *Production traffic을 처리하는 클러스터에는 최소 3개의 Node가 필요하다.

## Deploy

![Deploy](./src/module-first-app.svg)

- kubernetes는 자가 치유적인 메커니즘을 제공합니다.
- 인스턴스를 호스팅하는 노드가 다움되거나 삭제되면 배포 controller는 해당 인스턴스를 크러스터의 다른 노드에 있는 인스턴스로 교체합니다.

`kubectl create deployment {deploy name} --image={image location}`

- **위 작업은 3 가지의 작업을 수행 합니다**
  - 어플리케이션의 인스턴스를 실행할 수 있는 적절한 노드를 검색
  - 해당 노드에서 실행되도록 응용 프로그램을 예약
  - 필요할 때 새 노드에 인스턴스를 다시 예약하도록 클러스터를 구성

Cluster 내부는 사설 네트워크로 통신을 전달항 프록시를 만들수 있다. (외부와의 통신이 필요한 경우 별도의 환경구성 필요)

`kubectl proxy` => `127.0.0.1:8001`

<!-- ```sh
 $ curl http://localhost:8001/version

 {
  "major": "1",
  "minor": "20",
  "gitVersion": "v1.20.2",
  "gitCommit": "faecb196815e248d3ecfb03c680a4507229c2a56",
  "gitTreeState": "clean",
  "buildDate": "2021-01-13T13:20:00Z",
  "goVersion": "go1.15.5",
  "compiler": "gc",
  "platform": "linux/amd64"
  ...
 }
<!-- ``` --> -->

API server는 `Pod`이름을 기반으로 프록시를 통해 액세스할 수 있는 각 Pod에 대한 엔드포인트를 자동으로 생성한다.

먼저 Pod 이름을 가져와야 하고 POD_NAME 환경 변수에 저장합니다.

`xport POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')`

`echo Name of the Pod: $POD_NAME`

이제 API server를 통해 Pod에 접근 할 수 있습니다.

`curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/`

## Pods

![Pods](./src/module-pods.svg)

`Pod`는 하나의 도커 컨테이너라고 말할수있다. 공식 문서에는 컨테이너에 대한 일부 공유 리소스 혹은 하나이상의 어플리케이션 컨테이너의 Kubernetes의 추상화라고 한다. 즉 리소스 그룹 or 어플리케이션 컨테이너가 되겠다.

**리소스 그룹**

- Shared storage, as Volumes
- Networking, as a unique cluster IP address
- Information about how to run each container, such as the container image version or specific ports to use

즉 Pod에는 Node.js 앱이 담긴 컨테이너, Node.js 웹 서버에서 게시할 데이터를 제공하는 다른 컨테이너가 모두 포함 될 수 있다.

**`Pod`는 Kubernetes의 가장작은 단위를 이룹니디.**

  - Kubernetes에서 Deployment를 생성할 때 해당 Deployment는 내부에 컨테이너가 있는 Pod를 생성합니다.
  - 각 Pod는 예약된 노드에 연결되며 종료(재시작 정책에 따라) 또는 삭제될 때까지 유지됩니다.
  - 노드 오류의 경우 클러스터에서 사용 가능한 다른 노드에서 동일한 포드가 예약됩니다.

## Nodes

`Pod`는 항상 `Node`에서 실행된다. `Node`는 Kubernetes의 작업자이고, 클러스터에 따라 가상머신(VM) 또는 물리적인 컴퓨터일 수 있습니다.

Node는 Control plane에 의하여 제어되고, Cluster의 노드 전체에서 Pod의 스케줄링을 자동으로 처리한다.

![Node](./src/module-nodes.svg)

- Kubelet : API를 통한 Control plane과 node간의 통신을 통하여 managees the Pods and the containers running on a machine.
- Container runtime : 기본적으로 docker와 같은 컨테이너의 런타임 환경

`kubectl exec $POD_NAME -- env`

실행된 Pod 환경에 명령 입력하기 `exec`를 통해 할 수 있다.

이때 Pod에는 Container가 하나만 있으므로 컨테이너의 이름을 생략 할 수 있다.

`kubectl exec -ti $POD_NAME -- sh`

Container sh shell 실행하기

## Servcie Expose App

작업자의 노드가 죽으면 노드에서 실행 중인 Pod 또한 손실됩니다. 그 다음 [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)은 어플리케이션 실행을 유지하기 위해 새 Pod생성을 통해 클러스터를 동적으로 원하는 상태로 되돌릴 수 있습니다.

즉, Kubernetes 클러스터의 각 Pod에는 고유한 IP address가 부여되고 심지어 동일한 Node에 있는 Pod도 있기에 어플리케이션이 계속 동작할 수 있도록 Pod 간에 변경사한을 자동으로 조정하는 방법이 필요하다!

### Service in Kubernetes

논리적 Pod 집합과 이에 엑세스 하는 정책을 정의하는 추상화다.

서비스는 종속(dependent) Pod간의 느슨한 결합을 가능하게 한다.

`YAML` or `JSON`으로 정의 할 수 있다.

위에서 [언급](##Deploy) 한 것 처럼 각 Pod는 고유한 IP 주소가 있지만 이러한 IP는 서비스 없이 클러스터 외부에 노출 되지는 않는다.

Service를 통해 어플리케이션이 트레픽을 수신할 수 있다. `ServiceSpec`에서 `type`을 지정하여 서비스를 다양한 방식으로 노출할 수 있다.

- ClusterIP *(default)* : 기본 값이다. 클러스터 내에서만 서비스에 연결할 수 있다.
- NodePort : NAT을 이용하여 클러스터에서 선택된 각 노드의 동일한 포트에서 서비스를 노출한다.  `<NodeIP>:<NodePort>`를 사용하여 클러스터 외부에서 서비스를 엑세스 할 수 있다. ClusterIP의 상위 집합
- LoadBalancer : 현재 클라우드에 외부 로드 밸런서를 생성하고(가능한 경우), 고정 외부 IP를 서비스에 할당합니다. NodePort의 상위 집합
- ExternalName : CNAME record를 반환하여 서비스를 externalName field(e.g: jeong.bar.example.com)의 내용에 매핑한다. 어떤 종류의 프록시도 설정되지 않습니다.

[더 자세한 내용](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/)

### Service and Labels

위에서 Service에 대한 설명으로 Pod 집합의 트래픽을 라우팅하는 역할을 한다고 이해했다.

Service는 알아서 Pod가 중단되고 복제되는 것을 추상화하고, 어플리케이션에 영향을 주지않고 이를 수행한다.

한 어플리케이션의 **Frontend 와 Backend간의 검색 및 라우팅을 Service에서 처리한다.**

`Service`는 논리적 작업을 허용하는 그룹화 기본 요소로 `label` `selector`를 이용하여 `Pod`집합을 찾아낸다.

`label`은 `key/value`페어로 이루어져 있고, 다음과 같은 방식으로 객체에 연결된다.

- 버전 태그
- Dev, test, Prod 등의 상태
- tag를 사용한 개체 분류

![label](./src/module-labels.svg)

 ```sh
$ kubectl get services

NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   43s
```

```sh
$ kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080

$ kubectl get service

NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
kubernetes            ClusterIP   10.96.0.1      <none>        443/TCP          2m
kubernetes-bootcamp   NodePort    10.98.181.26   <none>        8080:30030/TCP   59s
```

외부로 열린 포트를 확인하는 방법

```sh
$ kubectl describe services/kubernetes-bootcamp

Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   app=kubernetes-bootcamp
Annotations:              <none>
Selector:                 app=kubernetes-bootcamp
Type:                     NodePort
IP Families:              <none>
IP:                       10.98.181.26
IPs:                      10.98.181.26
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30030/TCP
Endpoints:                172.18.0.4:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

노드 포트 값이 할당된 NODE_PORT라는 환경 변수를 만듭니다.

```sh
$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT

NODE_PORT=30030
```

외부로 노출된 PORT에 잘 접근되는지 확인할 수 있다.

```sh
$ curl $(minikube ip):$NODE_PORT
```

자동으로 Pod에 대한 Label을 만들었습니다.

```sh
$ kubectl describe deployment

...
Labels: app=kubernetes-bootcamp
...
```

목록중에 쿼리를 할 수 있다.

```sh
$ kubectl get pods -l app=kubernetes-bootcamp

NAME                                  READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-fb5c67579-j8knz   1/1     Running   0          6m58s
```

서비스 쿼리도 가능하다.

```sh
$ kubectl get services -l app=kubernetes-bootcamp

NAME                  TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes-bootcamp   NodePort   10.96.217.250   <none>        8080:30014/TCP   4m46s
```

Pod name을 환경 변수에 담아보자

```sh
$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
$ echo Name of the Pod: $POD_NAME
Name of the Pod: kubernetes-bootcamp-fb5c67579-j8knz
```

새로운 label 부여하기

```sh
$ kubectl label pods $POD_NAME version=v1
pod/kubernetes-bootcamp-fb5c67579-j8knz labeled
```

```sh
$ kubectl describe pods $POD_NAME
...
Labels:       app=kubernetes-bootcamp
              pod-template-hash=fb5c67579
              version=v1
...
```

```sh
$ kubectl get pods -l version=v1
NAME                                  READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-fb5c67579-j8knz   1/1     Running   0          11m
```

```sh
$ kubectl delete service -l app=kubernetes-bootcamp
service "kubernetes-bootcamp" deleted
```

```sh
$ kubectl get services
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   14m
```

```sh
$ curl $(minikube ip):$NODE_PORT
curl: (7) Failed to connect to 172.17.0.25 port 30014: Connection refused
```

```sh
$ kubectl exec -ti $POD_NAME -- curl localhost:8080
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-j8knz | v=1 
```

## Scaling overview

![scale_out](./src/module-scaling1.svg)

![scale_out2](./src/module-scaling2.svg)

스케일 아웃을 통해 사용가능한 리소스가 있는 노드에 Pod가 생성되고 예약됩니다.

Kubernetes는 Autoscaling을 지원하지만 여기서는 다루지 않습니다.

애플리케이션의 여러 인스턴스를 실행하려면 모든 인스턴스에 트래픽을 분산하는 방법이 필요하다.

Service에는 배포된 모든 Pod에 네트워크 트래픽을 분산하는 통합 로드 밸런서가 있다.