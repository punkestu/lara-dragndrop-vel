<script>
  import Form from "./form.svelte";
  import { routes } from "../../store/metadata";
</script>

{#each $routes as route (route.id)}
  <Form bind:route />
{/each}
