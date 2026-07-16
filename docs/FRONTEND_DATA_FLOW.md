# 프론트엔드 데이터 흐름 가이드 (`FRONTEND_DATA_FLOW.md`)

이 문서는 사용자의 행동(Event)에서부터 백엔드 API 요청, 상태 갱신, 그리고 React가 화면을 다시 그리는(Re-render) 과정까지 이어지는 단방향 데이터 흐름(Unidirectional Data Flow)의 전반적인 개념을 다룹니다.

---

## 1. 프론트엔드 단방향 데이터 흐름 (Data Flow Lifecycle)

React는 데이터 흐름이 단방향으로만 흐릅니다. 부모가 자식에게 데이터를 내려주며(Props), 자식은 부모가 전달해 준 이벤트를 호출하여 상태를 변경하고, 변경된 상태는 다시 아래로 흐르며 화면을 업데이트합니다.

```text
+-------------------+
|  1. 사용자 행동   |  (예: 리스트의 '문서 2' 항목 클릭)
+---------+---------+
          |
          v
+-------------------+
|  2. 이벤트 처리   |  (onClick 이벤트 핸들러가 트리거됨)
+---------+---------+
          |
          v
+-------------------+
|  3. 상태 변경     |  (setSelectedPageId(2) 호출로 React 상태 갱신)
+---------+---------+
          |
          v
+-------------------+
|  4. 부수 효과 실행 |  (useEffect가 selectedPageId의 변경을 감지)
+---------+---------+
          |
          v
+-------------------+
|  5. 비동기 API요청|  (getPageById(2) 비동기 통신 수행)
+---------+---------+
          |
          v
+-------------------+
|  6. 응답 데이터   |  (API 완료 후 응답 데이터를 state에 세팅)
+---------+---------+
          |
          v
+-------------------+
| 7. Props 하향전달 |  (상세 데이터를 PageEditor 컴포넌트로 전달)
+---------+---------+
          |
          v
+-------------------+
| 8. 가상DOM/재렌더링|  (React가 변경 상태를 식별하고 브라우저 화면 갱신)
+-------------------+
```

---

## 2. React 핵심 요소들의 역할 정의

### 2.1. `useState` (상태 관리자)
* **왜 필요한가**: React 컴포넌트는 일반 지역 변수의 값이 변하더라도 이를 감지하지 않고 화면을 다시 그리지 않습니다. React 메모리에 변수 공간을 잡아두고 값이 바뀔 때마다 컴포넌트를 리빌드하게 하는 장치입니다.
* **프로젝트 내 사용처**: `selectedPageId`(선택된 문서 ID), `pages`(문서 목록 배열), `currentPageDetail`(현재 편집 중인 상세 내용), `isLoading`(로딩 여부).

### 2.2. `useEffect` (외부 시스템 동기화 장치)
* **왜 필요한가**: 컴포넌트가 렌더링된 이후에 처리해야 하는 부수적인 작업(네트워크 요청, 구독 설정, 타이머 등)을 안전하게 처리하기 위한 통로입니다.
* **프로젝트 내 사용처**: 최초 마운트 시 전체 문서 목록 호출, `selectedPageId`가 변경되었을 때 특정 문서의 상세 API 재호출.

### 2.3. `Props` (컴포넌트 데이터 전달 통로)
* **왜 필요한가**: 부모 컴포넌트의 상태나 함수를 자식 컴포넌트에게 전달하여 화면을 구성하고 인터랙션을 유지합니다. Props는 자식 측에서 읽기 전용(Read-only)이며 직접 바꿀 수 없습니다.
* **프로젝트 내 사용처**: `PageList`에 `pages` 배열을 전달하거나, 클릭 시 부모의 상태를 변경할 수 있도록 `onSelectPage` 핸들러 함수 전달.

---

## 3. 비동기 요청 흐름과 3단 상태(Loading, Error, Data)

