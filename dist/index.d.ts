export declare type Handler = (err: any, context: any, ...args: any) => any;
export declare const Catch: (
  ErrorClassConstructor: Function,
  handler: Handler,
) => (
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor;
export declare const DefaultCatch: (
  handler: Handler,
) => (
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor;
