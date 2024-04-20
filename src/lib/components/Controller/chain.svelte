<script>
  import { onMount } from "svelte";
  import {
    Delete as DeleteIcon,
    View as ViewIcon,
    ViewOff as ViewOffIcon,
  } from "carbon-icons-svelte";
  import Declare from "./methods/declare.svelte";
  import Return from "./methods/return.svelte";
  import If from "./methods/if.svelte";

  export let chain;
  export let onDelete;

  onMount(() => {
    chain.session = chain.session || [];
  });

  $: (() => {
    if (chain.type === "if") {
      chain.validChain = chain.validChain || [[], []];
    } else {
      chain.validChain = undefined;
    }
    if (chain.type === "declare") {
      chain.chain = chain.chain || [];
    } else {
      chain.chain = undefined;
    }
  })();

  let hide = false;
  const toggleVisibility = () => (hide = !hide);
</script>

<div class="p-2 ps-4 border">
  <div class="flex gap-2">
    <select bind:value={chain.type}>
      <option value="declare">Declare</option>
      <option value="return">Return</option>
      <option value="if">If</option>
    </select>
    <button
      class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
      on:click={toggleVisibility}
      >{#if hide}
        <ViewIcon />
      {:else}
        <ViewOffIcon />
      {/if}</button
    >
    <button
      class="bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
      on:click={onDelete}><DeleteIcon /></button
    >
    {#if chain.type === "declare"}
      <input
        type="text"
        bind:value={chain.variableName}
        placeholder="Variable name"
      />
    {/if}
  </div>
  {#if !hide}
    <div class="mt-2">
      {#if chain.type === "declare"}
        <Declare bind:chain />
      {/if}
      {#if chain.type === "return"}
        <Return bind:chain />
      {/if}
      {#if chain.type === "if"}
        <If bind:chain />
      {/if}
    </div>
  {/if}
</div>
