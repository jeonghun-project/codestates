
# Scaling overview & Load Balancing

![scale_out](./src/module-scaling1.svg)

![scale_out2](./src/module-scaling2.svg)

스케일 아웃을 통해 사용가능한 리소스가 있는 노드에 Pod가 생성되고 예약됩니다.

**Kubernetes는 Autoscaling을 지원하지만 여기서는 다루지 않습니다.**

애플리케이션의 여러 인스턴스를 실행하려면 모든 인스턴스에 트래픽을 분산하는 방법이 필요하다.

Service에는 배포된 모든 Pod에 네트워크 트래픽을 분산하는 통합 **로드 밸런서**가 있다.

1. 먼저 `deployments` 리스트를 확인한다.

```bash
$ kubectl get deployments

NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   0/1     0            0           9s
```

Pod가 실행 되지 않은 경우 조금더 대기합니다.

```bash
$ kubectl get deployments

NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   1/1     1            1           34s
```

- *NAME* 배포 이름
- *READY* CURRENT/DESIRED 복제본의 비율을 보여줍니다
- *UP-TO-DATE* 원하는 상태를 달성하기 위해 업데이트된 복제본의 수를 표시합니다.
- *AVAILABLE*  사용자가 사용할 수 있는 애플리케이션 복제본의 수를 표시합니다
- *AGE* 애플리케이션이 실행된 시간을 표시합니다.
  
2. Deployment에 의해 생성된 ReplicaSet을 확인하자

```bash
$ kubectl get rs

NAME                            DESIRED   CURRENT   READY   AGE
kubernetes-bootcamp-fb5c67579   1         1         1       3m7s
```

ReplicaSet의 이름은 `[DEPLOYMENT-NAME]-[RANDOM-STRING]` 형식을 따른다.

- *DESIRED* 배치를 생성할 때 정의한 애플리케이션의 원하는 복제본 수를 표시합니다. 이것이 원하는 상태입니다.
- *CURRENT* 현재 실행 중인 복제본 수를 표시합니다.

3. `kubectl scale`을 이용하여 배포를 4개의 복제본으로 확장(Scale)해보자

```bash
$ kubectl scale deployments/kubernetes-bootcamp --replicas=4

deployment.apps/kubernetes-bootcamp scaled
```

4. 확장 여부를 확인해 보자

```bash
$ kubectl get deployments

NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   4/4     4            4           7m25s
```

deployment도 확장 되었고

```bash
$ kubectl get pods -o wide

NAME                                  READY   STATUS    RESTARTS   AGE     IP           NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-fb5c67579-lqzqf   1/1     Running   0          68s     172.18.0.8   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-mnxts   1/1     Running   0          69s     172.18.0.7   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-pgwxb   1/1     Running   0          68s     172.18.0.9   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-rprr2   1/1     Running   0          7m51s   172.18.0.3   minikube   <none>           <none>
```

Pod도 정상적으로 확장되었다. 모두 다른 IP adress를 부여받았다.

5. `Event`에 등록된 것을 알 수 있다

```bash
$ kubectl describe deployments/kubernetes-bootcamp

...
Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable
...
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  9m21s  deployment-controller  Scaled up replica set kubernetes-bootcamp-fb5c67579 to 1
  Normal  ScalingReplicaSet  2m34s  deployment-controller  Scaled up replica set kubernetes-bootcamp-fb5c67579 to 4
```

## Load Balancing

Load Balancing을 확인해보자 

1. 노출되는 IP 와 Port를 찾기 위해 describe Service를 사용할 수 있다.

```bash
$ kubectl describe services/kubernetes-bootcamp

Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   app=kubernetes-bootcamp
Annotations:              <none>
Selector:                 app=kubernetes-bootcamp
Type:                     NodePort
IP Families:              <none>
IP:                       10.103.226.120
IPs:                      10.103.226.120
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  31260/TCP
Endpoints:                172.18.0.3:8080,172.18.0.7:8080,172.18.0.8:8080 + 1 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

2. Node Port 값이 있는 `NODE_PORT`라는 환경 변수를 만들자

```bash
$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT
NODE_PORT=31260
```

3. curl 을 통해 확인해보자

```bash
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-lqzqf | v=1
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-mnxts | v=1
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-lqzqf | v=1
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-mnxts | v=1
```

Pod가 변경되면서 응답하는 것을 볼 수 있다. 이렇게 Load Balncing을 수행할 수 있다.

## Scale 축소를 해보자

```bash
$ kubectl scale deployments/kubernetes-bootcamp --replicas=2
deployment.apps/kubernetes-bootcamp scaled
```

```bash
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   2/2     2            2           18m
```

```bash
$ kubectl get pods -o wide
NAME                                  READY   STATUS        RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-fb5c67579-lqzqf   1/1     Terminating   0          11m   172.18.0.8   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-mnxts   1/1     Running       0          11m   172.18.0.7   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-pgwxb   1/1     Terminating   0          11m   172.18.0.9   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-rprr2   1/1     Running       0          18m   172.18.0.3   minikube   <none>           <none>
```

2개의 Pod STATUS를 보면 종료된 것을 알 수 있다.

