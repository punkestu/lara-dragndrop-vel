<script>
  import { Add as AddIcon, Delete as DeleteIcon } from "carbon-icons-svelte";
  import { models } from "../../../store/metadata";
  export let chain;
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
      {#if $models && $models.length === 0}
        <option value="">No Models</option>
      {/if}
      {#each $models as model}
        <option value={model.name}>{model.name}</option>
      {/each}
    </select>
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
