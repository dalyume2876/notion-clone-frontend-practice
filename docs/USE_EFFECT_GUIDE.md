# useEffect 완벽 가이드 (`USE_EFFECT_GUIDE.md`)

이 문서는 React 개발에서 가장 오용하기 쉽고 이해하기 까다로운 `useEffect` Hook에 대하여, Notion 클론 프로젝트에서 사용되는 실제 예시를 바탕으로 올바른 이해와 적용 기준을 돕기 위해 작성되었습니다.

---

## 1. `useEffect`란 무엇인가?

`useEffect`는 컴포넌트가 렌더링된 이후, **React의 제어 범위 밖에 있는 외부 시스템(네트워크 API, DOM 조작, 타이머, 로컬 스토리지 등)과 컴포넌트를 동기화**하기 위해 제공되는 Hook입니다.

### 렌더링과 Effect 실행 순서
React가 화면을 그리는 주기는 다음과 같습니다.
1. **렌더링 실행**: 컴포넌트 함수가 호출되어 JSX(Virtual DOM)를 반환합니다.
2. **화면 갱신 (Commit)**: React가 실제 브라우저 DOM에 변경 사항을 반영합니다.
3. **브라우저 페인팅**: 사용자가 브라우저 화면의 변화를 눈으로 인식합니다.
4. **Effect 실행**: 화면이 모두 그려진 "직후"에 비동기적으로 `useEffect` 내부 콜백이 실행됩니다. (화면 그리기를 방해하지 않기 위해 렌더링 이후에 실행됨)

---

## 2. 의존성 배열 (Dependency Array) 제어

`useEffect(callback, deps)`는 두 번째 인자인 의존성 배열(`deps`)에 따라 동작이 달라집니다.

### 2.1. 빈 의존성 배열 (`[]`)
* **동작**: 컴포넌트가 화면에 최초로 나타날 때(Mount) **딱 한 번만** 실행됩니다.
* **사용처**: 최초 렌더링 시 전체 문서 목록 받아오기.
  ```tsx
  useEffect(() => {
    // 최초 1회 전체 문서 조회
    fetchPageList();
  }, []);
  ```

### 2.2. 값이 채워진 의존성 배열 (`[value1, value2]`)
* **동작**: 컴포넌트가 Mount될 때 실행되고, 이후 배열 안의 값(`value1`, `value2`) 중 하나라도 변경될 때마다 실행됩니다.
* **사용처**: 사이드바에서 선택된 문서 ID가 바뀔 때마다 상세 데이터 다시 조회하기.
  ```tsx
  useEffect(() => {
    if (!selectedPageId) return;
    
    // selectedPageId가 변경될 때마다 해당 상세 문서 조회
    fetchPageDetail(selectedPageId);
  }, [selectedPageId]); // selectedPageId가 변경을 감지하는 트리거가 됨
  ```

### 2.3. 의존성 배열을 생략하는 경우 (`useEffect(callback)`)
* **동작**: 렌더링이 일어날 때마다(컴포넌트의 모든 상태나 Props가 바뀔 때마다) 매번 실행됩니다.
* **경고**: 성능 문제를 발생시키며, 상태 갱신이 내부에 있다면 **무한 루프**를 일으키므로 거의 사용하지 않습니다.

---

## 3. Cleanup (정리) 함수의 비밀

`useEffect` 내부에서 함수를 반환하면, 이를 **Cleanup 함수**라고 부릅니다. 이 함수는 다음 Effect가 실행되기 직전과 컴포넌트가 화면에서 사라질 때(Unmount) 호출됩니다.

* **왜 필요한가**: 이전 렌더링에서 등록한 타이머, 이벤트 리스너, 혹은 만료된 네트워크 요청을 정리하여 **메모리 누수와 버그를 방지**하기 위함입니다.

### 3.1. 자동 저장 디바운스(Debounce) 예시
Notion 에디터에서 사용자가 타이핑할 때마다 매번 API 요청을 보내면 서버가 마비될 수 있습니다. 타이핑이 끝나고 1초간 멈췄을 때만 저장하도록 디바운싱을 구현할 때 Cleanup 함수가 필수적으로 사용됩니다.

