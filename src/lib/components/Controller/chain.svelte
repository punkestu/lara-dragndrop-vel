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
  import { chainCmd } from "./const";
  import Button from "../ui/button.svelte";

  export let chain;
  export let onDelete;

  onMount(() => {
    chain.session = chain.session || [];
  });

  let hide = false;
  const toggleVisibility = () => (hide = !hide);
  const cmdTrigger = () => {
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
  };

  $: cmdTrigger();
</script>

<div class="p-2 ps-4 border">
  <div class="flex gap-2">
    <select bind:value={chain.type}>
      <option value="">Select Command</option>
      {#each chainCmd as cmd}
        <option value={cmd}>{cmd.toUpperCase()}</option>
      {/each}
    </select>
    <Button onclick={toggleVisibility}>
      {#if hide}
        <ViewIcon />
      {:else}
        <ViewOffIcon />
      {/if}
    </Button>
    <Button onclick={onDelete}>
      <DeleteIcon />
    </Button>
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
      <!-- {#if chain.type === "if"}
        <If bind:chain />
      {/if} -->
    </div>
  {/if}
</div>
