<template>
  <div class="flex justify-center p-5 bg-[#1e1e1e] min-h-[60px]">
    <div class="relative flex items-center w-full max-w-[500px]">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="w-full px-5 py-3 bg-white/10 rounded-full text-white placeholder-white/70 outline-none transition-all duration-200 hover:bg-white/[0.15] focus:bg-white/[0.15]"
        @input="onSearch"
      />
      <img
        v-if="searchQuery"
        src="/img/close.png"
        alt="Clear search"
        class="absolute right-4 w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
        @click="clearSearch"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      placeholder: 'Food Recipe'
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery)
    },
    clearSearch() {
      this.searchQuery = ''
      this.$emit('search', '')
    }
  }
}
</script>