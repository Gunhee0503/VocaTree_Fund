# VOCA TREE 어휘테스트

보카트리 Fundamental 1~4강 어휘테스트 PWA

## 🌐 GitHub Pages 배포 방법

### 1️⃣ GitHub 저장소 만들기

1. GitHub에 로그인 → 우측 상단 `+` → **New repository**
2. Repository name: `voca-tree-quiz` (원하는 이름으로)
3. **Public** 선택 (Pages는 Public 저장소에서 무료)
4. **Create repository** 클릭

### 2️⃣ 이 폴더의 파일 모두 업로드

저장소 페이지에서 **uploading an existing file** 클릭 → 아래 파일들을 모두 드래그&드롭:

```
index.html
manifest.json
sw.js
icon.svg
icon-192.png
icon-512.png
icon-maskable-512.png
icon-maskable.svg
README.md
```

**Commit changes** 클릭으로 업로드 완료.

### 3️⃣ GitHub Pages 활성화

1. 저장소의 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** → `Deploy from a branch`
4. **Branch** → `main` (또는 `master`) → `/ (root)` → **Save**
5. 1~2분 후 페이지 상단에 URL이 표시됨:
   `https://<your-username>.github.io/voca-tree-quiz/`

### 4️⃣ 학생들에게 URL 공유

이제 학생들이 위 URL에 접속하면 어휘테스트를 사용할 수 있습니다.

**📱 모바일 앱처럼 설치하기 (PWA)**

- **iPhone (Safari)**: 공유 버튼 → "홈 화면에 추가"
- **Android (Chrome)**: 메뉴(⋮) → "홈 화면에 추가" 또는 "앱 설치"

설치 후 홈 화면에 VOCA TREE 아이콘이 생기고, 일반 앱처럼 전체 화면으로 실행됩니다.

---

## 🔧 선생님 초기 설정

학생 응시 결과를 Google 스프레드시트로 받으려면 한 번만 설정이 필요합니다.

1. [sheets.new](https://sheets.new) 에서 빈 스프레드시트 생성
2. 메뉴 → **확장 프로그램** → **Apps Script**
3. 앱의 선생님 모드(상단 토글) → 비밀번호 `vocatree2024` 입력 후 로그인
4. **⚙️ 설정** → **📘 설정 가이드** → **📋 Apps Script 코드 복사**
5. 복사한 코드를 Apps Script 편집기에 붙여넣기 → 저장
6. **배포** → **새 배포** → **웹 앱**
   - 다음 사용자로 실행: 본인
   - 액세스 권한: **모든 사용자** ⚠️ 중요
7. 받은 URL을 앱 설정에 붙여넣기 → 저장 끝!

---

## 🔄 앱 업데이트하는 방법

내용을 수정한 뒤 GitHub에 다시 업로드하면, 학생들의 앱은 자동으로 새 버전을 받게 됩니다.

**중요**: 큰 업데이트가 있다면 `sw.js` 파일의 `CACHE_VERSION = 'v1.0.0'` 부분을 `'v1.0.1'`처럼 올려주세요. 그러면 학생들이 옛날 버전 캐시를 무시하고 새 버전을 받게 됩니다.

---

## 📁 파일 구조

| 파일 | 설명 |
|---|---|
| `index.html` | 메인 앱 (HTML + CSS + JS 모두 포함) |
| `manifest.json` | PWA 설정 (이름, 아이콘, 색상) |
| `sw.js` | Service Worker (오프라인 지원, 캐싱) |
| `icon.svg` | 벡터 아이콘 (모든 크기 대응) |
| `icon-192.png`, `icon-512.png` | Android/Chrome용 아이콘 |
| `icon-maskable-512.png` | Android 적응형 아이콘 |

---

## 🎨 커스터마이징

- **앱 이름 변경**: `manifest.json`의 `name`, `short_name`, `index.html`의 `<title>` 수정
- **테마 색상 변경**: `manifest.json`의 `theme_color`, `background_color`, `index.html`의 CSS `:root` 변수 수정
- **선생님 비밀번호 변경**: `index.html`에서 `const TEACHER_PASSWORD = 'vocatree2024'` 부분 변경
- **학생 배포용 고정 URL**: `index.html`의 `const DEFAULT_APPS_SCRIPT_URL = ''`에 URL 직접 입력

---

## 💡 PWA 특징

- ✅ 설치 후 홈 화면에서 앱처럼 실행
- ✅ 오프라인에서도 학습 가능 (이미 본 페이지)
- ✅ iOS, Android, 데스크톱 모두 지원
- ✅ 자동 업데이트 (다음 실행 시 새 버전 적용)
- ✅ 별도 스토어 등록/심사 불필요
