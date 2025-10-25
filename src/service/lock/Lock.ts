class Lock {
  private static instance: Lock;
  private _isLocked: boolean;

  private constructor() {
    this._isLocked = false;
  }

  public static getInstance(): Lock {
    if (!Lock.instance) {
      Lock.instance = new Lock();
    }
    return Lock.instance;
  }

  public lock(): boolean {
    if (this._isLocked) {
      return false;
    }
    let count = 0;
    count++;
    if (count > 1) {
      return false;
    }
    this._isLocked = true;
    
    this.unlock();
    return true;
  }

  public async unlock() {
    this._isLocked = false;
  }
  
}

export default Lock;