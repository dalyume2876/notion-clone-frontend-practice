# 개발 진척 상황 (`CURRENT_STATUS.md`)

> [!IMPORTANT]
> **AI 가이드라인**: 매 기능 구현 완료 시, 혹은 개발 진척에 변화가 있을 때마다 AI는 이 문서를 즉시 수정하여 최신 학습 단계와 작업 목록을 현행화해야 합니다.

---

## 1. 현재 학습 진행 단계
* **진행 단계**: **5단계 완료 (6단계 시작 대기)**
* **목표 진도**: [DEVELOPMENT_PLAN.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/DEVELOPMENT_PLAN.md) 기준 6단계 시작

| 단계 | 개발 영역 | 진행 상태 | 담당 학습 주제 |
| :--- | :--- | :---: | :--- |
| **0단계** | 학습 문서 설계 및 작성 | **완료 (Done)** | 학습 로드맵 및 협업 가이드라인 정립 |
| **1단계** | 정적 화면 구조 | **완료 (Done)** | React 컴포넌트 뼈대 및 CSS 레이아웃 구축 |
| **2단계** | Mock 문서 목록 | **완료 (Done)** | Props 전달과 Array 렌더링, 선택 상태 구현 |
| **3단계** | 목록 조회 API | **완료 (Done)** | `useEffect` 최초 데이터 fetch 적용 |
| **4단계** | 상세 조회 API | **완료 (Done)** | 의존성 배열을 통한 상세 ID 조회 동기화 |
| **5단계** | 문서 생성 API | **완료 (Done)** | POST 요청 및 이벤트 핸들링 |
| **6단계** | 문서 수정 및 저장 | 대기 중 | 제어 컴포넌트(Controlled Input) 및 PATCH 요청 |
| **7단계** | 문서 삭제 API | 대기 중 | DELETE 요청 및 상세/선택 해제 대응 |
| **8단계** | 디바운스 자동저장 | 대기 중 | `setTimeout` 디바운싱 및 Cleanup 함수 응용 |
| **9단계** | Spring Boot 연동 | 대기 중 | 로컬 실서버 CORS 해결 및 API 통합 검증 |

---

## 2. 완료된 기능 목록
* [x] **학습 설계**: 학습자가 주도적으로 React 구조를 익힐 수 있도록 하는 docs 가이드 문서 구축 완료.
* [x] **프론트엔드 환경 구성**: `front/`에 React + TypeScript + Vite 프로젝트 생성 및 개발 서버 실행 확인.
* [x] **최초 렌더링 학습**: `index.html → main.tsx → App.tsx` 연결과 DOM `#root`의 역할 확인.
* [x] **1단계 정적 화면 구조**: Router, Page, Layout, Sidebar, PageEditor를 분리하고 다크 테마 좌우 레이아웃 구성.
* [x] **2단계 Mock 문서 목록**: 타입이 적용된 Mock 배열을 Props로 전달하고 `map()`, 선택 상태, 클릭 이벤트, 활성 스타일 구현.
* [x] **3단계 목록 조회 API**: Axios와 JSON Server를 연결하고 `useEffect` 최초 요청 및 Loading/Error/Data 상태 구현.
* [x] **4단계 상세 조회 API**: 선택 ID 기반 상세 조회, 요청 취소, Loading/Error/Data 분기와 PageEditor 렌더링 구현.
* [x] **5단계 문서 생성 API**: POST 요청, 중복 요청 방지, 목록 재조회와 생성 문서 자동 선택 구현.

---

## 3. 진행 중인 기능
* **현재 태스크**: 5단계 새 문서 생성 API 완료
  * 생성 요청 타입과 `createPage` 구현 완료
  * 버튼 이벤트, 목록 갱신, 생성 문서 선택 및 오류 처리 검증 완료

---

## 4. 다음 구현 예정 기능
* **대상**: 6단계 - 문서 수정과 수동 저장
  * PATCH 요청 타입과 API 함수 작성
  * 제목과 본문을 제어 컴포넌트로 변경
  * 저장 버튼으로 수정 데이터를 서버에 반영

---

## 5. 현재 프로젝트 폴더 구조 현황
```text
notion-clone/
├─ docs/
   ├─ README.md
   ├─ PROJECT_OVERVIEW.md
   ├─ AI_WORKING_RULES.md
   ├─ FRONTEND_ARCHITECTURE.md
   ├─ FRONTEND_DATA_FLOW.md
   ├─ USE_EFFECT_GUIDE.md
   ├─ FEATURE_DEVELOPMENT_FLOW.md
   ├─ FEATURE_TEMPLATE.md
   ├─ DEVELOPMENT_PLAN.md
   ├─ DEVELOPMENT_CHECKLIST.md
   ├─ CURRENT_STATUS.md
   ├─ BACKEND_API_CONTRACT.md
   └─ LEARNING_CHECKLIST.md
└─ front/
   ├─ public/
   ├─ src/
   │  ├─ App.tsx
   │  ├─ main.tsx
   │  └─ index.css
   ├─ index.html
   ├─ package.json
   └─ vite.config.ts
```

---

## 6. 사용 중인 API 연동 목록
* `GET /api/pages` - JSON Server를 통한 문서 목록 조회
* `GET /api/pages/{pageId}` - 선택한 문서의 상세 조회
* `POST /api/pages` - 새 문서 생성

---

## 7. 알려진 버그 및 문제 사항
* 없음

---

## 8. 아직 복습 및 학습이 필요한 개념
* 없음 (학습 전)

---

## 9. 최근 결정 사항
1. **학습자 직접 코딩 규칙**: AI가 코드를 통째로 복사해 붙여넣는 방식을 전면 금지하고 설명 후 단계별 수동 입력을 지원하기로 결정함.
2. **스타일 방식**: 초기 복잡도를 내리고 React 기본기에 충족하기 위해 Tailwind CSS 대신 **Vanilla CSS**를 활용해 UI를 디자인하기로 함.
3. **프론트엔드 위치**: 학습 문서와 실행 코드를 분리하기 위해 React 프로젝트 루트를 `front/`로 구성함.
