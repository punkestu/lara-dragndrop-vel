<script>
  import { metadata } from "../store/metadata";
  import { generateMetadataJSON, compressObject } from "../functions";
  export let name;
  export let downloader;
</script>

<a
  bind:this={downloader}
  href={"data:plain/text;charset=utf-8," +
    encodeURIComponent(
      compressObject(
        generateMetadataJSON(JSON.parse(JSON.stringify($metadata)))
      )
    )}
  download={`${name}.dnd`}
  class="hidden">download</a
>
