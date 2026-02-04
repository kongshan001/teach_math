// 保存测试记录
export function saveTestRecord(record) {
    const records = loadRecords();
    records.unshift(record);
    localStorage.setItem('math_test_records', JSON.stringify(records));
}

// 加载所有测试记录
export function loadRecords() {
    return JSON.parse(localStorage.getItem('math_test_records') || '[]');
}

// 删除测试记录
export function deleteRecord(testId) {
    const records = loadRecords();
    const filtered = records.filter(r => r.testId !== testId);
    localStorage.setItem('math_test_records', JSON.stringify(filtered));
}

// 筛选记录
export function filterRecords(records, filter) {
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
