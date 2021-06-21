# Utility Type

타입스크립트에서만 가능한 특별한 기능들

타입을 다른 타입으로 변환할 수 있는 기능들 어떻게 유틸리티 타입을 만들수 있고 어떻게 가능할까

## Index Type

> 모든 것의 시작

타입을 인덱스에 접근하는 것과 같은 방식으로 접근할 수 있다

```ts
{
  const obj = {
    name: "jeong",
  };

  obj.name; // jeong
  obj["name"]; // jeong

  type Animal = {
    name: string;
    age: number;
    gender: "male" | "female";
  };

  type Name = Animal["name"]; // string
  const text: Name = 23234; // type error

  type Gender = Animal["gender"]; // "male" | "female";

  type Keys = keyof Animal; // 'name' | 'age' | 'gender'

  const key: Keys = "gender";

  type Person = {
    name: string;
    gender: Animal["gender"];
  };

  const person: Person = {
    name: "jeong",
    gender: "male",
  };
}
```

## Map Type

```ts
{
  type Video = {
    title: string;
    author: string;
  };

  type VideoReadOnly = {
    readonly title: string;
    readonly author: string;
  };

  // @T 라는 타입을 순회하면서 옵셔널로 만들 수 있다
  type optional<T> = {
    [P in keyof T]?: T[P]; // for...in
  };

  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  const video: ReadOnly<Video> = {
    title: "h1",
    author: "jeong",
  };

  // @Optional
  // type VideoOptional = {
  //   title?: string;
  //   author?: string;
  // };

  type VideoOptional = optional<Video>;

  const videoOp: VideoOptional = {};

  type Animal = {
    name: string;
    age: number;
  };
  const animal: optional<Animal> = {
    name: "dog",
  };
}
```

## Condition Type

상황에 따라서 타입을 결정해 준다

```ts
{
  type Check<T> = T extends string ? boolean : number;
  type Type = Check<string>; // boolean

  type TypeName<T> = T extends string
    ? "string"
    : T extends number
    ? "number"
    : T extends boolean
    ? "boolean"
    : T extends undefined
    ? "undefined"
    : T extends Function
    ? "function"
    : "object";

  type T0 = TypeName<string>;
}
```

## ReadOnly Type

```ts
type ToDo = {
  title: string;
  description: string;
};

function display(todo: Readonly<ToDo>) {
  todo.title = "jeong"; // XXXX
}
```

## Partial Type

타입에 일정 부분만

```ts
{
  type Todo = {
    title: string;
    description: string;
    label: string;
    priority: "high" | "low";
  };

  /* map type을 옵셔널로 받아올 수 있는 Utility Type */
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };

  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return { ...todo, ...fieldsToUpdate };
  }
  const todo: Todo = {
    title: "learn TypeScript",
    description: "study hard",
    label: "study",
    priority: "high",
  };
  const updated = updateTodo(todo, { priority: "low" });
}
```

## Pick Type

```ts
{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  // @T 라는 타입의 키중에 특정 키만을 가지고 있는 P라는 타입
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  function getVideo(id: string): Video {
    return {
      id,
      title: "video",
      url: "https//",
      data: "byte-data",
    };
  }

  function getVideoMetadata(id: string): Pick<Video, "id" | "title"> {
    return {
      id,
      title: "jeong's log",
    };
  }
}
```

## Omit Type

```ts
{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  // Condition Type을 통해서 특정 타입을 never로 만듬
  type Exclude<T, U> = T extends U ? never : T;
  // Exclude 타입을 통해 T 타입의 키들 중 K라는 Key를 never로 만듬
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  function getVideo(id: string): Video {
    return {
      id,
      title: "video",
      url: "https//",
      data: "byte-data",
    };
  }

  function getVideoMetadata(id: string): Omit<Video, "id" | "title"> {
    return {
      id,
      title: "who",
    };
  }
}
```

## Record Type

```ts
{
  type PageInfo = {
    title: string;
  };

  type Page = "home" | "about" | "contact";

  // key가 될 타입을 받아 key로 만들고 해당 key의 타입은 T로 정의 된다.
  type Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  const nav: Record<Page, PageInfo> = {
    home: { title: "home" },
    about: { title: "about" },
    contact: { title: "Contact" },
  };
}
```
