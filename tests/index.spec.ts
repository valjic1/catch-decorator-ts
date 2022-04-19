import { ConnectionError, DatabaseError } from './Errors';
import { DefaultCatch, Catch } from '../src/index';

const enum errors {
  GenericError = 'GenericError',
  DatabaseError = 'DatabaseError',
  ConnectionError = 'ConnectionError',
}

const TryCatch = () =>
  DefaultCatch((err: any, ctx: any) => errors.GenericError);
class API {
  @DefaultCatch((err, ctx) => errors.GenericError)
  @Catch(DatabaseError, (err, ctx, id) => errors.DatabaseError)
  @Catch(ConnectionError, (err, ctx, id) => errors.ConnectionError)
  fetchWithError({ type }: { type?: 'connection' | 'database' }) {
    return new Promise((resolve, reject) => {
      if (type === 'connection') throw new ConnectionError('Connection error');
      if (type === 'database') throw new DatabaseError('Database error');
      throw new Error('Generic error');
    });
  }
  @TryCatch()
  fetchWithDefaultCatch() {
    return new Promise((resolve, reject) => {
      throw new Error(errors.GenericError);
    });
  }
}

test('catches error with type [1]', async () => {
  const api = new API();
  const result = await api.fetchWithError({ type: 'connection' });
  expect(result).toBe(errors.ConnectionError);
});

test('catches error with type [2]', async () => {
  const api = new API();
  const result = await api.fetchWithError({ type: 'database' });
  expect(result).toBe(errors.DatabaseError);
});

test('catches generic error', async () => {
  const api = new API();
  const result = await api.fetchWithError({});
  expect(result).toBe(errors.GenericError);
});

test('catches with composed try/catch', async () => {
  const api = new API();
  const result = await api.fetchWithDefaultCatch();
  expect(result).toBe(errors.GenericError);
});
