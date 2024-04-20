<script>
  import { onMount } from "svelte";
  import Chain from "./chain.svelte";
  import {
    Add as AddIcon,
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";

  export let method;
  export let onDelete;

  onMount(() => {
    method.chain = method.chain || [];
  });

  let hide = false;
  const toggleVisibility = () => (hide = !hide);
</script>

<div class="w-full flex flex-col gap-2 bg-red-400 p-2">
  <div class="flex gap-2">
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
      on:click={onDelete}><DeleteIcon /></button
    >
    <input
      type="text"
      placeholder="Method name"
      bind:value={method.name}
      class="bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:border-b-4 focus:border-black duration-300 outline-none placeholder:text-slate-700 text-slate-950 focus:px-2 py-1"
    />
  </div>
  {#if !hide}
    {#each method.chain as chain (chain.id)}
      <Chain
        {chain}
        onDelete={() =>
          (method.chain = method.chain.filter(
            (cChain) => cChain.id !== chain.id
          ))}
      />
    {/each}
    <button
      class="flex justify-center bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
      on:click={() =>
        (method.chain = [...method.chain, { id: method.chain.length }])}
      ><AddIcon /></button
    >
  {/if}
</div>
