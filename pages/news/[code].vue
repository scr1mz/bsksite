<template>
  <div v-if="newsData">
    <NewsPopup :newsItem="newsData" @close-popup="closePopup"/>
  </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import NewsPopup from '~/components/NewsPopup/NewsPopup.vue';
import {useFetch} from "nuxt/app";

const route = useRoute();
const router = useRouter();
const newsCode = route.params.code;
const newsData = ref(null);

const Url = `https://bsk-admin.testers-site.ru/api/news/${newsCode}`;

const {data, error} = await useFetch(Url);
watchEffect(() => {
  if (data.value?.data?.result) {
    newsData.value = data.value.data.result;
  } else if (error.value){
    console.error("Ошибка: данные не найдены", error.value);
  }
});

function closePopup() {
  router.push('/news');
}
</script>
