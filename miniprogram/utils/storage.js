const STORAGE_KEY = 'math_test_records';

function saveTestRecord(record) {
  const records = loadRecords();
  records.unshift(record);
  wx.setStorageSync(STORAGE_KEY, records);
}

function loadRecords() {
  try {
    return wx.getStorageSync(STORAGE_KEY) || [];
  } catch (e) {
    return [];
  }
}

function deleteRecord(testId) {
  const records = loadRecords();
  const filtered = records.filter(r => r.testId !== testId);
  wx.setStorageSync(STORAGE_KEY, filtered);
}

function filterRecords(records, filter) {
  if (filter === 'all') {
    return records;
  }
  
  return records.filter(record => {
    if (filter === 'wrong') {
      return record.questions.some(q => !q.isCorrect);
    }
    return record.questions.some(q => q.type === filter);
  });
}

module.exports = {
  saveTestRecord,
  loadRecords,
  deleteRecord,
  filterRecords
};