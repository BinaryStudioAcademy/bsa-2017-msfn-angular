import {UnreadPipe} from './unread.pipe';

describe('UnreadPipe', () => {
    it('create an instance', () => {
        const pipe = new UnreadPipe();
        expect(pipe).toBeTruthy();
    });
});
