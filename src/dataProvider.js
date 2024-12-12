export default function DataProvider() {
  const storage = window['localStorage'];

  const isFirstTime = function() {
    return !storage.getItem('firstTime');
  }

  const saveData = function(data) {
    if (isFirstTime) storage.setItem('firstTime', true);
    storage.setItem('projectList', JSON.stringify(data));
  }

  const loadData = function() {
    if (!isFirstTime) {
      const data = JSON.parse(storage.getItem('projectList'));
      return data;
    } else {
      return null;
    }
  }

  return {
    saveData,
    loadData
  };
}