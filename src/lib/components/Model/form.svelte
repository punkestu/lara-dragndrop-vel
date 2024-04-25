<script>
  import { metadata } from "../../store/metadata";
  import { onMount } from "svelte";
  import Column from "./column.svelte";
  import Movable from "../movable.svelte";
  import {
    Add as AddIcon,
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";
  import { utilFactory } from "../../factory/utilFactory";

  export let model;

  onMount(() => {
    model.columns = model.columns || [];
  });

  let hide = false;
  const deleteModel = () =>
    confirm("Are you sure you want to delete this model?") &&
    ($metadata = $metadata.filter((cMeta) => cMeta.id !== model.id));
  const addColumn = () => {
    model.columns = [...model.columns, utilFactory("column")];
    hide = false;
  };
  const deleteColumn = (id) => {
    model.columns = model.columns.filter((cColumn) => cColumn.id !== id);
  };
  const toggleVisibility = () => (hide = !hide);
</script>

<Movable bind:position={model.position} class="bg-blue-600">
  <aside class="p-4 ps-2 flex flex-col gap-2">
    <div>
      <input
        type="text"
        placeholder="Model name"
        bind:value={model.name}
        class="bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-4 focus:border-black duration-300 outline-none placeholder:text-slate-400 text-white focus:px-2 py-1"
      />
    </div>
    <div>
      <button
        class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
        type="button"
        on:click={deleteModel}><DeleteIcon /></button
      >
      <button
        class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
        type="button"
        on:click={addColumn}><AddIcon /></button
      >
      {#if model.columns && model.columns.length > 0}
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
      {#each model.columns || [] as column (column.id)}
        <Column bind:column onDeleteColumn={() => deleteColumn(column.id)} />
      {/each}
    {/if}
  </aside>
</Movable>
