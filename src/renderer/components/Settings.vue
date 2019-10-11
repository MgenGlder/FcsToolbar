<template>
    <div class="window-content">
        <div class="pane">
            <div class="settings-container">
                <h2 class="settings-header">Service Locations</h2>
                <div class="settings-section">
                    <button @click="getFcsLocation">FCS</button>
                    <button @click="getFcsWebLocation">FCS Web</button>
                    <button @click="getFcsUiLocation">FCS UI</button>
                    <br/> FCS: <input :value="folderLocations.fcs" disabled="disabled" />
                    <br/> FCS Web: <input :value="folderLocations.fcsWeb" disabled="disabled" />
                    <br/> FCS UI: <input :value="folderLocations.fcsUi" disabled="disabled" />
                    <br/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
    name: 'Settings',
    mounted() {
        this.$electron.ipcRenderer.send('allFolderConfigurations')
        this.$electron.ipcRenderer.on('allFolderConfigurations', this.onConfigurationReceived)
        this.$electron.ipcRenderer.on('fcsDirectory', this.onFcsLocationReceived)
        this.$electron.ipcRenderer.on('fcsWebDirectory', this.onFcsWebLocationReceived)
        this.$electron.ipcRenderer.on('fcsUiDirectory', this.onFcsUiLocationReceived)
        console.log(this.$store)
    },
    beforeDestroy() {
        this.$electron.ipcRenderer.removeListener('allFolderConfigurations', this.onConfigurationReceived)
        this.$electron.ipcRenderer.removeListener('fcsDirectory', this.onFcsLocationReceived)
        this.$electron.ipcRenderer.removeListener('fcsWebDirectory', this.onFcsWebLocationReceived)
        this.$electron.ipcRenderer.removeListener('fcsUiDirectory', this.onFcsUiLocationReceived)
    },
    computed: {
        folderLocations: {
            get() {
                return this.$store.getters['UserConfiguration/getFolderLocations']
            },
            set(value) {
                this.$store.dispatch('UserConfiguration/setFolderLocations', value)
            }
        }
    },
    methods: {
        saveAllConfigurations() {
            this.$electron.ipcRenderer.send('updateFolderConfigurations', { folderLocations: this.folderLocations });
        },
        onFcsLocationReceived(event, message) {
            this.folderLocations = this.cloneAndReplaceField(this.folderLocations, 'fcs', message[0]);
        },
        onFcsWebLocationReceived(event, message) {

            this.folderLocations = this.cloneAndReplaceField(this.folderLocations, 'fcsWeb', message[0]);
        },
        onFcsUiLocationReceived(event, message) {
            this.folderLocations = this.cloneAndReplaceField(this.folderLocations, 'fcsUi', message[0]);
        },
        mainOpenDirectory() {
            this.$electron.ipcRenderer.send('openDirectory')
        },
        onConfigurationReceived(event, message) {
            this.folderLocations = message.folderLocations
        },
        getFcsLocation() {
            this.$electron.ipcRenderer.send('selectFcsDirectory')
        },
        getFcsWebLocation() {
            this.$electron.ipcRenderer.send('selectFcsWebDirectory')
        },
        getFcsUiLocation() {
            this.$electron.ipcRenderer.send('selectFcsUiDirectory')
        },
        cloneAndReplaceField(targetObject, fieldToReplace, valueToReplaceWith) {
            let clonedTarget = cloneDeep(targetObject);
            clonedTarget[fieldToReplace] = valueToReplaceWith;
            return clonedTarget;
        }
    }
}
</script>

<style scoped>
.settings-header {
    text-align: center;
}
.settings-container {
    background-color: white;
    margin: 20px;
    border-radius: 20px;
}
.settings-section {
    margin-left: 15px;
}
.pane {
    background: repeating-linear-gradient(
  45deg,
  rgba(0, 0, 0, 0.2),
  rgba(0, 0, 0, 0.2) 10px,
  rgba(0, 0, 0, 0.3) 10px,
  rgba(0, 0, 0, 0.3) 20px
)
}
</style>