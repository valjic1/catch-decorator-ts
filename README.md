# Catch Decorator TS

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Toicon-icon-fandom-catch.svg/1200px-Toicon-icon-fandom-catch.svg.png" height="90" width="90">

## Description

Typescript decorator for handling your exceptions elegantly.

## Install

```bash
npm install catch-decorator-ts
```

If you use Typescript enable `experimentalDecorators` flag inside your tsconfig file, otherwise for babel use one of the following plugins [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) or [@babel/plugin-proposal-decorators](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-decorators).

## Usage

Writting code that correctly handles all kinds of errors is hard. Developers usually wrap methods with try/catch block in order to handle different kinds of errors. Now imagine as number of anticipated errors increases, it would mess out with the codebase readability, right? That's why it feels natural to use decorators in order to separate method logic from error handling logic.

```ts
// Handler for `Catch` or `DefaultCatch` decorators
// err - error thrown from decorated method
// context - `this` value from decorated method
// args - spreaded arguments from decorated method
type Handler = (err: any, context: any, ...args: any) => any;

// Handler will be executed if decorated method has thrown an error which is instance of `ErrorClassConstructor`
@Catch(ErrorClassConstructor: Function, handler: Handler)

// Handler will be executed no matter what type of error has been thrown
@DefaultCatch: (handler: Handler)
```

Consider the following example:

```ts
class User {
  private repository;

  async getUser(id) {
    try {
      const user = await this.repository.fetch(id);
      return user;
    } catch (error) {
      if (error instanceof DatabaseError) {
        console.log("DatabaseError");
      } else if (error instanceof ConnectionError) {
        console.log("ConnectionError");
      } else {
        console.log("UnrecognizedError");
      }
    }
  }
}
```

Now lets rewrite previous example using the introduced decorator. Code remains semantically the same, but more clear for other developers to read it.

```ts
import { Catch, DefaultCatch } from "catch-decorator";

class User {
  private repository;

  constructor() {
    this.getUser = this.getUser.bind(this);
  }

  @DefaultCatch((err, ctx, id) => console.log("UnrecognizedError"))
  @Catch(ConnectionError, (err, ctx, id) => console.log("ConnectionError"))
  @Catch(DatabaseError, (err, ctx, id) => console.log("DatabaseError"))
  async getUser(id) {
    const user = await this.repository.fetch(id);
    return user;
  }
}
```

Remember when stacking decorators that their execution is going to happen in reverse order

```ts
@DefaultCatch(quxHandler)
@Catch(Foo, fooHandler)
@Catch(Bar, barHandler)
@Catch(Baz, bazHandler)
someRandomMethod(){
  throw new QuxError("oops");
}
```

Which means that the handlers above are going to execute in following order

```
bazHandler -> barHandler -> fooHandler -> quxHandler
```

Also it is required to put the `DefaultCatch` decorator at the very top, otherwise all the `Catch` decorators above him are not going to get executed as the handler from `DefaultCatch` will be called neverthelles of the error type. Of course decorating method with `DefaultCatch` is optional.

It is also possible to define error handlers as external variables or bind them as class's static methods.

```ts
import { Catch, DefaultCatch, Handler } from "catch-decorator";

const connectionErrorHandler: Handler = (err, ctx, id) =>
  console.log("ConnectionError");
const databaseErrorHandler: Handler = (err, ctx, id) =>
  console.log("DatabaseError");

class User {
  private repository;

  constructor() {
    this.getUser = this.getUser.bind(this);
  }

  @DefaultCatch(User.defaultErrorHandler)
  @Catch(ConnectionError, connectionErrorHandler)
  @Catch(DatabaseError, databaseErrorHandler)
  async getUser(id) {
    const user = await this.repository.fetch(id);
    return user;
  }

  static defaultErrorHandler: Handler = (err, ctx, id) =>
    console.log("UnrecognizedError");
}
```

### Example use case with Express.js

Passing express middleware parameters to error handler.

```ts
import { Catch, DefaultCatch, Handler } from "catch-decorator";

const defaultErrorHandler: Handler = (err, ctx, req, res, next, id) =>
  next(err);
const databaseErrorHandler: Handler = (err, ctx, req, res, next, id) =>
  res.send({ error: err });

class UserController {
  private repository;

  constructor() {
    this.load = this.load.bind(this);
  }

  @DefaultCatch(defaultErrorHandler)
  @Catch(DatabaseError, databaseErrorHandler)
  async load(req: Request, res: Response, next: NextFunction, id: string) {
    const user = await this.userRepository.fetch(id);
    res.send({ user });
  }
}
```

## Acknowledgment

This library was influenced by [catch-decorator](https://www.npmjs.com/package/catch-decorator) and [catch-error-decorator](https://www.npmjs.com/package/catch-error-decorator). What it improves is that now it is possible to pass method's arguments to error handler as well.
