# Mock 문서 목록과 선택 상태

## 1. 기능 목적

- Mock 문서 데이터를 사이드바에 반복 렌더링한다.
- 문서 선택 상태를 통해 Props, 이벤트, 재렌더링의 흐름을 학습한다.

## 2. 사용자 행동 (Trigger)

- 사용자가 사이드바의 문서 제목을 클릭한다.

## 3. 예상 동작 (Result)

- Mock 문서 제목들이 목록으로 표시된다.
- 클릭한 문서만 선택 스타일로 강조된다.

## 4. 데이터 흐름 (Data Flow)

```text
WorkspacePage의 Mock 데이터와 selectedPageId
        ↓ Props
Sidebar
        ↓ Props
PageList
        ↓ Props
PageListItem
        ↓ 클릭 이벤트 콜백
WorkspacePage의 setSelectedPageId
        ↓ 재렌더링
선택된 PageListItem 스타일 변경
```

## 5. 관련 상태 (React States)

- `selectedPageId: string | null` (`WorkspacePage`)
- Mock 문서 배열은 이번 단계에서 변하지 않으므로 우선 일반 상수로 선언한다.

## 6. 관련 컴포넌트

- `WorkspacePage`: Mock 데이터와 선택 상태 소유
- `Sidebar`: 목록 영역 조립
- `PageList`: 배열 반복 렌더링
- `PageListItem`: 개별 문서 표시와 클릭 이벤트 발생

## 7. 관련 API (HTTP Contract)

- 없음. 3단계 전까지 정적 Mock 데이터를 사용한다.

## 8. 생성할 파일 [NEW]

- `front/src/types/page.ts`: `PageSummary` 타입
- `front/src/components/PageList/PageList.tsx`: 목록 렌더러
- `front/src/components/PageListItem/PageListItem.tsx`: 개별 목록 항목

## 9. 수정할 파일 [MODIFY]

- `front/src/pages/WorkspacePage/WorkspacePage.tsx`
- `front/src/components/Sidebar/Sidebar.tsx`
- `front/src/styles/index.css`

## 10. 세부 구현 순서

1. `PageSummary` 타입 정의
2. `WorkspacePage`에 Mock 배열 작성
3. `PageListItem` 생성
4. `PageList`와 `map()` 렌더링 구현
5. 목록 데이터를 Props로 하향 전달
6. `selectedPageId` 상태와 선택 콜백 연결
7. 선택된 항목의 CSS 적용
8. 브라우저와 React DevTools에서 검증

## 11. useEffect 사용 여부와 이유

- 사용하지 않는다.
- 외부 API와 동기화하지 않고 사용자 클릭 이벤트에서 즉시 상태를 변경하기 때문이다.

## 12. 로딩 및 오류 처리

- API 요청이 없으므로 로딩과 네트워크 오류 상태를 만들지 않는다.
- 빈 배열일 때 표시할 빈 목록 문구만 고려한다.

## 13. 테스트 방법 (검증 시나리오)

1. 브라우저에 모든 Mock 문서 제목이 표시되는지 확인한다.
2. 문서를 클릭할 때 해당 항목만 강조되는지 확인한다.
3. React DevTools에서 `selectedPageId`가 클릭한 ID로 변경되는지 확인한다.

## 14. 이번 기능에서 학습할 핵심 개념

- TypeScript 객체 타입과 배열 타입
- `map()`과 React의 `key`
- Props 하향 전달
- 상태 끌어올리기
- 이벤트 콜백과 재렌더링

## 15. 완료 조건 (Definition of Done)

- Mock 문서 목록이 렌더링된다.
- 클릭한 문서 ID가 상태에 저장된다.
- 선택된 항목만 시각적으로 강조된다.
- 린트와 프로덕션 빌드가 통과한다.
