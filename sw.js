// VOCA TREE Service Worker
// 캐시 버전 (앱 업데이트 시 이 숫자를 올리세요)
const CACHE_VERSION = 'v6.3.0';
const CACHE_NAME = 'vocatree-' + CACHE_VERSION;

// 오프라인에서도 작동하게 미리 캐시할 파일들
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './p_symbol.png'
];

// === 설치: 핵심 파일 미리 캐시 ===
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS).catch(err => {
        // 일부 파일이 없어도 계속 진행 (예: png가 없을 수 있음)
        console.warn('Some assets failed to cache:', err);
      });
    })
  );
});

// === 활성화: 옛 캐시 정리 ===
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// === 요청 처리 ===
// 전략:
// - Apps Script 요청 (script.google.com) → 항상 네트워크 (캐시 X)
// - 같은 도메인 정적 파일 → 캐시 우선, 실패 시 네트워크
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 외부 API 요청은 절대 캐시하지 않음 (학생 결과 전송 등)
  if (url.hostname.includes('script.google.com') ||
      url.hostname.includes('googleusercontent.com')) {
    return; // 브라우저 기본 동작
  }

  // GET 요청만 캐시 (POST 등은 그대로 통과)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // 백그라운드에서 새 버전을 받아와 캐시 갱신 (Stale-While-Revalidate)
        fetch(event.request).then(fresh => {
          if (fresh && fresh.ok) {
            caches.open(CACHE_NAME).then(c => c.put(event.request, fresh.clone()));
          }
        }).catch(() => {});
        return cached;
      }
      // 캐시에 없으면 네트워크에서 받아오기
      return fetch(event.request).then(fresh => {
        if (fresh && fresh.ok && url.origin === location.origin) {
          const clone = fresh.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return fresh;
      }).catch(() => {
        // 오프라인이고 캐시도 없으면 인덱스 페이지로 폴백
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
