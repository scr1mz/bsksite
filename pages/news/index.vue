<template>
  <h1>Основные новости</h1>
  <section className="content__news">
    <NewsCard v-for="news in newsData" :key="news.id" :newsItem="news" @open-popup="openPopup"/>
  </section>
</template>

<script setup>
import NewsCard from "~/components/NewsCard/NewsCard.vue";
import {useFetch, useRouter} from "nuxt/app";
import {ref} from "vue";

const router = useRouter();
const newsData = ref([]);
const Url = "https://bsk-admin.testers-site.ru/api/news/novogodnee-vesele-ot-kompanii-bsk-kak-proshla-yelkabsk-v-2023-godu";

const {data, error} = await useFetch(Url)
if (data.value?.data?.result) {
  newsData.value = [data.value?.data.result];
} else if (error.value) {
  console.error("Ошибка: данные не найдены", error.value);
}

function openPopup(newsItem) {
  router.push(`/news/${newsItem.code}`);
}

</script>

<style scoped>
@import "assets/styles/pages/NewsPage.scss";
</style>
