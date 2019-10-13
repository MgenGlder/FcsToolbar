<template>
    <div class="window-content">
        <div class="pane">
            <div class="settings-container">
                <h2 class="settings-header">Service Locations</h2>
                <div class="settings-section">
                    <button @click="getLocation('Fcs')">FCS</button>
                    <button @click="getLocation('FcsWeb')">FCS Web</button>
                    <button @click="getLocation('FcsUi')">FCS UI</button>
                    <br/> FCS: <input :value="folderLocations.fcs" disabled="disabled" />
                    <br/> FCS Web: <input :value="folderLocations.fcsWeb" disabled="disabled" />
                    <br/> FCS UI: <input :value="folderLocations.fcsUi" disabled="disabled" />
                    <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title">
                        Hover Me
                    </b-button>
    
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
        this.$electron.ipcRenderer.on('fcsDirectory', this.onLocationReceived('fcs'))
        this.$electron.ipcRenderer.on('fcsWebDirectory', this.onLocationReceived('fcsWeb'))
        this.$electron.ipcRenderer.on('fcsUiDirectory', this.onLocationReceived('fcsUi'))
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
        onLocationReceived(service) {
            return (event, message) => this.folderLocations = this.cloneAndReplaceField(this.folderLocations, service, message[0]);
        },
        onConfigurationReceived(event, message) {
            this.folderLocations = message.folderLocations
        },
        getLocation(service) {
            this.$electron.ipcRenderer.send(`select${service}Directory`)
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
    background: repeating-linear-gradient( 45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 10px, rgba(0, 0, 0, 0.3) 10px, rgba(0, 0, 0, 0.3) 20px)
}
</style>