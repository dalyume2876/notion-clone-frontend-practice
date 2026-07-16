# 프론트엔드 아키텍처 가이드 (`FRONTEND_ARCHITECTURE.md`)

이 문서는 프로젝트의 전체 구조와 각 파일의 책임 범위, 그리고 화면 구성 요소를 분리하는 명확한 기준에 대해 설명합니다. 아키텍처의 설계 핵심은 **관심사의 분리(Separation of Concerns)**와 **단일 책임 원칙(Single Responsibility Principle)**입니다.

---

## 1. 폴더 구조 설계

우리는 다음과 같은 기본 디렉토리 구조를 따릅니다. 파일과 폴더의 깊이가 지나치게 깊어지지 않도록 단순함을 유지합니다.

```text
src/
├─ app/
│  ├─ App.tsx            # 애플리케이션의 루트 컴포넌트
│  └─ router.tsx         # 페이지 경로(URL) 정의 및 라우터 설정
│
├─ pages/
│  └─ WorkspacePage/
│     └─ WorkspacePage.tsx   # 워크스페이스 주 화면 (조립자 역할)
│
├─ layouts/
│  └─ WorkspaceLayout/
│     └─ WorkspaceLayout.tsx # 사이드바와 메인 컨텐츠 영역의 공통 레이아웃
│
├─ components/
│  ├─ Header/
│  │  └─ Header.tsx      # 상단 네비게이션 및 현재 문서 상태 표시
│  ├─ Sidebar/
│  │  └─ Sidebar.tsx     # 사이드바 컨테이너
│  ├─ PageList/
│  │  └─ PageList.tsx    # 문서 제목 목록 리스트 렌더러
│  ├─ PageListItem/
│  │  └─ PageListItem.tsx# 문서 목록의 개별 아이템 (클릭 핸들러 보유)
│  └─ PageEditor/
│     └─ PageEditor.tsx  # 우측 상세 페이지 에디터 (Input 및 Textarea)
│
├─ hooks/
│  └─ usePages.ts        # 문서 관련 비동기 상태 비즈니스 로직 (추후 분리)
│
├─ api/
│  ├─ axiosInstance.ts   # Axios 설정 (Base URL, Timeout 등)
│  └─ pageApi.ts         # 문서 관련 HTTP 요청 함수 정의
│
├─ types/
│  └─ page.ts            # 문서(Page) 관련 TypeScript 인터페이스/타입 정의
│
└─ styles/
   └─ index.css          # 공통 CSS 변수 및 전역 스타일
```

---

## 2. 각 계층별 역할과 연결 관계

각 레이어는 아래와 같이 서로 독립적이고 일관된 방향으로 협급해야 합니다.

1. **Page (화면)**:
   * URL 주소와 1:1로 매핑되는 단위입니다.
   * 스스로 구체적인 UI 뼈대를 그리기보다, 하위 `Component`와 `Layout`을 조립(Assembly)하는 책임을 집니다.
   * 비동기 데이터 조회 로직을 직접 관리하거나 `Hook`을 호출하여 하위 컴포넌트에 Props로 데이터를 전달합니다.
2. **Layout (구조)**:
   * 공통으로 사용되는 웹페이지 화면의 뼈대를 담당합니다.
   * 보통 사이드바, 헤더, 메인 컨텐츠 영역의 그리드/플렉스 구조를 정의하며, `children` 프로퍼티를 받아 콘텐츠를 알맞은 위치에 배치합니다.
3. **Header / Sidebar (전체 네비게이션 및 제어)**:
   * 앱의 전역적인 행동이나 워크스페이스 내 전반적인 정보(현재 선택한 문서, 생성 버튼, 로고 등)를 다룹니다.
4. **Component (재사용 단위)**:
   * 특정 역할만 수행하는 작은 단위의 UI입니다.
   * 부모에게서 전달받은 `props`와 본인의 로컬 상태만으로 화면을 렌더링하고 사용자 입력을 처리합니다.
5. **Hook (비즈니스 로직)**:
   * 여러 컴포넌트에서 재사용되는 복잡한 상태 관리나 부수 효과(Effect)를 캡슐화합니다.
   * *주의*: 프로젝트 극초반부터 모든 것을 커스텀 훅으로 추출하면 흐름을 추적하기 어려우므로, 컴포넌트 코드 내에서 `useState`와 `useEffect`를 충분히 학습한 후에 훅으로 분리합니다.
