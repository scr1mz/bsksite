<template>
  <div class="news-popup">
    <div class="popup-container">
      <div class="scroll-progress"></div>
      <!-- Хедер попап -->
      <div class="popup-header" :class="{ 'is_fixed': isHeaderFixed || isMobile }" ref="popupHeader">
        <div v-show="isHeaderFixed || isMobile" class="bread header-bread">
          <ul :class=" { 'breadcrumbs' : true , 'title_only': isHeaderFixed }">
            <li class="bread__item">главная</li>
            <li class="bread__item">новости</li>
            <li v-if="newsItem.title" class="bread__item">{{ newsItem.title }}</li>
          </ul>
        </div>
        <!-- Кнопка закрытия -->
        <div class="close-button" @click="$emit('close-popup')">
          <i class="fas fa-times close-button__icon"></i>
        </div>
      </div>
      <!-- Контейнер скролла -->
      <div class="popup-container__scroll-container" ref="scrollContainer">
        <!-- Контейнер попап -->
        <div class="popup-container__content-container">
          <!-- Попап контент -->
          <div class="popup-content">
            <div v-show="!isHeaderFixed && !isMobile" class="bread">
              <ul :class=" { 'breadcrumbs' : true } ">
                <li class="bread__item">главная</li>
                <li class="bread__item">новости</li>
                <li v-if="newsItem.title" class="bread__item">{{ newsItem.title }}</li>
              </ul>
            </div>
            <!-- Теги -->
            <div v-show="newsItem.tags && newsItem.tags.length" class="tags">
          <span v-for="(tag, index) in newsItem.tags"
                :key="index"
                :class="{[tag.values[0].color] : true}"
          >
            {{ tag.values[0]?.name || '' }}
          </span>
            </div>
            <!-- Заголовок -->
            <h1 v-if="newsItem.title" class="popup-title" ref="popupTitle">{{ newsItem.title }}</h1>
            <!-- Дата -->
            <span class="popup-news-date">{{ newsItem.date }}</span>
            <!-- Контент -->
            <div v-for="(item, index) in newsItem.content" :key="index">
              <p v-if="item.type === 'text'">{{ item.content }}</p>
              <img class="popup-content__img" v-if="item.type === 'mediaBlock'" :src="item.element.src" alt="News Image"/>
            </div>

            <!-- Следующая статья -->
            <h2>Следующая статья</h2>
            <NewsCard :newsItem="newsItem.next" @open-popup="openPopup"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted, ref } from "vue";
import '@fortawesome/fontawesome-free/css/all.css';
import NewsCard from "~/components/NewsCard/NewsCard.vue";

const props = defineProps({
  newsItem: Object,
});

const scrollContainer = ref(null);
const popupHeader = ref(null);
const isHeaderFixed = ref(false);
const popupTitle = ref(null);
const isMobile = ref(false);

//Обновление скроллбара
const updateProgressBar = () => {
  if (scrollContainer.value) {
    const progressBar = document.querySelector('.scroll-progress');
    const containerHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight;
    const scrollPosition = scrollContainer.value.scrollTop;
    const width = (scrollPosition / containerHeight) * 100;
    progressBar.style.width = `${width}%`;
  }
};

const checkDeviceType = () => {
  isMobile.value = window.innerWidth <= 768;
};

//Отслеживание скролла
let lastScrollTop = 0;
const handleScroll = () => {
  const scrollTop = scrollContainer.value.scrollTop;
  if (scrollTop - lastScrollTop) {
    lastScrollTop = scrollTop;
    window.requestAnimationFrame(() => {
      updateProgressBar();
      checkHeaderPosition();
    });
  }
};

const checkHeaderPosition = () => {
  if (!popupHeader.value || !popupTitle.value || !scrollContainer.value) return;

  const titleRect = popupTitle.value.getBoundingClientRect();
  const containerRect = scrollContainer.value.getBoundingClientRect();

  console.log("titleRect.bottom", titleRect.bottom, "containerRect.top", containerRect.top);
  // Проверка, скрылся ли заголовок из вида
  isHeaderFixed.value = titleRect.bottom < containerRect.top;
};

onMounted(() => {
  if (scrollContainer.value && scrollContainer.value instanceof HTMLElement) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
  window.addEventListener('resize', checkDeviceType);
  checkHeaderPosition();
  checkDeviceType();
});

onUnmounted(() => {
  if (scrollContainer.value && scrollContainer.value instanceof HTMLElement) {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
  }
  window.removeEventListener('resize', checkDeviceType);
});

</script>

<style scoped>
@import "assets/styles/components/NewsPopup.scss";
</style>
