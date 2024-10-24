# useStateQueryParams

`useStateQueryParams` is a React hook that allows you to easily manage **'state'** using query parameters in the URL, whether in client-side rendering (CSR) or server-side rendering (SSR) applications. By using this hook, you can automatically sync state with query parameters and also change the URL without reloading the page.

## Features

- **Support for CSR and SSR**: Works in various environments without dependency on a router.
- **Optional Default Values**: You can provide default values that will be used if the query parameters are not found in the URL.
- **Simplicity**: A straightforward and easy-to-use interface.
- **React Hook**: Specifically designed to be used in React components.

## Installation

You can install `useStateQueryParams` via npm or yarn. Make sure you also have React as a dependency.

```bash
npm install use-state-query-params

# OR

yarn add use-state-query-params
```

## Usage

### Basic Example

```jsx
import React from 'react';
import useStateQueryParams from 'use-state-query-params';

function MyComponent() {
  const [state, setState] = useStateQueryParams < { key: number } > { key: 1 };

  return (
    <div>
      <p>Current key: {state.key}</p>
      <button onClick={() => setState({ key: (state.key || 0) + 1 })}>Next Key</button>
    </div>
  );
}

export default MyComponent;
```

### Without Default Values

```jsx
import React from 'react';
import useStateQueryParams from 'use-state-query-params';

function AnotherComponent() {
  const [state, setState] = useStateQueryParams<{ key?: number }>();

  return (
    <div>
      <p>Current key: {state.key ?? 'No key set'}</p>
      <button onClick={() => setState({ key: (state.key || 0) + 1 })}>
        Next Key
      </button>
    </div>
  );
}

export default AnotherComponent;
```

## API

`useStateQueryParams<T>(defaultValues?: Partial<T>): [T, (value: Partial<T>) => void]`

- **T**: A generic type that defines the structure of the query parameters.
- **defaultValues**: An optional object that provides default values for the state.

### Returns:

- **state**: An object containing the current query parameters.
- **setState**: A function to update the query parameters.

## Notes

- This hook works well in CSR or SSR environments like Next.js, as it handles checking for window.
- Be careful when managing state, especially when parsing values from query parameters, as they can be in string or JSON format.

## Contributing

If you would like to contribute to this project, please fork this repository and create a pull request. We welcome suggestions and improvements!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
