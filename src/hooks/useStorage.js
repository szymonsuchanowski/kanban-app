function useStorage() {
    const saveToStorage = (tasks) => window.localStorage.setItem('tasks', JSON.stringify(tasks));

    const getFromStorage = () => JSON.parse(window.localStorage.getItem('tasks'));

    return [saveToStorage, getFromStorage];
}

export default useStorage;
