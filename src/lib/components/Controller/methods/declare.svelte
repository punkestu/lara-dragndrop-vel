<script>
  import { Add as AddIcon } from "carbon-icons-svelte";
  import Chain from "../chain.svelte";
  export let chain;
</script>

{#each chain.chain || [] as _chain (_chain.id)}
  <Chain
    bind:chain={_chain}
    onDelete={() => {
      chain.chain = chain.chain.filter((cChain) => cChain.id != _chain.id);
    }}
  />
{/each}
<button
  class="flex justify-center w-full bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
  on:click={() =>
    (chain.chain = [
      ...(chain.chain || []),
      {
        id: chain.chain[chain.chain.length - 1]
          ? chain.chain[chain.chain.length - 1].id + 1
          : 0,
      },
    ])}><AddIcon /></button
>
