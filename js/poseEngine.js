/**
 * poseEngine.js
 * 웹캠 + TM 포즈 모델 로딩 및 예측(label) 생성 담당
 *
 * Teachable Machine 포즈 모델을 로드하고 웹캠에서 실시간 포즈 인식을 수행
 */

class PoseEngine {
  constructor(modelURL = "./my_model/") {
    this.modelURL = modelURL;
    this.model = null;
    this.webcam = null;
    this.maxPredictions = 0;
    this.isRunning = false;
    this.animationId = null;
    this.onPrediction = null; // 예측 결과 콜백
    this.onDraw = null; // 그리기 콜백
  }

  /**
   * 모델과 웹캠 초기화
   * @param {Object} options - 옵션 { size, flip }
   */
  async init(options = {}) {
    const { size = 200, flip = true } = options;

    // 모델 로드
    const modelURL = this.modelURL + "model.json";
    const metadataURL = this.modelURL + "metadata.json";

    // Teachable Machine 포즈 모델 로드
    this.model = await tmPose.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    // 웹캠 설정
    this.webcam = new tmPose.Webcam(size, size, flip);
    await this.webcam.setup();
    await this.webcam.play();

    return {
      maxPredictions: this.maxPredictions,
      webcam: this.webcam
    };
  }

  /**
   * 예측 루프 시작
   */
  start() {
    this.isRunning = true;
    this.loop();
  }

  /**
   * 예측 루프 중지
   */
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.webcam) {
      this.webcam.stop();
    }
  }

  /**
   * 메인 루프
   */
  async loop() {
    if (!this.isRunning) return;

    this.webcam.update(); // 웹캠 프레임 업데이트
    await this.predict();
    this.animationId = window.requestAnimationFrame(() => this.loop());
  }

  /**
   * 포즈 예측 수행
   */
  async predict() {
    // Step 1: PoseNet을 통해 포즈 추정
    const { pose, posenetOutput } = await this.model.estimatePose(this.webcam.canvas);

    // Step 2: Teachable Machine 분류 모델로 예측
    const prediction = await this.model.predict(posenetOutput);

    // 콜백 호출
    if (this.onPrediction) {
      this.onPrediction(prediction, pose);
    }

    if (this.onDraw && pose) {
      this.onDraw(pose);
    }

    return { prediction, pose };
  }

  /**
   * 예측 결과 콜백 등록
   * @param {Function} callback - (prediction, pose) => void
   */
  setPredictionCallback(callback) {
    this.onPrediction = callback;
  }

  /**
   * 그리기 콜백 등록
   * @param {Function} callback - (pose) => void
   */
  setDrawCallback(callback) {
    this.onDraw = callback;
  }

  /**
   * 모델의 클래스 수 반환
   */
  getMaxPredictions() {
    return this.maxPredictions;
  }
}

// 전역으로 내보내기
window.PoseEngine = PoseEngine;
