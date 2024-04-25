<script>
  import { Add as AddIcon } from "carbon-icons-svelte";
  import Chain from "../chain.svelte";
  import { utilFactory } from "../../../factory/utilFactory";
  import Button from "../../ui/button.svelte";
  export let chain;

  const deleteChain = (id) => {
    chain.chain = chain.chain.filter((cChain) => cChain.id != id);
  };
  const addChain = () => {
    chain.chain = [...(chain.chain || []), utilFactory("chain")];
  };
</script>

{#each chain.chain || [] as _chain (_chain.id)}
  <Chain bind:chain={_chain} onDelete={() => deleteChain(_chain.id)} />
{/each}
<Button class="w-full flex justify-center" onclick={addChain}><AddIcon /></Button>
