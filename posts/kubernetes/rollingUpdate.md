# Rolling update

**Rolling update를 통해 Pod instance를 새 instance로 점진적으로 업데이트하여 어플리케이션의 Down 없이 무중단 배포를 할 수 있다.**

> 기본적으로 Rolling Update 중에는 하나의 Pod를 사용할 수 없고 새로 1개의 Pod가 생성된다.

![Rolling update](./src/module_06_rollingupdates1.svg)
![Rolling update](./src/module_06_rollingupdates2.svg)
![Rolling update](./src/module_06_rollingupdates3.svg)
![Rolling update](./src/module_06_rollingupdates4.svg)

Scaling과 유사하게 동작하며 배포가 공개적(publicly)으로 노출되면, **서비스는 업데이트 중에 사용 가능한 Pod로만 트래픽을 로드 밸런싱한다.**

Rolling Update를 통해 가능한 것

- 컨테이너 이미지 업데이트를 통해 어블리케이션의 Promote(증진)
- 이전 버전으로 Rollback
- 다운타임 없이 애플리케이션의 지속적 통합 및 지속적 전달 (무중단 배포)
  
1. 현재 상태부터 확인하자

```bash
$ kubectl get deployments

NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   0/4     0            0           8s
```

```bash
$ kubectl get pods

NAME                                  READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-fb5c67579-2s5qf   1/1     Running   0          105s
kubernetes-bootcamp-fb5c67579-58hxp   1/1     Running   0          105s
kubernetes-bootcamp-fb5c67579-gpj95   1/1     Running   0          105s
kubernetes-bootcamp-fb5c67579-pzwf2   1/1     Running   0          105s
```

```bash
$ kubectl describe pods

...
Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
...
...
Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
...

```

2. 이제 버전을 업데이트 해보자

```bash
$ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernet-bootcamp:v2

deployment.apps/kubernetes-bootcamp image updated
```

업데이트와 동시에 Rolling update는 시작되었다.

3. 새 Pod를 확인하고 이전 Pod를 확인해보자.

```bash
$ kubectl get pods

NAME                                   READY   STATUS        RESTARTS   AGE
kubernetes-bootcamp-7d44784b7c-7gw8j   1/1     Running       0          81s
kubernetes-bootcamp-7d44784b7c-h9gq5   0/1     Terminating   0          6m20s
kubernetes-bootcamp-7d44784b7c-n5tf6   0/1     Terminating   0          6m21s
kubernetes-bootcamp-7d44784b7c-xg5sg   0/1     Terminating   0          6m22s
kubernetes-bootcamp-fb5c67579-2s5qf    0/1     Terminating   0          6m22s
```

시간이 흐른 뒤에 다시 명령어를 입력하면

```bash
$ kubectl get pods

NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-7d44784b7c-7gw8j   1/1     Running   0          4m42s
kubernetes-bootcamp-7d44784b7c-h9gq5   1/1     Running   0          4m35s
kubernetes-bootcamp-7d44784b7c-n5tf6   1/1     Running   0          4m36s
kubernetes-bootcamp-7d44784b7c-xg5sg   1/1     Running   0          4m43s
```

4. Service 에 노출된 PORT를 확인하자

```bash
$ kubectl describe services/kubernetes-bootcamp

Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   app=kubernetes-bootcamp
Annotations:              <none>
Selector:                 app=kubernetes-bootcamp
Type:                     NodePort
IP Families:              <none>
IP:                       10.104.210.114
IPs:                      10.104.210.114
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30433/TCP
Endpoints:                172.18.0.10:8080,172.18.0.11:8080,172.18.0.12:8080 + 1 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

5. 환경 변수로 포트를 입력하고

```bash
$ export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT
NODE_PORT=30433
```

6.  curl을 통해서 버전을 확인해보면

```bash
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-7d44784b7c-n5tf6 | v=2
```

7. `rollout status`를 통해서 rolling update 상태도 확인 할 수 있다.

```bash
$ kubectl rollout status deployments/kubernetes-bootcamp
deployment "kubernetes-bootcamp" successfully rolled out
```

이제 Pod를 describe 해보면 image가 변한 것을 알 수 있다.

```bash
$ kubectl describe pods

