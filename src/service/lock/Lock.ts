// this lock is not centralized, 
// in case of multiple instances it will break, 
// at that time redis can be introduced

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

  // this works because javascript is single threaded, so only one thread can execute at a time
  public tryLock(): boolean {
    if (this._isLocked) {
      return false;
    }
    this._isLocked = true;    
    return true;
  }

  public async unlock() {
    this._isLocked = false;
  }
  
}

export default Lock;