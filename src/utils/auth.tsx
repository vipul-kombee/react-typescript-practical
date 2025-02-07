/**
 * @author      Nandani.V.Patel
 * @date        05 Feb 2025
 * @description its defines isAuth() fn ,it check user token set in localstorage or not.
 * @param
 * @response
 **/

export const tokenkey: string = "/beca21dc412a1fe623dfce29ba1622f6d47b4fb6e50e";

export function isAuth() {
  const tokenExpires = localStorage.getItem(tokenkey);
  if (
    tokenExpires !== undefined &&
    tokenExpires !== null &&
    tokenExpires !== ""
  ) {
    return true;
  }
  return false;
}
