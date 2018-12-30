export class JsonUtility{

  public static isJSON(str: string): boolean{
    return false;
  }

  public static isJsonString(str: string): boolean {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    }
  }

  public static isJsonStringByPromise(str: string): Promise<any>{
    try {
      let json = JSON.parse(str);
      return typeof json === 'object' ? Promise.resolve(true) : Promise.reject(false);
    } catch (e) {
        Promise.reject(e)
    }
  }
}