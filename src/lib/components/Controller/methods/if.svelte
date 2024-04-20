<script>
  import { Add as AddIcon } from "carbon-icons-svelte";
  import Chain from "../chain.svelte";

  export let chain;
</script>

{#if chain.type === "if"}
  <input type="text" bind:value={chain.condition} placeholder="Condition" />
{/if}
{#if chain.type === "if"}
  <div class="flex flex-col gap-2">
    {#each chain.validChain[0] as validChain (validChain.id)}
      <Chain
        bind:chain={validChain}
        onDelete={() => {
          chain.validChain[0] = chain.validChain[0].filter(
            (cChain) => cChain.id != validChain.id
          );
        }}
      />
    {/each}
    <button
      class="flex w-full justify-center bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
      on:click={() =>
        (chain.validChain[0] = [
          ...chain.validChain[0],
          {
            id: chain.validChain[0][chain.validChain[0].length - 1]
              ? chain.validChain[0][chain.validChain[0].length - 1] + 1
              : 0,
          },
        ])}><AddIcon /></button
    >
    <p class="text-white">else</p>
    {#each chain.validChain[chain.validChain.length - 1] as validChain (validChain.id)}
      <Chain
        bind:chain={validChain}
        onDelete={() => {
          chain.validChain[chain.validChain.length - 1] =
            chain.validChain[1].filter((cChain) => cChain.id != validChain.id);
        }}
      />
    {/each}
    <button
      class="flex w-full justify-center bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300"
      on:click={() =>
        (chain.validChain[chain.validChain.length - 1] = [
          ...chain.validChain[chain.validChain.length - 1],
          {
            id: chain.validChain[chain.validChain.length - 1][
              chain.validChain[chain.validChain.length - 1].length - 1
            ]
              ? chain.validChain[chain.validChain.length - 1][
                  chain.validChain[chain.validChain.length - 1].length - 1
                ] + 1
              : 0,
          },
        ])}><AddIcon /></button
    >
  </div>
{/if}
