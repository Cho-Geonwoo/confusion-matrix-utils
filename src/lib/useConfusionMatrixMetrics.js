/**
 * @example
 * const accuracy = useConfusionMatrixMetrics({matrix: [[1]], labels: ['A']}).getAccuracy();
 * @param {Array<Array<Number>>} matrix - The confusion matrix, a 2D Array.
 * @param {Array<String>} labels - Labels of the confusion matrix, a 1D Array.
 * @returns {Object}
 */
const useConfusionMatrixMetrics = ({ matrix, labels }) => {
  if (matrix.length !== matrix[0].length) {
    throw new Error('Confusion matrix must be square');
  }

  if (labels.length !== matrix.length) {
    throw new Error('Confusion matrix and labels should have the same length');
  }

  /**
   * Get the confusion matrix
   * @returns {Array<Array<Number>>}
   */
  const getMatrix = () => {
    return matrix;
  };

  /**
   * Get the labels
   * @returns {Array<String>}
   */
  const getLabels = () => {
    return labels;
  };

  /**
   * Get the index
   * @returns {String}
   */
  const getIndex = label => {
    const index = labels.indexOf(label);
    if (index === -1) {
      throw new Error('The label does not exist');
    }
    return index;
  };

  /**
   * Get the total number of samples
   * @returns {Number}
   */
  const getTotalCount = () => {
    let predicted = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix.length; j += 1) {
        predicted += matrix[i][j];
      }
    }
    return predicted;
  };

  /**
   * Get the number of true predictions
   * @returns {Number}
   */
  const getTrueCount = () => {
    let trueCount = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      trueCount += matrix[i][i];
    }
    return trueCount;
  };

  /**
   * Get the number of false predictions
   * @returns {Number}
   */
  const getFalseCount = () => {
    return getTotalCount() - getTrueCount();
  };

  /**
   * Get the number of true positive predictions
   * @returns {Number}
   */
  const getTruePositiveCount = label => {
    const index = getIndex(label);
    return matrix[index][index];
  };

  /**
   * Get the number of true negative predictions
   * @returns {Number}
   */
  const getTrueNegativeCount = label => {
    const index = getIndex(label);
    let trueNegativeCount = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix.length; j += 1) {
        if (i !== index && j !== index) {
          trueNegativeCount += matrix[i][j];
        }
      }
    }
    return trueNegativeCount;
  };

  /**
   * Get the number of false positive predictions
   * @returns {Number}
   */
  const getFalsePositiveCount = label => {
    const index = getIndex(label);
    let falsePositiveCount = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      if (i !== index) {
        falsePositiveCount += matrix[i][index];
      }
    }
    return falsePositiveCount;
  };

  /**
   * Get the number of false negative predictions
   * @returns {Number}
   */
  const getFalseNegativeCount = label => {
    const index = getIndex(label);
    let falseNegativeCount = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      if (i !== index) {
        falseNegativeCount += matrix[index][i];
      }
    }
    return falseNegativeCount;
  };

  /**
   * Get the number of positive predictions
   * @returns {Number}
   */
  const getPositiveCount = label => {
    return getTruePositiveCount(label) + getFalseNegativeCount(label);
  };

  /**
   * Get the number of negative predictions
   * @returns {Number}
   */
  const getNegativeCount = label => {
    return getTotalCount() - getPositiveCount(label);
  };

  /**
   * Get the number of true positive rate
   * @returns {Number}
   */
  const getTruePositiveRate = label => {
    return getTruePositiveCount(label) / getPositiveCount(label);
  };

  /**
   * Get the number of true negative rate
   * @returns {Number}
   */
  const getTrueNegativeRate = label => {
    return getTrueNegativeCount(label) / getNegativeCount(label);
  };

  /**
   * Get the number of positive predicitve value
   * @returns {Number}
   */
  const getPositivePredictiveValue = label => {
    const TP = getTruePositiveCount(label);
    return TP / (TP + getFalsePositiveCount(label));
  };

  /**
   * Get the number of negative predicitve value
   * @returns {Number}
   */
  const getNegativePredictiveValue = label => {
    const TN = getTrueNegativeCount(label);
    return TN / (TN + getFalseNegativeCount(label));
  };

  /**
   * Get the number of false negative rate
   * @returns {Number}
   */
  const getFalseNegativeRate = label => {
    return 1 - getTruePositiveRate(label);
  };

  /**
   * Get the number of false positive rate
   * @returns {Number}
   */
  const getFalsePositiveRate = label => {
    return 1 - getTrueNegativeRate(label);
  };

  /**
   * Get the number of false discovery rate
   * @returns {Number}
   */
  const getFalseDiscoveryRate = label => {
    const FP = getFalsePositiveCount(label);
    return FP / (FP + getTruePositiveCount(label));
  };

  /**
   * Get the number of false omission rate
   * @returns {Number}
   */
  const getFalseOmissionRate = label => {
    const FN = getFalseNegativeCount(label);
    return FN / (FN + getTruePositiveCount(label));
  };

  /**
   * Get the number of f1 score
   * @returns {Number}
   */
  const getF1Score = label => {
    const TP = getTruePositiveCount(label);
    return (
      (2 * TP) /
      (2 * TP + getFalsePositiveCount(label) + getFalseNegativeCount(label))
    );
  };

  /**
   * Get the number of matthews correlation coefficient
   * @returns {Number}
   */
  const getMatthewsCorrelationCoefficient = label => {
    const TP = getTruePositiveCount(label);
    const TN = getTrueNegativeCount(label);
    const FP = getFalsePositiveCount(label);
    const FN = getFalseNegativeCount(label);
    return (
      (TP * TN - FP * FN) /
      Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN))
    );
  };

  /**
   * Get the number of informedness
   * @returns {Number}
   */
  const getInformedness = label => {
    return getTruePositiveRate(label) + getTrueNegativeRate(label) - 1;
  };

  /**
   * Get the number of markedness
   * @returns {Number}
   */
  const getMarkedness = label => {
    return (
      getPositivePredictiveValue(label) + getNegativePredictiveValue(label) - 1
    );
  };

  /**
   * Get the confusion matrix table
   * @returns {Array}
   */
  const getConfusionTable = label => {
    return [
      [getTruePositiveCount(label), getFalseNegativeCount(label)],
      [getFalsePositiveCount(label), getTrueNegativeCount(label)],
    ];
  };

  /**
   * Get the number of Accuracy
   * @returns {Number}
   */
  const getAccuracy = () => {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix.length; j += 1) {
        if (i === j) correct += matrix[i][j];
        else incorrect += matrix[i][j];
      }
    }
    return correct / (correct + incorrect);
  };

  return {
    getMatrix,
    getLabels,
    getIndex,
    getTotalCount,
    getTrueCount,
    getFalseCount,
    getTruePositiveCount,
    getTrueNegativeCount,
    getFalsePositiveCount,
    getFalseNegativeCount,
    getPositiveCount,
    getNegativeCount,
    getTruePositiveRate,
    getTrueNegativeRate,
    getPositivePredictiveValue,
    getNegativePredictiveValue,
    getFalseNegativeRate,
    getFalsePositiveRate,
    getFalseDiscoveryRate,
    getFalseOmissionRate,
    getF1Score,
    getMatthewsCorrelationCoefficient,
    getInformedness,
    getMarkedness,
    getConfusionTable,
    getAccuracy,
  };
};

export default useConfusionMatrixMetrics;
