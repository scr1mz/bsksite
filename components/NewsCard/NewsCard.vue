<template>
  <div class="news-data-content">
    <div class="news-card" @click="$emit('open-popup', newsItem)">
      <div class="news-card__news-date">
        <span>{{ newsItem.date }}</span>
      </div>
      <div class="news-card__image-block">
        <img :src="newsImageUrl ? newsImageUrl : newsItem.picture" alt="News Image"/>
      </div>
      <div class="news-card__content">
        <div class="news-card__title">
          <span class="title-span" v-if="newsItem.title">{{ newsItem.title }}</span>
        </div>
        <div v-if="newsItem.tags && newsItem.tags.length" class="tags">
        <span v-for="(tag, index) in newsItem.tags"
              :key="index"
              :class="{[tag.values[0].color] : true}"
        >
          {{ tag.values[0]?.name || '' }}
        </span>
        </div>
      </div>
    </div>
    <div class="arrow-mask">
      <div class="arrow-icon">
        <i class="far fa-long-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps({
  newsItem: Object
});

const newsImageUrl = computed(() => {
  return props.newsItem.meta?.elementOgImage?.src || '';
});
</script>

<style scoped>
@import "assets/styles/components/NewsCard.scss";
</style>
