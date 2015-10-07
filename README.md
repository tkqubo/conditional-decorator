# Conditional Decorator
[![npm version](https://badge.fury.io/js/conditional-decorator.svg)](http://badge.fury.io/js/conditional-decorator)
[![Build Status](https://travis-ci.org/tkqubo/conditional-decorator.svg?branch=master)](https://travis-ci.org/tkqubo/conditional-decorator)
![David](https://david-dm.org/tkqubo/conditional-decorator.svg)
[![Test Coverage](https://codeclimate.com/github/tkqubo/conditional-decorator/badges/coverage.svg)](https://codeclimate.com/github/tkqubo/conditional-decorator/coverage)
[![Code Climate](https://codeclimate.com/github/tkqubo/conditional-decorator/badges/gpa.svg)](https://codeclimate.com/github/tkqubo/conditional-decorator)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

A decorator which can wrap other decorator

## Installation

```sh
npm install conditional-decorator
```

## Usage

```js
import { conditional } from 'conditional-decorator';
import { logger } from './logger';

class Foo {
	@logger
	bar() {
		// ...
	}

	@conditional(__DEBUG__, logger)
	baz() {
		// ...
	}
}
```

## API

You can read [TypeDoc](http://typedoc.io/)-generated documentation [here](http://tkqubo.github.io/conditional-decorator/)

## Using with TypeScript

*TBD*

## Todo

- Test for:
 - Object Literal Method Declaration
 - Object Literal Accessor Declaration
 
Both are unavailable in TypeScript 1.6.2, so test should be done in Babel with `es6.decorators` option
