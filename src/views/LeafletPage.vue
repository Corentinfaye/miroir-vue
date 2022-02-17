<template>
  <div style="height: 75vh; width: 50vw;">
    <l-map ref="map" v-model:zoom="zoom" :center="center" @ready="readyHandler">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-geo-json :geojson="geojson" :options="geojsonOptions" />
        <l-tooltip>
          lol
        </l-tooltip>
    </l-map>
  </div>
</template>
<script>
import "leaflet";
import { LMap, LTileLayer,LTooltip,LGeoJson } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LTooltip,
    LGeoJson
  },
  data() {
    return {
      center: [47.41322, -1.219482],
      zoom: 6,
      iconWidth: 25,
      iconHeight: 40,
      geojson:{
            "type": "FeatureCollection",
            "features":
            [
                {
                    "type": "Feature",
                    "geometry":
                    {
                        "type": "Point",
                        "coordinates":
                        [
                            3.7175921556886213,
                            47.4488021556886
                        ]
                    },
                    "properties":
                    {
                        "name": "Vézelay",
                        "citation": "33",
                        "position":
                        {
                            "3":
                            [
                                "ENCPOS_1849_01",
                                "ENCPOS_1948_14"
                            ],
                            "1":
                            [
                                "ENCPOS_1905_12",
                                "ENCPOS_1920b_01",
                                "ENCPOS_1924_10",
                                "ENCPOS_1925_01",
                                "ENCPOS_1943_23",
                                "ENCPOS_1959_11",
                                "ENCPOS_1968_08",
                                "ENCPOS_1986_20",
                                "ENCPOS_1994_02"
                            ],
                            "2":
                            [
                                "ENCPOS_1932_01",
                                "ENCPOS_1942_12",
                                "ENCPOS_1946_07"
                            ],
                            "11":
                            [
                                "ENCPOS_1946_11"
                            ]
                        },
                        "lien":
                        {
                        "geoname_id": "2969478",
                        "wikidata_id": "Q204979",
                        "wikipedia": "https://fr.wikipedia.org/wiki/V%C3%A9zelay",
                        "databnf_ark": "ark:/12148/cb152799020",
                        "viaf_id": "139527254",
                        "siaf_id": "18343584",
                        "osm_id": "2399800"
                        }
                    }
                },
                {
                    "type": "Feature",
                    "geometry":
                    {
                        "type": "Point",
                        "coordinates":
                        [
                            2.766192727272727,
                            50.329016363636356
                        ]
                    },
                    "properties":
                    {
                        "name": "Écurie",
                        "citation": "25",
                        "position":
                        {
                            "1":
                            [
                                "ENCPOS_1850_03",
                                "ENCPOS_2020_06"
                            ],
                            "2":
                            [
                                "ENCPOS_1862_05",
                                "ENCPOS_1913_03"
                            ],
                            "3":
                            [
                                "ENCPOS_1956_01",
                                "ENCPOS_1972_20"
                            ],
                            "4":
                            [
                                "ENCPOS_1973_21"
                            ],
                            "10":
                            [
                                "ENCPOS_1997_12"
                            ],
                            "15":
                            [
                                "ENCPOS_2009_08"
                            ]
                        }
                    }
                }
            ]
        }
    };
  },
  methods: {
    log(a) {
      console.log(a);
    },
    async readyHandler() {
      const bounds = this.$refs.map.leafletObject.getBounds();
      const lBounds = window.L.latLngBounds(
        bounds._northEast,
        bounds._southWest
      );
      console.log(bounds instanceof window.L.LatLngBounds);
      console.log(lBounds instanceof window.L.LatLngBounds);
    },
  },
};
</script>