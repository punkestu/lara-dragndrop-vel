<script>
  import { onMount } from "svelte";
  export let position = { x: 0, y: 0 };

  let className = "";
  export { className as class };

  onMount(() => {
    card.style.top = position.x;
    card.style.left = position.y;
  });

  let newX = 0,
    newY = 0,
    startX = 0,
    startY = 0;
  let card;
  const onMouseDown = (e) => {
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  function mouseMove(e) {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    if (card.offsetTop - newY < 0 || card.offsetLeft - newX < 0) return;
    card.style.top = card.offsetTop - newY + "px";
    card.style.left = card.offsetLeft - newX + "px";
    position = { x: card.style.top, y: card.style.left };
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
  }
</script>

<div
  class={`absolute min-w-96 flex gap-2 drop-shadow-lg shadow-black ${className}`}
  bind:this={card}
>
  <button
    class="w-10 bg-gray-200 hover:bg-gray-400 duration-300"
    on:mousedown={onMouseDown}
  ></button>
  <slot />
</div>
