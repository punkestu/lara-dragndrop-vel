<script>
  import { metadata } from "../store/metadata";
  import ModelForm from "./Model/form.svelte";
  import ControllerForm from "./Controller/form.svelte";
  import RouteForm from "./Route/form.svelte";
</script>

{#each $metadata as meta (meta.id)}
  {#if meta.ty === "model"}
    <ModelForm bind:model={meta} />
  {:else if meta.ty === "controller"}
    <ControllerForm bind:controller={meta} />
  {:else if meta.ty === "route"}
    <RouteForm bind:route={meta} />
  {/if}
{/each}
