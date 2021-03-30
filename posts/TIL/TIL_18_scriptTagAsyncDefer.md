# Async / defer

## async 비동기적인 실행을 도움

async attribute를 HTML script tag 내에 선언함으로서 script file을 비동기적으로 읽어옴

![ScriptAsync](./src/ScriptAsync.png)

어떻게 작동하는 것인지 지금으로서는 명확하게 알 수가 없다—-*

![ScriptAsync2](./src/ScriptAsync2.png)

## defer

async와 마찬가지로 비동기적으로 실행하지만 HTML parsing이 끝난 뒤에 excutin한다.

스크립트는 HTML에 실행순서에 의하여 execute 순서가 정해진다

![ScriptDefer](./src/Scriptdefer.png)