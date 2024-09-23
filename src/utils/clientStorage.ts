export class ClientStorage {
  static isClient() {
    return typeof window !== 'undefined';
  }

  static save(key: string, value: any, storageType: 'local' | 'session' = 'local') {
    if (!this.isClient()) return;
    const storage = storageType === 'local' ? localStorage : sessionStorage;
    const stringifiedValue = JSON.stringify(value);

    try {
      storage.setItem(key, stringifiedValue)
    } catch (e) {
      console.error(`Error saving to ${storageType}Storage:`, e);
    }
  }

  static load<T>(key: string, storageType: 'local' | 'session' = 'local'): T | null {
    if (!this.isClient()) return null;

    const storage = storageType === 'local' ? localStorage : sessionStorage;
    const value = storage.getItem(key)

    try {
      return value ? (JSON.parse(value)) : null;
    } catch (e) {
      console.error(`Error loading from ${storageType}Storage:`, e);
      return null;
    }
  }

  static clear(storageType: 'local' | 'session' = 'local') {
    if (!this.isClient()) {
      const storage = storageType === 'local' ? localStorage : sessionStorage;
      storage.clear();
    }
  }
}
