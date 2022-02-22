<template>
 <div class="list-content" :class="listCssClass">
    <div class="list-header is-flex">
      <p class="menu-label">
        <span @click="toggleContent">Outils de navigation</span> :
      </p>
      <div class="slider-prev-next-buttons is-flex is-align-items-center">
      </div>
      <a href="#" class="toggle-btn" @click="toggleContent"></a>
    </div>
    <div class="list-body">
      <div class="menu-list-scrollable thin-scroll">
        <i v-if="prevCollection.length > 0" class="fas fa-reply" @click="getBackCollection()"></i>
        <ul class="menu-list" v-if="state.metadata">
          <li v-for="doc in state.metadata" :key="doc">
            <ul v-if="doc[2] === 'Collection'">
              <div>
                <div class="doc-title" @click="inputCollection(doc[0])"><span v-html="doc[1]"></span></div>
              </div>
            </ul>
            <ul v-else>
              <b v-if="doc[0] === textid">
                <div class="doc-title"><span v-html="doc[1]"></span></div>
              </b>
              <router-link :to="doc[0]" v-else>
                <div>
                  <div class="doc-title" @click="inputCollection(doc[0])"><span v-html="doc[1]"></span></div>
                </div>
              </router-link>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch, computed } from "vue";
import { getMetadataFromApi } from "@/api/document";


export default {
  name: "NavCollection",

  props: ["id", "textid"],

  async setup(props) {
    let state = reactive({
      isOpened: false,
    });
    const { id } = toRefs(props);

    function getInitialState() {
     const initialCollection = `${process.env.VUE_APP_APP_ROOT_COLLECTION_ID}`;
     const initalisePrevCollection = [];
     return {
       collection: initialCollection,
       prevCollection: initalisePrevCollection
     }
    }

    const doc = ref(id.value.toString());


    const initialState = getInitialState();
    let actualCollection = ref(initialState.collection);
    let prevCollection = ref(initialState.prevCollection);


    const getCollections = async () => {
      let metadata = {};
      let tempData = {}
      let metadataListIndex = [];
      const data = await getMetadataFromApi(actualCollection.value);

      var htmlnamespace = Object.keys(data["@context"]).find((k) =>
        data["@context"][k].includes("html")
      );

      let i = 1;
      if (data && data["member"]) {
        for (var doc of data["member"]) {
            try {
              var title = doc["dts:extensions"][htmlnamespace + ":h1"];
              tempData[i] = [doc["@id"], title, doc["@type"]];
              metadataListIndex.push(title) 
            } catch {
              tempData[i] = [doc["@id"], doc["title"], doc["@type"]];
              metadataListIndex.push(doc["title"]) 
            }
            i = i + 1
        }
      } else{
        actualCollection.value = `${process.env.VUE_APP_APP_ROOT_COLLECTION_ID}`;
        prevCollection.value = [];
      }
      metadataListIndex.sort();
      for(var meta in tempData){
        metadata[metadataListIndex.indexOf(tempData[meta][1])] = tempData[meta];
      }
      state.metadata = metadata;
    };

    const inputCollection = function (newCollection){
      console.log(actualCollection);
      prevCollection.value.push(actualCollection.value);
      console.log(prevCollection.value)
      actualCollection.value = newCollection;
      getCollections();
      return actualCollection, prevCollection;
    };

    const getBackCollection = function (){
      console.log(prevCollection.value)
      actualCollection.value = prevCollection.value[0];
      console.log(prevCollection)
      prevCollection.value.shift();
      getCollections();
      return actualCollection, prevCollection;
    };

    watch(actualCollection ,getCollections);

    const listCssClass = computed(() => {
      return state.isOpened ? "is-opened" : "";
    });

    const toggleContent = function (event) {
      event.preventDefault();
      state.isOpened = !state.isOpened;
    };

    
    await Promise.all([getCollections()]);

    const gotoTop = function () {
      scroll(0, 0);
    };

    return {
      state,
      listCssClass,
      toggleContent,
      doc,
      gotoTop,
      actualCollection,
      prevCollection,
      inputCollection,
      getBackCollection
    };
  },
};
</script>

<style scoped>
nav button {
  cursor: pointer;
}
nav button,
.list-header p.menu-label {
  font-family: "Barlow", sans-serif !important;
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
}
.list-header {
  align-items: center;
  background-color: #b8b5ad;
  padding: 20px 0 20px;
  border-radius: 6px;
  position: relative;
}
.list-content.is-opened .list-header {
  border-radius: 6px 6px 0 0;
}
.list-header p.menu-label {
  color: #4a4a4a;
}
.list-body {
  display: none;
  padding: 30px 20px;
  background-color: #e5e3de;
  border-radius: 0 0 6px 6px;
}
.list-content.is-opened .list-body {
  display: block;
}
.list-header {
  padding-left: 20px;
}

