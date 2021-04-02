# 조합 문자에 keydown Event handle

조합 문자에서는 메세지 입력 종료를 나타내는 enter event가 두 번 발생하는 문제가 있음.

이를 `isComposing: boolean` 을 이용하여 구분해줘야함

조합문자를 작성중일 때는 true 단일문자일 때는 false를 내놓음 enter는 입력시 true인 enter와 false인 enter가 발생한다.

false일 때만 처리헤 주면 문제가 없겠다.

참고
[isComposing](https://levelup.gitconnected.com/javascript-events-handlers-keyboard-and-load-events-1b3e46a6b0c3)
