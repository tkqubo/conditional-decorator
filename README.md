# Conditional Decorator
[![Build Status](https://travis-ci.org/tkqubo/conditional-decorator.svg?branch=master)](https://travis-ci.org/tkqubo/conditional-decorator)
![David](https://david-dm.org/tkqubo/conditional-decorator.svg)
[![Test Coverage](https://codeclimate.com/github/tkqubo/conditional-decorator/badges/coverage.svg)](https://codeclimate.com/github/tkqubo/conditional-decorator/coverage)
[![Code Climate](https://codeclimate.com/github/tkqubo/conditional-decorator/badges/gpa.svg)](https://codeclimate.com/github/tkqubo/conditional-decorator)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

A decorator which can wrap any kind of decorator

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

	@conditional(process.env.NODE_ENV === 'local', logger)
	baz() {
		// ...
	}
}
```

## API

*TBD*

## Using with TypeScript

*TBD*

