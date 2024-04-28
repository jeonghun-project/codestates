# ERC-20

블록체인 네크워크의 많은 컴퓨터에서 업데이트 되고 공유되는 공용 되는 데이터 베이스

> 블록은 데이터

> 체인은 블록이 암호화 방식으로 상위 블록을 참조하고 블록끼리는 서로 연결됨을 의미한다.

전체 네트워크의 합의가 필요하다는 것이 중요한 개념이다

## EVM

이더리움 네트워크의 모든 사람들이 동의하는 상태를 갖게 하는 단일 표준 컴퓨터(가상 머신)

모든 참가자는 EVM에서 임의 코드 실행을 요청할 수 있고, 코드 실행은 EVM의 상태를 변경합니다.

단 하나의 통일된 프로토콜 자체로 이더리움을 지속적이고 중단되지 않고 불변적인 작동을 유지하기 위한 목적을 실현시켜 준다.

EVM은 블록마다 새로운 유효한 상태를 계산하기 위한 규칙을 정의하고 있다.


### FROM LEDGER TO STATE MACHINE

The ledger maintains a record of activity which must adhere to a set of rules that govern what someone can and cannot do to modify the ledger

Ledger는 Ledger를 수정하기 위해 할 수 있는 일과 할수 없는 일을 통제하는 일련의 규칙을 준수해야 하는 활동 기록을 유지 관리

이더리움은 이와 동일한 규칙을 따르고 더 강력한 스마트 컨트렉트도 가능하게 한다.

이런 강력한 기능을 위해 분산 Ledger가 아닌 분산 상태 머신 EVM을 가진다.

이러한 EVM 코드를 실행할수 있는 EVM을 보유하는 대규모 데이터 구조입니다.

블록에서 블록으로 상태를 변경하는 특정 규칙은 EVM에 의해 정의 된다.

EVM Structure

![alt text](image.png)

### EVM 동작 설명


- THE ETHEREUM STATE TRANSITION FUNCTION


```
Y(S, T)= S'
```

이전의 State = S 새로운 유호한 트랜젝션 세트 T 가 주어지면 이더리움 상태 전이 함수 Y는 새로운 출령S'를 생성한다.

내부 적으로는

> [머클 트리](https://en.wikipedia.org/wiki/Merkle_tree)로 알려진 데이터 구조의 툭수 버전
(Merkle Tree => [modified Merkle Patricia Trie](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/))으로 인코딩된다.
>
> 이 구조는 트리에 얽힌 개별 데이터 조각 사이에 검증 가능한 관계를 생성
>
>데이터에 대한 내용을 증명하는 데 사용할 수 있는 단일 루트값을 생성하기에 암호화의 많은 응용 프로그램에 유용하다.

차후에는 [Verkle Tree](https://ethereum.org/en/roadmap/verkle-trees/)로 마이그레이션 할 계획을 가지고 있다고 한다.

이더리움에서 State란 이런 modified Merkle PariciaTrie 로 이루어진 거대한 구조를 말한다.

모든 계정을 해시로 연결하고 블록체인에 저장된 단일 루트해시로 축소 할 수 있다.

### Transactions

> Transaction은 계정에서 암호화된 방식으로 서명된 지침(instruction)이다.


```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("JadenRich", "JR")
        Ownable(initialOwner)
        ERC20Permit("JadenRich")
    {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount*10*18);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
```