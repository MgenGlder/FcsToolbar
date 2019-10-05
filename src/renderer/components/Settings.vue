<template>
    <div class="window-content">
        <div class="pane">
            Test settings page
            <!-- <input type="file"
           webkitdirectory /> -->
            <button @click="getFcsLocation">FCS</button>
            <button @click="getFcsWebLocation">FCS Web</button>
            <button @click="getFcsUiLocation">FCS UI</button>
            </br>
            fcsLocation: {{userConfiguration.fcsLocation}}
            </br>
            fcsWebLocation: {{userConfiguration.fcsWebLocation}}
            </br>
            fcsUiLocation: {{userConfiguration.fcsUiLocation}}
            </br>
            <button @click="saveAllConfigurations">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    mounted() {
        this.$electron.ipcRenderer.send('allFolderConfigurations')
        this.$electron.ipcRenderer.on('allFolderConfigurationsz', this.onConfigurationReceived)
        this.$electron.ipcRenderer.on('fcsDirectory', this.onFcsLocationReceived)
        this.$electron.ipcRenderer.on('fcsWebDirectory', this.onFcsWebLocationReceived)
        this.$electron.ipcRenderer.on('fcsUiDirectory', this.onFcsUiLocationReceived)
    },
    beforeDestroy() {
        this.$electron.ipcRenderer.removeListener('allFolderConfigurationsz', this.onConfigurationReceived)
        this.$electron.ipcRenderer.removeListener('fcsDirectory', this.onFcsLocationReceived)
        this.$electron.ipcRenderer.removeListener('fcsWebDirectory', this.onFcsWebLocationReceived)
        this.$electron.ipcRenderer.removeListener('fcsUiDirectory', this.onFcsUiLocationReceived)
    },
    data() {
        return {
            userConfiguration: {
                fcsLocation: '',
                fcsWebLocation: '',
                fcsUiLocation: ''
            }
        }
    },
    methods: {
        saveAllConfigurations() {
            this.$electron.ipcRenderer.send('updateFolderConfigurations', this.userConfiguration)
        },
        onFcsLocationReceived(event, message) {
            this.userConfiguration.fcsLocation = message[0]
        },
        onFcsWebLocationReceived(event, message) {
            this.userConfiguration.fcsWebLocation = message[0]
        },
        onFcsUiLocationReceived(event, message) {
            this.userConfiguration.fcsUiLocation = message[0]
        },
        mainOpenDirectory() {
            this.$electron.ipcRenderer.send('openDirectory')
        },
        onConfigurationReceived(event, message) {
            this.userConfiguration = message
            console.log(message)
        },
        getFcsLocation() {
            this.$electron.ipcRenderer.send('selectFcsDirectory')
        },
        getFcsWebLocation() {
            this.$electron.ipcRenderer.send('selectFcsWebDirectory')
        },
        getFcsUiLocation() {
            this.$electron.ipcRenderer.send('selectFcsUiDirectory')
        }
    }
}
</script>