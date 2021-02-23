# Homebrew

MAC OS에서 사용가능한 패키지 관리자.

패키지 관리자란?

Homebrew는 전용 디렉토리에 패키지를 설치하고 /usr/local 위치로 심볼릭 링크를 연결합니다.

심볼릭 링크를 한다는 것에 주의하자.

토막 상식

심볼릭 링크 : 리눅스 환경에서 특정파일을 참조하는 형식의 특수한 파일.(바로가기)

```bash
ln -s <TargetFile> <LinkFilename>
```

즉, 패키지의 직접적인 설치는 homebrew에서 이루어지지만 패키지 파일을 local에 심볼릭 링크의 형태로 만들어 똑같이 사용할 수 있도록 관리해주는 소프트웨어

## Homebrew command

- 프로그램 검색: `brew search 검색어`
- 프로그램 정보 확인: `brew info 프로그램이름`
- 프로그램 설치: `brew install 프로그램이름`
- brew 자체 업데이트: `brew update`
- 프로그램 업그레이드: `brew upgrade 프로그램이름`
- 프로그램 삭제: `brew uninstall 프로그램이름`
- 설치된 프로그램 보기: `brew list`

설치하다 만난 에러

[zsh_compinit](./../ErrorCase/zsh_compinit.md)