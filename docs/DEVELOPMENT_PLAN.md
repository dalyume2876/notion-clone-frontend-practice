# 단계별 개발 계획서 (`DEVELOPMENT_PLAN.md`)

이 문서는 React Notion Clone 프로젝트의 로드맵입니다. 정적 화면 구성부터 데이터 바인딩, 동적인 비동기 통신, 그리고 실제 백엔드 연동까지 총 **9단계**에 나누어 개발을 진행합니다.

---

## 단계별 개발 로드맵 요약

```text
1단계: 정적 UI 뼈대 ──> 2단계: Mock 목록 렌더링 ──> 3단계: 목록조회 API 연동 ──> 4단계: 상세조회 API 연동
                                                                                      |
7단계: 문서 삭제 API <── 6단계: 수정/수동저장 <── 5단계: 문서 생성 API <───+
|
v
8단계: 디바운스 자동저장 ──> 9단계: Spring Boot 실연동
```

---

## 각 단계별 세부 가이드

### 1단계: 정적 화면 구조 (Static UI Layout)
* **목표**: 디자인을 예쁘게 다듬기보다 React 프로젝트의 파일 분리 원칙과 조립 방식(Layout + Page + Component)을 구조적으로 파악합니다.
* **구현 구성**:
  * [App.tsx](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/app/App.tsx) 및 [router.tsx](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/app/router.tsx) 라우터 세팅.
  * [WorkspaceLayout.tsx](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/layouts/WorkspaceLayout/WorkspaceLayout.tsx) 좌우 분할 구조 설정.
  * [Sidebar.tsx](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/components/Sidebar/Sidebar.tsx) 및 [PageEditor.tsx](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/components/PageEditor/PageEditor.tsx)의 껍데기 마크업 배치.
* **학습 포인트**: 왜 화면을 Layout과 Page로 나눠야 하는가? CSS Flex/Grid를 사용해 어떻게 전체 레이아웃 구도를 짜는가?
* **완료 조건**: 브라우저 주소창에 `/` 입력 시 좌측 회색 사이드바와 우측 본문 에디터 형태가 화면에 잘 나타남.

---

### 2단계: Mock 문서 목록 (Mock Listing & Selection)
* **목표**: 하드코딩된 목록 대신, 데이터 배열을 받아 동적으로 화면에 그리는 방법과 Props를 통한 상태 제어를 익힙니다.
* **구현 구성**:
  * [page.ts](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/types/page.ts)에 `PageSummary` 타입 정의.
  * `WorkspacePage`에 임시 Mock 데이터 배열 선언.
  * [PageListItem.tsx](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/components/PageListItem/PageListItem.tsx) 컴포넌트 추가 및 `Array.prototype.map()`을 이용한 목록 렌더링.
  * `selectedPageId` 상태를 만들어 특정 아이템 클릭 시 스타일 변경 처리.
* **학습 포인트**: React에서 리스트 렌더링 시 `key` props가 왜 필요한가? 상태 끌어올리기를 왜 해야 하는가?
* **완료 조건**: 사이드바의 특정 문서 제목을 마우스로 클릭하면 클릭한 항목의 배경색이 파랗게 강조 처리됨.

---

### 3단계: 목록 조회 API (Fetch List API)
* **목표**: 비동기 데이터 통신의 라이프사이클을 이해하고, 최초 화면 기입 시에 네트워크 데이터를 다루는 방법을 학습합니다.
* **구현 구성**:
  * [pageApi.ts](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/api/pageApi.ts) 내에 전체 문서를 가져오는 `getPages` 비동기 함수 구현.
  * `WorkspacePage` 내에서 `useEffect`와 빈 의존성 배열(`[]`)을 활용해 마운트 시점에 해당 API 실행.
  * `isLoading`, `error` 상태를 만들어 통신 상황 분기 처리.
* **학습 포인트**: 왜 데이터 로드를 이벤트 핸들러가 아닌 `useEffect`에서 실행해야 하는가?
* **완료 조건**: 화면 로드 시 약 0.5초간 "불러오는 중..." 문구가 떴다가 Mock 문서 목록이 정상 출력됨.

---

### 4단계: 상세 조회 (Fetch Page Detail)
* **목표**: 의존성 배열의 변경 감지 동작을 이해하고, 상세 API 요청과 데이터 바인딩을 구현합니다.
* **구현 구성**:
  * `page.ts`에 `PageDetail` 타입 선언.
  * `pageApi`에 ID 기반 조회 함수 `getPageById` 추가.
  * `WorkspacePage`에서 `selectedPageId` 변경을 감지하는 `useEffect` 작성하여 상세 정보 로드.
* **학습 포인트**: 의존성 배열에 값이 들어갔을 때의 동작과, API 응답 데이터를 자식 에디터에 주입하는 Props 흐름 이해.
* **완료 조건**: 사이드바의 문서 목록 중 하나를 클릭하면 우측 에디터 제목 인풋창과 본문 텍스트창에 해당 문서의 정보가 채워짐.

---

