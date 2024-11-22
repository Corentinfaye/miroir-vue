import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import useMiroirSimpleSearch from '@/composables/use-miroir-simple-search'
import useAggSearch from '@/composables/use-agg-search'

import VueHighlightJS from 'vue3-highlightjs'
import useLayout from './composables/use-layout'

createApp(App).provide('search', useMiroirSimpleSearch())
  .provide('agg-search', useAggSearch())
  .provide('variable-layout', useLayout())
  .component('PageBreak', defineAsyncComponent(() =>
    import('@/components/PageBreak.vue')
  ))
  .use(router)
  .use(VueHighlightJS)
  .mount('#app')
