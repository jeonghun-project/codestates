# Sequelize

nodeJS 환경에서 사용할 수 있는 ORM입니다.

ORM(Object Relational Mapping) 관계형 데이터 베이스를 객체에 매핑해주어 객체를 다루듯이 데이터 베이스를 다룰수 있다.

Sequelize가 어떻게 동작하는지 알아보자

## 시작하기

우선 프로젝트에 Sequelize를 설치하자

```bash
npm install --save sequelize
```

Sequelize를 cli를 통해서 명령을 작동시킬 수 있도록 sequelize-cli 도 설치해준다.

```bash
npm install sequelize-cli
```

이제 프로젝트 폴더로 이동하여 sequelize를 초기화해보자

```bash
npx sequelize init
```

아래와 같은 파일들이 자동으로 만들어 지는 것을 볼 수 있다.

```
.
|-- README.md
|-- config
|   `-- config.json
|-- migrations
|-- models
|   `-- index.js
|-- package.json
`-- seeders
```

- config : 사용자, DB, 비밀번호 등을 설정하여 sequelize에서 database에 접근할 수 있도록 해준다.
- migrations : 데이터 베이스의 변화를 log처럼 남긴다. 데이터베이스에 적용할 수도 있고 undo할 수도 있다.
- models : 데이터베이스 entity정보를 담고 있는 model을 하나의 객체화 해준다.
- seeders : entity에 basic 데이터를 넣을 때 사용

config를 통해서 프로젝트 database를 설정해 줄 수 있다.

```json
config.json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    ...
  },
  "production": {
    ...
  }
}
```

node환경에서 dev db, test db, production db를 쉽게 분리할 수 있도록 config에 미리 설정을 할 수 있게되어 있다.

models/index.js가 만들어 진다.

```js
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

cli를 이용하여 model을 생성해 줄수 있다.

`$ npx sequelize model:generate --name users --attributes name:string`

이렇게 파일이 만들어진다. ./models/user.js

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {}
  }
  users.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "users"
    }
  );
  return users;
};
```

이렇게하면 초기 세팅을 마쳤다.

## 사용하기

본격적으로 query대신에 sequelize를 이용하여 database에서 기본적인 명령들을 어떻게 사용할 수 있는지 알아보자

### SELECT

```js
const { sequelize } = require("sequelize");
const d


```

Association;
Transaction;

```

```
