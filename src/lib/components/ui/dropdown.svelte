<script>
  export let value;
  export let placeholder = "";
  let className = "";
  export { className as class };
</script>

<select bind:value class={className}>
  <option value="">{placeholder}</option>
  <slot />
</select>
