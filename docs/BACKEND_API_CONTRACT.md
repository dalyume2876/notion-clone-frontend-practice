# 백엔드 API 명세서 (`BACKEND_API_CONTRACT.md`)

이 명세서는 프론트엔드가 백엔드 서버(혹은 임시 Mock API)와 데이터를 주고받을 때 사용하는 통신 계약서입니다. Spring Boot를 연동하기 전까지는 이 규격을 기반으로 가짜 데이터를 반환하여 개발합니다.

---

## 1. API 요약표

| HTTP Method | 엔드포인트 URL | 설명 | 연동 개발 단계 |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/pages` | 전체 문서 목록 조회 | [DEVELOPMENT_PLAN.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/DEVELOPMENT_PLAN.md) 3단계 |
| **GET** | `/api/pages/{pageId}` | 특정 문서 상세 정보 조회 | [DEVELOPMENT_PLAN.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/DEVELOPMENT_PLAN.md) 4단계 |
| **POST** | `/api/pages` | 새 문서 생성 | [DEVELOPMENT_PLAN.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/DEVELOPMENT_PLAN.md) 5단계 |
| **PATCH** | `/api/pages/{pageId}` | 문서 내용(제목/본문) 수정 및 저장 | [DEVELOPMENT_PLAN.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/DEVELOPMENT_PLAN.md) 6단계, 8단계 |
| **DELETE** | `/api/pages/{pageId}` | 특정 문서 삭제 | [DEVELOPMENT_PLAN.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/DEVELOPMENT_PLAN.md) 7단계 |

---

## 2. API별 상세 명세

### 2.1. 전체 문서 목록 조회 (GET `/api/pages`)
* **목적**: 사이드바에 그릴 간단한 문서 목록 데이터를 취득합니다.
* **Path / Query Parameter**: 없음
* **Request Body**: 없음
* **Response Body (`200 OK`)**:
  ```json
  [
    {
      "id": "1",
      "title": "React 첫걸음"
    },
    {
      "id": "2",
      "title": "TypeScript란 무엇인가"
    }
  ]
  ```
* **프론트 호출 파일**: [pageApi.ts](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/api/pageApi.ts) 내 `getPages` 함수
* **호출 시점**: 앱 마운트(최초 진입) 및 신규 문서 생성/삭제 성공으로 목록 갱신이 필요할 때.
* **성공 시 상태 변경**: `pages` 상태 배열이 받아온 데이터로 업데이트되며 사이드바가 재렌더링됨.
* **실패 시 처리**: `error` 상태에 에러 메시지를 기입하여 사이드바 하단에 경고 메시지를 노출합니다.

---

### 2.2. 특정 문서 상세 정보 조회 (GET `/api/pages/{pageId}`)
* **목적**: 에디터 본문에 출력할 선택된 문서의 상세 내용을 가져옵니다.
* **Path Parameter**: `{pageId}` (조회할 문서의 고유 ID string)
* **Request Body**: 없음
* **Response Body (`200 OK`)**:
  ```json
  {
    "id": "1",
    "title": "React 첫걸음",
    "content": "React는 사용자 인터페이스를 만들기 위한 자바스크립트 라이브러리입니다.",
    "updatedAt": "2026-07-13T18:13:00Z"
  }
  ```
* **프론트 호출 파일**: `pageApi.ts` 내 `getPageById` 함수
* **호출 시점**: `selectedPageId` 상태 값이 빈 값(`null`)이 아닌 정상적인 ID 값으로 바뀔 때 (`useEffect` 감지 호출).
* **성공 시 상태 변경**: `currentPageDetail` 상태 변수에 정보가 저장되어 `PageEditor`가 편집 가능한 상태로 변경됨.
* **실패 시 처리**: 에디터 영역에 "문서를 불러오는 데 실패했습니다."라는 문구를 렌더링하고, 콘솔에 에러 로그를 기록합니다.

---

### 2.3. 새 문서 생성 (POST `/api/pages`)
* **목적**: 백엔드 DB에 새로운 빈 문서를 등록합니다.
* **Path Parameter**: 없음
* **Request Body**: 없음 (기본값인 '제목 없음' 문서가 서버에서 생성됨)
* **Response Body (`201 Created`)**:
  ```json
  {
    "id": "3",
    "title": "제목 없음",
    "content": "",
    "updatedAt": "2026-07-13T18:13:20Z"
  }
  ```
* **프론트 호출 파일**: `pageApi.ts` 내 `createPage` 함수
* **호출 시점**: 사이드바에 위치한 '새 페이지' 버튼을 누른 순간 (이벤트 핸들러 함수 실행).
* **성공 시 상태 변경**:
  1. 전체 문서 목록 조회 API를 재호출(`getPages()`)하여 목록을 최신화합니다.
  2. `selectedPageId` 상태를 새로 생성된 문서의 `id`("3")로 변경하여 즉시 에디터가 해당 문서를 띄우게 만듭니다.
* **실패 시 처리**: 브라우저 얼럿창(`alert`)을 띄워 "문서 생성에 실패했습니다. 네트워크를 확인해 주세요."를 안내합니다.

---

### 2.4. 문서 내용 수정 및 저장 (PATCH `/api/pages/{pageId}`)
* **목적**: 사용자가 수정한 문서의 변경 내용(제목 혹은 본문)을 서버에 반영해 저장합니다.
* **Path Parameter**: `{pageId}` (저장할 문서의 ID string)
* **Request Body**:
  ```json
  {
    "title": "수정된 React 첫걸음",
    "content": "수정된 본문 내용입니다."
  }
  ```
* **Response Body (`200 OK`)**:
  ```json
  {
    "id": "1",
    "title": "수정된 React 첫걸음",
    "content": "수정된 본문 내용입니다.",
    "updatedAt": "2026-07-13T18:14:00Z"
  }
  ```
* **프론트 호출 파일**: `pageApi.ts` 내 `updatePage` 함수
* **호출 시점**: 
  1. 에디터 우측 상단의 '저장' 버튼을 클릭했을 때 (수동 저장 이벤트).
  2. 디바운스 타이머(1.5초)가 만료되었을 때 (`useEffect` 감지 자동 저장).
* **성공 시 상태 변경**: 사이드바 목록의 특정 인덱스 아이템 제목이 변경되며, 저장 완료 플래그(`isSaved`) 상태를 `true`로 바꿉니다.
* **실패 시 처리**: 화면 상단에 '저장 실패' 빨간 경고창을 표시하며, 사용자에게 수동 저장을 재시도할 것을 권유합니다.

---

### 2.5. 특정 문서 삭제 (DELETE `/api/pages/{pageId}`)
* **목적**: 선택한 리소스를 데이터베이스에서 영구 삭제합니다.
* **Path Parameter**: `{pageId}` (삭제할 문서의 ID string)
* **Request Body**: 없음
* **Response Body (`204 No Content`)**: 데이터 반환 없이 빈 응답
* **프론트 호출 파일**: `pageApi.ts` 내 `deletePage` 함수
* **호출 시점**: 에디터 우측 상단의 '삭제' 버튼을 클릭했을 때 (이벤트 핸들러 함수 실행).
* **성공 시 상태 변경**:
  1. `selectedPageId`를 `null`로 비워 편집기를 닫습니다.
  2. 전체 문서 목록 조회 API를 재호출(`getPages()`)하여 삭제된 결과가 목록에 실시간 반영되게 합니다.
* **실패 시 처리**: "삭제 실패" 알림 팝업을 출력합니다.
