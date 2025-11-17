// Simple clsx implementation
export function clsx(...inputs) {
  const classes = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string") {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const inner = clsx(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(" ");
}

