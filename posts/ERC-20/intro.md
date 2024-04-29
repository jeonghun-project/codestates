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

굉장히 심플한 Staking 프로세스

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract SimpleStaking is ERC20 {
    mapping(address => uint256) public staked;
    mapping(address => uint256) public stakedFromTS;
  
    constructor() ERC20("Jaden Rich", "JR") {
        _mint(msg.sender, 10000* 10**18);
    }
    

    function stake(uint256 amount) external  {
        require(amount > 0, "amount is <= 0");
        require(balanceOf(msg.sender) >= amount, "balance is  <= amount");
        _transfer(msg.sender, address(this), amount);
        if (staked[msg.sender] > 0) {
            claim();
        }
        stakedFromTS[msg.sender] = block.timestamp;
        staked[msg.sender] += amount;
    }

    function unstake(uint256 amount) external {
        require(amount >0, "amount is <= 0");
        require(staked[msg.sender] >= amount, "amount is > staked");

        claim();
        staked[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
    }
    
    function claim() public {
        require(staked[msg.sender] >0, "staked is <= 0");
        uint256 secondsStaked = block.timestamp - stakedFromTS[msg.sender];
        uint256 rewards = staked[msg.sender] * secondsStaked / 3.154e7;
        _mint(msg.sender, rewards);
        stakedFromTS[msg.sender] = block.timestamp;
    }
}
```

## CONSENSUS MECHANISMS

합의 알고리즘이란 지분 증명, 작업 증명 권한 증명 프로토콜을 지칭
분산된 노드 집합이 블록체인 상태에 동의 할 수 있도록 하는 아이디어 프로토콜 및 인센티브의 완전한 스택이다.

기록이 진실되고 정직하다고 보장하는데 사용된다.


### What is consensus

합의란 의견차이가 없이 동의 하는 것을 뜻하고 이더리움 블록체인은 프로세스가 공식적으로 있으며 합의에 도달한다는 것은 네트워크의 노드 중 최소 66%가 네트워크의 글로벌 상태에 동의한다는 것을 의미한다.

- PoW(Proof-of-work)

    거래데이터는 수학문제를 풀어서 검증된 블록에 저장된다.
    흔히 Mining이라고 부르는 작업이 진행된다. 문제를 해결한 최초의 채굴자에게 보상이 지급되었다.

    비밀번호의 올바른 조합을 찾아내는 경쟁과 같은 것

- PoS(Proof-of-Stack)

    새 블록의 생성자는 네트워크 지분에 따라 검증인으로 설정되어 검증인으로서 참여한다.

- PoA(Proof-of-Authority)

    수정된 지분증명 소수의 증명된 검증자들만이 검증을 진행한다.

이러한 합의 알고리즘들을 복합적으로 사용하기도 한다.

참고 https://ethereum.org/ko/developers/docs/consensus-mechanisms/
https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm