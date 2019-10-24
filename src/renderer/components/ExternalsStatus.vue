<template>
    <div class="summary services-container">
        <b-dropdown ref="mongodb-dropdown">
            <template v-slot:button-content>
              <span class="service">
                <span class="icon icon-record" :class="{active: externalsStatus.mongodb, inactive: !externalsStatus.mongodb}"> MongoDB</span>
              </span>
            </template>
            <b-dropdown-item @click="onRestartClick('mongodb', $event, 'mongodb-dropdown')">
              Restart Service
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown ref="redis-dropdown">
          <template v-slot:button-content>
              <span class="service">
                          <span class="icon icon-record" :class="{active: externalsStatus.redis, inactive: !externalsStatus.redis}"> Redis</span>
              </span>
          </template>
          <b-dropdown-item @click="onRestartUatClick('redis', $event, 'redis-dropdown')">
              Restart Service
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown ref="sqlserver-dropdown">
          <template v-slot:button-content>
              <span class="service">
                          <span class="icon icon-record" :class="{active: externalsStatus.sqlserver, inactive: !externalsStatus.sqlserver}"> SQLServer</span>
              </span>
          </template>
          <b-dropdown-item @click="onRestartUatClick('sqlserver', $event, 'sqlserver-dropdown')">
              Restart Service
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown ref="zookeeper-dropdown">
          <template v-slot:button-content>
              <span class="service">
                          <span class="icon icon-record" :class="{active: externalsStatus.zookeeper, inactive: !externalsStatus.zookeeper}"> ZooKeeper</span>
              </span>
          </template>
          <b-dropdown-item @click="onRestartUatClick('zookeeper', $event, 'zookeeper-dropdown')">
              Restart Service
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown ref="kafka-dropdown">
          <template v-slot:button-content>
              <span class="service">
                          <span class="icon icon-record" :class="{active: externalsStatus.kafka, inactive: !externalsStatus.kafka}"> Kafka</span>
              </span>
          </template>
          <b-dropdown-item @click="onRestartUatClick('kafka', $event, 'kafka-dropdown')">
              Restart Service
            </b-dropdown-item>
        </b-dropdown>
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
    data() {
        return {
            dataInitialized: false
        }
    },
    methods: {
        onRestartUatClick(serviceToStart, event, ref) {
            setTimeout(() => {
                this.$refs[ref].hide(true)
            }, 500);
        }
    },
    mounted() {

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