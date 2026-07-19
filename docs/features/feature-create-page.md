# 새 문서 생성

## 1. 기능 목적

- 버튼 클릭으로 새 문서를 생성하고 목록과 선택 상태를 동기화한다.
- POST 요청과 이벤트 핸들러의 역할을 학습한다.

## 2. 사용자 행동과 예상 결과

- 사이드바의 `+ 새 페이지` 버튼을 클릭한다.
- `제목 없음` 문서가 목록에 추가되고 바로 선택된다.
- 오른쪽 에디터에 새 문서의 빈 본문이 표시된다.

## 3. 데이터 흐름

```text
+ 새 페이지 클릭
        ↓
WorkspacePage의 생성 핸들러
        ↓
createPage() → POST /api/pages
        ↓
생성된 PageDetail 응답
        ↓
목록 재조회 + selectedPageId 변경
        ↓
기존 상세 조회 Effect 실행 → PageEditor 갱신
```

## 4. 관련 상태

- 기존 `pages`, `selectedPageId`, `currentPage`
- `isCreatingPage: boolean`: 중복 클릭 방지
- `createError: string | null`: 생성 실패 안내

상태는 Sidebar와 상세 조회 흐름의 공통 부모인 `WorkspacePage`에 둔다.

## 5. 관련 컴포넌트

- `WorkspacePage`: 생성 이벤트와 상태 관리
- `Sidebar`: 생성 버튼 렌더링 및 클릭 콜백 전달
- `PageEditor`: 생성 후 선택된 문서 표시

## 6. API 계약

- 최종 Spring API: `POST /api/pages`, 요청 Body 없음, `201 Created`와 `PageDetail` 반환
- 현재 JSON Server Mock: 서버 기본값 로직이 없으므로 `{ title, content, updatedAt }`을 임시로 전송

## 7. 수정할 파일

- `front/src/types/page.ts`: Mock 생성 요청 타입 추가
- `front/src/api/pageApi.ts`: `createPage` 추가
- `front/src/pages/WorkspacePage/WorkspacePage.tsx`: 생성 상태와 핸들러 추가
- `front/src/components/Sidebar/Sidebar.tsx`: 생성 Props와 버튼 연결

## 8. 세부 구현 순서

1. 생성 요청 타입 정의
2. `createPage` API 함수 작성
3. 생성 중·오류 상태 선언
4. 버튼 클릭용 생성 핸들러 작성
5. Sidebar에 콜백과 생성 중 상태 전달
6. 성공 시 목록 재조회 및 새 ID 선택
7. 실패·중복 클릭 처리
8. Network, 린트, 빌드 검증

## 9. useEffect 사용 여부

- 생성 요청에는 사용하지 않는다.
- 생성은 사용자의 명시적 클릭으로 발생하므로 `onClick` 이벤트 핸들러에서 호출한다.
- 생성 후 ID가 바뀌면 기존 상세 조회 Effect가 새 문서를 자동으로 조회한다.

## 10. 로딩 및 오류 처리

- 생성 중 버튼을 비활성화해 중복 POST를 방지한다.
- 실패하면 생성 오류 메시지를 사이드바에 표시하고 기존 목록과 선택을 유지한다.

## 11. 검증 시나리오

1. 버튼 한 번 클릭 시 문서가 한 개만 추가되는지 확인한다.
2. 새 문서가 선택되고 오른쪽에 표시되는지 확인한다.
3. Network 탭에서 POST 응답과 후속 GET 요청을 확인한다.
4. Mock 서버 재시작 후 생성 데이터가 유지되는지 확인한다.

## 12. 핵심 학습 개념

- POST와 리소스 생성
- Effect와 이벤트 핸들러의 구분
- 비동기 이벤트 처리와 중복 요청 방지
- 서버 상태 생성 후 목록·선택 상태 동기화

## 13. 완료 조건

- 새 페이지 버튼으로 문서가 한 개 생성된다.
- 목록이 갱신되고 생성된 문서가 선택되어 상세 화면에 표시된다.
- 실패와 중복 클릭을 처리하며 린트와 빌드가 통과한다.
