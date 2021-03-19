안전하지 않은 항목에 대한 오류

zsh의 경로가 엉켜서 생성된 문제로 보여진다.

```bash
So here is what I did,

$compaudit and it will give you a list of directories it thinks are unsecure
$sudo chown -R username:root target_directory
$sudo chmod -R 755 target_directory
```

chown → 파일의 소유자 권한을 변경한다

chmod → 파일의 접근 권한을 변경한다.

[chmod, chown](../ShellScript/chmod,chown.md) 

delete zcompdump of local directory

대부분의 zsh command error를 일으킴