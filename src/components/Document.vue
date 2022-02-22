<template>
  <Suspense>
    <component :is="customDocument" />
  </Suspense>
</template>

<script>
import { defineAsyncComponent } from "vue/dist/vue.esm-bundler.js";
import { getDocumentFromDTSApi } from "@/api/document";

export default {
  name: "Document",

  props: ["id"],

  async setup(props) {
    const customDocument = defineAsyncComponent(async () => {
      // fetch the initial template
      const data = await getDocumentFromDTSApi(props.id);
      // build a temporary dom just to ease the navigation inside the document
      let tmpDom = document.createElement("div");
      tmpDom.innerHTML = data;

      const toc = tmpDom.querySelector("#aside");

      const tocAreaDest = document.querySelector("#toc-area");
      if (tocAreaDest.firstChild) tocAreaDest.removeChild(tocAreaDest.firstChild);
      tocAreaDest.appendChild(toc);

      const tocAsideDest = document.querySelector("#toc-area-aside");
      if (tocAsideDest.firstChild) tocAsideDest.removeChild(tocAsideDest.firstChild);
      tocAsideDest.appendChild(toc.cloneNode(true));

      // return what will make the async component
      return new Promise((resolve) => {
        resolve({
          template: tmpDom.innerHTML,
        });
      });
    });
    return {
      customDocument,
    };
  },
};
</script>

<style src="../assets/css/html.css" id="document-html-css">
header {
  clear: both;
  padding: 1ex;
  border: dashed #ccc 1px;
  -webkit-border-radius: 1ex;
  -moz-border-radius: 1ex;
  border-radius: 1ex;
}


</style>
<style src="../assets/css/postprod.css"></style>
<style src="../assets/css/miroir.css"></style>
