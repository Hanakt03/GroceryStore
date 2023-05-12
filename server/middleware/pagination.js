const calPagination = (page, numberOfPages, displayedPage, iterationNum) => {
  let iterator = page - displayedPage < 1 ? 1 : page - displayedPage;
  let endingLink =
    iterator + iterationNum <= numberOfPages
      ? iterator + iterationNum
      : page + (numberOfPages - page);
  if (endingLink < page + displayedPage) {
    iterator -= page + displayedPage - numberOfPages;
  }
  return { iterator, endingLink };
};
module.exports = calPagination;
