# 단계별 개발 순서 체크리스트 (`DEVELOPMENT_CHECKLIST.md`)

이 문서는 [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)의 0~9단계를 실제 작업 순서대로 점검하기 위한 체크리스트입니다.
구현 여부는 이 문서에서 확인하고, 개념 이해 여부는 [LEARNING_CHECKLIST.md](./LEARNING_CHECKLIST.md)에서 별도로 확인합니다.

체크 원칙은 다음과 같습니다.

- 직접 구현하고 브라우저에서 확인한 항목만 `[x]`로 변경합니다.
- 현재 단계가 끝나기 전에는 다음 단계의 기능 구현을 시작하지 않습니다.
- 각 단계 마지막에는 빌드와 브라우저 검증을 수행하고 [CURRENT_STATUS.md](./CURRENT_STATUS.md)를 갱신합니다.

---

## 0단계: 프로젝트 준비 및 실행 환경

- [x] 프로젝트 학습 문서 읽기
- [x] `front/` 폴더에 React + TypeScript + Vite 프로젝트 생성
- [x] ESLint 선택 및 기본 의존성 설치
- [x] 개발 서버 실행 후 `localhost:5173` 접속 확인
- [x] `index.html → main.tsx → App.tsx` 최초 렌더링 흐름 확인
- [x] Vite 예제 화면을 최소 `App` 컴포넌트로 정리

완료 조건: `front/`에서 개발 서버가 실행되고 최소 React 화면이 브라우저에 표시된다.

---

## 1단계: 정적 화면 구조

- [x] `src/app`, `pages`, `layouts`, `components`, `styles` 폴더 생성
- [x] `WorkspacePage` 컴포넌트 생성
- [x] `WorkspaceLayout` 컴포넌트 생성
- [x] `Sidebar` 정적 컴포넌트 생성
- [x] `PageEditor` 정적 컴포넌트 생성
- [x] `App → WorkspacePage → WorkspaceLayout` 조립 관계 연결
- [x] Vanilla CSS로 좌측 사이드바와 우측 본문 영역 배치
- [x] `/` 접속 시 정적 워크스페이스 화면 확인
- [x] 린트 및 프로덕션 빌드 통과
- [x] `CURRENT_STATUS.md` 갱신

완료 조건: 왼쪽 사이드바와 오른쪽 에디터 형태가 상태나 API 없이 정적으로 표시된다.

---

## 2단계: Mock 문서 목록과 선택 상태

- [x] `PageSummary` 타입 정의
- [x] `WorkspacePage`에 Mock 문서 배열 작성
- [x] `PageList` 컴포넌트 생성
- [x] `PageListItem` 컴포넌트 생성
- [x] `map()`과 `key`를 사용해 문서 목록 렌더링
- [x] `selectedPageId` 상태를 공통 부모에 선언
- [x] 선택 이벤트 함수를 Props로 하향 전달
- [x] 선택된 문서 항목에 활성 스타일 적용
- [x] 브라우저와 React DevTools에서 상태 변화 확인
- [x] 린트 및 프로덕션 빌드 통과
- [x] `CURRENT_STATUS.md`와 학습 체크리스트 갱신

완료 조건: 목록에서 문서를 클릭하면 선택된 항목의 스타일이 변경된다.

---

## 3단계: 문서 목록 조회 API

- [ ] API 계약의 `GET /api/pages` 확인
- [ ] Axios 및 Mock API 환경 준비
- [ ] `PageSummary` 응답 타입 점검
- [ ] `pageApi.ts`에 `getPages` 함수 작성
- [ ] `pages`, `isLoading`, `error` 상태 선언
- [ ] 빈 의존성 배열의 `useEffect`에서 최초 목록 요청
- [ ] 로딩·오류·성공 화면 분기 처리
- [ ] Network 탭에서 요청과 응답 확인
- [ ] StrictMode의 개발 환경 중복 실행 확인
- [ ] 린트 및 프로덕션 빌드 통과
- [ ] `CURRENT_STATUS.md`와 학습 체크리스트 갱신

완료 조건: 최초 접속 시 로딩 표시 후 API에서 받은 문서 목록이 나타난다.

---

## 4단계: 문서 상세 조회 API

- [ ] `PageDetail` 타입 정의
- [ ] API 계약의 `GET /api/pages/{pageId}` 확인
- [ ] `pageApi.ts`에 `getPageById` 함수 작성
- [ ] 상세 데이터·로딩·오류 상태 위치 결정
- [ ] `selectedPageId` 의존성의 `useEffect` 작성
- [ ] 선택 ID가 없을 때 요청하지 않도록 방어 처리
- [ ] 상세 데이터를 `PageEditor`에 Props로 전달
- [ ] 빠른 문서 전환 시 오래된 응답 처리 방식 점검
- [ ] Network 탭과 React DevTools로 흐름 확인
- [ ] 린트 및 프로덕션 빌드 통과
- [ ] `CURRENT_STATUS.md`와 학습 체크리스트 갱신

