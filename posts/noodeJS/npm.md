# npm


## node package manager

node.js 에서 설치 가능한 모듈들을 패키지화하여 모아둔 저장소 역활을 한다.

패키지를 검색하고 설치하고 배포할 수 있다.

### npm init

```bash
$ npm init -y // -y workspace에 package.json default 정보로 생성
```

### npm install

```bash
$ npm install
```

```bash
$ npm install -g // global → local/bin/node_modules
```

## package.json

패키지의 의존성을 관리할 수 있다.

### devDependencies

devDependencies는 해당 프로젝트가 돌아가는데 크게 중요하지는 않은 모듈에 대한 정보가 포함되어 있다.

```bash
$ npm install <module.name> --save-dev

```

이와 같은 방법으로 자동으로 package.json 파일에 devDependencies 객체에 포함되어진다.

```json
{
	"dexDependencies" : {
		"module.name" : "--version.number",
		"mocha" : "^13.32.1"
	}
}
```

### Dependencies

Dependencies는 반드시  프로젝트를 동작하기 위해서 필요한 모듈에 대한 정보가 담겨있다.

```bash
$ npm install <module.name>
or
$ npm install --save <module.name>
```

이와 같은 방법으로 자동으로 package.json 파일에 Dependencies 객체에 포함되어진다.

```json
{
	"Dependencies" : {
		"module.name" : "--version.number",
		"React" : "^12.2.1",
	}
}
```

### Script

CLI에서 사용이 가능한 command를 기술한다.

npm run key를 통해서 terminal을 통해서 실행이 가능하다

```json
{
	"Script" : {
		"script.name" : "cli.command",
		"lint" : "eslint"
	}
}
```