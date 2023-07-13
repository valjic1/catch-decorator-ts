'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
var e = require('tslib');
var r = function (r, t) {
  return function (n, a, s) {
    var u = s.value;
    return (
      t || ((t = r), (r = void 0)),
      (s.value = function () {
        for (var n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
        return e.__awaiter(this, void 0, void 0, function () {
          var a, s, i;
          return e.__generator(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  o.trys.push([0, 4, , 5]),
                  (a = u.apply(this, n)),
                  (l = a) && Promise.resolve(l) === l ? [4, a] : [3, 2]
                );
              case 1:
                return (s = o.sent()), [3, 3];
              case 2:
                (s = Promise.resolve(a)), (o.label = 3);
              case 3:
                return [2, s];
              case 4:
                if (
                  ((i = o.sent()),
                  ('function' == typeof (c = t) || c instanceof Function) &&
                    (void 0 === r || i instanceof r))
                )
                  return [
                    2,
                    t.call.apply(t, e.__spreadArray([null, i, this], n, !1)),
                  ];
                throw i;
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
};
(exports.Catch = function (e, t) {
  return r(e, t);
}),
  (exports.DefaultCatch = function (e) {
    return r(e);
  });
