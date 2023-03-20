<script lang="ts">
    import { goto } from '$app/navigation';
    export let width: number, height: number, post: Post;
    import type { Post } from '$lib/types';
    
    import dayjs from 'dayjs';
    import advancedFormat from 'dayjs/plugin/advancedFormat';
    dayjs.extend(advancedFormat);
</script>

<button class="aspect-square group w-full h-full overflow-hidden bg-center shadow bg-no-repeat bg-cover border-4 rounded-lg cursor-pointer" style="background-image: url('https://l2dgt-blog-db.school.izmichael.com/api/files/posts/{post.id}/{post.image}'); border-color: {post.expand.category.color}; grid-column: span {width} / span {width}; grid-row: span {height} / span {height};" on:click={() => goto('/p/' + post.slug)}>
    <div class="group-hover:bg-black/70 flex flex-col items-start justify-end w-full h-full p-5 font-bold text-white">
        <h2 class="group-hover:opacity-100 mb-2 text-lg font-bold text-left opacity-0">{post.title}</h2>
        <h3 class="group-hover:opacity-100 text-sm text-left opacity-0">By {post.expand.author.username} - {post.expand.category.name}</h3>
        <h3 class="group-hover:opacity-100 text-sm text-left opacity-0">{dayjs(post.publishedAt).format('MMM Do, YYYY - HH:mm a')}</h3>
    </div>
</button>

<style>
    
</style>