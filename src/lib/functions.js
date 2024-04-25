import {
  compressSync,
  strToU8,
  // decompressSync,
  // strFromU8
} from "fflate";

export const negateCoord = (coord) => {
  return [coord[0] * -1, coord[1] * -1];
};

export const coordArr2Obj = (coordArr) => {
  return { x: coordArr[0], y: coordArr[1] };
};

export const generateMetadataJSON = (metadata) => {
  metadata = metadata.reduce(
    (acc, curr) => {
      if (curr.ty === "model") {
        curr.ty = undefined;
        curr.position = undefined;
        acc.models.push(curr);
      } else if (curr.ty === "controller") {
        curr.ty = undefined;
        curr.position = undefined;
        acc.controllers.push(curr);
      } else if (curr.ty === "route") {
        curr.ty = undefined;
        curr.position = undefined;
        acc.routes.push(curr);
      }
      return acc;
    },
    {
      models: [],
      controllers: [],
      routes: [],
    }
  );
};

export const compressObject = (obj) => {
  try {
    const jsonString = JSON.stringify(obj);
    const compressedData = compressSync(strToU8(jsonString), {
      level: 9,
    });
    const base64String = btoa(String.fromCharCode.apply(null, compressedData));
    return base64String;
  } catch (error) {
    console.error("Error compressing object:", error);
    return null;
  }
};

// function decompressObject(compressedBase64) {
//   try {
//     const compressedData = new Uint8Array(
//       atob(compressedBase64)
//         .split("")
//         .map((char) => char.charCodeAt(0))
//     );
//     const decompressedData = decompressSync(compressedData);
//     const jsonString = strFromU8(decompressedData);
//     return JSON.parse(jsonString);
//   } catch (error) {
//     console.error("Error decompressing object:", error);
//     return null;
//   }
// }
