# guard

Nsetjs에는 가드 통신을 block 할 수 있는 interface가 존재한다. 바로 CanActive interface이다.

guard를 통해서 기존 node서버의 경우 Express에서 인증을 처리하던 미들웨어를 interface로 관리 할 수 있도록 해주는 기능이 탑재되어 있다.

미들웨어와의 차이점은 `next()` 함수를 호출한 후 어떤 행들러가 실행될지 모르지만,

`guard`의 경우 `ExecutionContext` **인스턴스에 엑세스할 수 있으므로 다음에 실행될 항목을 정확히 알고 있다**

guard에서는 기본적으로 단일 책임을 원칙으로 합니다.

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

nestjs에서 제공하는 기본적인 Guard의 형식이다.

`validateRequest`에 해당하는 로직을 자체적으로 구성함으로서 Return되는 Boolean의 True/False 값에의하여 권한을 설정할 수 있다.

기본적으로 **Guard의 경우에는 false에 경우에는 `403 Forbidden Error`를 내보낸다**.

현재 개발중인 서버에서는 각 유저에게 권한을 부여하고 해당 권한을 통해 Graphql 통신을 block/allow 할 수 있는 guar가 필요하였다.

## custom-guard

현재 구성중인 서버에서 Graphql을 사용하고 유저의 인증은 JWT 토큰을 Passport를 통해 검증하도록 전략을 구성하였다. 위의 부분의 자세한 구현은 생략하고 가드의 자세한 내용을 바로 살펴보자.

```ts
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const policyList = this.reflector.get<PolicyList[]>(
      'policyList',
      context.getHandler(),
    );
    const findUser = ctx.getContext().req.user as User;
    ...
    return checkPolicies(findUser.role, allowPolicies, roles, policyList);
  }
}
```

중간 중간 자세한 구현 내용은 생략한다.

`CanActivate interface`에 대한 구현을 위해 `implements`에 선언하고 common 모듈에서 가져온다.

```ts
export class GqlRoleGuard implements CanActivate {}
```

이렇게 되면 abstract로 선언되어 있는 canActivate를 구현하여한다고 알려주고,

이를 원하는 요구사항에 맞게 구현하면된다.

```ts
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

// interface
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;

// 실제 구현
async canActivate(context: ExecutionContext) {
  const ctx = GqlExecutionContext.create(context);
  const roles = this.reflector.get<string[]>('roles', context.getHandler());
  const policyList = this.reflector.get<PolicyList[]>(
    'policyList',
    context.getHandler(),
  );
  const findUser = ctx.getContext().req.user as User;
  ...
  return checkPolicies(findUser.role, allowPolicies, roles, policyList);
}
```

nestjs의 intercepto나 guard 즉 미들웨어의 기능을 담당하는 것들에서는 **javascript에서의 동작을 담당하는 `ExecutionContext`에 직접 접근하여 현재 서버의 실행컨텍스트를 직접 접근이 가능하다.** 

이러한 이점을 바탕으로 nestjs에서는 Graphql이 구동 되는 환경(`ExcutionContext`)에 접근하여이를 사용할 수 있다.

`reflector`는 nestjs에서 제공하는 `SetMetadata`를 통해 특정 메타데이터를 부여할 수 있고, 이러한 메타데이터를 엑세스할 수 있도록 돕는다.

`GqlExcutionContext`에서 현재 Context의 request에 바인딩된(passport를 통해) User정보를 가져온다.

해당 User 의 Role이 이 사용자의 역활을 의미하고.

permission은 Cache에서 수집하도록 구성하였다.

