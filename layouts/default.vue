<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <!-- <b-navbar-item tag="router-link" :to="{ path: '/' }"> </b-navbar-item> -->
      </template>

      <!-- <template slot="start">
        <b-navbar-item href="#">
          Home
        </b-navbar-item>
        <b-navbar-item href="#">
          Documentation
        </b-navbar-item>
      </template>-->

      <template slot="end">
        <b-navbar-item tag="div">
          <b-navbar-dropdown :label="$auth.user[0].email" :hoverable="true">
            <b-navbar-item href="#">setting</b-navbar-item>
            <b-navbar-item>
              <b-button @click="logoutUser()">logout</b-button>
            </b-navbar-item>
          </b-navbar-dropdown>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div v-if="loader" class="loading-page"></div>
    <div v-else class="columns" style="margin-top: -2.75rem;">
      <div class="column is-2" style="margin-top: -2rem;">
        <div class="sidebar-page">
          <section class="sidebar-layout">
            <b-sidebar
              position="static"
              mobile="reduce"
              :reduce="false"
              type="is-white"
              :expand-on-hover="true"
              :fullheight="true"
              open
            >
              <div class="p-1">
                <div class="block">
                  <img src="~assets/tm.png" alt="The Millennials Press" />
                </div>
                <b-menu class="is-custom-mobile">
                  <b-menu-list label="Menu">
                    <b-menu-item
                      icon="information-outline"
                      label="DashBoard"
                      tag="nuxt-link"
                      to="/"
                      exact
                    ></b-menu-item>
                    <b-menu-item
                      icon="ab-testing"
                      to="/category"
                      label="Category"
                      tag="nuxt-link"
                      exact
                    >
                      <!-- <b-menu-item icon="account" label="Users"></b-menu-item>
                      <b-menu-item
                       expanded
                        icon="cellphone-link"
                        label="Devices"
                      ></b-menu-item>
                      <b-menu-item
                        icon="cash-multiple"
                        label="Payments"
                        disabled
                      ></b-menu-item>-->
                    </b-menu-item>
                    <b-menu-item icon="newspaper-variant" label="Articles" expanded>
                      <!-- <b-menu-item icon="account-box" label="Add"></b-menu-item> -->
                      <b-menu-item
                        icon="plus-circle-outline"
                        label="Add"
                        to="/articles/addarticle"
                        tag="nuxt-link"
                        exact
                      ></b-menu-item>
                      <b-menu-item
                        icon="pencil-ruler"
                        label="View/Edit"
                        to="/articles/viewarticle"
                        tag="nuxt-link"
                        exact
                      ></b-menu-item>
                    </b-menu-item>
                    <b-menu-item icon="ghost" label="Trending" tag="nuxt-link" to="/trending" exact></b-menu-item>

                    <b-menu-item icon="account" label="Admins" tag="nuxt-link" to="/admins" exact></b-menu-item>
                    <b-menu-item
                      icon="currency-inr"
                      label="Donations"
                      tag="nuxt-link"
                      to="/donation"
                      exact
                    ></b-menu-item>
                    <b-menu-item
                      icon="link"
                      label="Usefull Links"
                      tag="nuxt-link"
                      to="/links"
                      exact
                    ></b-menu-item>
                    <b-menu-item
                      icon="thumb-up-outline"
                      label="Feedbacks"
                      tag="nuxt-link"
                      to="/feedbacks"
                      exact
                    ></b-menu-item>
                    <b-menu-item
                      icon="facebook"
                      label="Social Links"
                      tag="nuxt-link"
                      to="/social"
                      exact
                    ></b-menu-item>
                  </b-menu-list>
                </b-menu>
              </div>
            </b-sidebar>
          </section>
        </div>
      </div>
      <div class="column is-main-content">
        <div class="section">
          <PanelTop />
        </div>
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import PanelTop from '~/components/paneltop.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    PanelTop,
  },
  computed: {
    loader() {
      return mapGetters['getloader']
    },
  },
  methods: {
    async logoutUser() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss" scoped>
.box {
  margin: 10px 10px 10px 10px;
  color: #ec2300;
}
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}

a:hover {
  color: coral;
}
</style>


