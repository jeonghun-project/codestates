# RabbitMQ

비동기 작업 큐를 사용하려면 중간 단계에 Broker 역활을 하는 메세지 broker

> > RabbitMQ는 AMQP를 따르는 오픈소스 메세지 브로커인데, 메세지를 많은 사용자에게 전달하거나, 요청에 대한 처리 시간이 길 때, 해당 요청을 다른 API에게 위임하고 빠른 응답을 할 때 많이 사용합니다. 또한, MQ를 사용하여 애플리케이션 간 결합도를 낮출 수 있는 장점도 있습니다.

설명을 너무 간결하게 정리해주셔서 가지고 왔습니다. [출처](https://blog.dudaji.com/general/2020/05/25/rabbitmq.html)

여기서 우리는 `AMQP`라는 개념을 알아야하는데 Advanced Message Queuing protocol 인스턴스들 간의 통신을 의미한다.

그리고 이러한 통신을 구현한 MQ제품들중에 하나가 RabbitMQ인 것이다.

그러므로 RabbitMQ의 동작을 이해하는 것은 AMQP를 이해하는 것과 같다고 보아도 무방하다.

## 기본 구조

`rabbitMQ`는 `Producer <=> Consumer` 간의 주고 받는 메시지들을 중간에서 `Exchange => queue` 를 거치도록 해주어서 어플리케이션간의 결합도를 낮추고 많은 요청을 순차적으로 처리할 수 있도록하여 빠르게 응답할 수 있도록 합니다.

![RabbitMQ](./src/RabbitMQ1.png)

Message를 처리할 때 Exchange는 Queue의 이름(Key)에 따라 어떤 Message를 어떤 queue에 보낼 것인지 판단하고 전송한다.

이러한 처리 방법을 살펴보면

|    타입 |                                   설명                                    | 특징       |
| ------: | :-----------------------------------------------------------------------: | :--------- |
|  Direct |             Routing key가 정확히 일치하는 Queue에 메세지 전송             | Unicast    |
|   Topic |              Routing key 패턴이 일치하는 Queue에 메세지 전송              | Multicast  |
| Headers | \[key:value]로 이루어진 header 값을 기준으로 일치하는 Queue에 메세지 전송 | Multicast  |
|  Fanout |              해당 Exchange에 등록된 모든 Queue에 메세지 전송              | Broeadcast |