### 5단계: 새 문서 생성 (Create Document)
* **목표**: 사용자의 동작(이벤트)으로 서버에 새 리소스를 생성하고, 기존 목록 상태를 갱신하는 일련의 동기화 흐름을 학습합니다.
* **구현 구성**:
  * `api` 폴더에 `createPage` 비동기 함수 (`POST /api/pages`) 생성.
  * 사이드바 내 '새 페이지' 버튼에 `onClick` 이벤트 핸들러 결합.
  * 문서 생성 완료 시, 새로 발행된 ID로 `selectedPageId`를 변경하고 전체 목록을 갱신(Refetch)함.
* **학습 포인트**: 왜 문서 생성 API는 `useEffect`가 아니라 버튼 이벤트 핸들러 함수에서 실행해야 하는가?
* **완료 조건**: '새 페이지' 버튼 클릭 시 즉시 사이드바 목록 하단에 '제목 없음' 문서가 생기며, 그 문서가 선택되어 우측에 빈 텍스트 에디터가 나타남.

---

### 6단계: 문서 수정과 저장 (Edit & Manual Save)
* **목표**: React에서 입력을 제어하는 Controlled Input의 원리를 배우고 수동 저장 구조를 개발합니다.
* **구현 구성**:
  * `PageEditor` 내에 임시 수정을 보존할 `localTitle`, `localContent` 상태 정의.
  * 제목 Input과 본문 Textarea에 `onChange` 이벤트와 `value` 매핑.
  * 우측 상단 '저장' 버튼에 `savePage` API (`PATCH /api/pages/{id}`) 매핑.
* **학습 포인트**: 단방향 데이터 흐름에서 자식이 입력한 텍스트 상태를 어떻게 관리해야 화면이 밀리지 않는가?
* **완료 조건**: 글을 수정하고 '저장' 버튼을 누르면 저장 성공 메시지가 뜨고 사이드바 목록의 제목도 수정된 이름으로 갱신됨.

---

### 7단계: 문서 삭제 (Delete Document)
* **목표**: 삭제 API를 실행하고, 삭제 완료 후 메모리 상의 선택 ID 상태와 목록 배열을 초기화하는 방법을 학습합니다.
* **구현 구성**:
  * `pageApi`에 `deletePage` (`DELETE /api/pages/{id}`) 함수 구현.
  * 에디터 또는 헤더 우측 상단에 '삭제' 버튼 컴포넌트 추가 및 핸들러 연결.
  * 삭제 처리 성공 시, `selectedPageId`를 `null`로 돌려놓고 목록 갱신.
* **학습 포인트**: 데이터 삭제 시 화면의 포커스 상태(선택된 상태)를 어떻게 안전하게 비우거나 다음 항목으로 넘길 것인가?
* **완료 조건**: '삭제' 버튼을 클릭하면 사이드바 목록에서 제거되며 에디터가 초기 빈 상태("편집할 문서를 선택해 주세요")로 전환됨.

---

### 8단계: 자동 저장 (Debounced Auto-Save)
* **목표**: `useEffect`와 디바운싱(Debounce) 개념을 심화 학습하고 Cleanup 함수의 실사용 사례를 구축합니다.
* **구현 구성**:
  * 에디터 로컬 글 수정이 일어날 때마다 `useEffect` 트리거.
  * `setTimeout`을 통해 1.5초 타이머 세팅 후 API 호출.
  * 1.5초가 되기 전에 다시 사용자가 타이핑을 시작하면 이전 `clearTimeout`을 실행하여 API 중복 호출 낭비 차단.
  * 헤더 영역에 '저장 중...', '저장 완료' 등의 시각적 플래그 렌더링.
* **학습 포인트**: Cleanup 함수가 실행되는 순서와 디바운싱 처리를 통해 성능을 향상하는 이론 터득.
* **완료 조건**: 글을 작성하는 중에는 상단에 '저장 중...'이 유지되며, 타이핑을 멈추고 1.5초가 지나면 '저장 완료'로 변경되면서 서버에 데이터가 저장됨.

---

### 9단계: 실제 Spring Boot 연동 (Backend Integration)
* **목표**: Mock 데이터 통신을 실제 포트의 백엔드 통신으로 전향하면서 CORS, API 인코딩, 공통 Axios 환경 세팅 등 통합 운영 기법을 학습합니다.
* **구현 구성**:
  * [axiosInstance.ts](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/api/axiosInstance.ts)에 백엔드 실서버 API 주소(예: `http://localhost:8080/api`) 입력.
  * CORS 에러 대응법 확인 및 프론트에서 커스텀 헤더 대응법 체크.
  * 백엔드 서버 응답 규격이 바뀔 때 TypeScript 컴파일 타입이 잡아주는 안정성 검증.
* **학습 포인트**: 서버 장애나 유효성 검사 에러(400 Bad Request, 404 Not Found)를 프론트엔드 화면에서 어떻게 에러 처리로 녹여내어 보여줄 것인가?
* **완료 조건**: 로컬에 기동한 Spring Boot 백엔드 애플리케이션의 DB 데이터가 React Notion Clone 화면에 연동되어 정상 기능 작동함.
