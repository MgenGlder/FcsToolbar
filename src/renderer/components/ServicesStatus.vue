<template>
  <div class="summary services-container">
    <b-dropdown ref="enrollment-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span class="icon icon-record" :class="enrollment">Enrollment</span>
        </span>
      </template>
      <b-dropdown-item
        @click="onRestartClick('enrollment', 'uat', 'enrollment-dropdown')"
      >Restart w/ UAT</b-dropdown-item>
      <b-dropdown-item>Restart w/ E2E</b-dropdown-item>
      <b-dropdown-item>Stop</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="health-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: servicesStatus.health === 'started', inactive: servicesStatus.health === 'stopped'}"
          >Health</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('health', 'uat', 'health-dropdown')">Restart w/ UAT</b-dropdown-item>
      <b-dropdown-item>Restart w/ E2E</b-dropdown-item>
      <b-dropdown-item>Stop</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="auth-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: servicesStatus.auth === 'started', inactive: servicesStatus.auth === 'stopped'}"
          >Auth</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('auth', 'uat', 'auth-dropdown')">Restart w/ UAT</b-dropdown-item>
      <b-dropdown-item>Restart w/ E2E</b-dropdown-item>
      <b-dropdown-item>Stop</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="management-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: management === 'started', inactive: management === 'stopped'}"
          >Management</span>
        </span>
      </template>
      <b-dropdown-item
        @click="onRestartClick('management', 'uat', 'management-dropdown')"
      >Restart w/ UAT</b-dropdown-item>
      <b-dropdown-item>Restart w/ E2E</b-dropdown-item>
      <b-dropdown-item>Stop</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="fcs-web-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: servicesStatus['fcs-web'] === 'started', inactive: servicesStatus['fcs-web'] === 'stopped'}"
          >FCS Web</span>
        </span>
      </template>
      <b-dropdown-item @click="onRestartClick('fcs-web', 'uat', 'fcs-web-dropdown')">Restart w/ UAT</b-dropdown-item>
      <b-dropdown-item>Restart w/ E2E</b-dropdown-item>
      <b-dropdown-item>Stop</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="analytics-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: servicesStatus.analytics === 'started', inactive: servicesStatus.analytics === 'stopped'}"
          >Analytics</span>
        </span>
      </template>
      <b-dropdown-item
        @click="onRestartClick('analytics', 'uat', 'analytics-dropdown')"
      >Restart w/ UAT</b-dropdown-item>
      <b-dropdown-item>Restart w/ E2E</b-dropdown-item>
      <b-dropdown-item>Stop</b-dropdown-item>
    </b-dropdown>
    <b-dropdown ref="telematics-dropdown">
      <template v-slot:button-content>
        <span class="service">
          <span
            class="icon icon-record"
            :class="{active: servicesStatus.telematics === 'started', inactive: servicesStatus.telematics === 'stopped'}"
          >Telematics</span>
        </span>
      </template>
      <b-dropdown-item
        @click="onRestartClick('telematics', 'uat', 'telematics-dropdown')"
      >Restart w/ UAT</b-dropdown-item>
      <b-dropdown-item>Restart w/ E2E</b-dropdown-item>
      <b-dropdown-item>Stop</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "ServicesStatus",
  props: {
    servicesStatus: {
      required: false,
      type: Object
    }
  },
  computed: {
    management: function() {
      console.log("management is being computed");
      return this.servicesStatus.management;
    },
    enrollment: function() {
      console.log("rendering enrollment");
      console.log(
        "RENDERING... ",
        `{active: (${this.servicesStatus.enrollment} === 'started'), inactive: (${this.servicesStatus.enrollment} == 'stopped')}`
      );
      return {
        active: this.servicesStatus.enrollment === "started",
        inactive: this.servicesStatus.enrollment == "stopped"
      };
    }
  },
  methods: {
    onRestartUatClick(serviceToStart, event, ref) {
      this.$electron.ipcRenderer.send("fcsLaunch", serviceToStart, "uat");
      setTimeout(() => {
        this.$refs[ref].hide(true);
      }, 500);
    },
    onRestartClick(serviceToStart, environmentToStartIn, ref) {
      switch (serviceToStart) {
        case "fcs-web":
          this.$electron.ipcRenderer.send("launchFcsWeb", environmentToStartIn);
          break;
        case "analytics":
        case "telematics":
        case "health":
        case "auth":
        case "management":
        case "enrollment":
          this.$electron.ipcRenderer.send(
            "launchFcs",
            serviceToStart,
            environmentToStartIn
          );
          break;
      }
      setTimeout(() => {
        this.$refs[ref].hide(true);
      }, 500);
    }
  }
};
</script>

<style>
.active {
  color: #34c84a !important;
}

.inactive {
  color: #fc605b !important;
}

.starting {
  color: #fdbc40 !important;
}

.icon.icon-record {
  float: none !important;
}

.btn.dropdown-toggle.btn-secondary {
  background-color: inherit;
  padding-left: 0px;
  padding-right: 0px;
  margin-right: 0px;
}
a.dropdown-item {
  font-size: 12px;
}
</style>