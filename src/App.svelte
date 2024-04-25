<script>
  import ModelSection from "./lib/components/Model/section.svelte";
  import ControllerSection from "./lib/components/Controller/section.svelte";
  import RouteSection from "./lib/components/Route/section.svelte";
  import { models, controllers, routes } from "./lib/store/metadata";
  import { zoomLevel, origin, panning } from "./lib/store/global";
  import Modal from "./lib/components/modal.svelte";
  import {
    Add as AddIcon,
    Download as DownloadIcon,
  } from "carbon-icons-svelte";
  import { compressSync, strToU8 } from "fflate";

  let clientWidth, clientHeight;
  const addModel = () => {
    $models = [
      ...$models,
      {
        id: $models[$models.length - 1]
          ? $models[$models.length - 1].id + 1
          : 0,
        cardPosition: {
          x: -$origin[0],
          y: -$origin[1],
        },
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
        cardPosition: { x: -$origin[0], y: -$origin[1] },
      },
    ];
  };
  const addRoute = () => {
    $routes = [
      ...$routes,
      {
        id: $routes[$routes.length - 1]
          ? $routes[$routes.length - 1].id + 1
          : 0,
        cardPosition: { x: -$origin[0], y: -$origin[1] },
      },
    ];
  };

  let downloader;
  let projectName = "";
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
  href={"data:plain/text;charset=utf-8," +
    encodeURIComponent(
      compressObject({
        models: $models,
        controllers: $controllers,
        routes: $routes,
      })
    )}
  download={`${projectName}.dnd`}
  class="hidden">download</a
>

<Modal></Modal>
<main>
  <input type="text" class="w-0 h-0 absolute" bind:this={netral} />
  <header class="w-full flex flex-col bg-blue-500 h-[4rem]">
    <input
      type="text"
      bind:value={projectName}
      class="text-center bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-black duration-300 outline-none placeholder:text-slate-700 p-2"
      placeholder="Project Name"
    />
    <div class="w-full text-blue-500 flex gap-[2px] h-[2rem]">
      <button
        on:click={getMeta}
        class="flex items-center bg-white px-2 py-1 hover:bg-slate-100 duration-300"
        ><DownloadIcon /> Metadata</button
      >
      <button
        on:click={addModel}
        class="flex items-center bg-white px-2 py-1 hover:bg-slate-100 duration-300"
        ><AddIcon />Model</button
      >
      <button
        on:click={addController}
        class="flex items-center bg-white px-2 py-1 hover:bg-slate-100 duration-300"
        ><AddIcon />Controller</button
      >
      <button
        on:click={addRoute}
        class="flex items-center bg-white px-2 py-1 hover:bg-slate-100 duration-300"
      >
        <AddIcon />Route
      </button>
    </div>
  </header>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <section class="relative h-[calc(100vh-4rem)] overflow-hidden">
    <section
      class="absolute w-full h-full"
      bind:clientWidth
      bind:clientHeight
      on:mousedown={onMouseDown}
    ></section>
    <section bind:this={content}>
      <ModelSection />
      <ControllerSection />
      <RouteSection />
    </section>
  </section>
</main>
