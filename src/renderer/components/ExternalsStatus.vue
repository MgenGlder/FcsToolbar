<template>
    <div class="summary services-container">
          <span class="service">
            <span class="icon icon-record" :class="{active: externalsStatus.mongodb, inactive: !externalsStatus.mongodb}"> MongoDB</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: externalsStatus.redis, inactive: !externalsStatus.redis}"> Redis</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: externalsStatus.sqlserver, inactive: !externalsStatus.sqlserver}"> SQLServer</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: externalsStatus.zookeeper, inactive: !externalsStatus.zookeeper}"> ZooKeeper</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: externalsStatus.kafka, inactive: !externalsStatus.kafka}"> Kafka</span>
          </span>
    </div>
</template>
<script>
export default {
  name: 'ExternalsStatus',
  props: {
    externalsStatus: {
      required: false,
      type: Object
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
<style>
.active {
    color: #34c84a;
}
.inactive {
    color: #fc605b;
}
.starting {
    color: #fdbc40;
}
</style