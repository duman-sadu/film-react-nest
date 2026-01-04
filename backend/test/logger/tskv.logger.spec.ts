// test/logger/tskv.logger.spec.ts
import { TskvLogger } from '../../src/logger/tskv.logger';

describe('TskvLogger', () => {
  it('logs TSKV formatted message', () => {
    const logger = new TskvLogger();
    const spy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);

    logger.log('hello', { id: 1 });

    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0] as string;

    expect(output).toContain('level=log');
    expect(output).toContain('message=hello');
    expect(output).toContain('params=');
    expect(output.endsWith('\n')).toBe(true);

    spy.mockRestore();
  });
});
