# context로 userState 관리하기

2차 프로젝트 중에 redux를 쓰지 않고서 유저 상태를 관리해야 하는 관문에 도달하였다.

프로젝트 내에서 유저의 정보를 저장하고 어떤 페이지에 도달하더라도 user의 AccessToken을 가져올 수 있도록 구현되어야 했다.

redux를 사용하지 않고 프로젝트를 구현하다 보니 react에서 제공하는 기능만으로 어떤 컴포넌트에서든 해당 정보를 가져올 수 있어야 했다.

기본적으로 cookie와 로컬 스토리지 세션 스토리지를 이용하여 AcessToken을 관리하도록 설계할 수 있는데, 로그인시에 해당 코드의 제사용성을 높이기 위해서 그 때 그 때 토큰 데이터를 요청하는 방식보다는 react에서 자체적으로 제공하는 Context를 이용하기로 하였다.

## Context

Context는 기본적으로 Provider를 통하여 value(데이터)를 하위 컴포넌트들에서 받아서 사용할 수 있도록 해준다.

Context를 이용하여 state를 전체 컴포넌트로 내려주는 방법을 통하여 user의 AccessToken을 업데이트하고 불러와서 쓸수 있도록 하였다.

```ts
// /container/ProvideAuth.tsx

import { createContext, useContext } from "react";
import { Authorization } from "interface";
import { useProvideAuth } from "module/ProvideAuth";

const authContext = createContext<Authorization>({ accessToken: "" });

type props = {
  children: React.ReactNode;
};

export default function ProvideAuth({ children }: props) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
```

타입 파일은 별도로 작성해두었다. Auth를 다룰 때 필요한 메소드들의 타입을 한 번에 정의해 주었다.

```ts
// /interface/type.ts

export type Authorization = {
  accessToken: string | null;
  refreshToken?: string | null;
  refreshAccessToken?: () => Promise<string | null>;
  signin?: (accessToken: string, refreshToeken: string, cb: () => void) => void;
  signout?: (cb: () => void) => void;
};
```

엡에서 Context를 전체 컴포넌츠에 내려준다.

```ts
// /App.tsx

<ThemeProvider theme={theme}>
  <ProvideAuth>...</ProvideAuth>
</ThemeProvider>
```

구체적인 구현은 모듈파일에 별도로 작성하였다.

Auth 관련 객체를 return 해주는 component를 작성하고 해당 객체를 context에서 value로 내려주도록하는 방식이다.

```ts
// /Module/ProvideAuth.tsx

import axios from "axios";
import { useEffect, useState } from "react";

export function useProvideAuth() {
  const [accessToken, setaccessToken] = useState<string | null>(null);

  const setToken = (accessToken: string, refreshToken: string) => {
    sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
    if (refreshToken)
      sessionStorage.setItem("refreshToken", JSON.stringify(refreshToken));
  };

  const getToken = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    accessToken && setaccessToken(JSON.parse(accessToken));
  };

  useEffect(() => {
    getToken();
  }, []);

  const signin = (
    accessToken: string,
    refreshToken: string,
    cb: () => void
  ) => {
    setToken(accessToken, refreshToken);
    setaccessToken(accessToken);
    cb();
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      const res = await axios.post(
        "http://localhost:4000/user/token",
        { refreshToken },
        { withCredentials: true }
      );

      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(res.data.cssessToken)
      );
      setaccessToken(res.data.cssessToken);
    }
    return accessToken;
  };

  const signout = (cb: () => void) => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setaccessToken(null);
    cb();
  };

  return {
    accessToken,
    refreshAccessToken,
    signin,
    signout,
  };
}
```

이렇게 context를 통해 객체를 받아서 components 내부에서 받아서 사용할 수 있는데

```ts
// 이런식으로 받아와 사용하였다.
const auth = useAuth();
```
