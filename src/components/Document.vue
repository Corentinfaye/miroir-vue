<template>
    <div v-html="tmpDom.innerHTML" />
</template>

<script>
import { inject } from 'vue'
// import { defineAsyncComponent } from "vue/dist/vue.esm-bundler.js";
import { getDocumentFromDTSApi } from '@/api/document'

export default {
  name: 'Document',

  props: ['id'],

  async setup (props) {
    const layout = inject('variable-layout')
    const teamsearch = layout.rawSearchedTerm

    // const customDocument = defineAsyncComponent(async () => {

    // });

    // fetch the initial template
    const data = await getDocumentFromDTSApi(props.id)
    // build a temporary dom just to ease the navigation inside the document
    const tmpDom = document.createElement('div')
    tmpDom.innerHTML = data
    console.log(tmpDom.innerHTML)
    if (teamsearch.value !== '') {
      if (teamsearch.value.includes('+')) {
        for (const word of teamsearch.value.split('+')) {
          if (word.includes('*')) {
            const regex = new RegExp(word + '\\w+')
            tmpDom.innerHTML = tmpDom.innerHTML.replaceAll(regex, ` <span class="highlight">${regex}</span> `)
          } else {
            tmpDom.innerHTML = tmpDom.innerHTML.replaceAll(` ${word} `, ` <span class="highlight">${word}</span> `)
          }
        }
      } else {
        tmpDom.innerHTML = tmpDom.innerHTML.replaceAll(` ${teamsearch.value} `, ` <span class="highlight">${teamsearch.value}</span> `)
      }
    }
    const toc = tmpDom.querySelector('#aside')

    const tocAreaDest = document.querySelector('#toc-area')
    if (tocAreaDest.firstChild) tocAreaDest.removeChild(tocAreaDest.firstChild)
    tocAreaDest.appendChild(toc)

    const tocAsideDest = document.querySelector('#toc-area-aside')
    if (tocAsideDest.firstChild) tocAsideDest.removeChild(tocAsideDest.firstChild)
    tocAsideDest.appendChild(toc.cloneNode(true))

    // return what will make the async component

    return {
      tmpDom
    }
  }
}
</script>

<style src="../assets/css/html.css" id="document-html-css"></style>
<style src="../assets/css/postprod.css"></style>
<style src="../assets/css/miroir.css"></style>
