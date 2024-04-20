<script>
  import ModelSection from "./lib/components/Model/section.svelte";
  import ControllerSection from "./lib/components/Controller/section.svelte";
  import { models, controllers } from "./lib/store/metadata";
  import Modal from "./lib/components/modal.svelte";

  const addModel = () => {
    $models = [
      ...$models,
      {
        id: $models[$models.length - 1]
          ? $models[$models.length - 1].id + 1
          : 0,
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
</script>

<a
  bind:this={downloader}
  href={"data:application/json;charset=utf-8," +
    encodeURIComponent(
      JSON.stringify({ models: $models, controllers: $controllers })
    )}
  download={"metadata.json"}
  class="hidden">download</a
>

<Modal></Modal>
<main>
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
  <section class="relative h-[calc(100vh-2rem)] overflow-auto">
    <ModelSection />
    <ControllerSection />
  </section>
</main>
