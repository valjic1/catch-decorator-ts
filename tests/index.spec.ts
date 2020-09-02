import { createSandbox } from "sinon";

const sandbox = createSandbox();

// TODO: Add test cases
describe(`Testing Catch decorator`, () => {
  afterEach(() => {
    sandbox.reset();
  });

  it("Empty test", async () => {
    return true;
  });
});
