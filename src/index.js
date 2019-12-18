
import React from 'react';

function useInvisibleRefWidth(ref) {
    // initialize with undefined or offsetWidth
    const [labelWidth, setLabelWidth] = React.useState(ref.current?.offsetWidth);
    React.useEffect(() => {
        const { offsetWidth, innerText } = ref.current;
        if (!labelWidth && ref.current?.offsetWidth) {
            setLabelWidth(ref.current.offsetWidth);
        } else if (!offsetWidth && innerText?.length > 0) {
            const temporarySpan = ref.current.cloneNode();
            temporarySpan.innerText = innerText;
            document.body.appendChild(temporarySpan);
            // we set state only if it's changing
            if (labelWidth !== temporarySpan.offsetWidth) {
                setLabelWidth(temporarySpan.offsetWidth);
            }
            document.body.removeChild(temporarySpan);
        }
    });
    return labelWidth;
}

export default useInvisibleRefWidth;
