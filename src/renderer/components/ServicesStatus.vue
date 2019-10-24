<template>
    <div class="summary services-container">
        <b-dropdown ref="enrollment-dropdown">
            <template v-slot:button-content>
                <span class="service">
                    <span class="icon icon-record" :class="{active: servicesStatus.enrollment, inactive: !servicesStatus.enrollment}"> Enrollment</span>
                </span>
            </template>
            <b-dropdown-item @click="onRestartUatClick('enrollment', $event, 'enrollment-dropdown')">
              Restart w/ UAT
            </b-dropdown-item>
            <b-dropdown-item>
              Restart w/ E2E
            </b-dropdown-item>
            <b-dropdown-item>
              Stop
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown ref="health-dropdown">
            <template v-slot:button-content>
                <span class="service">
                    <span class="icon icon-record" :class="{active: servicesStatus.health, inactive: !servicesStatus.health}"> Health</span>
                </span>
            </template>
            <b-dropdown-item @click="onRestartUatClick('health', $event, 'health-dropdown')">
              Restart w/ UAT
            </b-dropdown-item>
            <b-dropdown-item>
              Restart w/ E2E
            </b-dropdown-item>
            <b-dropdown-item>
              Stop
            </b-dropdown-item>
      </b-dropdown>
      <b-dropdown ref="auth-dropdown">
          <template v-slot:button-content>
              <span class="service">
                  <span class="icon icon-record" :class="{active: servicesStatus.auth, inactive: !servicesStatus.auth}"> Auth</span>
              </span>
          </template>
          <b-dropdown-item @click="onRestartUatClick('auth', $event, 'auth-dropdown')">
              Restart w/ UAT
          </b-dropdown-item>
          <b-dropdown-item>
              Restart w/ E2E
          </b-dropdown-item>
          <b-dropdown-item>
              Stop
          </b-dropdown-item>
      </b-dropdown>
      <b-dropdown ref="management-dropdown">
          <template v-slot:button-content>
              <span class="service">
                  <span class="icon icon-record" :class="{active: servicesStatus.management, inactive: !servicesStatus.management}"> Management</span>
              </span>
          </template>
          <b-dropdown-item @click="onRestartUatClick('management', $event, 'management-dropdown')">
              Restart w/ UAT
          </b-dropdown-item>
          <b-dropdown-item>
              Restart w/ E2E
          </b-dropdown-item>
          <b-dropdown-item>
              Stop
          </b-dropdown-item>
      </b-dropdown>
      <b-dropdown ref="fcs-web-dropdown">
          <template v-slot:button-content>
              <span class="service">
                  <span class="icon icon-record" :class="{active: servicesStatus['fcs-web'], inactive: !servicesStatus['fcs-web']}"> FCS Web</span>
              </span>
          </template>
          <b-dropdown-item @click="onRestartWebUatClick('fcs-web', $event, 'fcs-web-dropdown')">
              Restart w/ UAT
          </b-dropdown-item>
          <b-dropdown-item>
              Restart w/ E2E
          </b-dropdown-item>
          <b-dropdown-item>
              Stop
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown ref="analytics-dropdown">
            <template v-slot:button-content>
                <span class="service">
                    <span class="icon icon-record" :class="{active: servicesStatus.analytics, inactive: !servicesStatus.analytics}"> Analytics</span>
                </span>
            </template>
            <b-dropdown-item @click="onRestartUatClick('analytics', $event, 'analytics-dropdown')">
              Restart w/ UAT
            </b-dropdown-item>
            <b-dropdown-item>
              Restart w/ E2E
            </b-dropdown-item>
            <b-dropdown-item>
              Stop
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown ref="telematics-dropdown">
            <template v-slot:button-content>
                <span class="service">
                    <span class="icon icon-record" :class="{active: servicesStatus.telematics, inactive: !servicesStatus.telematics}"> Telematics</span>
                </span>
            </template>
            <b-dropdown-item @click="onRestartUatClick('telematics', $event, 'telematics-dropdown')">
              Restart w/ UAT
            </b-dropdown-item>
            <b-dropdown-item>
              Restart w/ E2E
            </b-dropdown-item>
            <b-dropdown-item>
              Stop
            </b-dropdown-item>
        </b-dropdown>
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
        onRestartUatClick (serviceToStart, event, ref) {
          this.$electron.ipcRenderer.send('fcsLaunch', serviceToStart, 'uat')
          setTimeout(() => {
            this.$refs[ref].hide(true)
          }, 500);
        },
        onRestartWebUatClick () {
            this.$electron.ipcRenderer.send('fcsWebLaunch')
        }
    }
}
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