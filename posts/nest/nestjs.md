# nestjs

현재 회사의 신규 프로젝트로 nestjs로 구성된 서버를 빌드업 중에 있다.

앞으로 nestjs + mongodb + graphql + swagger + jest 에 대한 내용을 천천히 살펴볼 예정이다.

이번 글에서는 nestjs와 그 핵심 개념에 대하여 알아보도록 하겠다.

## nestjs

nestjs 홈페이지 메인을 살펴보면 이러한 문구를 가장 처음 만날 수 있다.

> A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

효율적이고 안정적이면서 확장성 있는 서버사이드 어플리케이션을 구축하기 위한 진보한 node.js 프레임워크이다.

과연 이 말은 어디까지가 진짜이고 어디까지가 가짜인 것일까 한번 살펴보기로하자.

우선은 진보한 node.js framework이라는 것은 기존의 node.js 서버사이드 프레임워크인 express가 대표적인 비교군이 될 것 같다.

소개 페이지를 살펴보면 완벽한 `Typescript`를 지원하고, 선택적으로 `javascript`또한 지원하며 OOP, FP, FRP 등의 페러다임을 모두 조합하는 것 또한 가능하다고 한다.(와우...)

### Philosophy

`nest.js`의 철학은 매우 빠르고 효과적인 프론트엔드 프레임워크들은 존재 하지만, 편의성뿐 아니라 구조적(Architecture)에 대한 문제도 해결할 수 있는 `server-side` 프레임워크에 대한 부제(javascript)에 대한 갈증을 해결하기 위하여 등장하였다고 한다.

아키텍쳐 자체는 `Angular`에서 큰 영감을 받았고, 테스트 가능성과 느슨한 결합, 쉬운 유지 관리, 확장성등을 확보하는 것을 주요한 철학으로 생각한다고 한다.

## nest Cli

`nest.js`에 경우에는 간단하게 CLI를 통해서 프로젝트를 시작할 수 있다.

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

이러한 커맨드를 통해서 기본적인 nest.js 프로젝트 파일을 만들고, `npm run start`를 통해서 `3000` 포트로 서버를 열어 볼 수 있다.

## nest 기본 구조

`nest.js`를 구성하는 핵심 구조에 대하여서 알아보자. nest.js App을 구성하는 필수적인 구성요소에 대해 다룬다.

nest project 구조를 살펴보면

```
src
 - app.controller.spec.ts
 - app.controller.ts
 - app.module.ts
 - app.service.ts
 - main.ts
```

이러한 구조의 파일 트리를 볼수 있을 것이고

nest.js 홈페이지에서 각각의 확장자들이 어떤역활을 하는지 알 수 있다.

|       files        | description                                                                 |
| :----------------: | :-------------------------------------------------------------------------- |
|   controller.ts    | single router를 포함한 기본 컨트롤러                                        |
| controller.spec.ts | unit test                                                                   |
|     module.ts      | 어플리케이션의 모듈                                                         |
|     service.ts     | single method를 포함한 기본 service                                         |
|      main.ts       | 서버의 시작 파일 NestFactory 함수를 사용하여 어플리케이션의 인스턴스를 생성 |

```ts
main.ts;
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

NestFactory의 내장 메소드를 통하여 서버를 생성하고, 열어줄 수 있다. 이는 Express서버에서 사용하는 일반적인 구조와 유사하다.

기본적으로 nest.js는 node 환경의 http를 사용하는 모든 프레임워크와 호환이 가능하니 참고하자.

## Controller

컨트롤러는 요청(Request)를 처리하고 응답(Response)를 반환하는 역활을 한다.