p.menu-label {
  margin-bottom: 0;
  text-indent: 0;
}
.menu-label span:first-child {
  cursor: pointer;
}
.menu-label span.year {
  background-color: #fff;
  font-size: 14px;
  color: #8b8a7e;
  padding: 1px 20px;
  margin: 0 10px;
}
.menu-label input[type="text"].year,
.menu-label input[type="number"].year {
  inset: unset;
  border: none;
  text-shadow: none;
  -moz-appearance: textfield;
  background-color: #fff;

  max-width: 70px;
  padding: 2px 0;
  margin: 0 15px;

  font-family: "Barlow", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #979797;
  text-transform: uppercase;
  text-align: center;
}
.menu-label input[type="text"].year:focus,
.menu-label input[type="number"].year:focus {
  outline: solid 2px #b9192f;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

nav button {
  border: none;
  background: none;
  color: #ffffff;
}
nav button > span {
  border: #ffffff solid 1px;
  border-radius: 4px;
  padding: 4px 20px;
  margin-left: 10px;
}

.slider-prev-next-buttons {
  margin-right: 30px;
}

/* slider */
.vue-slider {
  min-width: 200px;
}
.vue-slider.vue-slider-ltr {
  margin-top: 2px !important;
  padding: 0 10px !important;
  height: 3px !important;
}
.vue-slider :deep(.vue-slider-dot) {
  width: 18px !important;
  height: 18px !important;
}
.vue-slider:hover :deep(.vue-slider-rail),
.vue-slider :deep(.vue-slider-rail) {
  background-color: #ffffff;
}
.vue-slider :deep(.vue-slider:hover .vue-slider-process),
.vue-slider :deep(.vue-slider-process) {
  background-color: #b9192f !important;
}
.vue-slider :deep(.vue-slider-dot-handle:hover),
.vue-slider :deep(.vue-slider-dot-handle-focus),
.vue-slider :deep(.vue-slider-dot-handle) {
  border-color: #b9192f !important;
}
.vue-slider :deep(.vue-slider-dot-handle-focus) {
  box-shadow: 0 0 0 5px rgba(185, 25, 47, 0.2);
}
.vue-slider :deep(.vue-slider-dot-tooltip-text) {
  font-family: "Barlow", sans-serif;
}

/* toogle */
.toggle-btn {
  position: absolute;
  right: 20px;
  top: 19px;
  width: 27px;
  height: 27px;
  background: url(../assets/images/chevron_blanc.svg) center top -3px / cover no-repeat;
  border: none;
  text-decoration: none;
}
.list-content.is-opened .toggle-btn {
  background: url(../assets/images/croix_blc.svg) center / cover no-repeat;
}
.menu-list-scrollable {
  padding: 10px 20px 10px 0;
  max-height: 50vh;
  overflow-y: auto;
}

*.thin-scroll {
  scrollbar-width: thin;
  scrollbar-color: #b9192f #ceccc8;
}
/* Works on Chrome/Edge/Safari */
*.thin-scroll::-webkit-scrollbar {
  width: 8px;
}
*.thin-scroll::-webkit-scrollbar-track {
  background: #ceccc8;
}
*.thin-scroll::-webkit-scrollbar-thumb {
  background-color: #b9192f;
}

.menu-list {
  counter-reset: doc-counter;
  columns: 3;
}

.doc-author {
  font-weight: 600;
}
.doc-author::before {
  content: counter(doc-counter);
  counter-increment: doc-counter;
  color: #b9192f;
  margin-right: 5px;
}
.menu-list li ul {
  padding-left: 0;
}
.menu-list > li {
  display: inline-block;
  margin-bottom: 20px;
  break-inside: avoid;
}
.menu-list li > ul {
  border: none;
  display: block;
  margin: 0;
}
.menu-list > li {
  flex: 33.333% 0 0;
}
.menu-list b,
.menu-list a {
  border: none;
  padding: 0;
  font-family: "Barlow Semi Condensed", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  color: #161616;
  text-transform: none;
}
.menu-list b {
  font-weight: 600;
}
ol,
ul {
  list-style: none;
}

@media screen and (max-width: 1150px) {
  .menu-list {
    columns: 2;
  }
}
@media screen and (max-width: 950px) {
  .list-header {
    flex-wrap: wrap;
  }
  .list-header > nav:last-of-type {
    margin-top: 20px;
    width: 100%;
  }
}
@media screen and (max-width: 800px) {
  .vue-slider.vue-slider-ltr {
    margin-top: 5px !important;
    padding: 0 !important;
    width: calc(100% - 70px) !important;
  }
  .list-body {
    padding: 8px 5px 30px 20px;
  }
}
@media screen and (max-width: 800px) {
}
@media screen and (max-width: 640px) {
  .list-header {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
  }
  .slider-prev-next-buttons *:first-child {
    padding-right: 10px;
  }
  .slider-prev-next-buttons *:last-child {
    padding-left: 10px;
  }
  .list-header > nav:last-of-type {
    margin-top: 0px;
    width: auto;
  }
  .liste-doc-area {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .menu-list {
    columns: 1;
  }
  .toggle-btn {
    width: 20px;
    right: 15px;
  }
}
</style>
