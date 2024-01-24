<template>
  <h1>Новости</h1>
  <section className="content__news">
    <NewsCard v-for="news in newsData" :key="news.id" :newsItem="news" @open-popup="openPopup"/>
  </section>
</template>

<script setup>
import NewsCard from "~/components/NewsCard/NewsCard.vue";
import {useFetch, useRouter} from "nuxt/app";
import {ref, watchEffect} from "vue";

const router = useRouter();
const newsData = ref([]);
const Url = "https://bsk-admin.testers-site.ru/api/news/novogodnee-vesele-ot-kompanii-bsk-kak-proshla-yelkabsk-v-2023-godu";

const {data, error} = await useFetch(Url);
  data.value?.then(response => {
    if (response?.data?.result) {
      newsData.value = [response.data.result];
    } else {
      console.error("Ошибка: данные не найдены");
    }
  }).catch(err => {
    console.error("Произошла ошибка при запросе данных:", err);
  });

function openPopup(newsItem) {
  router.push(`/news/${newsItem.code}`);
}

</script>

<style scoped>
@import "assets/styles/pages/NewsPage.scss";
</style>
