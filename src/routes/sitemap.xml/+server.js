export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!--  created with Free Online Sitemap Generator www.xml-sitemaps.com  -->
    <url>
    <loc>https://fightcardshq.com/</loc>
    <lastmod>2024-02-15T02:46:23+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
    </url>
    <url>
    <loc>https://fightcardshq.com/blog</loc>
    <lastmod>2024-02-15T02:46:23+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://fightcardshq.com/blog/ufc-298-prediction</loc>
    <lastmod>2024-02-15T02:46:23+00:00</lastmod>
    <priority>0.64</priority>
    </url>
    </urlset>`;

	return new Response(sitemap);
}
