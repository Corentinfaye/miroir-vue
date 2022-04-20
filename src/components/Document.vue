<template>
  <Suspence>
    <div v-html="tmpDom.innerHTML" />
  </Suspence>
</template>

<script>
import { inject } from "vue";
//import { defineAsyncComponent } from "vue/dist/vue.esm-bundler.js";
import { getDocumentFromDTSApi } from "@/api/document";

export default {
  name: "Document",

  props: ["id"],

  async setup(props) {
    const layout = inject("variable-layout");
    var teamsearch = layout.rawSearchedTerm;

    //const customDocument = defineAsyncComponent(async () => {
    
    //});


  // fetch the initial template
      let data;
      data = await getDocumentFromDTSApi(props.id);
      console.log("Coucou")
      // build a temporary dom just to ease the navigation inside the document
      let tmpDom = document.createElement("div");
      tmpDom.innerHTML = data;
      if(teamsearch.value != "") {
        if (teamsearch.value.includes("+")){
          for(let word of teamsearch.value.split('+')){
            if (word.includes('*')){
              let regex = new RegExp(word+'\\w+')
              tmpDom.innerHTML = tmpDom.innerHTML.replaceAll(regex, ` <span class="highlight">${regex}</span> `)
            } else {
              tmpDom.innerHTML = tmpDom.innerHTML.replaceAll(` ${word} `, ` <span class="highlight">${word}</span> `)
            }
          }
        } else {
          tmpDom.innerHTML = tmpDom.innerHTML.replaceAll(` ${teamsearch.value} `, ` <span class="highlight">${teamsearch.value}</span> `)
        }

      }
      const toc = tmpDom.querySelector("#aside");

      const tocAreaDest = document.querySelector("#toc-area");
      if (tocAreaDest.firstChild) tocAreaDest.removeChild(tocAreaDest.firstChild);
      tocAreaDest.appendChild(toc);

      const tocAsideDest = document.querySelector("#toc-area-aside");
      if (tocAsideDest.firstChild) tocAsideDest.removeChild(tocAsideDest.firstChild);
      tocAsideDest.appendChild(toc.cloneNode(true));

      // return what will make the async component
      console.log(tmpDom.innerHTML.length)
      
    return {
      tmpDom,
    };
  },
};
</script>

<style src="../assets/css/html.css" id="document-html-css"></style>
<style src="../assets/css/postprod.css"></style>
<style src="../assets/css/miroir.css"></style>
