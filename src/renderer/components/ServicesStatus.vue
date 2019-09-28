<template>
    <div class="summary services-container">
          <span class="service">
            <span class="icon icon-record" :class="{active: servicesStatus.enrollment, inactive: !servicesStatus.enrollment}"> Enrollment</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: servicesStatus.health, inactive: !servicesStatus.health}"> Health</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: servicesStatus.auth, inactive: !servicesStatus.auth}"> Auth</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: servicesStatus.management, inactive: !servicesStatus.management}"> Management</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: servicesStatus['fcs-web'], inactive: !servicesStatus['fcs-web']}"> FCS Web</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: servicesStatus.analytics, inactive: !servicesStatus.analytics}"> Analytics</span>
          </span>
          <span class="service">
            <span class="icon icon-record" :class="{active: servicesStatus.telematics, inactive: !servicesStatus.telematics}"> Telematics</span>
          </span>
    </div>
</template>
<script>
export default {
  name: 'ServicesStatus',
  props: {
    servicesStatus: {
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

</style>