<script>
  import { models } from "../../store/metadata";
  import { Types } from "./const";
  import {
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";

  export let column;
  export let onDeleteColumn;

  const clearColumn = (column) => {
    if (column.type === "string") {
      column.length = column.length === undefined ? 255 : column.length;
    } else {
      column.length = undefined;
    }
    if (column.type === "foreignId") {
      column.relation = column.relation || "";
    } else {
      column.relation = undefined;
    }
  };

  $: clearColumn(column);
  let hide = false;
  const toggleVisibility = () => (hide = !hide);
</script>

<div class="w-full flex gap-1">
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
  <button
    class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
    type="button"
    on:click={onDeleteColumn}><DeleteIcon /></button
  >
  <input
    type="text"
    placeholder="Column name"
    class="px-1"
    bind:value={column.name}
  />
  {#if !hide}
    <select bind:value={column.type}>
      {#each Types as type}
        <option value={type}>{type.toUpperCase()}</option>
      {/each}
    </select>
    {#if column.type === "string"}
      <input
        class="px-1"
        type="number"
        placeholder="Length"
        bind:value={column.length}
      />
    {/if}
    {#if column.type === "foreignId"}
      <select bind:value={column.relation}>
        <option value="">Select a model</option>
        {#each $models as cModel (cModel.id)}
          <option value={cModel.name}>{cModel.name || "no-name"}</option>
        {/each}
      </select>
    {/if}
    <label class="flex gap-1 items-center text-slate-50">
      <input type="checkbox" bind:checked={column.nullable} />
      Nullable
    </label>
    {#if column.nullable}
      <input
        class="px-1"
        type="text"
        placeholder="Default value"
        bind:value={column.default}
      />
    {/if}
  {/if}
</div>
