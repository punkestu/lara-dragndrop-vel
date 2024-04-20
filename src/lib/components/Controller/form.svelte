<script>
  import { onMount } from "svelte";
  import { controllers } from "../../store/metadata";
  import Movable from "../movable.svelte";
  import Method from "./method.svelte";
  import {
    Add as AddIcon,
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";
  export let controller;

  onMount(() => {
    controller.methods = controller.methods || [];
  });

  const deleteController = () =>
    ($controllers = $controllers.filter(
      (cController) => cController.id !== controller.id
    ));
  const addMethod = () => {
    controller.methods = [
      ...controller.methods,
      {
        id: controller.methods[controller.methods.length - 1]
          ? controller.methods[controller.methods.length - 1].id + 1
          : 0,
        chain: [],
      },
    ];
    hide = false;
  };
  const deleteMethod = (id) => {
    controller.methods = controller.methods.filter(
      (cMethod) => cMethod.id !== id
    );
  };
  let hide = false;
  const toggleVisibility = () => (hide = !hide);
</script>

<Movable bind:position={controller.cardPosition} class="bg-red-600">
  <aside class="p-4 ps-2 flex flex-col gap-2">
    <div>
      <input
        type="text"
        placeholder="Controller name"
        bind:value={controller.name}
        class="bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-4 focus:border-black duration-300 outline-none placeholder:text-slate-400 text-white focus:px-2 py-1"
      />
    </div>
    <div>
      <button
        class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
        type="button"
        on:click={() => {
          confirm("Are you sure you want to delete this controller?") &&
            deleteController();
        }}><DeleteIcon /></button
      >
      <button
        class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
        type="button"
        on:click={addMethod}><AddIcon /></button
      >
      {#if controller.methods && controller.methods.length > 0}
        <button
          class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
          type="button"
          on:click={toggleVisibility}
          >{#if hide}
            <ViewIcon />
          {:else}
            <ViewOffIcon />
          {/if}</button
        >
      {/if}
    </div>
    {#if !hide}
      {#each controller.methods || [] as method (method.id)}
        <Method {method} onDelete={() => deleteMethod(method.id)} />
      {/each}
    {/if}
  </aside>
</Movable>
