# 문서 수정과 수동 저장

## 1. 구현할 기능

- 선택한 문서의 제목과 본문을 입력창에서 수정하고 저장 버튼으로 서버에 반영한다.
- Controlled Input과 PATCH 요청을 학습한다.

## 2. 사용자의 행동

- 문서를 선택하고 제목 또는 본문을 입력한다.
- `저장` 버튼을 클릭한다.

## 3. 상태의 변화

- `PageEditor`의 `localTitle`, `localContent`가 입력에 따라 변경된다.
- 저장 중에는 `isSaving`이 `true`가 된다.
- 성공 또는 실패 결과를 `saveMessage`로 표시한다.

## 4. 관여하는 컴포넌트

- `PageEditor`: 편집 상태, 입력 UI, 저장 클릭 발생
- `WorkspacePage`: PATCH 요청, 상세 상태와 목록 갱신
- `Sidebar`: 변경된 제목 재렌더링

## 5. 발생하는 API 요청

- `PATCH /api/pages/{pageId}`
- 성공 후 최신 목록을 위한 `GET /api/pages`

최종 Spring 계약의 수정 Body는 `title`, `content`이다. 현재 JSON Server는 수정 시각을 자동 갱신하지 않으므로 Mock 단계에서만 `updatedAt`도 함께 보낸다.

## 6. 데이터 흐름 경로

```text
PageEditor 입력
  → localTitle / localContent
  → 저장 버튼
  → onSave(id, 수정 데이터)
  → WorkspacePage.handleSavePage
  → pageApi.updatePage
  → currentPage + pages 갱신
  → PageEditor + Sidebar 재렌더링
```

## 7. 수정할 파일

- `front/src/types/page.ts`: `UpdatePageRequest` 정의
- `front/src/api/pageApi.ts`: `updatePage` 함수 추가
- `front/src/components/PageEditor/PageEditor.tsx`: 입력 상태와 저장 UI 추가
- `front/src/pages/WorkspacePage/WorkspacePage.tsx`: 저장 요청과 상태 관리

## 8. 파일과 컴포넌트를 분리하는 이유

- `pageApi`는 HTTP 요청 형식을 담당한다.
- `PageEditor`는 사용자가 아직 저장하지 않은 임시 입력을 담당한다.
- `WorkspacePage`는 API 결과를 상세 화면과 사이드바 목록에 함께 반영한다.

## 9. useEffect와 이벤트 함수

- 수동 저장은 사용자의 명시적 클릭이므로 `useEffect`가 아니라 이벤트 함수에서 실행한다.
- 문서 선택 변경 시 `PageEditor`의 `key`를 문서 ID로 바꿔 컴포넌트를 새로 시작하고 로컬 입력값을 동기화한다.

## 10. 세부 구현 순서

1. 수정 요청 타입 정의
2. `updatePage` API 함수 작성
3. `PageEditor`에 로컬 제목·본문 상태 추가
4. 제목 input과 본문 textarea를 제어 컴포넌트로 연결
5. 저장 콜백과 저장 상태 Props 연결
6. `WorkspacePage`에 저장 이벤트 함수 작성
7. 성공 후 상세 데이터와 사이드바 목록 갱신
8. 로딩·성공·실패 UI와 Network 요청 검증

## 11. 검증 방법

1. 제목과 본문을 입력했을 때 화면에 즉시 반영되는지 확인한다.
2. 저장 후 새로고침해도 수정 내용이 유지되는지 확인한다.
3. Network 탭에서 PATCH Body와 `200 OK` 응답을 확인한다.
4. 사이드바 제목이 저장된 제목으로 변경되는지 확인한다.
5. 린트와 프로덕션 빌드를 실행한다.

## 12. 완료 조건

- 선택 문서의 제목과 본문을 편집하고 수동 저장할 수 있다.
- 저장 결과가 Mock DB, 상세 화면, 사이드바에 모두 일치한다.
