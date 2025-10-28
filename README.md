# TeamSync

팀 협업을 위한 실시간 프로젝트 관리 플랫폼

## 프로젝트 소개

Django REST Framework 백엔드와 Vue.js 프론트엔드로 구성된 프로젝트 관리 도구입니다.
실시간 채팅, 태스크 관리, 외부 API 연동 등의 기능을 제공합니다.

## 주요 기능

**실시간 협업**
- WebSocket 기반 실시간 채팅
- 실시간 알림 시스템
- 온라인 사용자 표시

**프로젝트 관리**
- 칸반 보드 (드래그 앤 드롭)
- 작업 할당 및 추적
- 간트 차트 시각화
- 마일스톤 관리

**권한 관리**
- 조직/팀/프로젝트 계층 구조
- 역할 기반 접근 제어 (RBAC)
- 세밀한 권한 설정

**외부 연동**
- GitHub (커밋, PR, 이슈)
- Slack/Discord 알림
- Google Calendar 동기화
- AWS S3 파일 스토리지

**비동기 처리**
- Celery 백그라운드 작업
- 이메일/리포트 자동 발송
- 주기적 데이터 백업

**검색 및 분석**
- Elasticsearch 전체 검색
- 프로젝트 대시보드
- 활동 로그

## 기술 스택

**Backend**
- Django 5.0 + Django REST Framework 3.14
- Django Channels 4.0 (WebSocket)
- Celery 5.3 + Redis
- PostgreSQL 15
- Elasticsearch 8.x
- JWT Authentication

**Frontend**
- Vue.js 3.x
- Vuex (상태 관리)
- Vue Router
- Axios (API 통신)
- Socket.IO Client (WebSocket)
- Vuetify / Element Plus (UI)

**DevOps**
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Nginx
- AWS ECS / GCP Cloud Run

**Testing**
- Backend: pytest, pytest-django, Factory Boy
- Frontend: Jest, Vue Test Utils

## 아키텍처

```
┌──────────────────────────────────────────────┐
│           Vue.js Frontend (SPA)              │
│  - Vue Router, Vuex, Axios, Socket.IO        │
└──────────────────┬───────────────────────────┘
                   │
┌──────────────────▼───────────────────────────┐
│          Nginx (Reverse Proxy)               │
└──────────────────┬───────────────────────────┘
                   │
       ┌───────────┴──────────┐
       │                      │
┌──────▼───────┐    ┌─────────▼─────────┐
│ Django REST  │    │ Django Channels   │
│  (Gunicorn)  │    │    (Daphne)       │
└──────┬───────┘    └─────────┬─────────┘
       │                      │
       └──────────┬───────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼────┐   ┌────▼────┐   ┌───▼────────┐
│Postgres│   │  Redis  │   │Elasticsearch│
└────────┘   └────┬────┘   └────────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼─────┐    ┌──────▼─────┐
    │  Celery  │    │   Celery   │
    │  Worker  │    │    Beat    │
    └──────────┘    └────────────┘
```
