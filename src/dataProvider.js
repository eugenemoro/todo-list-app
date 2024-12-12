export default function DataProvider() {
  const storage = window.localStorage;

  const saveData = function(data) {
    storage.setItem('projectList', JSON.stringify(data));
  }

  const loadData = function() {
    const data = JSON.parse(storage.getItem('projectList'));
    return data;
  }

  return {
    saveData,
    loadData
  };
}