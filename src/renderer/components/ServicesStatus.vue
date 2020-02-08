<template>
    <div class="summary services-container">
        <template v-for="service in Object.keys(services)">
            <b-dropdown :ref="service + '-dropdown'">
                <template v-slot:button-content>
                  <span class="service">
                    <span class="icon icon-record"
                          :class="{active: servicesStatus[service] === 'started', inactive: servicesStatus[service] === 'stopped'}"> {{services[service]}}</span>
                  </span>
                </template>
                <b-dropdown-item
                        @click="onRestartClick(service, 'uat', `${service}-dropdown`)"
                >Restart w/ UAT
                </b-dropdown-item>
                <!--          <b-dropdown-item>Restart w/ E2E</b-dropdown-item>-->
                <b-dropdown-item @click="onStopClicked(service, `${service}-dropdown`)">Stop</b-dropdown-item>
            </b-dropdown>
        </template>
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
    watch: {
      servicesStatus () {
        this.$forceUpdate()
      }
    },
    data () {
      return {
        services: {
          'telematics': 'Telemagics',
          'enrollment': 'Enrollment',
          'analytics': 'Analytics',
          'management': 'Management',
          'health': 'Health',
          'auth': 'Auth',
          'fcs-web': 'FCS Web'
        }
      }
    },
    methods: {
      closeDropDown(ref) {
        setTimeout(() => {
          this.$refs[ref][0].hide(true);
        }, 500)
      },
      onRestartClick (serviceToStart, environmentToStartIn, ref) {
        switch (serviceToStart) {
          case 'fcs-web':
            this.$electron.ipcRenderer.send('launchFcsWeb', environmentToStartIn)
            break
          case 'analytics':
          case 'telematics':
          case 'health':
          case 'auth':
          case 'management':
          case 'enrollment':
            this.$electron.ipcRenderer.send(
              'launchFcs',
              serviceToStart,
              environmentToStartIn
            )
            break
        }
        this.closeDropDown(ref);
      },
      onStopClicked (serviceToStop, ref) {
        switch (serviceToStop) {
          case 'fcs-web':
            this.$electron.ipcRenderer.send('stopFcsWeb')
            break
          case 'analytics':
          case 'telematics':
          case 'health':
          case 'auth':
          case 'management':
          case 'enrollment':
            this.$electron.ipcRenderer.send('stopFcs', serviceToStop)
            break
        }
        this.closeDropDown(ref);
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
