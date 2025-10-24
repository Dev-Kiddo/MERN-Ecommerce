// export default (myErrorFunc) => (req, res, next) => {
//   Promise.resolve(myErrorFunc(req, res, next)).catch(next);
// };

export default function handleAsyncError(myErrorFunc) {
  return function (req, res, next) {
    Promise.resolve(myErrorFunc(req, res, next)).catch(next);
  };
}
