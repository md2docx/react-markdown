import { Properties } from "hast";

export const handleAriaAndDataProps = (properties: Properties) =>
  Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      key.startsWith("data")
        ? key.replace(/[A-Z]+(?![a-z])|[A-Z]/g, match => "-" + match.toLowerCase())
        : key.startsWith("aria")
          ? key.replace("aria", "aria-").toLowerCase()
          : key,
      value,
    ]),
  );

export const uuid = () => crypto.randomUUID();
