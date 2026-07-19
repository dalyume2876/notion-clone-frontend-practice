# 문서 상세 조회 API

## 1. 기능 목적

- 사이드바에서 선택한 문서의 제목과 본문을 우측 에디터에 표시한다.
- 상태 변경을 의존성으로 사용하는 `useEffect`와 요청 취소 Cleanup을 학습한다.

## 2. 사용자 행동 (Trigger)

- 사용자가 사이드바의 문서 제목을 클릭한다.

## 3. 예상 동작 (Result)

- 선택한 항목이 강조된다.
- 상세 조회 중에는 에디터에 로딩 문구가 표시된다.
- 성공하면 선택한 문서의 제목과 본문이 표시된다.
- 실패하면 상세 조회 오류가 표시된다.

## 4. 데이터 흐름 (Data Flow)

```text
PageListItem 클릭
        ↓ 콜백
setSelectedPageId(pageId)
        ↓ 상태 변경
상세 조회 useEffect 실행
        ↓
getPageById(pageId)
        ↓ GET /api/pages/{pageId}
setCurrentPage(data)
        ↓ Props
PageEditor 재렌더링
```

## 5. 관련 상태 (React States)

- 기존 `selectedPageId: string | null`
- `currentPage: PageDetail | null`
- `isPageLoading: boolean`
- `pageError: string | null`

상태 위치는 Sidebar와 PageEditor의 가장 가까운 공통 부모인 `WorkspacePage`로 한다.

## 6. 관련 컴포넌트

- `WorkspacePage`: 선택 ID와 상세 요청 상태 관리
- `PageListItem`: 선택 이벤트 발생
- `PageEditor`: 상세 로딩·오류·데이터 렌더링

## 7. 관련 API (HTTP Contract)

- `GET /api/pages/{pageId}`
- 성공 응답: `PageDetail`
- 존재하지 않는 ID: `404 Not Found`

## 8. 생성할 파일 [NEW]

- 없음

## 9. 수정할 파일 [MODIFY]

- `front/mock/db.json`: `content`, `updatedAt` 추가
- `front/src/types/page.ts`: `PageDetail` 타입 추가
- `front/src/api/pageApi.ts`: `getPageById` 추가
- `front/src/pages/WorkspacePage/WorkspacePage.tsx`: 상세 상태와 Effect 추가
- `front/src/components/PageEditor/PageEditor.tsx`: 상세 Props와 조건부 렌더링

## 10. 세부 구현 순서

1. `PageDetail` 타입 정의
2. Mock 문서에 상세 필드 추가
3. `getPageById` API 함수 작성
4. 상세 데이터·로딩·오류 상태 선언
5. 선택 ID 방어 조건 작성
6. `selectedPageId` 의존성 Effect 작성
7. `AbortController` Cleanup으로 이전 요청 취소
8. `PageEditor` Props와 화면 분기 및 DevTools 검증

## 11. useEffect 사용 여부와 이유

- 사용한다.
- 사용자의 클릭은 `selectedPageId`를 변경하고, 변경된 선택 상태와 외부 상세 API 결과를 동기화해야 하기 때문이다.
- 의존성 배열은 `[selectedPageId]`로 설정한다.

## 12. 로딩 및 오류 처리

- 상세 요청 직전 로딩 시작 및 이전 오류 초기화
- 성공 시 상세 상태 저장
- 실패 시 상세 전용 오류 저장
- 요청 종료 시 로딩 해제
- 선택 해제 시 상세·오류 상태 초기화

## 13. 테스트 방법 (검증 시나리오)

1. 각 문서를 클릭해 서로 다른 제목과 본문이 표시되는지 확인한다.
2. Network 탭에서 `GET /api/pages/{id}`와 응답을 확인한다.
3. 존재하지 않는 ID로 404 오류 UI를 확인한다.
4. 문서를 빠르게 전환해 마지막 선택 문서만 표시되는지 확인한다.
5. React DevTools에서 `selectedPageId`, `currentPage` 변화를 확인한다.

## 14. 이번 기능에서 학습할 핵심 개념

- 상태 변화 기반 Effect
- 의존성 배열
- 상세 데이터 타입과 Props
- 요청 경합 조건과 Cleanup
- 목록 상태와 상세 상태의 분리

## 15. 완료 조건 (Definition of Done)

- 선택한 문서의 상세 제목과 본문이 표시된다.
- 상세 로딩과 오류 UI가 동작한다.
- 빠르게 문서를 바꿔도 오래된 응답이 화면을 덮지 않는다.
- Network, React DevTools, 린트, 빌드 검증을 통과한다.
