<script>
  import { onMount } from "svelte";
  import { zoomLevel, panning } from "../store/global";
  export let position;

  let className = "";
  export { className as class };

  onMount(() => {
    card.style.top = position ? position.x : 0;
    card.style.left = position ? position.y : 0;
  });

  let newX = 0,
    newY = 0,
    startX = 0,
    startY = 0;
  let card;
  const onMouseDown = (e) => {
    $panning = false;
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  function mouseMove(e) {
    newX = (startX - e.clientX) * (1 / $zoomLevel);
    newY = (startY - e.clientY) * (1 / $zoomLevel);

    startX = e.clientX;
    startY = e.clientY;

    // if (card.offsetTop - newY < 0 || card.offsetLeft - newX < 0) return;
    card.style.top = card.offsetTop - newY + "px";
    card.style.left = card.offsetLeft - newX + "px";
    position = { x: card.style.top, y: card.style.left };
  }

  function mouseUp() {
    $panning = true;
    document.removeEventListener("mousemove", mouseMove);
  }
</script>

<div
  class={`absolute min-w-96 flex gap-2 shadow-[0_0_15px_-5px_rgba(0,0,0,0.3)] shadow-black ${className}`}
  bind:this={card}
>
  <button
    class="w-10 bg-gray-200 hover:bg-gray-400 duration-300"
    on:mousedown={onMouseDown}
  ></button>
  <slot />
</div>
