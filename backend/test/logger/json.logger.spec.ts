// test/logger/json.logger.spec.ts
import { JsonLogger } from '../../src/logger/json.logger';

describe('JsonLogger', () => {
  it('logs JSON formatted message', () => {
    const logger = new JsonLogger();
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('hello', { id: 1 });

    expect(spy).toHaveBeenCalled();
    const call = spy.mock.calls[0][0];
    const parsed = JSON.parse(call);

    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('hello');
    expect(parsed.optionalParams[0]).toEqual({ id: 1 });

    spy.mockRestore();
  });
});
