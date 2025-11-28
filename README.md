# Teachable Machine Pose Model Template

Teachable Machine에서 학습한 Pose 모델을 웹에서 테스트할 수 있는 템플릿입니다.

## 📋 개요

이 프로젝트는 학생들이 [Teachable Machine](https://teachablemachine.withgoogle.com/)에서 포즈 인식 모델을 학습한 후, 해당 모델을 GitHub에 업로드하고 GitHub Pages를 통해 실시간으로 테스트할 수 있도록 만들어진 템플릿입니다.

### 현재 포함된 예시 모델

이 저장소에는 **얼굴 방향 인식 모델**이 포함되어 있습니다:
- **왼쪽**: 얼굴이 왼쪽을 바라볼 때
- **오른쪽**: 얼굴이 오른쪽을 바라볼 때
- **정면**: 얼굴이 정면을 바라볼 때
- **위**: 얼굴이 위를 바라볼 때
- **아래**: 얼굴이 아래를 바라볼 때

이 모델은 데모용이며, 자신만의 포즈 인식 모델로 교체하여 사용할 수 있습니다.

## 🚀 사용 방법

### 1. Teachable Machine에서 모델 학습 및 다운로드

1. [Teachable Machine](https://teachablemachine.withgoogle.com/)에 접속
2. "Pose Project" 선택
3. 원하는 포즈들을 학습
4. "Export Model" → "Download" 선택하여 모델 파일 다운로드

### 2. 모델 파일 추가

다운로드한 모델 파일을 `my_model/` 폴더에 넣어주세요:
- `my_model/model.json`
- `my_model/weights.bin`
- `my_model/metadata.json`

### 3. 로컬에서 테스트

브라우저 보안 정책으로 인해 로컬 웹 서버가 필요합니다.

**Python 사용 (Python 3):**
```bash
python3 -m http.server 8000
```

**Node.js 사용:**
```bash
npx http-server -p 8000
```

**VS Code 사용:**
- Live Server 확장 프로그램 설치
- index.html 우클릭 → "Open with Live Server"

브라우저에서 `http://localhost:8000` 접속

### 4. GitHub Pages로 배포

1. 이 저장소를 자신의 GitHub 계정으로 Fork 또는 복사
2. 모델 파일을 `my_model/` 폴더에 추가
3. GitHub 저장소 설정에서 Pages 활성화:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root) 선택
   - Save
4. 몇 분 후 `https://<username>.github.io/<repository-name>/`에서 접속 가능

## ✨ 주요 기능

- ✅ 실시간 웹캠 포즈 인식
- ✅ 포즈 스켈레톤 및 키포인트 시각화
- ✅ 예측 결과 확률 표시
- ✅ 최고 확률 클래스 강조 표시
- ✅ Start/Stop 버튼으로 웹캠 제어

## 🛠 기술 스택

- TensorFlow.js 1.3.1
- Teachable Machine Pose Library 0.8
- Vanilla JavaScript
- HTML5 Canvas

## 📁 프로젝트 구조

```
tm-pose-template/
├── index.html              # 화면 구조와 JS/CSS를 불러오는 앱의 엔트리 HTML
├── css/
│   └── style.css          # 페이지 전체 스타일과 게임 UI 디자인
├── js/
│   ├── main.js            # 포즈 인식과 게임 로직을 초기화하고 서로 연결하는 진입점
│   ├── poseEngine.js      # 웹캠 + TM 포즈 모델 로딩 및 예측(label) 생성 담당
│   ├── gameEngine.js      # 게임 단계, 명령, 점수, 제한시간 등 게임 규칙 전체를 담당
│   └── stabilizer.js      # 예측값을 안정화(히스테리시스/필터링)해 튀는 오류를 줄임
├── my_model/              # Teachable Machine 모델 파일 위치
│   ├── model.json         # TM에서 학습한 포즈 모델의 구조(네트워크 아키텍처) 정보
│   ├── metadata.json      # 클래스 이름 등 모델 메타데이터 정보
│   └── weights.bin        # 포즈 모델이 학습한 실제 가중치 데이터
├── GAME_RULE.md           # 🎮 게임 규칙 정의 파일 (AI 코딩 시 참고)
└── README.md
```

### 파일 설명

#### `GAME_RULE.md` 🎮
- **게임 규칙 정의 파일**
- 게임 제목, 설명, 목표, 점수 체계, 필요한 포즈 등을 구조화하여 작성
- AI 코딩 도구(Claude Code, Cursor 등)가 이 파일을 읽고 자동으로 게임 코드 생성
- 게임 개발 시 가장 먼저 작성해야 하는 파일
- 템플릿 형식으로 제공되어 쉽게 작성 가능

#### `js/main.js`
- 애플리케이션의 진입점
- PoseEngine, GameEngine, Stabilizer를 초기화하고 연결
- 웹캠과 캔버스 설정
- UI 이벤트 처리 (Start/Stop 버튼)

#### `js/poseEngine.js`
- Teachable Machine 포즈 모델 로드
- 웹캠 스트림 관리
- 실시간 포즈 예측 수행
- 포즈 스켈레톤 및 키포인트 그리기

#### `js/gameEngine.js`
- 게임 로직 관리 (선택적 기능)
- 점수, 레벨, 타이머 관리
- 게임 명령 발급 및 검증
- 향후 게임 확장을 위한 기반 제공

#### `js/stabilizer.js`
- 예측 결과 안정화
- 히스테리시스 필터링으로 순간적인 오인식 방지
- 예측 확률 임계값 처리
- 최빈값 기반 평활화

## 🎮 포즈 게임 만들기

이 템플릿을 활용하여 자신만의 포즈 인식 게임을 만들 수 있습니다. 다음 3단계 워크플로우를 따라주세요:

### Step 1: 게임 규칙 설계 - GAME_RULE.md 작성

먼저 만들고자 하는 게임의 규칙을 설계합니다. [GAME_RULE.md](GAME_RULE.md) 파일을 열어 템플릿을 따라 작성하세요.

**GAME_RULE.md에 포함할 내용:**
- ✅ 게임 제목과 설명
- ✅ 게임 목표와 기본 규칙
- ✅ 필요한 포즈 목록 (Teachable Machine 클래스)
- ✅ 점수 체계 (점수 획득/차감 규칙)
- ✅ 시간 설정 (제한시간, 명령 속도 등)
- ✅ 추가 기능 (선택사항)

**예시 게임 규칙:**
```markdown
# 게임 제목: 얼굴 방향 따라하기

## 게임 규칙
- 화면에 랜덤하게 방향이 표시됩니다
- 제한시간 내에 해당 방향으로 얼굴을 돌리세요
- 정확한 포즈: +10점
- 60초 동안 최대한 높은 점수를 획득하세요!

## 필요한 포즈
왼쪽, 오른쪽, 위, 아래, 정면
```

> 💡 **Tip**: GAME_RULE.md를 먼저 작성하면 AI 코딩 도구(Claude Code, Cursor 등)가 게임 규칙을 이해하고 더 정확한 코드를 생성할 수 있습니다!

### Step 2: Teachable Machine - 포즈 모델 학습

[GAME_RULE.md](GAME_RULE.md)에서 정의한 포즈들을 Teachable Machine에서 학습합니다.

**학습 단계:**

1. **Teachable Machine 접속**
   - [https://teachablemachine.withgoogle.com/](https://teachablemachine.withgoogle.com/)
   - "Pose Project" 선택

2. **클래스 생성**
   - GAME_RULE.md의 "필요한 포즈 목록"을 참고하여 각 포즈마다 클래스 생성
   - 예: "왼쪽", "오른쪽", "위", "아래", "정면"

3. **샘플 수집**
   - 각 클래스마다 웹캠으로 포즈 샘플 수집 (최소 50개 이상 권장)
   - 다양한 각도와 거리에서 촬영하여 정확도 향상
   - 배경이 다른 환경에서도 테스트

4. **모델 학습**
   - "Train Model" 버튼 클릭
   - 학습이 완료될 때까지 대기

5. **모델 다운로드**
   - "Export Model" 클릭
   - "Download" 탭 선택
   - "Download my model" 버튼 클릭하여 파일 다운로드

6. **모델 파일 배치**
   - 다운로드한 파일의 압축을 풀어 `my_model/` 폴더에 배치
   ```
   my_model/
   ├── model.json
   ├── metadata.json
   └── weights.bin
   ```

7. **⚠️ metadata.json 클래스 라벨 확인 (중요!)**
   - `my_model/metadata.json` 파일을 열어서 학습된 클래스 라벨 확인
   - 파일 내용 예시:
   ```json
   {
     "labels": ["왼쪽", "오른쪽", "정면", "위", "아래"],
     ...
   }
   ```
   - **이 라벨 정보를 기준으로 게임 코드를 작성해야 합니다!**
   - GAME_RULE.md의 "필요한 포즈 목록"과 일치하는지 확인
   - 불일치하면 게임이 제대로 작동하지 않을 수 있음

> 💡 **Tip**: GAME_RULE.md에 정의한 포즈 목록을 보면서 학습하면 누락 없이 모든 포즈를 학습할 수 있습니다!

### Step 3: 게임 로직 구현

[GAME_RULE.md](GAME_RULE.md)에 정의한 게임 규칙을 코드로 구현합니다.

**🤖 AI 코딩 도구 활용 (권장)**

Claude Code, Cursor, GitHub Copilot 등의 AI 도구를 사용하면 쉽게 구현할 수 있습니다:

**Step 3-1: metadata.json 라벨 확인**

먼저 `my_model/metadata.json` 파일을 열어 실제 라벨을 확인합니다:
```json
{
  "labels": ["왼쪽", "오른쪽", "정면", "위", "아래"],
  ...
}
```

**Step 3-2: 라벨 불일치 시 대응**

만약 metadata.json의 라벨과 GAME_RULE.md의 포즈 목록이 다른 경우:

- **옵션 A (권장)**: metadata.json 기준으로 GAME_RULE.md 수정
- **옵션 B**: GAME_RULE.md에 라벨 매핑 테이블 작성 (상세 내용은 GAME_RULE.md 참고)

**Step 3-3: AI에게 코드 생성 요청**

```
💬 AI에게 요청하는 방법:

"my_model/metadata.json 파일의 labels 항목을 확인해서
실제 클래스 라벨 이름을 파악해줘.

그리고 GAME_RULE.md 파일을 읽고, 정의된 게임 규칙대로
js/gameEngine.js와 js/main.js를 수정해줘.
metadata.json의 정확한 라벨 이름을 사용해야 해.

만약 GAME_RULE.md에 라벨 매핑 테이블이 있으면,
코드에서는 metadata.json 라벨을 사용하고
UI 표시는 매핑 테이블의 이름을 사용해줘.

index.html과 css/style.css도 게임 UI를 추가해줘."
```

AI가 metadata.json과 GAME_RULE.md를 읽고 자동으로:
- ✅ metadata.json의 정확한 클래스 라벨 확인 및 사용
- ✅ 게임 타이머 설정
- ✅ 점수 체계 구현
- ✅ 명령 발급 로직 작성
- ✅ UI 업데이트 코드 생성 (라벨 매핑 적용)
- ✅ 스타일 적용

**📝 직접 코딩하는 경우**

[js/gameEngine.js](js/gameEngine.js)는 이미 기본적인 게임 프레임워크를 제공합니다:
- ✅ 점수 관리 (`score`, `addScore()`)
- ✅ 레벨 시스템 (`level`)
- ✅ 타이머 기능 (`timeLimit`, `startTimer()`)
- ✅ 게임 명령 발급 (`issueNewCommand()`)
- ✅ 포즈 감지 처리 (`onPoseDetected()`)

**커스터마이징 예시:**

```javascript
// js/main.js에서 게임 모드 활성화
async function init() {
  // ... 기존 초기화 코드 ...

  // ⚠️ 중요: metadata.json의 정확한 라벨 이름 사용
  // metadata.json 확인: ["왼쪽", "오른쪽", "정면", "위", "아래"]
  startGameMode({
    timeLimit: 60,  // GAME_RULE.md의 "시간 설정" 참고
    commands: ["왼쪽", "오른쪽", "위", "아래"]  // metadata.json의 labels와 일치해야 함
  });
}
```

**게임 UI 추가:**

[index.html](index.html)에 게임 UI 요소를 추가:
```html
<div id="game-info">
  <div id="score">점수: 0</div>
  <div id="timer">남은 시간: 60초</div>
  <div id="command">명령: 왼쪽을 보세요!</div>
</div>
```

**스타일 수정:**

[css/style.css](css/style.css)에서 게임 UI 스타일 추가

### 완성 후 테스트 및 배포

1. **로컬 테스트**
   ```bash
   python3 -m http.server 8000
   # 또는
   npx http-server -p 8000
   ```

2. **GitHub Pages 배포**
   - GitHub 저장소에 push
   - Settings → Pages에서 배포 활성화
   - 전 세계 누구나 접속 가능!

## 🎓 교육 활용

이 템플릿은 다음과 같은 교육 목적으로 활용할 수 있습니다:

- 머신러닝/AI 기초 학습
- 포즈 인식 기술 이해
- 웹 개발 실습 (HTML/CSS/JavaScript)
- 게임 로직 설계 및 구현
- GitHub 및 버전 관리 학습
- GitHub Pages를 통한 배포 경험

## 👨‍💻 만든 사람

**Sangbong Lee**
- Email: idealbong@gmail.com

## 📝 라이선스

이 프로젝트는 교육 목적으로 자유롭게 사용 가능합니다.
