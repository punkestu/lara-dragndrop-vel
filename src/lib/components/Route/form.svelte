<script>
  import Movable from "../movable.svelte";
  import {
    Add as AddIcon,
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";
  import { routes, controllers } from "../../store/metadata";

  export let route;

  const deleteModel = () =>
    ($routes = $routes.filter((cRoute) => cRoute.id !== route.id));
  let hide = false;
  const toggleVisibility = () => (hide = !hide);

  $: route.method = route.controller && (route.method || "");
  $: selectedController = $controllers.find(
    (controller) => controller.name === route.controller
  );
</script>

<Movable bind:position={route.cardPosition} class="bg-white">
  <aside class="p-4 ps-2 flex flex-col gap-2">
    <div>
      <input
        type="text"
        placeholder="Route Path"
        bind:value={route.path}
        class="bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-4 focus:border-black duration-300 outline-none placeholder:text-slate-400 focus:px-2 py-1"
      />
      <select bind:value={route.httpMethod}>
        <option value="">Method</option>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <label>
        <input type="checkbox" bind:checked={route.api} />
        API
      </label>
    </div>
    <div>
      <button
        class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
        type="button"
        on:click={() => {
          confirm("Are you sure you want to delete this route?") &&
            deleteModel();
        }}><DeleteIcon /></button
      >
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
    </div>
    {#if !hide}
      <button
        class="w-full flex justify-center items-center bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
        ><AddIcon />Add Middleware</button
      >
      <div>
        <select bind:value={route.controller}>
          <option value="">Select Controller</option>
          {#each $controllers as controller}
            {#if controller.name}
              <option value={controller.name}>{controller.name}</option>
            {/if}
          {/each}
        </select>
        <select bind:value={route.method}>
          {#if selectedController && selectedController.methods && selectedController.methods.length > 0}
            <option value="">Select Method</option>
            {#each selectedController.methods as method}
              {#if method}
                <option value={method.name}>{method.name}</option>
              {/if}
            {/each}
          {:else}
            <option value="">No Method</option>
          {/if}
        </select>
      </div>
    {/if}
  </aside>
</Movable>