Image:          jocatalin/kubernetes-bootcamp:v2
```

## 이제 Rollback을 살펴보자

V10 태그 이미지를 배포하고 다시 돌아와보도록하자

```bash
$ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10
tes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10et
deployment.apps/kubernetes-bootcamp image updated
```

```bash
$ kubectl get deployments
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   3/4     2            3           16m
```

```bash
$ kubectl get pods
NAME                                   READY   STATUS             RESTARTS   AGE
kubernetes-bootcamp-59b7598c77-hw9ks   0/1     ImagePullBackOff   0          57s
kubernetes-bootcamp-59b7598c77-k87wm   0/1     ImagePullBackOff   0          58s
kubernetes-bootcamp-7d44784b7c-7gw8j   1/1     Running            0          11m
kubernetes-bootcamp-7d44784b7c-h9gq5   0/1     Terminating        0          11m
kubernetes-bootcamp-7d44784b7c-n5tf6   1/1     Running            0          11m
kubernetes-bootcamp-7d44784b7c-xg5sg   1/1     Running            0          11m
```

`ImagePullBackOff`가 발생한 것을 알 수 있습니다.

```bash
$ kubectl describe pods

Events:
  Type     Reason     Age                  From               Message
  ----     ------     ----                 ----               -------
  Normal   Scheduled  2m42s                default-scheduler  Successfully assigned default/kubernetes-bootcamp-59b7598c77-k87wm to minikube
  Normal   BackOff    76s (x6 over 2m36s)  kubelet            Back-off pulling image "gcr.io/google-samples/kubernetes-bootcamp:v10"
  Normal   Pulling    65s (x4 over 2m38s)  kubelet            Pulling image "gcr.io/google-samples/kubernetes-bootcamp:v10"
  Warning  Failed     64s (x4 over 2m37s)  kubelet            Failed to pull image "gcr.io/google-samples/kubernetes-bootcamp:v10": rpc error: code = Unknown desc = Error response from daemon: manifest for gcr.io/google-samples/kubernetes-bootcamp:v10 not found: manifest unknown: Failed to fetch "v10" from request "/v2/google-samples/kubernetes-bootcamp/manifests/v10".
  Warning  Failed     64s (x4 over 2m37s)  kubelet            Error: ErrImagePull
  Warning  Failed     50s (x7 over 2m36s)  kubelet            Error: ImagePullBackOff

...
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  13m   default-scheduler  Successfully assigned default/kubernetes-bootcamp-7d44784b7c-7gw8j to minikube
  Normal  Pulled     13m   kubelet            Container image "jocatalin/kubernetes-bootcamp:v2" already present on machine
  Normal  Created    13m   kubelet            Created container kubernetes-bootcamp
  Normal  Started    13m   kubelet            Started container kubernetes-bootcamp
```

이럴 경우 롤백을 시행 할 수 있다.

`rollout undo`

```bash
$ kubectl rollout undo deployments/kubernetes-bootcamp
deployment.apps/kubernetes-bootcamp rolled back
```

이제 Pod 상태를 살펴보자

```bash
$ kubectl get pods
NAME                                   READY   STATUS        RESTARTS   AGE
kubernetes-bootcamp-59b7598c77-hw9ks   0/1     Terminating   0          6m23s
kubernetes-bootcamp-59b7598c77-k87wm   0/1     Terminating   0          6m24s
kubernetes-bootcamp-7d44784b7c-7gw8j   1/1     Running       0          16m
kubernetes-bootcamp-7d44784b7c-b484r   1/1     Running       0          14s
kubernetes-bootcamp-7d44784b7c-n5tf6   1/1     Running       0          16m
kubernetes-bootcamp-7d44784b7c-xg5sg   1/1     Running       0          16m
```

이제 전체 Pods는 안정적인 V2 버전의 image를 사용하도록 되었다.
