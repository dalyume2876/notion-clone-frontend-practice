# 기능 개발 표준 절차 (`FEATURE_DEVELOPMENT_FLOW.md`)

이 문서는 프로젝트에 새로운 기능을 하나씩 추가할 때 거쳐야 하는 **14단계 표준 흐름**을 규정합니다. 학습자와 AI는 한 번에 코드를 완성하려 하지 말고, 이 흐름을 따라 단계별로 검토하며 코딩을 전개해야 합니다.

---

## 기능 개발 14단계 흐름도

```text
[기획 및 설계]
1. 사용자 행동 정의 ──> 2. 필요한 데이터 정의 ──> 3. 데이터 타입 정의 ──> 4. 상태 위치 결정 ──> 5. 관련 컴포넌트 결정
                                                                                                    |
[API 및 데이터 구현]                                                                                 v
10. 로딩/오류 처리 <── 9. Props 전달 <── 8. 이벤트/useEffect 작성 <── 7. API 함수 작성 <── 6. API 명세 확인
|
v
[렌더링 및 검증]
11. 화면 렌더링 ──> 12. 브라우저 검증 ──> 13. 코드 흐름 복습 ──> 14. 문서 상태 갱신 (CURRENT_STATUS.md)
```

---

## 각 단계별 세부 가이드 및 AI 가이드라인

### 1단계: 사용자 행동 정의
* **내용**: 브라우저 상에서 사용자가 이 기능을 수행하기 위해 어떤 컨트롤(버튼, 입력 창)을 터치하고 반응을 유도하는지 정의합니다.
* **AI 의무**: 학습자에게 "사용자가 무슨 행위를 할 때 이 작업이 작동하는가?"를 구체적으로 선언해야 합니다.

### 2단계: 필요한 데이터 정의
* **내용**: 화면 표시에 필요한 데이터(예: 문서 제목, 작성일 등)와 상태 변경을 추적할 식별자(ID 등)를 명시합니다.

### 3단계: 데이터 타입 정의
* **내용**: [page.ts](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/types/page.ts)에 TypeScript interface나 type을 명시적으로 설계합니다.
* **AI 의무**: 새로운 데이터 구조를 도입하기 전 타입 설계를 먼저 출력해 학습자에게 보여주어야 합니다.

### 4단계: 상태(State)를 둘 위치 결정
* **내용**: 해당 데이터를 제어할 상태(`useState`)가 로컬에 머무를 것인지, 부모 컴포넌트로 끌어올려 전달받을 Props인지 위치를 논리적으로 판단합니다.
* **AI 의무**: 상태를 컴포넌트 트리의 어느 위치에 선언할 것인지 명확히 짚어주어야 합니다.

### 5단계: 관련 컴포넌트 결정
* **내용**: 변경된 데이터나 핸들러 함수를 주입받아 직접 렌더링되거나 이벤트를 보낼 컴포넌트들을 선점합니다.

### 6단계: API 명세 확인
* **내용**: [BACKEND_API_CONTRACT.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/BACKEND_API_CONTRACT.md)를 참고해 해당 기능이 호출할 HTTP Method, Request Path, Response Body 형식을 매칭합니다.

### 7단계: API 함수 작성
* **내용**: [pageApi.ts](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/src/api/pageApi.ts)에 통신을 직접 담당하는 순수 비동기 함수 코드를 추가합니다.

### 8단계: 이벤트 또는 useEffect 작성
* **내용**: 호출 시점이 렌더링 후 동기화 인지(`useEffect`), 사용자 버튼 조작인지(`Event Handler`)에 따라 알맞은 호출 방식을 채택해 구현합니다.
* **AI 의무**: 왜 `useEffect`를 선택했는지, 혹은 왜 이벤트 핸들러를 썼는지 학습자에게 구조적 이유를 기술해야 합니다.

### 9단계: Props 전달
* **내용**: 부모 컴포넌트에 정의된 상태와 업데이트 함수를 하위 자식 컴포넌트로 연결해 줍니다.

### 10단계: 로딩과 오류 처리
* **내용**: 데이터 전송 지연 및 네트워크 장해 상태를 감지하여 유용하게 피드백을 전달할 UI 플래그(`isLoading`, `error`) 처리를 결합합니다.

### 11단계: 화면 렌더링
* **내용**: 로딩과 에러가 없는 정상 상태에서 실제 화면 데이터를 돔(DOM) 요소에 그려냅니다.

### 12단계: 브라우저 검증
* **내용**:
  * 브라우저 개발자 도구의 Network 탭에서 어떤 페이로드가 가고 오는지 확인합니다.
  * React DevTools로 컴포넌트 상태 변화가 정확히 반영되는지 검사합니다.

### 13단계: 코드 흐름 복습
* **내용**: 데이터가 어떤 흐름을 타고 전달되었는지 요약 노트를 보며 머릿속에 기억합니다.

### 14단계: 문서 상태 갱신
* **내용**: [CURRENT_STATUS.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/CURRENT_STATUS.md) 파일에 완성한 진도를 표시하고, [LEARNING_CHECKLIST.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/LEARNING_CHECKLIST.md)의 배운 내용을 점검합니다.
