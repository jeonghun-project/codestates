# RabbitMQ

비동기 작업 큐를 사용하려면 중간 단계에 Broker 역활을 하는 메세지 broker

> > RabbitMQ는 AMQP(네트워크 프로토콜)를 따르는 오픈소스 메세지 브로커인데, 메세지를 많은 사용자에게 전달하거나, 요청에 대한 처리 시간이 길 때, 해당 요청을 다른 API에게 위임하고 빠른 응답을 할 때 많이 사용합니다. 또한, MQ를 사용하여 애플리케이션 간 결합도를 낮출 수 있는 장점도 있습니다.

설명을 너무 간결하게 정리해주셔서 가지고 왔습니다. [출처](https://blog.dudaji.com/general/2020/05/25/rabbitmq.html)

여기서 우리는 `AMQP`라는 개념을 알아야하는데 Advanced Message Queuing protocol 인스턴스들 간의 통신을 의미한다.

그리고 이러한 통신을 구현한 MQ 솔루션 들중에 하나가 RabbitMQ인 것이다.

그러므로 RabbitMQ의 동작을 이해하는 것은 AMQP를 이해하는 것과 같다고 보아도 무방하다.

## 기본 구조

`rabbitMQ`는 `publisher <=> Consumer` 간의 주고 받는 메시지들을 중간에서 `Exchange => queue` 를 거치도록 해주어서 어플리케이션간의 결합도를 낮추고 많은 요청을 순차적으로 처리할 수 있도록하여 빠르게 응답할 수 있도록 합니다.

![RabbitMQ](./src/RabbitMQ1.png)

Message를 처리할 때 `Exchange`는 `Queue`의 이름(Key)에 따라 어떤 **Message를 어떤 queue에 보낼 것인지 판단**하고 전송한다.

이제 해당 Queue를 구독하고 있는 구독 머신(Consumer)이 queue에 메세지를 끌어가는 것을 기다리고

메세지를 끌어가고 처리한다면, 정상적으로 Queue가 비워질 것이다.


## Exchange

그렇다면 여기서 Exchange가 무엇일까?

**Exchange가 공급자(publisher)에게서 메세지를 받아내는 역활을 한다.**

마치 **우체국과 같은 역활**을한다고 볼수 있다.

하지만 일반적으로 전달만 하는 우체국과는 다르게 Exchange는 이 메세지를 복사할 수 있다. 여러 개의 메세지로 복사하여 이를 필요로 하는 곳인 **소비자(Queue)에 전달하는 역활**을 한다.

이러한 **Exchange에는 타입이 있고 이 타입에따라 규칙을 정하여 메세지를 복사 분배**한다.

|    타입 |                                   설명                                    | 특징       |
| :------ | :-----------------------------------------------------------------------: | :--------- |
|  Direct |             Routing key가 정확히 일치하는 Queue에 메세지 전송             | Unicast    |
|   Topic |              Routing key 패턴이 일치하는 Queue에 메세지 전송              | Multicast  |
| Headers | \[key:value]로 이루어진 header 값을 기준으로 일치하는 Queue에 메세지 전송 | Multicast  |
|  Fanout |              해당 Exchange에 등록된 모든 Queue에 메세지 전송              | Broeadcast |


이렇게 규칙에 맞게끔 메시지를 뿌려주니 여러 방면으로 능동적으로 사용해 보도록하자.

Exchange 타입에 대한 자세한 내용은 다음에 다루겠다.

\* *메세지 라우팅을 처리할 수 없는 상황(게시자에게 반환, 삭제, 브로커 확장) "dead letter queue"에 배치된다. Publisher에서 매개변수를 통해 메세지를 게시하여 이런 상황을 처리할 수 있다.*

Exchange는 영구(`durable`)일 수도 있고 일시적(`transient`)일 수도 있다.

- Durable은 Broker가 재시작한 이후에도 살아남지만
- Transient의 경우 다시 선언해야합니다.

## Queue

다른 작업-queue나 메세지-queue와 같다. 에플리케이션이 사용하는 메시지를 저장한다

queue는 다음과 같은 속성을 가진다

- Name
- Durable : 브로커가 재시작해도 살아있음
- Exclusive : 하나의 연결에서 사용되며 해당 연결이 닫히면 대기열이 삭제됨
- Auto-delete : 마지막 소비자가 구독을 취소하면 삭제됨
- Arguments (Optional) : 메시지 TTL, queue 길이 제한 등 브로커별 기능 및 플러그인에서 사용

queue를 사용하기 위해서는 먼저 선언해야한다.

이떄 queue가 이미 존재하면 해당 속성이 이미 선언된 속성과 일치한다면 문제없지만, 다르다면 406(PRECONDITION_FAILED가 발생한다.

### Bindings

Exchange가 메시지를 대기열로 라우팅하는 데 사용하는 규칙

바인딩에는 교환 유형에서 사용되는 선택적 라우팅 키 속성이 있을 수 있다. 라우팅 키의 목적은 바인딩 된 큐로 라우팅할 교환에 게시된 메시지를 선택하는 것입니다.

> 라우팅 키는 필터와 같은 역활을 한다.

이러한 방식을 사용하면 queue에 직접 게시를 사용하여 구형하는 것이 불가능하거나 매우 어려운 라우팅 시나리오가 가능하게 된다. 또한 개발자의 중복작업을 제거하는데도 효과적이다.

### Consumer

push API는 Consumer의 관심사에 맞는 queue에 메시지를 내보냅니다.

하나의 queue당 하나 이상의 소비자를 등록 할 수 있다.(소비중에는 다른 소비자를 제외한다 즉 한번에 한 소비자만 작동한다.)

각 Consumer(subscription)에는 *Consumer tag*라는 식별자가 존재한다.

메시지 수신을 취소(unsubscribe) 하는 데 사용할 수 있다. *string

### Message Acknowledgements

MQ는 queue에서 메시지를 언제 제거할까? AMQP 프로토콜은 Consumer가 이를 제어할 수 있도록 두 가지 모드를 가진다.

1. 브로커(MQ)가 Consumer에 메시지를 보낸 후에 삭제 `basic.deliver` or `basic.get-ok` 메서드
2. Consumer에서 확인(acknowledgemont)를 회신하면 `basic.ack` 메서드 사용

전자를 자동 승인 모델(automatic acknowledgement model), 후자를 명시적 승인 모델(explicit acknowledgement model) 이라고 한다.

명시적 승인 모델의 경우 Consumer에서 승인을 보낼 시기를 선택한다.

### Rejecting Message

메시지 거절을 할 수 있고 이떄 다시 큐에 넣을 것인지 없앨 것인지를 결정할 수 있다.

이때 무한 메시지가 무한 루프하지 않도록 조심하자

### Nagative Acknoewledgements

