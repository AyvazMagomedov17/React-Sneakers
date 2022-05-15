export const lockScrol = () => {
    window.scrollTo(0, 0);
}
export const addLockScroll = () => {
    window.addEventListener('scroll', lockScrol);

}
export const removeLockScroll = () => {
    window.removeEventListener('scroll', lockScrol)
}