<script>
  export let onclick;
  let className = "";
  export { className as class };
</script>

<button
  class={`bg-blue-300 text-slate-900 px-2 py-1 rounded-md hover:bg-blue-400 duration-300 ${className}`}
  type="button"
  on:click={onclick}><slot /></button
>
