# type ORM 프로젝트 적용

현재 진행한 2주짜리 짧프로젝트에서 사용한 ORM으로 라이브러리였다.

처음에는 `sequelize`를 이용하여 작업하려 하였으나.

`typescript`에서 `sequelize`를 사용하기에는 시퀄라이즈의 경우 런타임환경에 다소 의존적이기에 프로젝트에 사용하기에는 무리가 있었다.

결국에는 대안으로 찾은 것이 `typeORM`이다.

`typeORM`의 경우에는 자체 API 뿐 아니라, query 빌더도 제공하여 주기 때문에 적절한 사용법을 이용하여 사용한다면, 다양한 측면에서 이점을 볼 수 있었다.

## typeORM API 이용하여 코드 작성하기

사전 작업 schema 설계가 끝나면 스키마에 맞도록 entity를 우선적으로 작업해야 한다.

프로젝트 중 User 테이블 예시

```js
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Imagecard } from './Imagcard';
import { Content } from './Content';
import { Option } from './Option';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column()
  password?: string;

  @Column()
  type!: string;

  @Column()
  imgUrl?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt!: Date;

  @OneToMany(() => Content, (content) => content.user, {
    cascade: ['insert'],
  })
  content!: Content[];

  @ManyToMany(() => User, (user) => user.following, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'follow',
    joinColumn: {
      name: 'follower',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'following',
      referencedColumnName: 'id',
    },
  })
  follower!: User[];

  @ManyToMany(() => User, (user) => user.follower)
  following!: User[];

  @ManyToMany(() => Content, (content) => content.favourite, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'favourite',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'content',
      referencedColumnName: 'id',
    },
  })
  favourite!: Content[];

  @OneToMany(() => Imagecard, (imagecard) => imagecard.user, {
    cascade: ['insert', 'update'],
  })
  imagecards!: Imagecard[];

  @ManyToMany(() => Content, (content) => content.bookmark, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'bookmark',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'content',
      referencedColumnName: 'id',
    },
  })
  bookmark!: Content[];

  @OneToOne(() => Option, (option) => option.user)
  Option!: Option;
}
```

1. create connetion 만들기

```js
import { createConnection, Connection } from "typeorm";

const connection = await createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
});
```

하지만 커넥션을 Ormconfig 파일을 package.json 동일 루트에 위치시키면 되는데 지원하는 확장자는
json > js > ts > env > yml 등으로 만들어서 사용할 수도 있다.

이렇게 되면 createconnection을 이용하지 않아도 바로 typeorm이 환경에서 db에 접근할 수 있다.

2.  쿼리 생성하기

기본적인 쿼리를 만들어주는 API를 지원해준다

```js
import { getRepository } from "typeorm";

const user = await getRepository(User)
  .createQueryBuilder("user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```

OR

find Option을 이용하여 쿼리를 만들수도 있으니 참고하여 편하거나 상황에 맞는 방법을 사용하면 좋겠다.

```js
userRepository.find({
  join: {
    alias: "user",
    leftJoinAndSelect: {
      profile: "user.profile",
      photo: "user.photos",
      video: "user.videos",
    },
  },
});
```
