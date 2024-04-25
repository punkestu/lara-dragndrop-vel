<script>
  import Movable from "../movable.svelte";
  import {
    Add as AddIcon,
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";
  import { metadata } from "../../store/metadata";
  import { httpMethods } from "./const";
  import Button from "../ui/button.svelte";
  import Dropdown from "../ui/dropdown.svelte";

  export let route;

  const deleteRoute = () =>
    confirm("Are you sure you want to delete this route?") &&
    ($metadata = $metadata.filter((cMeta) => cMeta.id !== route.id));
  let hide = false;
  const toggleVisibility = () => (hide = !hide);

  $: route.method = route.controller && (route.method || "");
  $: selectedController = $metadata.find(
    (meta) => meta.ty === "controller" && meta.name === route.controller
  );
  $: controllers = $metadata.filter((meta) => meta.ty === "controller");
</script>

<Movable bind:position={route.position} class="bg-white">
  <aside class="p-4 ps-2 flex flex-col gap-2">
    <div>
      <input
        type="text"
        placeholder="Route Path"
        bind:value={route.path}
        class="bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-4 focus:border-black duration-300 outline-none placeholder:text-slate-400 focus:px-2 py-1"
      />
      <Dropdown bind:value={route.httpMethod} placeholder="Method">
        {#each httpMethods as meth}
          <option value={meth}>{meth.toUpperCase()}</option>
        {/each}
      </Dropdown>
      <label>
        <input type="checkbox" bind:checked={route.api} />
        API
      </label>
    </div>
    <div>
      <Button onclick={deleteRoute}><DeleteIcon /></Button>
      <Button onclick={toggleVisibility}
        >{#if hide}
          <ViewIcon />
        {:else}
          <ViewOffIcon />
        {/if}</Button
      >
    </div>
    {#if !hide}
      <Button onclick={() => {}} class="w-full flex justify-center items-center"
        ><AddIcon /> Middleware</Button
      >
      <div>
        <Dropdown bind:value={route.controller} placeholder="Select Controller">
          {#each controllers as controller}
            {#if controller.name}
              <option value={controller.name}>{controller.name}</option>
            {/if}
          {/each}
        </Dropdown>
        <Dropdown
          bind:value={route.method}
          placeholder={selectedController &&
          selectedController.methods &&
          selectedController.methods.length > 0
            ? "Select Method"
            : "No Method"}
        >
          {#if selectedController && selectedController.methods && selectedController.methods.length > 0}
            {#each selectedController.methods as method}
              {#if method.name}
                <option value={method.name}>{method.name}</option>
              {/if}
            {/each}
          {/if}
        </Dropdown>
      </div>
    {/if}
  </aside>
</Movable>
