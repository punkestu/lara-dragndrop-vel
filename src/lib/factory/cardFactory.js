import { v4 as UUID } from "uuid";

export const cardFactory = (type, position) => {
  switch (type) {
    case "model":
      return {
        ty: "model",
        id: UUID(),
        position: [...position],
        columns: [],
      };
    case "controller":
      return {
        ty: "controller",
        id: UUID(),
        position: [...position],
        methods: [],
      };
    case "route":
      return {
        ty: "route",
        id: UUID(),
        position: [...position],
        middlewares: [],
      };
  }
};
