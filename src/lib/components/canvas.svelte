<script>
  import { zoomLevel, origin, panning } from "../store/global";
  import Cards from "./cards.svelte";

  let content;
  let lastX, lastY;
  let netral;

  function zoom(deltaY) {
    $zoomLevel += deltaY * -0.0001;
    $zoomLevel = Math.min(Math.max(0.125, $zoomLevel), 4);
    if (content) {
      content.style.transform = `scale(${$zoomLevel}) translate(${$origin[0]}px, ${$origin[1]}px)`;
    }
  }

  window.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
      zoom(e.deltaY);
    },
    { passive: false }
  );

  function onMouseDown(e) {
    netral.focus();
    if ($panning) {
      e.preventDefault();
      lastX = e.clientX;
      lastY = e.clientY;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  }
  function onMouseMove(e) {
    $origin = [
      $origin[0] + (e.clientX - lastX) / $zoomLevel,
      $origin[1] + (e.clientY - lastY) / $zoomLevel,
    ];
    content.style.transform = `scale(${$zoomLevel}) translate(${$origin[0]}px, ${$origin[1]}px)`;
    lastX = e.clientX;
    lastY = e.clientY;
  }
  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
</script>

<input type="text" class="w-0 h-0 absolute" bind:this={netral} />
<section class="relative h-[calc(100vh-4rem)] overflow-hidden">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <section
    class="absolute top-0 left-0 w-full h-full"
    on:mousedown={onMouseDown}
  ></section>
  <section bind:this={content}>
    <Cards />
  </section>
</section>
