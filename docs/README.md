# React Notion Clone 학습 가이드 홈 (`docs/`)

이 폴더는 React 프론트엔드 학습 및 AI와의 협업 개발을 원활하게 진행할 수 있도록 돕는 학습용 문서 저장소입니다.  
본 프로젝트의 핵심 목표는 코드의 단순 복사가 아닌, **컴포넌트 설계 기준, 프론트엔드 데이터 흐름, 그리고 React 핵심 Hook(`useState`, `useEffect`)의 올바른 사용 원리**를 주도적으로 학습하고 직접 타이핑하며 이해하는 것입니다.

---

## 1. 문서 구성 및 역할

| 파일명 | 목적 및 핵심 역할 | 권장 독자 |
| :--- | :--- | :--- |
| [README.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/README.md) | `docs` 폴더 전체의 길잡이 및 문서 탐색 가이드 | 학습자, AI |
| [PROJECT_OVERVIEW.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/PROJECT_OVERVIEW.md) | 프로젝트의 목표, 핵심 기능 범위, 기술 스택 정의 | 학습자, AI |
| [AI_WORKING_RULES.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/AI_WORKING_RULES.md) | AI가 주도하는 것이 아닌 학습자 중심으로 동작하도록 제한하는 개발 규칙 | AI |
| [FRONTEND_ARCHITECTURE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FRONTEND_ARCHITECTURE.md) | React 폴더 구조와 컴포넌트, 상태, API 계층 분리 기준 설명 | 학습자, AI |
| [FRONTEND_DATA_FLOW.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FRONTEND_DATA_FLOW.md) | 단방향 데이터 흐름(이벤트 → 상태 변경 → API → 재렌더링)에 대한 설명 | 학습자, AI |
| [USE_EFFECT_GUIDE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/USE_EFFECT_GUIDE.md) | `useEffect`의 동작 원리 및 올바른 사용처/오용 방지 안내 가이드 | 학습자, AI |
| [FEATURE_DEVELOPMENT_FLOW.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FEATURE_DEVELOPMENT_FLOW.md) | 하나의 기능을 구현할 때 거치는 14단계 표준 교육 프로세스 | 학습자, AI |
| [FEATURE_TEMPLATE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FEATURE_TEMPLATE.md) | 새 기능을 시작할 때 작성해야 하는 명세서 템플릿 | 학습자, AI |
| [DEVELOPMENT_PLAN.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/DEVELOPMENT_PLAN.md) | 정적 화면부터 Spring Boot API 연동까지의 9단계 커리큘럼 | 학습자, AI |
| [DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md) | 0~9단계의 실제 구현 순서와 완료 조건을 확인하는 체크리스트 | 학습자, AI |
| [CURRENT_STATUS.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/CURRENT_STATUS.md) | 현재 개발 진행 상황, 구현 완료 기능 및 미흡 개념 기록판 | 학습자, AI |
| [BACKEND_API_CONTRACT.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/BACKEND_API_CONTRACT.md) | 백엔드와 연결하기 전의 Mock 및 실제 REST API 규격 문서 | 학습자, AI |
| [LEARNING_CHECKLIST.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/LEARNING_CHECKLIST.md) | 각 단계 구현 시 개념적으로 완벽히 이해했는지 자가진단하는 문항 | 학습자 |

---

## 2. Codex(AI)의 문서 탐색 및 작업 순서

AI(Codex)는 새로운 세션이나 작업이 시작될 때 **반드시 다음 순서대로 문서를 읽고 상황을 파악**해야 합니다.

1. **[AI_WORKING_RULES.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/AI_WORKING_RULES.md)**: AI 코딩 제한 및 교육 모드 규칙 숙지
2. **[PROJECT_OVERVIEW.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/PROJECT_OVERVIEW.md)**: 전체 프로젝트 방향 파악
3. **[CURRENT_STATUS.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/CURRENT_STATUS.md)**: 현재 진행 단계 및 이전 진도 파악
4. **[FRONTEND_ARCHITECTURE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FRONTEND_ARCHITECTURE.md)**: 컴포넌트 설계 및 폴더 구조 이해
5. **[FRONTEND_DATA_FLOW.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FRONTEND_DATA_FLOW.md)**: 상태와 렌더링 관계 파악
6. **[FEATURE_DEVELOPMENT_FLOW.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FEATURE_DEVELOPMENT_FLOW.md)**: 기능 개발 프로세스 확인
7. **현재 작업 단계의 FEATURE 문서** (예: `docs/features/feature-detail-view.md` 등)
8. **[USE_EFFECT_GUIDE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/USE_EFFECT_GUIDE.md)**: React Effect 처리가 필요한 경우 참고
9. **[BACKEND_API_CONTRACT.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/BACKEND_API_CONTRACT.md)**: 비동기 데이터 API 연결이 필요한 경우 참고

---

## 3. 학습자가 개발 시작 전 읽어야 할 필수 문서
* **핵심 규칙 이해**: [AI_WORKING_RULES.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/AI_WORKING_RULES.md) (AI에게 주도권을 빼앗기지 않기 위해 중요합니다)
* **프론트 아키텍처 학습**: [FRONTEND_ARCHITECTURE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FRONTEND_ARCHITECTURE.md) & [FRONTEND_DATA_FLOW.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FRONTEND_DATA_FLOW.md)
* **이펙트 사용의 중심 잡기**: [USE_EFFECT_GUIDE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/USE_EFFECT_GUIDE.md)

---

## 4. 문서 갱신 규칙 (AI 및 학습자 공통)

* **기능 시작 시**: [FEATURE_TEMPLATE.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/FEATURE_TEMPLATE.md)를 복사하여 새로운 기능용 기획 문서를 생성합니다.
* **단계 완료 시**:
  1. [CURRENT_STATUS.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/CURRENT_STATUS.md)의 완료 목록 및 다음 작업 목록을 업데이트합니다.
  2. [LEARNING_CHECKLIST.md](file:///c:/Users/Dalyume/Documents/DAL/Coding/notion-clone/docs/LEARNING_CHECKLIST.md)의 체크박스를 확인하며, 개념적으로 답변할 수 있는지 검토합니다.
