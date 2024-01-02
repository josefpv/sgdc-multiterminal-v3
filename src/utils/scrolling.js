export const scrollToBottom = () => {
  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, 10);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export const scrollToMiddle = () => {
  window.scrollTo({
    top: 200,
    left: 0,
    behavior: "smooth",
  });
};
