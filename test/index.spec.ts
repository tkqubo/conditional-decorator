import * as assert from 'power-assert';
import { index } from '../index';

describe('index', () => {
    it('()', () => {
        assert(true);
        assert(index() == 'Hello world');
    });
});
