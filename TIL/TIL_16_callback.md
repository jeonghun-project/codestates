# 오늘의 한 일

callback

자바스크립트는 동기적이다

호이스팅이 된 이후 부터 하나씩 동기적으로 실행이된다.

호이스팅 : var, 함수 선언식 

## callback

async를 핸들할 수 있다.

callback 뒤에 부른다.

어떠한 작업이 완료 혹은 적절한 때에 호출하여 쓸 수 있도록 함수를 인자로 전달하는 방식으로 사용한다(javascript)

다른 언어에서는 function pointer(C, C++), subroutine(java) lambda expression(python, java, C#) 등을 이용하여 콜백을 구현할 수 있다.

```tsx
console.log(`1`);
setTimeout(() => console.log(`2`), 1000);
console.log(`3`);

// Synchronous(동기식) callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log(`hello`));

// Asynchronous(비동기식) callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}

printWithDelay(() => console.log(`async callback`), 2000);
```

이것은 콜백 지옥 (dreamcode ellie 참고)

```tsx
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === `ellie` && password === `123`) ||
        (id === `gunwoo` && password === `1104`)
      ) {
        onSuccess(id);
      } else {
        onError(new Error(`not found`));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === `ellie`) {
        onSuccess({ name: `ellie`, role: `admin` });
      } else {
        onError(new Error(`no access`));
      }
    }, 1000);
  }
}

const id = prompt(`enter your id`);
const password = prompt(`enter your password`);

const userStorage = new UserStorage();
userStorage.loginUser(
  id,
  password,
  user => {
    userStorage.getRoles(
      user,
      userInfo => {
        alert(`name: ${userInfo.name}, role: ${userInfo.name}`);
      },
      error => {
        console.log(error);
      }
    );
  },
  error => {
    console.log(error);
  }
);
```