네트워크 요청은 즉각적으로 처리되지 않고 수밀리초에서 수초의 시간이 소요되는 **비동기 흐름**을 가집니다. 따라서 화면은 항상 3가지 사용자 경험 상태를 분기 처리해야 합니다.

1. **Pending (로딩 상태)**: `isLoading === true`. 로딩 스피너나 스켈레톤을 렌더링하여 사용자에게 데이터 요청 중임을 인지시킵니다.
2. **Rejected (오류 상태)**: `error !== null`. 네트워크 다운, 서버 500 에러 등의 상황에서 에러 메시지와 재시도 버튼을 렌더링합니다.
3. **Fulfilled (성공 상태)**: `data`가 존재하는 상태. 받아온 데이터를 바탕으로 문서 제목과 본문 에디터 화면을 정상 렌더링합니다.

### 데이터 패칭 표준 흐름 예시
```tsx
const [pages, setPages] = useState<PageSummary[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchPages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPages();
      setPages(data);
    } catch (err: any) {
      setError(err.message || '문서 목록을 불러오는 도중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchPages();
}, []);
```

---

## 4. 백엔드 계층 구조 vs 프론트엔드 계층 구조 비교

스프링 부트와 같은 백엔드 계층 구조에 익숙한 학습자를 위해 데이터 통신 계층을 비교해 설명합니다.

* **Controller (API 엔드포인트)** <---> **`api/pageApi.ts` (API 호출)**
  * 요청을 전송하고 수신하는 창구 역할.
* **Service (비즈니스 로직)** <---> **`hooks/usePages.ts` or `WorkspacePage` (React 비즈니스 상태)**
  * 받아온 데이터를 검증하고, 여러 상태를 조합하여 흐름 제어.
* **Repository (DB 접근)** <---> **React `useState` (클라이언트 메모리 저장소)**
  * 데이터를 보존하고 관리하는 최종 데이터베이스 역할.
* **UI/JSP/Thymeleaf (표시 레이어)** <---> **`components/` (React UI 컴포넌트)**
  * 데이터 가공 없이 껍데기 디자인을 렌더링하고 사용자 입력을 받아들이는 역할.

---

## 5. 상세 데이터 렌더링 실례 (Template Flow)

학습자가 이해해야 하는 **문서 상세 조회** 데이터 상세 흐름은 다음과 같습니다.

1. **[사용자 행동]**: 사이드바 [PageListItem](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/components/PageListItem/PageListItem.tsx)에서 '학습 가이드 문서'를 마우스로 클릭한다.
2. **[이벤트 처리]**: 해당 아이템의 `onClick` 이벤트가 트리거되어, 부모로부터 전달받은 `onSelect(page.id)` 함수가 실행된다.
3. **[상태 변경]**: 공통 부모인 [WorkspacePage](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/pages/WorkspacePage/WorkspacePage.tsx)의 `selectedPageId` 상태 값이 신규 ID로 변경된다.
4. **[변경 감지]**: `selectedPageId`를 의존성 배열에 담고 있는 `useEffect`가 값의 변화를 감지하고 콜백 함수를 큐에 넣는다.
5. **[API 호출]**: `pageApi.getPageById(selectedPageId)` 비동기 함수를 호출한다.
6. **[백엔드]**: 백엔드 서버(혹은 임시 Mock 서버)로 `GET /api/pages/{id}` HTTP 요청이 전송된다.
7. **[응답 저장]**: 백엔드에서 200 OK와 함께 문서 상세 JSON 데이터를 반환하면, 프론트는 `setPageDetail(response.data)`을 호출해 상태를 갱신한다.
8. **[Props 전달]**: 새롭게 갱신된 `pageDetail` 상태 값이 하위의 [PageEditor](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/components/PageEditor/PageEditor.tsx) 컴포넌트로 전달(Props Drilling 방지하여 1단계 하향)된다.
9. **[재렌더링]**: React가 화면을 재렌더링하여 우측 에디터 인풋 창에 상세 제목과 상세 본문을 바인딩하여 완성한다.
