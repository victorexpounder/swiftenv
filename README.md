# swiftEnv

[![npm version](https://badge.fury.io/js/swiftenv)](https://badge.fury.io/js/swiftenv)
[![Build Status](https://github.com/victorexpounder/swiftenv/workflows/CI/badge.svg)](https://github.com/victorexpounder/swiftenv/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

swiftEnv is a lightweight, dependency-free library for managing environment variables. It provides simple utilities to load, get, set, update, remove, and validate environment variables directly from a `.env` file, offering a straightforward solution for environment configuration without relying on external dependencies.

## Features

- **Zero Dependencies**: No external libraries required.
- **Simple API**: Easily get, set, update, and remove environment variables.
- **Environment Validation**: Validate required environment variables at runtime.
- **Automatic `.env` File Creation**: Ensures a `.env` file exists or creates one if it doesn't.
- **TypeScript Support**: Written in TypeScript with type definitions included.
- **Utility Functions**: Additional utility functions for common environment variable operations.

## Installation

You can install Env Manager via npm:

```bash
npm install swiftenv
```
## Usage

### 1. Import the Module

```js
    import { getEnv, setEnv, removeEnv, listEnv, validateEnv, numberEnv } from 'swiftenv';
```

### Get an environment variable

```js
    const secret = getEnv('secret');
```
### Get multiple environment variables

```js
    const {secret, port} = listEnv();
```
### Convert environment variable to number

```js
    const port = numberEnv('DB_PORT');
```
### Validate environment variables

```js
    if(validateEnv(['DB_HOST', 'DB_PORT']))
    {
        console.log("Environment Variables Exists")
    }
```
### Set environment variable (Development Only)

```js
    setEnv('API_KEY', 'your-api-key');
    //ensure you remove this part before publishing to avoid exposing values
```
### Remove environment variable (Development Only)

```js
    removeEnv('API_KEY');
    //ensure you remove this part before publishing 
```

## Function Reference

| Function          | Parameters                 | Description                                      |
|-------------------|----------------------------|--------------------------------------------------|
|getEnv             |key: string, defaultValue?: |Retrieves the value of the specified environment  |
|                   | string	                 |variable.If not found, returns defaultValue       |
|setEnv             |key: string, value: string  |Sets or updates an environment variable in both   |
|                   | filePath?: string	         | the process and env                              |
|listEnv            |none                        | Returns an object containing all loaded          |
|                   |         	                 | environment variables.                           |
|validateEnv        |     keys: string[]:        |Validates that all specified keys are present in  |
|                   |          	                 |the environment variable.If not throws error      |
|numberEnv          |   key: string              |Converts the specified environment variable to a  |
|                   |       	                 |number and returns it.                            |
|removeEnv             key: string, filePath?: : |Removes an environment variable from both the     |
|                   |    string                  |process and the .env file.                        |
