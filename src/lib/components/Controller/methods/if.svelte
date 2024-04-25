<script>
  import { Add as AddIcon } from "carbon-icons-svelte";
  import Chain from "../chain.svelte";
  import Button from "../../ui/button.svelte";
  import { utilFactory } from "../../../factory/utilFactory";

  export let chain;

  const deleteValidChain = (index, id) => {
    chain.validChain[index] = chain.validChain[index].filter(
      (cChain) => cChain.id != id
    );
  };
  const addValidChain = (index) => {
    chain.validChain[index] = [
      ...chain.validChain[index],
      utilFactory("chain"),
    ];
  };
</script>

{#if chain.type === "if"}
  <input type="text" bind:value={chain.condition} placeholder="Condition" />
{/if}
{#if chain.type === "if"}
  <div class="flex flex-col gap-2">
    {#each chain.validChain[0] as validChain (validChain.id)}
      <Chain
        bind:chain={validChain}
        onDelete={() => deleteValidChain(0, validChain.id)}
      />
    {/each}
    <Button class="flex w-full justify-center" onclick={addValidChain}
      ><AddIcon /></Button
    >
    <p class="text-white">else</p>
    {#each chain.validChain[chain.validChain.length - 1] as validChain (validChain.id)}
      <Chain
        bind:chain={validChain}
        onDelete={() =>
          deleteValidChain(chain.validChain.length - 1, validChain.id)}
      />
    {/each}
    <Button
      class="flex w-full justify-center"
      onclick={() => {
        chain.validChain =
          chain.validChain.length > 1
            ? chain.validChain
            : [...chain.validChain, []];
        addValidChain(chain.validChain.length - 1);
      }}><AddIcon /></Button
    >
  </div>
{/if}
