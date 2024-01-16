export const isBookViewed = (id: string | number) => {
  const viewedBooks = window.localStorage.getItem('viewedBooks') ? JSON.parse(window.localStorage.getItem('viewedBooks')!) : [];
  return viewedBooks.includes(Number(id));
}

export const pushBookToViewedStorage = (id: string | number) => {
  const viewedBooks = window.localStorage.getItem('viewedBooks') ? JSON.parse(window.localStorage.getItem('viewedBooks')!) : [];
  if (!viewedBooks.includes(Number(id))) {
    viewedBooks.push(Number(id));
    window.localStorage.setItem('viewedBooks', JSON.stringify(viewedBooks));
  }
}