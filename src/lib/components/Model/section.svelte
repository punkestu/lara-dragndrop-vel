<script>
  import Form from "./form.svelte";
  import { models } from "../../store/metadata";
</script>

{#each $models as model (model.id)}
  <Form bind:model />
{/each}
