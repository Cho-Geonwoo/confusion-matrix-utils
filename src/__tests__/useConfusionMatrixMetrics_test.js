import { useConfusionMatrixMetrics } from '../lib';

describe('Test functions in useConfusionMatrixMetrics', () => {
  const matrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const labels = ['A', 'B', 'C'];
  const utilFunctions = useConfusionMatrixMetrics({ matrix, labels });

  it('confusion matrix valiation function test', () => {
    expect(() =>
      useConfusionMatrixMetrics({ matrix: [], labels: [] }),
    ).toThrowError(`Cannot read property 'length' of undefined`);
    expect(() =>
      useConfusionMatrixMetrics({ matrix: [[1], [2]], labels: [] }),
    ).toThrowError('Confusion matrix must be square');
    expect(() =>
      useConfusionMatrixMetrics({ matrix: [[1]], labels: [] }),
    ).toThrowError('Confusion matrix and labels should have the same length');
  });

  it('getMatrix function test', () => {
    expect(utilFunctions.getMatrix()).toStrictEqual(matrix);
  });

  it('getLabels function test', () => {
    expect(utilFunctions.getLabels()).toStrictEqual(labels);
  });

  it('getIndex function test', () => {
    expect(() => utilFunctions.getTruePositiveCount('D')).toThrowError(
      'The label does not exist',
    );
  });

  it('getTotalCount function test', () => {
    expect(utilFunctions.getTotalCount()).toStrictEqual(3);
  });

  it('getTrueCount function test', () => {
    expect(utilFunctions.getTrueCount()).toStrictEqual(3);
  });

  it('getFalseCount function test', () => {
    expect(utilFunctions.getFalseCount()).toStrictEqual(0);
  });

  it('getTruePositiveCount function test', () => {
    expect(utilFunctions.getTruePositiveCount('A')).toStrictEqual(1);
  });

  it('getTrueNegativeCount function test', () => {
    expect(utilFunctions.getTrueNegativeCount('A')).toStrictEqual(2);
  });

  it('getFalsePositiveCount function test', () => {
    expect(utilFunctions.getFalsePositiveCount('A')).toStrictEqual(0);
  });

  it('getFalseNegativeCount function test', () => {
    expect(utilFunctions.getFalseNegativeCount('A')).toStrictEqual(0);
  });

  it('getPositiveCount function test', () => {
    expect(utilFunctions.getPositiveCount('A')).toStrictEqual(1);
  });

  it('getNegativeCount function test', () => {
    expect(utilFunctions.getNegativeCount('A')).toStrictEqual(2);
  });

  it('getTruePositiveRate function test', () => {
    expect(utilFunctions.getTruePositiveRate('A')).toStrictEqual(1);
  });

  it('getTrueNegativeRate function test', () => {
    expect(utilFunctions.getTrueNegativeRate('A')).toStrictEqual(1);
  });

  it('getPositivePredictiveValue function test', () => {
    expect(utilFunctions.getPositivePredictiveValue('A')).toStrictEqual(1);
  });

  it('getNegativePredictiveValue function test', () => {
    expect(utilFunctions.getNegativePredictiveValue('A')).toStrictEqual(1);
  });

  it('getFalseNegativeRate function test', () => {
    expect(utilFunctions.getFalseNegativeRate('A')).toStrictEqual(0);
  });

  it('getFalsePositiveRate function test', () => {
    expect(utilFunctions.getFalsePositiveRate('A')).toStrictEqual(0);
  });

  it('getFalseDiscoveryRate function test', () => {
    expect(utilFunctions.getFalseDiscoveryRate('A')).toStrictEqual(0);
  });

  it('getFalseOmissionRate function test', () => {
    expect(utilFunctions.getFalseOmissionRate('A')).toStrictEqual(0);
  });

  it('getF1Score function test', () => {
    expect(utilFunctions.getF1Score('A')).toStrictEqual(1);
  });

  it('getMatthewsCorrelationCoefficient function test', () => {
    expect(utilFunctions.getMatthewsCorrelationCoefficient('A')).toStrictEqual(
      1,
    );
  });

  it('getInformedness function test', () => {
    expect(utilFunctions.getInformedness('A')).toStrictEqual(1);
  });

  it('getMarkedness function test', () => {
    expect(utilFunctions.getMarkedness('A')).toStrictEqual(1);
  });

  it('getConfusionTable function test', () => {
    expect(utilFunctions.getConfusionTable('A')).toStrictEqual([
      [1, 0],
      [0, 2],
    ]);
  });

  it('getAccuracy function test', () => {
    expect(utilFunctions.getAccuracy()).toStrictEqual(1);
  });
});
