<template>
  <h1>Основные новости</h1>
  <section className="content__news">
    <!--Карточка новости-->
    <NewsCard v-for="news in newsData" :key="news.id" :newsItem="news" @open-popup="openPopup"/>
    <!--Кнопка еще -->
    <div class="base-btn news-more-btn" btn-style="pink" @click="nextPage">
      <div class="base-btn__btn-content">
        <span class="base-btn__btn-title">показать ещё</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import NewsCard from "~/components/NewsCard/NewsCard.vue";
import {useFetch, useRouter} from "nuxt/app";
import {ref} from "vue";

const router = useRouter();
const newsData = ref([]);
const page = ref(1);

async function fetchData() {
  const Url = `https://bsk-admin.testers-site.ru/api/news?filter%5Btags%5D%5BTAG_TYPES%5D%5B0%5D=news&&page=${page.value}&filter%5BindexMode%5D=true`;

  const {data: data, error} = await useFetch(Url);
  console.log("Полученные данные: ", data);
  if (data._value?.data?.result?.list) {
    newsData.value.push(...data._value.data.result.list);
    console.log("Обработанные данные: ", newsData.value)
  } else if (error.value) {
    console.error("Ошибка: данные не найдены", error.value);
  }
}
fetchData()

function nextPage() {
  page.value++;
  fetchData();
}

function openPopup(newsItem) {
  router.push(`/news/${newsItem.code}`);
}

</script>

<style scoped>
@import "assets/styles/pages/NewsPage.scss";
</style>
