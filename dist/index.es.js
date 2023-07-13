import { __awaiter as n, __generator as r, __spreadArray as t } from 'tslib';
var e = function (e, i) {
    return function (o, u, s) {
      var a = s.value;
      return (
        i || ((i = e), (e = void 0)),
        (s.value = function () {
          for (var o = [], u = 0; u < arguments.length; u++)
            o[u] = arguments[u];
          return n(this, void 0, void 0, function () {
            var n, u, s;
            return r(this, function (r) {
              switch (r.label) {
                case 0:
                  return (
                    r.trys.push([0, 4, , 5]),
                    (n = a.apply(this, o)),
                    (l = n) && Promise.resolve(l) === l ? [4, n] : [3, 2]
                  );
                case 1:
                  return (u = r.sent()), [3, 3];
                case 2:
                  (u = Promise.resolve(n)), (r.label = 3);
                case 3:
                  return [2, u];
                case 4:
                  if (
                    ((s = r.sent()),
                    ('function' == typeof (c = i) || c instanceof Function) &&
                      (void 0 === e || s instanceof e))
                  )
                    return [2, i.call.apply(i, t([null, s, this], o, !1))];
                  throw s;
                case 5:
                  return [2];
              }
              var c, l;
            });
          });
        }),
        s
      );
    };
  },
  i = function (n, r) {
    return e(n, r);
  },
  o = function (n) {
    return e(n);
  };
export { i as Catch, o as DefaultCatch };
