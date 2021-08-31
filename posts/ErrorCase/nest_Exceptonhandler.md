# Nest can't resolve dependencies ...

Nest can't resolve dependencies of the ShopifyAuthService (?, ShopifyConnectService). Please make sure that the argument ShopifyModuleOptions at index [0] is available in the AuthModule context.

Potential solutions:

- If ShopifyModuleOptions is a provider, is it part of the current AuthModule?
- If ShopifyModuleOptions is exported from a separate @Module, is that module imported within AuthModule?
  @Module({
  imports: [ /* the Module containing ShopifyModuleOptions */ ]
  })

이런 에러와 함께 내 서버는 작동하지 않았다.

```ts
// module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { ShopifyAuthService } from "./auth.service";
import { ShopifyAuthStrategy } from "./auth.strategies";
import { ShopifyConnectService } from "./connect.service";
import { Auth, AuthSchema } from "./interface/auth.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    PassportModule.register({ defaultStrategy: "shopify" }),
  ],
  providers: [ShopifyAuthService, ShopifyAuthStrategy, ShopifyConnectService],
})
export class AuthModule {}
```

아마도 서비스를 provider를 잘 못해온 것이 아닌가 싶으다.

문제 해결 해당하는 `Service`나 `controller` `Resolver` 파일의 인덱스에 해당하는 부분이 Providing이 정확히 되지 않아서 발생하는 문제였다.

예를들면 커스텀으로 Providing이 필요한 경우에는 아래와 같이 해야한다. (다른 방법으로는 class 내부에서 내장 Method를 이용하는 방법이 있음)

```ts
@Module({
  providers: [
    UserService,
    UserResolver,
    // LocalStrategy,
    { provide: "CONFIG-USER", useClass: ConfigUserImps },
    {
      provide: "ENCRYPTO",
      useValue: new Encrypto(),
    },
    JwtStrategy,
  ],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "600s" },
    }),
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [],
})
export class UserModule {}
```

이렇게 바인딩한 Class 또는 Value를 이용하여, Resolver, controller, service 등에서 사용할 수 있다.

```ts
export class UserService {
  protected logger = new DebugService('UserService');
  constructor(
    @Inject('CONFIG-USER') private configUser: ConfigUser,
    @Inject('ENCRYPTO') private encrypto: Encrypto,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  ...

  async createAccount({ email, password }: MakeAccountInputDto) {
    ...

    const res = await new this.userModel({
      email: email,
      // 여기 아랫라인을 보면 이렇게 추상화된 상태로 코드를 사용할수 있다.
      // 물론 다른 모듈에서 Exports하고 Import 하여 사용할 수도 있으니 참고 참고.
      password: await this.encrypto.bycrypto(password, this.configUser.iv),
      createdAt: now,
      updatedAt: now,
    }).save();
```
