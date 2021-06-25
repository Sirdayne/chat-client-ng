import { FormErrorMsgPipe } from './form-error-msg.pipe';

describe('FormErrorMsgPipe', () => {
  it('create an instance', () => {
    const pipe = new FormErrorMsgPipe();
    expect(pipe).toBeTruthy();
  });
});
