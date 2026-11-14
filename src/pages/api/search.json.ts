import { getCollection } from 'astro:content';

export async function GET() {
  const noticias = await getCollection('noticias');
  const sorted = noticias.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const payload = sorted.map((item) => ({
    slug: item.id,
    title: item.data.title,
    excerpt: item.data.excerpt,
    category: item.data.category,
    author: item.data.author,
    pubDate: item.data.pubDate,
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
