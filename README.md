# json-merge-patch-in-place 

Performs JSON merge-patch by changing existing objects. Meant for use with ORM's like Mongoose.

```bash
npm install json-merge-patch-in-place
```

## Usage

Patch properties:

```ts
import { patch } from 'json-merge-patch-in-place';

let obj = {
    a: "foo",
    b: 100,
    c: true
};

patch(obj, { b: 200 });

/*
{
    a: "foo",
    b: 200,
    c: true
};
*/
```

Remove properties:

```ts
let obj: { a: string | null, b: number | null, c: boolean | null } = {
    a: "foo",
    b: 100,
    c: true
};

patch(obj, { b: null, c: null });

/*
{
    a: "foo",
    b: null,
    c: null
};
*/
```

Patch subdocuments:

```ts
let obj: { a: string, b: { c: string, d: string } | null } = {
    a: "foo",
    b: {
        c: "bar",
        d: "baz"
    },
};

patch(obj, { b: { c: "qux" } });

/*
{
    a: "foo",
    b: {
        c: "qux",
        d: "baz"
    }
};
*/
```