완료 조건: 목록에서 문서를 선택하면 해당 제목과 본문이 에디터에 표시된다.

---

## 5단계: 새 문서 생성

- [ ] API 계약의 `POST /api/pages` 확인
- [ ] `pageApi.ts`에 `createPage` 함수 작성
- [ ] 사이드바에 새 페이지 버튼 배치
- [ ] 생성 API를 클릭 이벤트 핸들러에서 호출
- [ ] 생성 중 중복 클릭 방지 상태 처리
- [ ] 성공 후 목록 갱신
- [ ] 생성된 문서 ID를 선택 상태에 반영
- [ ] 실패 안내 UI 처리
- [ ] Network 탭에서 `201 Created` 응답 확인
- [ ] 린트 및 프로덕션 빌드 통과
- [ ] `CURRENT_STATUS.md`와 학습 체크리스트 갱신

완료 조건: 새 페이지 버튼을 누르면 새 문서가 목록에 추가되고 바로 선택된다.

---

## 6단계: 문서 수정과 수동 저장

- [ ] API 계약의 `PATCH /api/pages/{pageId}` 확인
- [ ] 수정 요청 타입 정의
- [ ] `pageApi.ts`에 `updatePage` 함수 작성
- [ ] 제목과 본문을 제어 컴포넌트로 연결
- [ ] 선택 문서 변경 시 로컬 입력값 동기화
- [ ] 저장 버튼과 이벤트 핸들러 연결
- [ ] 저장 중·성공·실패 상태 표시
- [ ] 저장 성공 후 사이드바 제목 갱신
- [ ] Network 탭에서 요청 Body와 응답 확인
- [ ] 린트 및 프로덕션 빌드 통과
- [ ] `CURRENT_STATUS.md`와 학습 체크리스트 갱신

완료 조건: 제목과 본문을 수정해 저장하면 서버와 사이드바에 변경 내용이 반영된다.

---

## 7단계: 문서 삭제

- [ ] API 계약의 `DELETE /api/pages/{pageId}` 확인
- [ ] `pageApi.ts`에 `deletePage` 함수 작성
- [ ] 삭제 버튼 배치
- [ ] 삭제 API를 클릭 이벤트 핸들러에서 호출
- [ ] 삭제 중 중복 요청 방지
- [ ] 성공 후 `selectedPageId` 초기화
- [ ] 성공 후 문서 목록 갱신
- [ ] 에디터의 빈 상태 화면 처리
- [ ] Network 탭에서 `204 No Content` 확인
- [ ] 린트 및 프로덕션 빌드 통과
- [ ] `CURRENT_STATUS.md`와 학습 체크리스트 갱신

완료 조건: 선택한 문서가 삭제되고 목록과 에디터 상태가 안전하게 초기화된다.

---

## 8단계: 디바운스 자동 저장

- [ ] 자동 저장 대상 상태와 실행 조건 정의
- [ ] 입력 변경 여부를 구분하는 상태 설계
- [ ] `useEffect`에 1.5초 저장 타이머 등록
- [ ] Cleanup에서 이전 타이머 취소
- [ ] 최초 상세 로드 직후 불필요한 저장 방지
- [ ] 문서 전환 시 다른 문서로 저장되지 않도록 처리
- [ ] 저장 중·저장 완료·저장 실패 상태 표시
- [ ] 연속 입력 시 마지막 요청만 전송되는지 Network 탭 확인
- [ ] 수동 저장과 자동 저장의 역할 충돌 점검
- [ ] 린트 및 프로덕션 빌드 통과
- [ ] `CURRENT_STATUS.md`와 학습 체크리스트 갱신

완료 조건: 입력을 멈춘 뒤 1.5초가 지나면 한 번만 저장되며 타이핑 중에는 이전 타이머가 취소된다.

---

## 9단계: Spring Boot 실제 서버 연동

- [ ] 백엔드 서버의 실제 Base URL 확인
- [ ] `axiosInstance.ts`에 공통 설정 작성
- [ ] 프론트 API 함수의 엔드포인트 일치 여부 확인
- [ ] 백엔드 CORS 설정 확인
- [ ] 목록·상세·생성·수정·삭제 통합 테스트
- [ ] 400·404·500 응답의 화면 처리 확인
- [ ] 새로고침 후 DB 데이터 유지 확인
- [ ] 개발자 도구에서 전체 요청과 응답 검증
- [ ] 린트 및 프로덕션 빌드 통과
- [ ] 전체 학습 체크리스트 복습
- [ ] `CURRENT_STATUS.md` 최종 갱신

완료 조건: Spring Boot와 연결된 실제 DB 데이터를 사용해 모든 문서 기능이 정상 작동한다.
