<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor>家用电器</Floor>
    <Floor>手机数码</Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style></style>
