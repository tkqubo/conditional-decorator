import * as assert from 'power-assert';
import { conditional } from '../src/index';

class Hoge {
    @conditional('33', null)
    method() {
    }
}

describe('index', () => {
    it('()', () => {
        assert(true);
    });
});

