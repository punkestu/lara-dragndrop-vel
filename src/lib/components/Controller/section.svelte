<script>
  import Form from "./form.svelte";
  import { controllers } from "../../store/metadata";
</script>

{#each $controllers as controller (controller.id)}
  <Form bind:controller />
{/each}
