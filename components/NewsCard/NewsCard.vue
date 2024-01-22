<template>
  <div class="news-card" @click="$emit('open-popup', newsItem)">
    <div class="news-card__image-block">
      <img :src="newsImageUrl ? newsImageUrl : newsItem.picture" alt="News Image"/>
    </div>
    <div class="news-card__content">
      <h2 v-if="newsItem.title">{{ newsItem.title }}</h2>
      <div v-if="newsItem.tags && newsItem.tags.length" class="tags">
        <span v-for="(tag, index) in newsItem.tags"
              :key="index"
              :style="{ color: tag.values[0].color, borderColor: tag.values[0].color }"
        >
          {{ tag.values[0]?.name || '' }}
        </span>
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
