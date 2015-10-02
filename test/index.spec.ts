import * as assert from 'power-assert';
import { index } from '../src/index';

describe('index', () => {
    it('()', () => {
        assert(true);
        assert(index() == 'Hello world');
    });
});
