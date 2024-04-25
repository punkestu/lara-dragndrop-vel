<script>
  import ModelSection from "./lib/components/Model/section.svelte";
  import ControllerSection from "./lib/components/Controller/section.svelte";
  import { models, controllers } from "./lib/store/metadata";
  import { zoomLevel, origin, panning } from "./lib/store/global";
  import Modal from "./lib/components/modal.svelte";

  import { compressSync, strToU8 } from "fflate";

  const addModel = () => {
    $models = [
      ...$models,
      {
        id: $models[$models.length - 1]
          ? $models[$models.length - 1].id + 1
          : 0,
        cardPosition: { x: $panning[0], y: $panning[1] },
      },
    ];
  };
  const addController = () => {
    $controllers = [
      ...$controllers,
      {
        id: $controllers[$controllers.length - 1]
          ? $controllers[$controllers.length - 1].id + 1
          : 0,
      },
    ];
  };
  let downloader;
  const getMeta = () => {
    downloader.click();
  };

  function compressObject(obj) {
    try {
      // Convert object to JSON string
      const jsonString = JSON.stringify(obj);

      // Compress the JSON string
      const compressedData = compressSync(strToU8(jsonString), {
        level: 9,
      });

      // Convert compressed data to base64
      const base64String = btoa(
        String.fromCharCode.apply(null, compressedData)
      );

      // Return the compressed data as a base64 string
      return base64String;
    } catch (error) {
      console.error("Error compressing object:", error);
      return null;
    }
  }

  // function decompressObject(compressedBase64) {
  //   try {
  //     // Convert base64 string to compressed Uint8Array
  //     const compressedData = new Uint8Array(
  //       atob(compressedBase64)
  //         .split("")
  //         .map((char) => char.charCodeAt(0))
  //     );

  //     // Decompress the data
  //     const decompressedData = decompressSync(compressedData);

  //     // Convert decompressed Uint8Array to JSON string
  //     const jsonString = strFromU8(decompressedData);

  //     // Parse JSON string to JavaScript object
  //     return JSON.parse(jsonString);
  //   } catch (error) {
  //     console.error("Error decompressing object:", error);
  //     return null;
  //   }
  // }

  let content;
  let netral;
  function zoom(deltaY) {
    $zoomLevel += deltaY * -0.0001;
    $zoomLevel = Math.min(Math.max(0.125, $zoomLevel), 4);
    if (content) {
      content.style.transform = `scale(${$zoomLevel}) translate(${$origin[0]}px, ${$origin[1]}px)`;
    }
  }

  window.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
      zoom(e.deltaY);
    },
    { passive: false }
  );

  let lastX, lastY;
  function onMouseDown(e) {
    netral.focus();
    if ($panning) {
      e.preventDefault();
      lastX = e.clientX;
      lastY = e.clientY;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  }
  function onMouseMove(e) {
    $origin = [
      $origin[0] + (e.clientX - lastX) / $zoomLevel,
      $origin[1] + (e.clientY - lastY) / $zoomLevel,
    ];
    content.style.transform = `scale(${$zoomLevel}) translate(${$origin[0]}px, ${$origin[1]}px)`;
    lastX = e.clientX;
    lastY = e.clientY;
  }
  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
</script>

<a
  bind:this={downloader}
  href={"data:application/json;charset=utf-8," +
    encodeURIComponent(
      compressObject({ models: $models, controllers: $controllers })
    )}
  download={"metadata.json"}
  class="hidden">download</a
>

<Modal></Modal>
<main>
  <input type="text" class="w-0 h-0 absolute" bind:this={netral} />
  <header class="w-full bg-blue-500 text-blue-500 flex gap-[1px] h-[2rem]">
    <button
      on:click={getMeta}
      class="bg-white px-2 py-1 hover:bg-slate-100 duration-300"
      >Get Metadata</button
    >
    <button
      on:click={addModel}
      class="bg-white px-2 py-1 hover:bg-slate-100 duration-300"
      >Add Model</button
    >
    <button
      on:click={addController}
      class="bg-white px-2 py-1 hover:bg-slate-100 duration-300"
      >Add Controller</button
    >
  </header>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <section class="relative h-[calc(100vh-2rem)] overflow-hidden">
    <section
      class="absolute w-full h-full"
      on:mousedown={onMouseDown}
    ></section>
    <section bind:this={content}>
      <ModelSection />
      <ControllerSection />
    </section>
  </section>
</main>
