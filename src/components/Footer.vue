<template>
  <div class="footer-outer-wrapper">
    <div class="footer-wrapper">
      <div class="link-wrapper">
        <div v-for="group in linkGroups"
             :key="group.id"
             class="link-section"
        >
          <div
              @click="toggleGroup(group.id)"
              class="group-heading-wrapper">
            <p class="group-header">{{ group.groupHeader }}</p>
            <div v-if="!hasTabletSize" class="icon-wrapper">
              <img
                  :class="{'rotate': group.isOpen}"
                  :src="getImage('ic_chevron.png')" alt="chevron">
            </div>
          </div>
          <div v-if="group.isOpen" class="links">
            <router-link
                v-for="(link, index) in group.links"
                :key="index"
                :to="{name: link.pathName}">
              {{ link.linkText }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="bottom-section">
        <div class="socials">
          <p>Updates gewünscht?</p>
          <div class="social-flex">
            <a class="social" href="https://www.instagram.com/">
              <div class="icon-wrapper">
                <img :src="getImage('ic_instagram.png')" alt="instagram">
              </div>
            </a>
            <a class="social" href="https://www.facebook.com/">
              <div class="icon-wrapper">
                <img :src="getImage('ic_facebook.png')" alt="facebook">
              </div>
            </a>
          </div>
        </div>
        <div class="partner">
          <p>...in Zusammenarbeit mit</p>
          <a href="https://freieredner.at/?gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVA5gXL_Eio1Z7rLDB4IMg5dxgrwKyoazUWmLHzZ1vaP8qhdy7vQm4hoCAjUQAvD_BwE">
            <div class="icon-wrapper">
              <img :src="getImage('freierednerlogo.png')" alt="freieredner">
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import {getImage} from "@/utils/ImageUtils";

const windowWidth = ref(window.innerWidth)

const hasTabletSize = computed(() => {
  return windowWidth.value >= 740
})

function updateGroupOpenStatus() {
  linkGroups.value.forEach((group) => {
    group.isOpen = hasTabletSize.value;
  });
}


function updateWindowSize() {
  windowWidth.value = window.innerWidth
  updateGroupOpenStatus();
}

onMounted(() => {
  window.addEventListener('resize', updateWindowSize)
  updateGroupOpenStatus();
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})

const linkGroups = ref([
  {
    id: 1,
    groupHeader: 'Das Wichtigste',
    links: [
      {
        pathName: 'about',
        linkText: 'Über mich'
      },
      {
        pathName: 'wedding',
        linkText: 'Hochzeiten'
      },
      {
        pathName: 'child-celebration',
        linkText: 'Kinderwillkommensfest'
      },
      {
        pathName: 'celebrations',
        linkText: 'Lebensfeier / Trauerfeier'
      }
    ],
    isOpen: false
  },
  {
    id: 2,
    groupHeader: 'Mal reinschauen',
    links: [
      {
        pathName: 'imprint',
        linkText: 'Impressum'
      },
      {
        pathName: 'data-protection',
        linkText: 'Datenschutz'
      }
    ],
    isOpen: false
  }
])

function toggleGroup(groupId: number) {
  if (hasTabletSize.value) return;
  linkGroups.value.forEach((group) => {
    if (group.id === groupId) {
      group.isOpen = !group.isOpen;
    } else {
      group.isOpen = false;
    }
  });
}

</script>

<style scoped>

.footer-outer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 14px;

  .footer-wrapper {
    width: 90%;
    max-width: 1250px;
    box-sizing: border-box;
    padding: 18px 32px;
    border-radius: 14px;
    background-color: var(--beige);
    display: flex;
    flex-direction: column;
    gap: 24px;

    .link-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .link-section {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .group-heading-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;

          .group-header {
            font-weight: 600;
          }

          .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 20px;
              height: 20px;
              transition: transform 150ms ease-in-out;

              &.rotate {
                transform: rotate(180deg);
              }
            }
          }
        }

        .links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      }
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: var(--dark-green);
    }

    .bottom-section {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .socials {
        display: flex;
        flex-direction: column;
        gap: 8px;

        p {
          font-weight: 600;
        }

        .social-flex {
          display: flex;
          align-items: center;
          gap: 10px;

          .social {
            .icon-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 32px;
                height: 32px;
              }
            }
          }
        }
      }

      .partner {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 180px;
            height: auto;
          }
        }
      }
    }
  }
}

@media (min-width: 740px) {
  .footer-outer-wrapper {
    margin-bottom: 24px;

    .footer-wrapper {
      padding: 24px 38px;

      .link-wrapper {
        flex-direction: row;
        gap: 100px;

      }
    }
  }
}

@media (min-width: 1200px) {
  .footer-outer-wrapper {
    margin-bottom: 34px;

    .footer-wrapper {
      padding: 30px 44px;
    }
  }
}
</style>