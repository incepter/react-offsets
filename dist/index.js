import React from 'react';

function useInvisibleRefWidth(ref) {
  var _ref$current;

  // initialize with undefined or offsetWidth
  const [labelWidth, setLabelWidth] = React.useState((_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.offsetWidth);
  React.useEffect(() => {
    var _ref$current2;

    const {
      offsetWidth,
      innerText
    } = ref.current;

    if (!labelWidth && ((_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.offsetWidth)) {
      setLabelWidth(ref.current.offsetWidth);
    } else if (!offsetWidth && (innerText === null || innerText === void 0 ? void 0 : innerText.length) > 0) {
      const temporarySpan = ref.current.cloneNode();
      temporarySpan.innerText = innerText;
      document.body.appendChild(temporarySpan); // we set state only if it's changing

      if (labelWidth !== temporarySpan.offsetWidth) {
        setLabelWidth(temporarySpan.offsetWidth);
      }

      document.body.removeChild(temporarySpan);
    }
  });
  return labelWidth;
}

export default useInvisibleRefWidth;