const useConfusionMatrixMetrics = ({ matrix, labels }) => {
  if (matrix.length !== matrix[0].length) {
    throw new Error('Confusion matrix must be square');
  }

  if (labels.length !== matrix.length) {
    throw new Error('Confusion matrix and labels should have the same length');
  }

  const getMatrix = () => {
    return matrix;
  };

  const getLabels = () => {
    return labels;
  };

  const getIndex = label => {
    const index = labels.indexOf(label);
    if (index === -1) {
      throw new Error('The label does not exist');
    }
    return index;
  };

  const getTotalCount = () => {
    let predicted = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix.length; j += 1) {
        predicted += matrix[i][j];
      }
    }
    return predicted;
  };

  const getTrueCount = () => {
    let trueCount = 0;
    for (let i = 0; i < matrix.length; i += 1) {
      trueCount += matrix[i][i];
    }
    return trueCount;
  };

  const getFalseCount = () => {
    return getTotalCount() - getTrueCount();
  };

  const getTruePositiveCount = label => {
    const index = getIndex(label);
    return matrix[index][index];
  };

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

  const getPositiveCount = label => {
    return getTruePositiveCount(label) + getFalseNegativeCount(label);
  };

  const getNegativeCount = label => {
    return getTotalCount() - getPositiveCount(label);
  };

  const getTruePositiveRate = label => {
    return getTruePositiveCount(label) / getPositiveCount(label);
  };

  const getTrueNegativeRate = label => {
    return getTrueNegativeCount(label) / getNegativeCount(label);
  };

  const getPositivePredictiveValue = label => {
    const TP = getTruePositiveCount(label);
    return TP / (TP + getFalsePositiveCount(label));
  };

  const getNegativePredictiveValue = label => {
    const TN = getTrueNegativeCount(label);
    return TN / (TN + getFalseNegativeCount(label));
  };

  const getFalseNegativeRate = label => {
    return 1 - getTruePositiveRate(label);
  };

  const getFalsePositiveRate = label => {
    return 1 - getTrueNegativeRate(label);
  };

  const getFalseDiscoveryRate = label => {
    const FP = getFalsePositiveCount(label);
    return FP / (FP + getTruePositiveCount(label));
  };

  const getFalseOmissionRate = label => {
    const FN = getFalseNegativeCount(label);
    return FN / (FN + getTruePositiveCount(label));
  };

  const getF1Score = label => {
    const TP = getTruePositiveCount(label);
    return (
      (2 * TP) /
      (2 * TP + getFalsePositiveCount(label) + getFalseNegativeCount(label))
    );
  };

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

  const getInformedness = label => {
    return getTruePositiveRate(label) + getTrueNegativeRate(label) - 1;
  };

  const getMarkedness = label => {
    return (
      getPositivePredictiveValue(label) + getNegativePredictiveValue(label) - 1
    );
  };

  const getConfusionTable = label => {
    return [
      [getTruePositiveCount(label), getFalseNegativeCount(label)],
      [getFalsePositiveCount(label), getTrueNegativeCount(label)],
    ];
  };

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
