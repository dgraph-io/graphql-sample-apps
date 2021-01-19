export const parseJSON = (
  jsonString: string,
  check?: (object: any) => boolean,
  def: any = false
) => {
  try {
    var o = JSON.parse(jsonString);
    if (typeof check === "function") {
      if (check(o)) {
        return o;
      }
    }
  } catch (_e) {}
  return def;
};
