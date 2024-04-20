<!-- <script>
  import { modal } from "../store/global";
  import MethodChainModal from "./Controller/methodModal.svelte";
</script>

{#if $modal !== null}
  <section class="w-screen h-screen fixed top-0 left-0 z-40 flex items-center justify-center">
    <button
      class="bg-slate-900 bg-opacity-45 w-full h-full fixed top-0 left-0 z-40"
      on:click={() => ($modal = null)}
      tabindex="0"
    ></button>
    {#if $modal.name === "method-chain"}
      <MethodChainModal {...($modal.params || [])}></MethodChainModal>        
    {/if}
  </section>
{/if} -->
