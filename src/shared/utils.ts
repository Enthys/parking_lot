export class MissingEnvVariableError extends Error {
  constructor(public readonly variableName: string) {
    super();

    this.message = `Environment variable '${variableName}' is missing`;
  }
}

/**
 * env will attempt to retrieve the correcsponding value from `process.env`. If the value does not exist a
 * 'MissingEnvVariableError' will be thrown.
 */
export function env(envName: string): string;
/**
 * env will attempt to retrieve the correcsponding value from the `proccess.env` and process the value of the variable
 * through the passed pipe. If the value does not exist a `MissingEnvVariableError` will be thrown.
 */
export function env<T>(envName: string, pipe: (value: string) => T): T;
export function env<T>(
  envName: string,
  pipe?: (value: string) => T,
): T | string {
  const val = process.env[envName];
  if (val === undefined) {
    throw new MissingEnvVariableError(envName);
  }

  if (pipe != undefined) {
    return pipe(val);
  }

  return val;
}
