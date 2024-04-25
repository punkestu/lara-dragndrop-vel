<script>
  import { models } from "../../store/metadata";
  import { onMount } from "svelte";
  import Column from "./column.svelte";
  import Movable from "../movable.svelte";
  import {
    Add as AddIcon,
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";
  export let model;

  onMount(() => {
    model.columns = model.columns || [];
    // console.log(model.cardPosition);
  });

  const deleteModel = () =>
    ($models = $models.filter((cModel) => cModel.id !== model.id));
  const addColumn = () => {
    model.columns = [
      ...model.columns,
      {
        id: model.columns[model.columns.length - 1]
          ? model.columns[model.columns.length - 1].id + 1
          : 0,
      },
    ];
    hide = false;
  };
  const deleteColumn = (id) => {
    model.columns = model.columns.filter((cColumn) => cColumn.id !== id);
  };
  let hide = false;
  const toggleVisibility = () => (hide = !hide);
</script>

<Movable bind:position={model.cardPosition} class="bg-blue-600">
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
        on:click={() => {
          confirm("Are you sure you want to delete this model?") &&
            deleteModel();
        }}><DeleteIcon /></button
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
