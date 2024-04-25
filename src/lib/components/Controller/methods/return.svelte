<script>
  import { Add as AddIcon, Delete as DeleteIcon } from "carbon-icons-svelte";
  import { models } from "../../../store/metadata";
  export let chain;

  $: selectedModel = $models.find((model) => model.name === chain.model);
</script>

<div class="flex">
  <select bind:value={chain.returnType}>
    <option value="expression">Expression</option>
    <option value="model">Model</option>
    <option value="response">Response</option>
  </select>
  {#if chain.returnType === "expression"}
    <input
      type="text"
      bind:value={chain.returnValue}
      placeholder="Expression"
    />
  {/if}
  {#if chain.returnType === "model"}
    <select bind:value={chain.model}>
      {#if $models && $models.filter((model) => model.name).length === 0}
        <option value="">No Models</option>
      {:else}
        <option value="">Select Model</option>
      {/if}
      {#each $models as model}
        {#if model.name}
          <option value={model.name}>{model.name}</option>
        {/if}
      {/each}
    </select>
    {#if chain.model}
      <select bind:value={chain.modelOps}>
        <option value="">Select Model Operation</option>
        <option value="find">Find</option>
        <option value="all">Get All</option>
        <option value="where">Where</option>
      </select>
    {/if}
  {/if}
  {#if chain.returnType === "response"}
    <input type="text" bind:value={chain.status} placeholder="Status Code" />
    <input
      type="text"
      bind:value={chain.returnValue}
      placeholder="Expression"
    />
    <label class="flex">
      <input type="checkbox" bind:checked={chain.useWith} />
      with
    </label>
  {/if}
</div>
{#if chain.returnType === "model" && chain.model}
  {#if chain.modelOps === "find"}
    <input type="text" bind:value={chain.indexValue} placeholder="Index Value" class="mt-1">
  {/if}
  {#if chain.modelOps === "where"}
    <div class="flex flex-col gap-1 my-1">
      {#each chain.where || [] as where (where.id)}
        <div class="flex gap-1">
          {#if where.connection}
            <select bind:value={where.connection}>
              <option value="and">AND</option>
              <option value="or">OR</option>
            </select>
          {/if}
          <select bind:value={where.field} class="flex-grow">
            <option value="">Select column</option>
            {#each selectedModel.columns as column}
              {#if column.name}
                <option value={column.name}>{column.name}</option>
              {/if}
            {/each}
          </select>
          <input
            type="text"
            bind:value={where.operator}
            placeholder="Operator"
          />
          <input
            type="text"
            bind:value={where.value}
            placeholder="Value"
          />
          <button
            class="flex justify-center bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
            on:click={() =>
              (chain.where = chain.where.filter((w) => w.id !== where.id))}
            ><DeleteIcon /></button
          >
        </div>
      {/each}
    </div>
    <button
      class="w-full flex justify-center bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
      on:click={() => {
        chain.where = [
          ...(chain.where || []),
          {
            id:
              chain.where && chain.where[chain.where.length - 1]
                ? chain.where[chain.where.length - 1].id + 1
                : 0,
            connection: chain.where && chain.where.length > 0 ? "and" : undefined,
          },
        ];
      }}><AddIcon /></button
    >
  {/if}
{/if}
{#if chain.returnType === "response"}
  {#if chain.useWith}
    <div class="flex flex-col gap-1 mt-1">
      {#each chain.session || [] as session (session.id)}
        <div class="flex gap-1 w-full">
          <input
            type="text"
            class="flex-grow"
            bind:value={session.content}
            placeholder="name: session value"
          />
          <button
            class="flex justify-center bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
            on:click={() =>
              (chain.session = chain.session.filter(
                (sess) => sess.id !== session.id
              ))}><DeleteIcon /></button
          >
        </div>
      {/each}
    </div>
    <button
      class="mt-2 flex justify-center w-full bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
      type="button"
      on:click={() =>
        (chain.session = [
          ...(chain.session || []),
          {
            id: chain.session[chain.session.length - 1]
              ? chain.session[chain.session.length - 1].id + 1
              : 0,
          },
        ])}><AddIcon /></button
    >
  {/if}
{/if}
