<template>
  <div class="window-content">
    <div class="pane">
      lemonade 0.0.5
      <services-status :servicesStatus="servicesStatus" />
      lemonade
      <div class="striped-bar"></div>

      <externals-status :externalsStatus="externalsStatus" />

      <div class="striped-bar"></div>
      <div>
        <div class="column fcs-column" @click="openApp('fc')">
          <div class="app-container">
            <div class="reading js-temperature">FC</div>
            <div class="description">Fcs Commands</div>
          </div>
        </div>
        <div class="column fcs-column" @click="openApp('wl')">
          <div class="app-container">
            <div class="reading js-apparent">WL</div>
            <div class="description">Weighted List</div>
          </div>
        </div>
      </div>

      <div>
        <div class="column fcs-column" @click="openApp('tl')">
          <div class="app-container">
            <div class="reading js-wind">TL</div>
            <div class="description">Traffic Light</div>
          </div>
        </div>
        <div class="column fcs-column" @click="openApp('ul')">
          <div class="app-container">
            <div class="reading js-wind-direction">UL</div>
            <div class="description">Useful Links</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import ServicesStatus from "./ServicesStatus";
import ExternalsStatus from "./ExternalsStatus";

export default {
  name: "landing-page",
  components: { SystemInformation, ServicesStatus, ExternalsStatus },
  data() {
    return {
      portMapping: {
        "8080": "fcs-web",
        "8881": "telematics",
        "8882": "enrollment",
        "8883": "analytics",
        "8885": "management",
        "8886": "health",
        "8889": "auth",
      },
      externalsPortMapping: {
        "8088": "mongodb",
        "8089": "redis",
        "8090": "sqlserver",
        "8091": "zookeeper",
        "8092": "kafka"
      },
      servicesStatus: {
        "fcs-web": "stopped",
        management: "stopped",
        health: "stopped",
        enrollment: "stopped",
        auth: "stopped",
        analytics: "stopped",
        telematics: "stopped"
      },
      externalsStatus: {
        mongodb: "stopped",
        redis: "stopped",
        sqlserver: "stopped",
        zookeeper: "stopped",
        kafka: "stopped"
      }
    };
  },
  watch: {
    externalsStatus: {
      handler: function(newValue, oldValue) {
        Object.keys(oldValue).forEach(key => {
          if (newValue[key] !== oldValue[key]) {
            console.log("things were updated: externals ", newValue, oldValue);
            let status = newValue[key];
            console.log(key + "'s status has changed! It is now " + status);
            this.$electron.ipcRenderer.send("serviceStatusChange", key, status);
          }
        });
      },
      deep: true
    },
    servicesStatus: {
      handler: function(newValue, oldValue) {
        Object.keys(oldValue).forEach(key => {
          if (newValue[key] !== oldValue[key]) {
            console.log("things were updated: services ", newValue, oldValue);
            let status = newValue[key];
            console.log(key + "'s status has changed! It is now " + status);
            this.$electron.ipcRenderer.send("serviceStatusChange", key, status);
          }
        });
      },
      deep: true
    }
  },
  methods: {
    openApp(appName) {
      this.$electron.ipcRenderer.send("openApp", appName);
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    ping(message) {
      this.$electron.ipcRenderer.send("ping", "I am pinging you");
    },
    convertPortsToDependencyNames(portMapping, rawPortMappingFromBackend) {
      let newPortMapping = {};
      Object.keys(portMapping).forEach(port => {
        let nameOfPort = portMapping[port];
        newPortMapping[nameOfPort] = rawPortMappingFromBackend[port];
      });
      return newPortMapping;
    }
  },
  mounted() {
    this.$electron.ipcRenderer.on("pingBack", (event, message) => {
      console.log(message);
    });
    this.$electron.ipcRenderer.on(
      "allRunningServicesResponse",
      (event, message) => {
        this.servicesStatus = this.convertPortsToDependencyNames(
          this.portMapping,
          message
        );
      }
    );
    this.$electron.ipcRenderer.on(
      "allRunningExternalsResponse",
      (event, message) => {
        this.externalsStatus = this.convertPortsToDependencyNames(
          this.externalsPortMapping,
          message
        );
      }
    );
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
.fcs-column {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fcs-column,
.reading,
.column,
.description {
  cursor: pointer;
}
.btn-group .active {
  background-color: transparent !important;
}
.fcs-column .app-container {
  color: #000;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  outline: none;
  padding: 15px;
}

.fcs-column .app-container:hover {
  background-color: #c2c9e4;
  box-shadow: 0px 15px 20px rgba(194, 201, 228, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
.btn.btn-default a {
  color: black;
  text-decoration: none;
}
</style>
