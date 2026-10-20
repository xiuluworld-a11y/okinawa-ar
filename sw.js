const CACHE_NAME = 'cave-ar-cache-v1';

// ★スマホの中に絶対に保存（キャッシュ）しておきたいファイルの一覧
const ASSETS = [
  './',                  // トップページ（index.html）
  './index.html',        // あなたのHTMLファイル名
  './cave_quest_A.png',  // A地点の画像ファイル名
  './cave_quest_B.png'   // B地点の画像ファイル名（画像が増えたらここに追加します）
];

// インストール時にファイルを全てスマホにダウンロード保存する
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// オフライン（ネットがない時）は、スマホ内に保存したデータからページを即座に開く
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
