import { v4 as UUID } from "uuid";

export const utilFactory = (type) => {
  switch (type) {
    case "column":
      return {
        id: UUID(),
        type: "",
      };
    case "method":
      return {
        id: UUID(),
        chain: [],
      };
    case "chain":
      return {
        id: UUID(),
        type: "",
      };
  }
};
