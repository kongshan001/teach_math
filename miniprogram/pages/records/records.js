const { loadRecords, deleteRecord, filterRecords } = require('../../utils/storage.js');
const { formatTime } = require('../../utils/utils.js');

Page({
  data: {
    currentFilter: 'all',
    records: [],
    showModal: false,
    currentRecord: null,
    currentTestId: null
  },

  onLoad(options) {
    if (options.mode === 'detail' && options.testId) {
      this.showRecordDetailById(options.testId);
    } else {
      this.loadRecords();
    }
  },

  loadRecords() {
    const records = loadRecords();
    const filteredRecords = filterRecords(records, this.data.currentFilter);

    this.setData({
      records: filteredRecords.map(r => ({
        ...r,
        totalTimeText: formatTime(r.totalTime)
      }))
    });
  },

  changeFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      currentFilter: filter
    });
    this.loadRecords();
  },

  showRecordDetail(e) {
    const testId = e.currentTarget.dataset.testId;
    this.showRecordDetailById(testId);
  },

  showRecordDetailById(testId) {
    const records = loadRecords();
    const record = records.find(r => r.testId === testId);

    if (!record) {
      wx.showToast({
        title: '记录不存在',
        icon: 'none'
      });
      return;
    }

    this.setData({
      showModal: true,
      currentRecord: {
        ...record,
        totalTimeText: formatTime(record.totalTime)
      },
      currentTestId: testId
    });
  },

  getStatusClass(q) {
    if (q.isCorrect && q.hadError) {
      return 'correct-but-mistake';
    }
    return q.isCorrect ? 'correct' : 'incorrect';
  },

  getStatusLabel(q) {
    if (q.isCorrect && q.hadError) {
      return '（曾经错过）';
    }
    if (!q.isCorrect) {
      return '（错误）';
    }
    return '';
  },

  closeModal() {
    this.setData({
      showModal: false,
      currentRecord: null,
      currentTestId: null
    });
  },

  deleteCurrentRecord() {
    if (!this.data.currentTestId) return;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          deleteRecord(this.data.currentTestId);
          this.closeModal();
          this.loadRecords();
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});