<template>
  <div class="summary services-container">
    <b-dropdown ref="mongodb-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: externalsStatus.mongodb === 'started', inactive: externalsStatus.mongodb === 'stopped'}"
          >MongoDB</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('mongodb', 'mongodb-dropdown')">Restart Service</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="redis-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: externalsStatus.redis === 'started', inactive: externalsStatus.redis === 'stopped'}"
          >Redis</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('redis', 'redis-dropdown')">Restart Service</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="sqlserver-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: externalsStatus.sqlserver === 'started', inactive: externalsStatus.sqlserver === 'stopped'}"
          >SQLServer</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('sqlserver', 'sqlserver-dropdown')">Restart Service</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="zookeeper-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: externalsStatus.zookeeper === 'started', inactive: externalsStatus.zookeeper === 'stopped'}"
          >ZooKeeper</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('zookeeper', 'zookeeper-dropdown')">Restart Service</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="kafka-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: externalsStatus.kafka === 'started', inactive: externalsStatus.kafka === 'stopped'}"
          >Kafka</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('kafka', 'kafka-dropdown')">Restart Service</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "ExternalsStatus",
  props: {
    externalsStatus: {
      required: false,
      type: Object
    }
  },
  data() {
    return {
      dataInitialized: false
    };
  },
  methods: {
    onRestartClick(externalToStart, ref) {
      this.$electron.ipcRenderer.send("launchExternal", externalToStart);

      setTimeout(() => {
        this.$refs[ref].hide(true);
      }, 500);
    }
  },
  mounted() {}
};
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