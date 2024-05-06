<script lang="ts">
import "./Sidebar.scss";
import HomeIcon from "../../assets/Sidebar/home.svg?component";
import SettingsIcon from "../../assets/Sidebar/settings.svg?component";

export default {
  name: "Sidebar",
  components: {
    HomeIcon,
    SettingsIcon,
  },
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__content">
      <div class="sidebar__section sidebar__menu">
        <h3 class="sidebar__section-title">Menu</h3>
        <ul class="sidebar__list">
          <li class="sidebar__list-item">
            <router-link class="sidebar__link" to="/">
              <HomeIcon class="sidebar__icon" />
              {{ $t("titles.home") }}
            </router-link>
          </li>
          <li class="sidebar__list-item">
            <router-link class="sidebar__link" to="/settings">
              <SettingsIcon class="sidebar__icon" />
              {{ $t("titles.settings") }}
                </router-link>
          </li>
        </ul>
      </div>

      <!-- <h3 class="sidebar__section-title">Presets</h3> -->
    </div>
    <!-- <div class="sidebar__statistics">

        </div> -->
  </aside>
</template>
