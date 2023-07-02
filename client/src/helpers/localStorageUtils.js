export const getStoredIdFromLocalStorage = () => {
    const storedId = localStorage.getItem('myId')
    return storedId
}