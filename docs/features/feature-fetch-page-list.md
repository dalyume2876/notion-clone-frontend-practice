# 문서 목록 조회 API

## 1. 기능 목적

- 고정 Mock 배열을 실제 HTTP 응답으로 교체한다.
- 최초 렌더링 이후 API 요청, 상태 갱신, 재렌더링 흐름을 학습한다.

## 2. 사용자 행동 (Trigger)

- 사용자가 `/` 주소로 워크스페이스에 진입하거나 새로고침한다.

## 3. 예상 동작 (Result)

- 요청 중에는 목록 영역에 로딩 문구가 표시된다.
- 성공하면 Mock API가 반환한 문서 제목들이 표시된다.
- 실패하면 오류 안내가 표시된다.

## 4. 데이터 흐름 (Data Flow)

```text
WorkspacePage 최초 렌더링
        ↓ useEffect
getPages()
        ↓ Axios GET /api/pages
Vite Proxy → JSON Server GET /pages
        ↓ PageSummary[] 응답
setPages(data)
        ↓ Props
Sidebar → PageList → PageListItem 재렌더링
```

## 5. 관련 상태 (React States)

- `pages: PageSummary[]` (`WorkspacePage`)
- `isLoading: boolean` (`WorkspacePage`)
- `error: string | null` (`WorkspacePage`)
- 기존 `selectedPageId: string | null` 유지

## 6. 관련 컴포넌트

- `WorkspacePage`: 요청 생명주기와 목록 상태 관리
- `Sidebar`: 로딩·오류·목록 표시
- `PageList`, `PageListItem`: 성공 데이터 렌더링

## 7. 관련 API (HTTP Contract)

- 프론트 요청: `GET /api/pages`
- 개발 프록시: `/api/pages` → `http://localhost:3001/pages`
- 응답: `PageSummary[]`

## 8. 생성할 파일 [NEW]

- `front/mock/db.json`: JSON Server 데이터
- `front/src/api/axiosInstance.ts`: 공통 Axios 설정
- `front/src/api/pageApi.ts`: `getPages` 함수

## 9. 수정할 파일 [MODIFY]

- `front/package.json`: Mock 서버 실행 스크립트
- `front/vite.config.ts`: `/api` 개발 프록시
- `front/src/pages/WorkspacePage/WorkspacePage.tsx`: 상태와 `useEffect`
- `front/src/components/Sidebar/Sidebar.tsx`: 로딩·오류 표시

## 10. 세부 구현 순서

1. Axios와 JSON Server 설치
2. `mock/db.json` 작성 및 Mock 서버 실행
3. Vite `/api` 프록시 설정
4. Axios 인스턴스 작성
5. `getPages` API 함수 작성
6. 목록·로딩·오류 상태 선언
7. 빈 의존성 배열의 `useEffect`에서 최초 요청
8. 브라우저와 Network 탭 검증

## 11. useEffect 사용 여부와 이유

- 사용한다.
- 사용자 클릭이 아니라 컴포넌트가 화면에 나타난 뒤 외부 API와 목록 상태를 동기화해야 하기 때문이다.

## 12. 로딩 및 오류 처리

- 요청 직전 `isLoading`을 `true`로 설정한다.
- 요청 직전 이전 오류를 초기화한다.
- 실패하면 사용자용 오류 메시지를 상태에 저장한다.
- 성공·실패와 무관하게 요청 종료 시 로딩을 해제한다.

## 13. 테스트 방법 (검증 시나리오)

1. 새로고침 후 Mock 문서 목록이 표시되는지 확인한다.
2. Network 탭에서 `GET /api/pages`, `200 OK`, 응답 배열을 확인한다.
3. Mock 서버를 끄고 오류 UI가 표시되는지 확인한다.
4. React DevTools에서 `pages`, `isLoading`, `error` 상태를 확인한다.

## 14. 이번 기능에서 학습할 핵심 개념

- Promise와 `async/await`
- API 계층과 UI 계층 분리
- `useEffect`와 빈 의존성 배열
- Loading, Error, Data의 3단 상태
- 개발 프록시와 HTTP 요청 흐름

## 15. 완료 조건 (Definition of Done)

- `GET /api/pages`가 Mock 서버를 통해 성공한다.
- 하드코딩된 `mockPages` 없이 응답 데이터가 목록으로 표시된다.
- 로딩과 오류 UI가 동작한다.
- Network 탭 검증 및 린트·빌드가 통과한다.