6. **API (HTTP 통신)**:
   * 백엔드 API와 주고받는 실제 비동기 통신을 담당합니다.
   * **중요**: API 레이어는 어떠한 React UI 상태(State)도 직접 수정할 수 없으며, 요청을 보내고 응답 데이터를 Promise 객체로 반환하는 순수 함수 역할만 수행해야 합니다.
7. **Type (타입 정의)**:
   * 도메인 모델(예: `PageSummary`, `PageDetail` 등)을 TypeScript 타입으로 선언하여 개발 중 발생할 타입 에러를 미리 방지합니다.

---

## 3. 컴포넌트 분리 및 상태 위치 선정 기준

### 3.1. 컴포넌트 분리 기준 (언제 나눌 것인가?)
코드 라인 수가 길다는 이유만으로 파일을 바로 쪼개는 것은 과도한 파편화를 초래합니다. 다음 **5가지 질문**을 확인하고 최소 2개 이상 해당할 때 컴포넌트 분리를 시도합니다.

1. **역할 분리가 명확한가?** (예: 문서를 편집하는 에디터 영역과 사이드바 문서 목록 영역)
2. **별도의 props를 통해 다르게 동작해야 하는가?** (예: 활성화 상태에 따라 CSS 스타일이 달라지는 개별 아이템)
3. **다른 페이지나 화면에서 재사용할 가능성이 있는가?** (예: 공통 버튼, 모달, 입력 폼)
4. **컴포넌트 자체적인 이벤트나 격리된 상태를 지녀야 하는가?** (예: 외부 변수와 무관하게 컴포넌트 내의 아코디언 열림/닫힘 상태)
5. **부모 파일의 코드량이 많고 혼자 너무 많은 비즈니스 책임을 갖고 있는가?**

### 3.2. 상태(State)는 어디에 위치시켜야 하는가?
React는 부모에서 자식으로만 데이터가 흐르는 **단방향 데이터 흐름**을 갖습니다.

* **지역 상태(Local State)**: 상태가 단 하나의 컴포넌트에서만 사용되고 다른 컴포넌트와 공유될 필요가 없다면, 반드시 해당 컴포넌트 내부에 둡니다. (예: `PageEditor` 내의 Input 임시 텍스트 변경 값)
* **상태 끌어올리기(State Lifting)**: 동일한 데이터를 두 개 이상의 컴포넌트가 함께 공유하고 변경해야 한다면, 이들의 **가장 가까운 공통 부모 컴포넌트**로 상태를 끌어올려 선언해야 합니다.
  * *예시*: 사이드바 문서 목록 클릭 시, 우측 에디터에 상세 본문이 나와야 합니다.
  * 목록을 가지는 `Sidebar`와 편집 화면인 `PageEditor`가 이 정보를 공유해야 하므로, 둘의 부모인 `WorkspacePage`에 `selectedPageId` 상태를 선언합니다.

```text
       WorkspacePage [selectedPageId, setSelectedPageId]
        /           \
   Sidebar       PageEditor (selectedPageId를 props로 전달받음)
      |
   PageList (setSelectedPageId를 props로 받아서 아이템에 위임)
```

---

## 4. API와 UI 컴포넌트의 명확한 분리 원칙

초보 개발자들은 API 호출 결과를 직접 다루기 위해 컴포넌트 파일 안에 Axios 호출과 URL 주소를 직접 적곤 합니다. 이는 유지보수를 극도로 어렵게 만듭니다.

* **잘못된 예시**:
  ```tsx
  // PageEditor.tsx 내부
  useEffect(() => {
    axios.get(`http://localhost:8080/api/pages/${id}`)
         .then(res => setPage(res.data));
  }, [id]);
  ```
* **올바른 예시 (관심사 분리)**:
  ```ts
  // src/api/pageApi.ts (순수 API 함수)
  export const getPageById = async (pageId: string): Promise<PageDetail> => {
    const response = await axiosInstance.get(`/pages/${pageId}`);
    return response.data;
  };
  ```
  ```tsx
  // PageEditor.tsx (UI 및 React 생명주기 관리)
  useEffect(() => {
    getPageById(id)
      .then(data => setPage(data))
      .catch(err => setError(err.message));
  }, [id]);
  ```
  이러한 분리를 통해 API 주소가 변경되거나 라이브러리(Axios -> Fetch)를 바꿀 때 UI 컴포넌트를 건드리지 않고 `pageApi.ts` 파일만 수정할 수 있게 됩니다.
