# Teachable Machine Pose Game Template  
**AI를 직접 배우고, 직접 만들어보는 ‘바이브 코딩 실습’ 프로젝트**

이 템플릿은 학생들이 **포즈 인식 AI 모델을 직접 학습하고**, 그 모델을 기반으로  
**나만의 포즈 게임 웹앱을 만드는 전 과정**을 경험할 수 있도록 설계된 교육용 프로젝트입니다.

- 📌 AI가 어떻게 학습되는지 실습 중심으로 이해하고  
- 🎮 게임 형태로 AI를 응용해 실제로 동작하는 결과물을 만들고  
- 🤖 AI 코딩 도구(Claude Code, Cursor, GitHub Copilot 등)와 협업하며  
- 🧠 데이터 수집 → 모델 학습 → 게임 구현 → 테스트 및 배포까지 전체 AI 개발 사이클을 체험  

AI와 친숙해지고, “AI에게 잘 요청하는 법”까지 배우는 실습 중심 템플릿입니다.

---

## 📋 개요

**Teachable Machine에서 학습한 포즈 인식 모델을 활용해서 포즈 게임 웹앱을 만들 수 있도록 만든 템플릿입니다.**

기본 예시로 '얼굴 방향 인식 모델'이 포함되어 있으며,  
학습한 모델 파일만 교체하면 바로 자신만의 포즈 게임으로 확장 가능합니다.

---

# 🎮 포즈 게임 만들기 워크플로우 (핵심 단계)

포즈 게임 제작 과정은 아래 네 단계로 구성됩니다:

1. **게임 기획 (GAME_RULE.md 작성)**  
2. **포즈 모델 학습 (Teachable Machine)**  
3. **게임 로직 구현 (AI 바이브 코딩 기반)**  
4. **로컬 테스트 & GitHub Pages 배포**

이 흐름을 따르면 아이디어부터 완성품까지 안정적으로 개발할 수 있습니다.

---

# 🔥 Step 1 — GAME_RULE.md 작성 (게임 기획)

게임 제작의 첫 단계는 **GAME_RULE.md 파일 작성**입니다.  
이 문서는 게임 개발의 기준이 되며, 이후 AI 코딩 도구가 코드를 생성할 때 가장 중요한 참고 문서입니다.

GAME_RULE.md에는 아래 항목을 포함합니다:

- 게임 제목  
- 게임 설명  
- 구역 정의  
- 조작 방식  
- 아이템 종류  
- 점수 규칙  
- 게임 오버 조건  
- 레벨 시스템  
- UI 요소  

### ✨ 예시 게임: Catch Zone

```

게임 이름: Catch Zone

기본 구조:

* 화면은 LEFT / CENTER / RIGHT 3개 구역으로 구성된다.
* 플레이어는 포즈 인식으로 바구니를 조작한다.

  * 왼쪽 포즈 → LEFT
  * 중립 포즈 → CENTER
  * 오른쪽 포즈 → RIGHT

아이템 종류:

1. 폭탄(Bomb) → 닿으면 즉시 게임 오버
2. 사과(Apple) → +100점
3. 배(Pear) → +150점
4. 오렌지(Orange) → +200점

그 외:

* 과일 놓침 2번 시 게임 오버
* 20초마다 레벨 증가 (아이템 속도 증가)

```

---

# 🔥 Step 2 — Teachable Machine에서 포즈 모델 학습

GAME_RULE.md에서 정의한 포즈 목록에 맞춰 모델을 학습합니다.

### ✔️ 학습 절차

1. https://teachablemachine.withgoogle.com 접속  
2. Pose Project 생성  
3. 포즈 클래스 생성 (예: LEFT, CENTER, RIGHT)  
4. 각 클래스 최소 50개 이상 데이터 수집  
5. 모델 학습  
6. Export → Download  
7. 다운로드한 모델 파일을 `my_model/`에 배치  

```

my_model/
├── model.json
├── metadata.json
└── weights.bin

````

### ⚠️ metadata.json 클래스 라벨 확인 (필수)

```json
{
  "labels": ["LEFT", "CENTER", "RIGHT"]
}
````

불일치 시:

* GAME_RULE.md를 수정하거나
* 라벨 매핑 테이블을 만들어 코드에서 처리해야 함

---

# 🔥 Step 3 — 게임 로직 구현

(📌 AI 바이브 코딩 기반 개발 방식)

포즈 게임을 개발할 때 중요한 것은 **AI에게 작업을 어떻게 요청하느냐**입니다.
큰 작업을 한 번에 요청하면 오류가 많아지고, 문제 지점도 찾기 어렵습니다.

따라서 반드시 **검증 가능한 작은 단위**로 나누어 AI에게 지시해야 합니다.

---

## 🧩 1) "검증 가능한 단위"로 AI에게 요청하기

