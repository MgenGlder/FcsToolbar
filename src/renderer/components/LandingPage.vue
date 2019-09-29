<template>
<div>
  <div class="header-arrow"></div>
  <div class="window">
    <header class="toolbar toolbar-header">
      <h1 class="title">
        FCS Toolbar
        <span class="js-update-time"></span>
      </h1>
    </header>

    <div class="window-content">
      <div class="pane">

        <services-status :servicesStatus='servicesStatus'  />

        <div class="striped-bar"></div>

        <externals-status :externalsStatus='externalsStatus' />

        <div class="striped-bar"></div>
        <div>
          <div class="column" @click="openApp('fc')">
            <div class="reading js-temperature">FC</div>
            <div class="description">Fcs Commands</div>
          </div>
          <div class="column"@click="openApp('wl')">
            <div class="reading js-apparent">WL</div>
            <div class="description">Weighted List</div>
          </div>
        </div>

        <div>
          <div class="column" @click="openApp('tl')">
            <div class="reading js-wind">TL</div>
            <div class="description">Traffic Light</div>
          </div>
          <div class="column" @click="openApp('ul')">
            <div class="reading js-wind-direction">UL</div>
            <div class="description">Useful Links</div>
          </div>
        </div>
      </div>
    </div>

    <footer class="toolbar toolbar-footer">
      <div class="footer-link">
        Powered by
        <a href="http://kunle.io">Kunle</a>
      </div>

      <div class="toolbar-actions pull-right">
        <div class="btn-group">
          <button class="btn btn-default js-refresh-action">
            <span class="icon icon-arrows-ccw js-refresh-action" title="Refresh"></span>
          </button>

          <button @click="ping" class="btn btn-default js-quit-action">
            <span class="icon icon-cancel js-quit-action" title="Quit"></span>
          </button>
        </div>
      </div>
    </footer>
  </div>
</div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
import ServicesStatus from './ServicesStatus'
import ExternalsStatus from './ExternalsStatus'

export default {
  name: 'landing-page',
  components: { SystemInformation, ServicesStatus, ExternalsStatus },
  data () {
    return {
      portMapping: {
        '8080': 'fcs-web',
        '8081': 'management',
        '8082': 'health',
        '8083': 'enrollment',
        '8084': 'auth',
        '8085': 'analytics',
        '8086': 'telematics'
      },
      externalsPortMapping: {
        '8088': 'mongodb',
        '8089': 'redis',
        '8090': 'sqlserver',
        '8091': 'zookeeper',
        '8092': 'kafka'
      },
      servicesStatus: {
        'fcs-web': false,
        'management': false,
        'health': false,
        'enrollment': false,
        'auth': false,
        'analytics': false,
        'telematics': false
      },
      externalsStatus: {
        'mongodb': false,
        'management': false,
        'health': false,
        'enrollment': false,
        'auth': false,
        'analytics': false,
        'telematics': false
      }
    }
  },
  watch: {
    externalsStatus: {
      handler: function (newValue, oldValue) {
        Object.keys(oldValue).forEach((key) => {
          if (newValue[key] !== oldValue[key]) {
            let status = newValue[key] ? 'active' : 'inactive'
            console.log(key + '\'s status has changed! It is now ' + status)
            this.$electron.ipcRenderer.send('serviceStatusChange', key, status)
          }
        })
      },
      deep: true
    }
  },
  methods: {
    openApp (appName) {
      this.$electron.ipcRenderer.send('openApp', appName)
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    ping (message) {
      this.$electron.ipcRenderer.send('ping', 'I am pinging you')
    },
    convertPortsToDependencyNames (portMapping, rawPortMappingFromBackend) {
      let newPortMapping = {}
      Object.keys(portMapping).forEach((port) => {
        newPortMapping[portMapping[port]] = (rawPortMappingFromBackend[port] === 'open')
      })
      return newPortMapping
    }
  },
  mounted () {
    this.$electron.ipcRenderer.on('pingBack', (event, message) => {
      console.log(message)
    })
    this.$electron.ipcRenderer.on('allRunningServicesResponse', (event, message) => {
      this.servicesStatus = this.convertPortsToDependencyNames(this.portMapping, message)
    })
    this.$electron.ipcRenderer.on('allRunningExternalsResponse', (event, message) => {
      this.externalsStatus = this.convertPortsToDependencyNames(this.externalsPortMapping, message)
    })
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
</style>
