import * as utils from './utils';

function conditional(value: boolean, decorator: ClassDecorator): ClassDecorator;
function conditional(value: () => boolean, decorator: ClassDecorator): ClassDecorator;

function conditional(value: boolean, decorator: ParameterDecorator): ParameterDecorator;
function conditional(value: () => boolean, decorator: ParameterDecorator): ParameterDecorator;

function conditional(value: boolean, decorator: PropertyDecorator): PropertyDecorator;
function conditional(value: () => boolean, decorator: PropertyDecorator): PropertyDecorator;

function conditional(value: boolean, decorator: MethodDecorator): MethodDecorator;
function conditional(value: () => boolean, decorator: MethodDecorator): MethodDecorator;

function conditional<TFunction extends Function>(value: any, decorator: TFunction): TFunction {
  return null;
}

export default conditional;
