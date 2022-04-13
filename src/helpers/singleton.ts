// Singleton class we have added below.
export class Singleton<T> {
  // Use the `Logger` type
  private static instance: T;
  // Use a private constructor
  private constructor() {}
  // Ensure that there is only one instance created
  public static getInstance(): T {
    if (!Singleton.instance) {
      Singleton.instance = new T();
    }
    return Singleton.instance;
  }
}