```tsx
useEffect(() => {
  if (!currentPageData) return;

  // 1초 뒤에 저장을 시도하는 타이머 등록
  const saveTimer = setTimeout(() => {
    savePageContent(currentPageData);
  }, 1000);

  // 사용자가 1초가 지나기 전에 다시 타이핑하면, 이전 타이머를 취소(Cleanup)
  return () => {
    clearTimeout(saveTimer);
  };
}, [currentPageData]);
```

### 3.2. AbortController를 이용한 네트워크 경합(Race Condition) 방지
네트워크 속도가 느릴 때 문서 A를 누르고 바로 문서 B를 누르면, 문서 A의 응답이 늦게 도달하여 화면에 문서 B 대신 A가 노출되는 '경합 조건'이 생깁니다. 이를 방지하기 위해 이전 요청을 취소(Abort)해야 합니다.

```tsx
useEffect(() => {
  if (!selectedPageId) return;

  const controller = new AbortController();

  const fetchDetail = async () => {
    try {
      const res = await axiosInstance.get(`/pages/${selectedPageId}`, {
        signal: controller.signal // 신호 전달
      });
      setPage(res.data);
    } catch (err: any) {
      if (err.name === 'CanceledError') {
        console.log('이전 요청 취소 완료');
      } else {
        setError(err.message);
      }
    }
  };

  fetchDetail();

  // 다른 문서를 클릭하거나 언마운트 시 현재 진행 중인 API 통신 강제 중단
  return () => {
    controller.abort();
  };
}, [selectedPageId]);
```

---

## 4. 흔히 하는 실수: 이벤트 핸들러 vs `useEffect`

가장 흔한 실수는 **사용자의 명시적 클릭이나 전송 행동**으로 발생하는 API 호출을 `useEffect` 안에 집어넣는 것입니다.

* **잘못된 설계**: "저장 버튼을 누르면 상태가 변경되고, 그 상태 변경을 감지해서 `useEffect`가 실행된다." (불필요한 상태 생성 및 복잡도 증가)
* **올바른 설계**: "저장 버튼을 누르면 그 버튼의 **이벤트 핸들러 함수 안에서 직접 API를 호출**한다."

### 비교 표
| 동작 유형 | 결정 기준 | 처리 위치 | 예시 |
| :--- | :--- | :--- | :--- |
| **외부 연동 / 동기화** | 화면 표시 후 외부 데이터 가져오기 | `useEffect` | 페이지 진입 시 문서 목록 불러오기 |
| **사용자 인터랙션** | 사용자의 능동적인 입력/클릭 행위 | `이벤트 핸들러 함수` | 저장/삭제 버튼 클릭, 작성 폼 제출 |

---

## 5. React 개발 모드(StrictMode)에서 Effect가 두 번 호출되는 이유

React 개발 모드(Vite의 `index.tsx` 내 `<React.StrictMode>`)에서는 컴포넌트가 마운트될 때 **Effect -> Cleanup -> Effect** 순으로 총 두 번 실행됩니다.

* **이유**: 개발자에게 **Cleanup 함수가 정상적으로 작성되었는지 검증**하기 위해 React가 일부러 켜고 끄는 과정을 시뮬레이션하는 것입니다.
* **대처**: API 호출이 두 번 일어나는 것은 StrictMode가 켜져 있을 때 발생하는 자연스러운 현상입니다. Cleanup 함수(예: `AbortController`)를 정상적으로 작성했다면 운영 환경(Production Build)에서는 정상적으로 한 번만 실행되므로 걱정하지 않아도 됩니다.

---

## 6. `useEffect`가 필요 없는 대표적 사례

1. **단순 Props/State 기반 계산**: Props로 받은 데이터를 변형해 그리는 경우, 이를 굳이 state로 관리하며 `useEffect`로 업데이트하지 말고, 렌더링 과정에서 일반 변수로 연산하십시오.
   * *Bad*: `useEffect(() => { setUpperTitle(title.toUpperCase()) }, [title])`
   * *Good*: `const upperTitle = title.toUpperCase();` (렌더링 시 자동 수행)
2. **이벤트 전달**: 폼 제출 시 API 전송은 `onSubmit` 이벤트 안에서 처리하면 되며, `useEffect`로 우회할 필요가 없습니다.
