# 문서 삭제

## 1. 구현할 기능

- 선택한 문서를 삭제하고 목록, 선택 상태, 에디터를 안전하게 초기화한다.
- DELETE 요청과 삭제 후 연관 상태 정리를 학습한다.

## 2. 사용자의 행동

- `PageEditor`에서 삭제 버튼을 클릭한다.

## 3. 상태의 변화

- 삭제 중에는 `PageEditor`의 `isDeleting`이 `true`가 된다.
- 성공하면 `pages`에서 삭제된 문서가 사라진다.
- `selectedPageId`와 `currentPage`가 `null`이 된다.
- 실패하면 `deleteError`가 표시된다.

## 4. 관여하는 컴포넌트

- `PageEditor`: 삭제 버튼, 삭제 중·실패 UI
- `WorkspacePage`: DELETE 실행 후 공통 상태 정리
- `Sidebar`: 갱신된 목록 렌더링

## 5. 발생하는 API 요청

- `DELETE /api/pages/{pageId}`
- 성공 후 최신 목록을 위한 `GET /api/pages`
- DELETE 요청 Body와 성공 Response Body는 없다.

## 6. 데이터 흐름 경로

```text
PageEditor 삭제 클릭
  → onDelete(page.id)
  → WorkspacePage.handleDeletePage
  → pageApi.deletePage
  → 목록 재조회
  → pages 갱신
  → selectedPageId/currentPage 초기화
  → Sidebar/PageEditor 재렌더링
```

## 7. 수정할 파일

- `front/src/api/pageApi.ts`: `deletePage` 추가
- `front/src/components/PageEditor/PageEditor.tsx`: 삭제 버튼과 상태 추가
- `front/src/pages/WorkspacePage/WorkspacePage.tsx`: 삭제 이벤트와 상태 정리

## 8. 파일과 컴포넌트를 분리하는 이유

- `pageApi`는 DELETE 요청 형식만 담당한다.
- `PageEditor`는 사용자의 삭제 행동과 진행 상태를 표현한다.
- `WorkspacePage`는 Sidebar와 PageEditor가 함께 사용하는 상태를 정리한다.

## 9. useEffect와 이벤트 함수

- 삭제는 사용자가 버튼을 눌렀을 때 한 번 실행해야 하므로 이벤트 함수에서 처리한다.
- 삭제 API 실행을 위한 새로운 `useEffect`는 만들지 않는다.

## 10. 세부 구현 순서

1. `deletePage` API 함수 작성
2. `WorkspacePage`에 삭제 핸들러 작성
3. 성공 후 목록 갱신
4. 성공 후 선택 ID와 상세 상태 초기화
5. `PageEditor`에 삭제 콜백 Props와 버튼 연결
6. 삭제 중 중복 요청과 실패 UI 처리
7. 빈 에디터, Network, 린트와 빌드 검증

## 11. 검증 방법

1. 선택 문서를 삭제하면 사이드바에서 사라지는지 확인한다.
2. 에디터가 `편집할 문서를 선택해 주세요` 화면으로 바뀌는지 확인한다.
3. 새로고침 후에도 삭제 상태가 유지되는지 확인한다.
4. Network 탭에서 DELETE 요청과 성공 상태를 확인한다.

## 12. 완료 조건

- 선택한 문서가 Mock DB와 목록에서 삭제된다.
- 선택 상태와 상세 화면이 안전하게 초기화된다.
- 중복 요청과 실패를 처리하고 린트와 빌드가 통과한다.
