<script>
  import { metadata } from "../../store/metadata";
  import Button from "../ui/button.svelte";
  import { Types } from "./const";
  import {
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";

  export let column;
  export let onDeleteColumn;

  let hide = false;

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
  const toggleVisibility = () => (hide = !hide);

  $: clearColumn(column);
  $: models = $metadata.filter((meta) => meta.ty === "model");
</script>

<div class="w-full flex gap-1">
  <Button onclick={toggleVisibility}
    >{#if hide}
      <ViewIcon />
    {:else}
      <ViewOffIcon />
    {/if}</Button
  >
  <Button onclick={onDeleteColumn}><DeleteIcon /></Button>
  <input
    type="text"
    placeholder="Column name"
    class="px-1"
    bind:value={column.name}
  />
  {#if !hide}
    <select bind:value={column.type}>
      <option value="">Select Type</option>
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
        {#each models as cModel (cModel.id)}
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
