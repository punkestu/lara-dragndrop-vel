<script>
  import { metadata } from "../store/metadata";
  import { origin } from "../store/global";
  import { cardFactory } from "../factory/cardFactory";
  import { negateCoord } from "../functions";
  import {
    Add as AddIcon,
    Download as DownloadIcon,
  } from "carbon-icons-svelte";
  import Downloader from "./downloader.svelte";

  let downloader;
  let projectName = "";

  const addModel = () => {
    $metadata = [...$metadata, cardFactory("model", negateCoord($origin))];
  };
  const addController = () => {
    $metadata = [...$metadata, cardFactory("controller", negateCoord($origin))];
  };
  const addRoute = () => {
    $metadata = [...$metadata, cardFactory("route", negateCoord($origin))];
  };
  const getMeta = () => {
    downloader.click();
  };
</script>

<Downloader bind:name={projectName} bind:downloader />
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
