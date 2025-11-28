/**
 * stabilizer.js
 * 예측값을 안정화(히스테리시스/필터링)해 튀는 오류를 줄임
 *
 * 포즈 인식 결과가 순간적으로 튀는 것을 방지하기 위한 필터링 로직
 */

class PredictionStabilizer {
  constructor(options = {}) {
    this.threshold = options.threshold || 0.7; // 최소 확률 임계값
    this.smoothingFrames = options.smoothingFrames || 3; // 평활화할 프레임 수
    this.history = []; // 최근 예측 히스토리
  }

  /**
   * 예측 결과를 안정화
   * @param {Array} predictions - TM 모델의 예측 결과 배열
   * @returns {Object} { className: string, probability: number }
   */
  stabilize(predictions) {
    // 최고 확률의 예측 찾기
    let maxProb = 0;
    let maxClass = "";

    for (let i = 0; i < predictions.length; i++) {
      if (predictions[i].probability > maxProb) {
        maxProb = predictions[i].probability;
        maxClass = predictions[i].className;
      }
    }

    // 히스토리에 추가
    this.history.push({ className: maxClass, probability: maxProb });

    // 히스토리 크기 제한
    if (this.history.length > this.smoothingFrames) {
      this.history.shift();
    }

    // 히스토리가 충분히 쌓이지 않았으면 현재 값 반환
    if (this.history.length < this.smoothingFrames) {
      return { className: maxClass, probability: maxProb };
    }

    // 최빈값(가장 자주 나온 클래스) 계산
    const classCounts = {};
    this.history.forEach(item => {
      classCounts[item.className] = (classCounts[item.className] || 0) + 1;
    });

    let mostFrequentClass = maxClass;
    let maxCount = 0;

    for (const [className, count] of Object.entries(classCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentClass = className;
      }
    }

    // 임계값 체크
    if (maxProb < this.threshold) {
      return { className: "", probability: maxProb };
    }

    return {
      className: mostFrequentClass,
      probability: maxProb
    };
  }

  /**
   * 히스토리 초기화
   */
  reset() {
    this.history = [];
  }
}

// ES6 모듈로 내보내기
window.PredictionStabilizer = PredictionStabilizer;
