export default function capitalizeFirstLetters(string) {
  if (typeof string != "undefined") {
    const arr = string.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const capitalized = arr.join(" ");
    return capitalized;
  }
  return "";
}
