<template>
  <div>
    <ol>
      <li>
        <p class="is-size-3">
          <a href="https://www.facebook.com/Themillennialspress" target="_blank">Facebook:</a>
          <span class="is-size-5">https://www.facebook.com/Themillennialspress</span>
        </p>
      </li>
      <li>
        <p class="is-size-3">
          <a href="https://twitter.com/millennials_90" target="_blank">Twitter:</a>
          <span class="is-size-5">https://twitter.com/millennials_90</span>
        </p>
      </li>
      <li>
        <p class="is-size-3">
          <a href="https://www.instagram.com/themillennialspress/" target="_blank">Instagram:</a>
          <span class="is-size-5">https://www.instagram.com/themillennialspress/</span>
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Social Links | The Millennials Press Admin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Social Links',
          name: 'Social Links',
          content: 'Social Links | The Millennials Press Admin',
        },
      ],
    }
  },
}
</script>


<style scoped>
a:hover {
  color: coral;
}
</style>
