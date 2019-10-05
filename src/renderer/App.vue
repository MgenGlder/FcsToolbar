<template>
    <div id="app">
        <div>
            <div class="header-arrow" v-if="showHeaderAndFooter"></div>
            <div :class="{window: true, 'remove-top-padding': !showHeaderAndFooter}">
                <header class="toolbar toolbar-header" v-if="showHeaderAndFooter">
                    <h1 class="title">
                        FCS Toolbar
                        <span class="js-update-time"></span>
                    </h1>
                    <div class="toolbar-actions">
                        <div class="btn-group">
                            <router-link to="/landing-page">
                                <button class="btn btn-default">
                              <span class="icon icon-home icon-text"></span>
                              Home
                            </button>
                            </router-link>
                            <button class="btn btn-default">
                            <span class="icon icon-popup"></span>
                          </button>
                        </div>
    
                        <button class="btn btn-default">
                          <span class="icon icon-home icon-text"></span>
                          Filters
                        </button>
    
                        <button class="btn btn-default btn-dropdown pull-right">
                          <span class="icon icon-megaphone"></span>
                        </button>
                    </div>
                </header>
                <router-view @change-header-footer-display="toggleHeaderAndFooter"></router-view>
                <footer class="toolbar toolbar-footer" v-if="showHeaderAndFooter">
                    <div class="footer-link">
                        Powered by
                        <a href="http://kunle.io">Kunle</a>
                    </div>
    
                    <div class="toolbar-actions pull-right">
                        <div class="btn-group">
                            <button class="btn btn-default js-refresh-action">
                            <span class="icon icon-arrows-ccw js-refresh-action" title="Refresh"></span>
                          </button>
                            <router-link to="/settings" class="settings-icon">
                                <button class="btn btn-default">
                              <span class="settings icon icon-tools"></span>
                            </button>
                            </router-link>
                            <button class="btn btn-default js-quit-action">
                            <span class="icon icon-cancel js-quit-action" title="Quit"></span>
                          </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    mounted() {
        console.log(this.showHeaderAndFooter);
    },
    data() {
        return {
            showHeaderAndFooter: true
        };
    },
    methods: {
        routeToSettings() {
            this.$router.push({ name: "settings" });
        },
        toggleHeaderAndFooter(booleanValue) {
            console.log('Changing the headerFooterShow value to...' + booleanValue);
            this.showHeaderAndFooter = false;
        }
    }
};
</script>

<style>
/* CSS */

.settings-icon {
    width: 100%;
}

.remove-top-padding {
    top: 0;
}
</style>
