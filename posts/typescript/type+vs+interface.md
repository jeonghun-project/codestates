# type vs interface

tpye : 데이터의 타입을 담을 때, 해당 타입을 명시하기 위하여 상황

interface : 구현이 목적으로 API 처럼 규격사항을 정해줄때 사용하는 것이 좋다

```ts
type PositionType = {
  x: number;
  y: number;
};

interface PositionInterface {
  x: number;
  y: number;
}

// object
const positionType: PositionType = {
  x: 1,
  y: 1,
};
const positionInterface: PositionInterface = {
  x: 1,
  y: 1,
};

// class
class Pos1 implements PositionType {
  x: number;
  y: number;
}
class Pos2 implements PositionInterface {
  x: number;
  y: number;
}

// Extends
interface ZPositionInterface extends PositionInterface {
  z: number;
}
type ZPositionType = PositionType & { z: number };

// Only interface can be merged
interface PositionInterface {
  z: number;
}
// type PositionType = {} XXXXXXXXXX

// Type aliases can use compited properties
type Person = {
  name: string;
  age: number;
};
type Name = Person["name"];
type NumberType = number;
type Direction = "left" | "right";
```
