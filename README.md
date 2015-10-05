# Conditional Decorator [![Build Status](https://travis-ci.org/tkqubo/conditional-decorator.svg?branch=master)](https://travis-ci.org/tkqubo/conditional-decorator)

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


