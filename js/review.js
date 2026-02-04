import { loadRecords, deleteRecord, filterRecords } from './storage.js';
import { currentRecordId } from './state.js';
import { formatTime } from './utils.js';
import { showModal, hideModal } from './ui.js';

// 显示测试结果详情
export function showResultDetail(record) {
    window.currentRecordId = record.testId;
    
    let html = `
        <p><strong>测试时间：</strong>${record.date}</p>
        <p><strong>题目数量：</strong>${record.settings.questionCount}</p>
        <p><strong>总用时：</strong>${formatTime(record.totalTime)}</p>
        <p><strong>得分：</strong>${record.score}</p>
        <hr style="margin: 20px 0;">
    `;

    record.questions.forEach((q, index) => {
        let statusClass = q.isCorrect ? 'correct' : 'incorrect';
        let statusText = q.isCorrect ? '✓' : '✗';
        let statusLabel = !q.isCorrect ? '<strong style="color: #dc3545;">（错误）</strong>' : '';
        
        console.log(`showResultDetail - 题目 ${index + 1}: isCorrect=${q.isCorrect}, hadError=${q.hadError}, wasCorrect=${q.wasCorrect}`);
        
        if (q.hadError && q.isCorrect) {
            statusClass = 'correct-but-mistake';
            statusLabel = '<strong style="color: #ffa502;">（曾经错过）</strong>';
        }
        
        html += `
            <div class="question-review ${statusClass}">
                <div class="review-question">
                    ${statusText} ${index + 1}. ${q.question}
                    ${statusLabel}
                </div>
                <div class="review-answer">
                    你的答案: ${q.userAnswer} | 
                    正确答案: ${q.correctAnswer} | 
                    用时: ${q.timeSpent.toFixed(1)}秒
                </div>
            </div>
        `;
    });

    document.getElementById('detailContent').innerHTML = html;
    showModal();
}

// 显示历史记录
export function showRecords(filter = 'all') {
    const records = loadRecords();
    const filteredRecords = filterRecords(records, filter);

    let html = '';
    if (filteredRecords.length === 0) {
        html = '<p style="text-align: center; color: #999;">暂无记录</p>';
    } else {
        filteredRecords.forEach(record => {
            html += `
                <div class="record-item" onclick="window.showRecordDetail('${record.testId}')">
                    <div class="record-header">
                        <span class="record-date">${record.date}</span>
                        <span class="record-score">${record.score}</span>
                    </div>
                    <div class="record-detail">
                        ${record.correctCount}/${record.totalCount} 题正确 | 
                        用时 ${formatTime(record.totalTime)}
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('recordsList').innerHTML = html;
    window.showPage('recordsPage');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// 显示记录详情
export function showRecordDetail(testId) {
    const records = loadRecords();
    const record = records.find(r => r.testId === testId);
    
    if (!record) return;

    window.currentRecordId = testId;
    
    let html = `
        <p><strong>测试时间：</strong>${record.date}</p>
        <p><strong>题目数量：</strong>${record.settings.questionCount}</p>
        <p><strong>总用时：</strong>${formatTime(record.totalTime)}</p>
        <p><strong>得分：</strong>${record.score}</p>
        <hr style="margin: 20px 0;">
    `;

    record.questions.forEach((q, index) => {
        let statusClass = q.isCorrect ? 'correct' : 'incorrect';
        let statusText = q.isCorrect ? '✓' : '✗';
        let statusLabel = !q.isCorrect ? '<strong style="color: #dc3545;">（错误）</strong>' : '';
        
        console.log(`showRecordDetail - 题目 ${index + 1}: isCorrect=${q.isCorrect}, hadError=${q.hadError}, wasCorrect=${q.wasCorrect}`);
        
        if (q.hadError && q.isCorrect) {
            statusClass = 'correct-but-mistake';
            statusLabel = '<strong style="color: #ffa502;">（曾经错过）</strong>';
        }
        
        html += `
            <div class="question-review ${statusClass}">
                <div class="review-question">
                    ${statusText} ${index + 1}. ${q.question}
                    ${statusLabel}
                </div>
                <div class="review-answer">
                    你的答案: ${q.userAnswer} | 
                    正确答案: ${q.correctAnswer} | 
                    用时: ${q.timeSpent.toFixed(1)}秒
                </div>
            </div>
        `;
    });

    document.getElementById('detailContent').innerHTML = html;
    showModal();
}

// 关闭详情弹窗
export function closeDetailModal() {
    hideModal();
}

// 删除当前记录
export function deleteCurrentRecord() {
    if (!window.currentRecordId) return;
    
    if (!confirm('确定要删除这条记录吗？')) return;

    deleteRecord(window.currentRecordId);
    
    hideModal();
    window.showRecords('all');
}