* ❌ “게임 전체 만들어줘” → 오류 많음
* ⭕ “템플릿 구조를 먼저 분석해줘”
* ⭕ “수정해야 할 파일 목록과 이유를 정리해줘”
* ⭕ “gameEngine.js의 스켈레톤 버전만 만들어줘”
* ⭕ “아이템 낙하 로직만 먼저 구현해줘”

---

## 🧩 2) 방법 A — “계획 → 설계 → 구현 → 테스트” 단계로 진행

### 1단계: 템플릿 구조 분석 요청

```
README를 읽고 tm-pose-template 구조를 분석해줘.
각 JS 파일의 역할과 수정해야 할 포인트를 계획으로 정리해줘.
```

### 2단계: GAME_RULE.md 정리

### 3단계: 개발 계획 수립

### 4단계: 구현 시작

---

## 🧩 3) 방법 B — 스켈레톤(껍데기) 먼저 만들기

```
게임 UI와 기본 흐름만 있는 스켈레톤 버전을 먼저 만들어줘.
충돌 처리와 점수 계산은 TODO 주석으로 남겨줘.
```

이후 기능을 각 단계별로 요청하여 완성시킵니다.

---

## 🧩 4) 전체 개발 프롬프트 흐름 예시

### ✔ 템플릿 구조 인식

### ✔ GAME_RULE.md 작성

### ✔ Git 업데이트

### ✔ TM 모델 학습 대기

### ✔ 모델 검증

### ✔ 기본 게임 구현

### ✔ 테스트 후 세부 수정 요청

---

# 🔥 Step 4 — 로컬 테스트 및 배포

(프로젝트 완성 후 실행 & 공유하기)

---

## 🚀 로컬에서 실행하기

브라우저 보안 정책 때문에 `index.html`을 더블클릭하면
모델 파일(`model.json`, `weights.bin`)이 로딩되지 않습니다.
반드시 **로컬 웹 서버**로 실행해야 합니다.

가장 쉬운 방법은 **VS Code의 Live Server 확장 프로그램**입니다.

---

### ✔️ 방법 1: VS Code — Live Server 사용 (권장)

1. VS Code 실행
2. 좌측 Extensions(확장) 탭 클릭
3. **Live Server** 검색 후 설치
4. `tm-pose-template` 폴더를 VS Code로 열기
5. `index.html` 파일 우클릭 → **Open with Live Server**
6. 브라우저 자동 실행 → 예:

```
http://127.0.0.1:5500/
```

또는

```
http://localhost:5500/
```

웹캠 권한을 허용하면 모델이 정상적으로 로딩됩니다.

---

### ✔️ 방법 2: Python 로컬 서버 실행

```bash
python3 -m http.server 8000
```

접속: [http://localhost:8000](http://localhost:8000)

---

### ✔️ 방법 3: Node.js http-server 실행

```bash
npx http-server -p 8000
```

접속: [http://localhost:8000](http://localhost:8000)

---

## 🌐 GitHub Pages 배포

1. 저장소 Fork
2. `my_model/`에 모델 파일 추가
3. GitHub에 push
4. **Settings → Pages**
5. **Deploy from branch** 선택
6. 자동 생성 URL로 접속

---

## 📁 프로젝트 구조

```
tm-pose-template/
├── index.html              # 웹앱 엔트리
├── css/
│   └── style.css           # 전체 UI/레이아웃
├── js/
│   ├── main.js             # 초기화 및 전체 연결
│   ├── poseEngine.js       # 포즈 인식 + 웹캠 처리
│   ├── gameEngine.js       # 게임 규칙 및 상태 머신
│   └── stabilizer.js       # 예측 안정화 필터
├── my_model/               # Teachable Machine 모델 파일
└── GAME_RULE.md            # 게임 규칙 정의 파일
```

---

# 👨‍🏫 교육 활용 포인트

* AI 개념을 실습 중심으로 자연스럽게 이해
* 포즈 인식 모델을 직접 만들고 활용
* 웹 개발(HTML/CSS/JS) 경험
* AI 코딩 도구(바이브 코딩) 활용 능력 향상
* Git/GitHub 협업 및 배포 경험
* 교육·캠프·동아리·방과후 수업에 최적화

---

# 👨‍💻 만든 사람

**Sangbong Lee (이상봉)**
Email: [ideabong@clapcampus.kr](mailto:ideabong@clapcampus.kr)

---

## 라이선스 (License)

이 프로젝트는 **개인적 및 비영리적 목적**으로만 사용이 가능합니다.

개인 학습이나 비영리 프로젝트 용도로는 자유롭게 수정 및 배포할 수 있습니다.

**영리 목적의 사용(유료 서비스, 광고 포함, 상용 제품 등)은 저작권자의 사전 서면 동의 없이는 엄격히 금지됩니다.**

상업적 사용을 원하시는 경우, 아래 연락처로 문의해 주세요.
**문의: [ideabong@clapcampus.kr](mailto:ideabong@clapcampus.kr)**
