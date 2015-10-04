import * as assert from 'power-assert';
import { conditional } from '../src/index';

function onClass(clazz: Function): Function {
    console.log(clazz);
    return clazz;
}

@conditional(false, onClass)
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

