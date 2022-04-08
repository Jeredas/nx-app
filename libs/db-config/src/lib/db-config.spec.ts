import { dbConfig } from './db-config';

describe('dbConfig', () => {
  it('should work', () => {
    expect(dbConfig()).toEqual('db-config');
  });
});
