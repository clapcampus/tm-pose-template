/**
 * gameEngine.js
 * 게임 단계, 명령, 점수, 제한시간 등 게임 규칙 전체를 담당
 *
 * 포즈 인식을 활용한 게임 로직을 관리하는 엔진
 * (현재는 기본 템플릿이므로 향후 게임 로직 추가 가능)
 */

class GameEngine {
  constructor() {
    this.score = 0;
    this.level = 1;
    this.timeLimit = 0;
    this.currentCommand = null;
    this.isGameActive = false;
    this.gameTimer = null;
    this.onCommandChange = null; // 명령 변경 콜백
    this.onScoreChange = null; // 점수 변경 콜백
    this.onGameEnd = null; // 게임 종료 콜백
  }

  /**
   * 게임 시작
   * @param {Object} config - 게임 설정 { timeLimit, commands }
   */
  start(config = {}) {
    this.isGameActive = true;
    this.score = 0;
    this.level = 1;
    this.timeLimit = config.timeLimit || 60; // 기본 60초
    this.commands = config.commands || []; // 게임 명령어 배열

    if (this.timeLimit > 0) {
      this.startTimer();
    }

    // 첫 번째 명령 발급 (게임 모드일 경우)
    if (this.commands.length > 0) {
      this.issueNewCommand();
    }
  }

  /**
   * 게임 중지
   */
  stop() {
    this.isGameActive = false;
    this.clearTimer();

    if (this.onGameEnd) {
      this.onGameEnd(this.score, this.level);
    }
  }

  /**
   * 타이머 시작
   */
  startTimer() {
    this.gameTimer = setInterval(() => {
      this.timeLimit--;

      if (this.timeLimit <= 0) {
        this.stop();
      }
    }, 1000);
  }

  /**
   * 타이머 정리
   */
  clearTimer() {
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
  }

  /**
   * 새로운 명령 발급
   */
  issueNewCommand() {
    if (this.commands.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.commands.length);
    this.currentCommand = this.commands[randomIndex];

    if (this.onCommandChange) {
      this.onCommandChange(this.currentCommand);
    }
  }

  /**
   * 포즈 인식 결과 처리
   * @param {string} detectedPose - 인식된 포즈 이름
   */
  onPoseDetected(detectedPose) {
    if (!this.isGameActive) return;

    // 현재 명령과 일치하는지 확인
    if (this.currentCommand && detectedPose === this.currentCommand) {
      this.addScore(10); // 점수 추가
      this.issueNewCommand(); // 새로운 명령 발급
    }
  }

  /**
   * 점수 추가
   * @param {number} points - 추가할 점수
   */
  addScore(points) {
    this.score += points;

    // 레벨업 로직 (예: 100점마다)
    if (this.score >= this.level * 100) {
      this.level++;
    }

    if (this.onScoreChange) {
      this.onScoreChange(this.score, this.level);
    }
  }

  /**
   * 명령 변경 콜백 등록
   * @param {Function} callback - (command) => void
   */
  setCommandChangeCallback(callback) {
    this.onCommandChange = callback;
  }

  /**
   * 점수 변경 콜백 등록
   * @param {Function} callback - (score, level) => void
   */
  setScoreChangeCallback(callback) {
    this.onScoreChange = callback;
  }

  /**
   * 게임 종료 콜백 등록
   * @param {Function} callback - (finalScore, finalLevel) => void
   */
  setGameEndCallback(callback) {
    this.onGameEnd = callback;
  }

  /**
   * 현재 게임 상태 반환
   */
  getGameState() {
    return {
      isActive: this.isGameActive,
      score: this.score,
      level: this.level,
      timeRemaining: this.timeLimit,
      currentCommand: this.currentCommand
    };
  }
}

// 전역으로 내보내기
window.GameEngine = GameEngine;
